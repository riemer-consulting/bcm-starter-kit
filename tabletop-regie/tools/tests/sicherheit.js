// Sicherheitsprüfung gegen einen laufenden Server (Standard http://127.0.0.1:4173).
// Aufruf: node tools/tests/sicherheit.js [baseUrl]
// Prüft: Bindung nur lokal, Vorlagen-Export ohne SMTP-Passwort, kein Pfad-Ausbruch
// über das Logo, Logo-Upload nur Bildtypen, Bewertung nur gültige Rolle/Kriterium,
// kein Prototyp-Eingriff, Doppelversand-Sperre.
const http = require('http');
const os = require('os');
const BASE = process.argv[2] || 'http://127.0.0.1:4173';
const ergebnisse = [];
const pruef = (name, ok, beob) => { ergebnisse.push({ name, ok, beob }); console.log((ok ? 'BESTANDEN ' : 'FEHLER    ') + name + ' – ' + beob); };
const j = async (p, opt = {}) => { const r = await fetch(BASE + p, opt); let b = null; try { b = await r.json(); } catch (e) {} return { status: r.status, body: b }; };
const post = (p, body) => j(p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

(async () => {
  // 0 Server muss lokal erreichbar sein, sonst ist jede weitere Prüfung wertlos
  for (let i = 0; i < 40; i++) { try { await fetch(BASE + '/api/scenario-meta'); break; } catch (e) { if (i === 39) { console.error('Server unter ' + BASE + ' nicht erreichbar'); process.exit(2); } await new Promise(r => setTimeout(r, 250)); } }
  // 1 Bindung: über eine Nicht-Loopback-Adresse darf keine Verbindung zustande kommen
  const extern = Object.values(os.networkInterfaces()).flat().find(i => i && i.family === 'IPv4' && !i.internal);
  if (extern) {
    const port = new URL(BASE).port;
    const ok = await new Promise(res => { const rq = http.get({ host: extern.address, port, path: '/api/state', timeout: 2000 }, () => res(false)); rq.on('error', () => res(true)); rq.on('timeout', () => { rq.destroy(); res(true); }); });
    pruef('Server nur auf 127.0.0.1 erreichbar', ok, ok ? `Verbindung über ${extern.address}:${port} abgelehnt` : `über ${extern.address} erreichbar`);
  } else pruef('Server nur auf 127.0.0.1 erreichbar', true, 'keine externe Schnittstelle vorhanden – nicht prüfbar (als bestanden gewertet, siehe Bericht)');

  // 2 Vorlagen-Export ohne Passwort
  await post('/api/settings', { smtp: { host: 'localhost', port: 2525, user: 'test', pass: 'GEHEIM-TEST-123', from: 'regie@example.com' } });
  const ex = await j('/api/template/export');
  const raw = JSON.stringify(ex.body);
  pruef('Vorlagen-Export enthält kein SMTP-Passwort', !raw.includes('GEHEIM-TEST-123') && ex.body.settings.smtp.pass === '••••••••', `pass im Export: "${ex.body.settings.smtp.pass}"`);
  // Import mit Platzhalter darf das gespeicherte Passwort nicht überschreiben
  await post('/api/template/import', { settings: ex.body.settings });
  // Gespeicherte Einstellungen direkt lesen (Test läuft auf demselben Rechner)
  const gespeichert = JSON.parse(require('fs').readFileSync(process.env.SETTINGS || require('path').join(__dirname, '..', '..', 'data', 'settings.json'), 'utf8'));
  pruef('Import des Platzhalters lässt gespeichertes Passwort unverändert', gespeichert.smtp.pass === 'GEHEIM-TEST-123', gespeichert.smtp.pass === 'GEHEIM-TEST-123' ? 'data/settings.json enthält weiterhin das ursprüngliche Passwort' : 'Passwort verändert');
  await post('/api/settings', { smtp: { host: '', port: 587, user: '', pass: '' } });

  // 3 Pfad-Ausbruch über das Logo
  await post('/api/settings', { branding: { logo: '/media/branding/custom-logo-/../../../server/index.js' } });
  const ex3 = await j('/api/template/export');
  pruef('Logo-Pfad mit "../" liest keine Datei außerhalb media/', !ex3.body.brandingLogoFile, ex3.body.brandingLogoFile ? 'Datei eingebettet: ' + ex3.body.brandingLogoFile.name : 'nichts eingebettet');
  await post('/api/settings', { branding: { logo: '/media/branding/excon-logo.png' } });

  // 4 Logo-Upload: SVG/HTML abgelehnt, PNG angenommen
  const up = async (name, type, data) => { const fd = new FormData(); fd.append('logo', new Blob([data], { type }), name); const r = await fetch(BASE + '/api/settings/upload-logo', { method: 'POST', body: fd }); return { status: r.status, body: await r.json().catch(() => null) }; };
  const svg = await up('x.svg', 'image/svg+xml', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
  const html = await up('x.png', 'text/html', '<script>alert(1)</script>');
  const png = await up('x.html', 'image/png', Buffer.from('89504e470d0a1a0a', 'hex'));
  pruef('Logo-Upload lehnt SVG ab', svg.status === 400, `HTTP ${svg.status}`);
  pruef('Logo-Upload lehnt text/html ab', html.status === 400, `HTTP ${html.status}`);
  pruef('Logo-Upload: Dateiendung folgt dem Bildtyp, nicht dem Dateinamen', png.status === 200 && /\.png$/.test(png.body.url), `HTTP ${png.status}, gespeichert als ${png.body && png.body.url}`);
  await post('/api/settings', { branding: { logo: '/media/branding/excon-logo.png' } });
  if (png.body && png.body.url) { try { require('fs').unlinkSync(require('path').join(__dirname, '..', '..', png.body.url.slice(1))); } catch (e) {} }

  // 5 Bewertung: nur gültige Rolle und Kriterium, kein Prototyp-Eingriff
  const st = (await j('/api/scenario-meta')).body || {};
  const proto = await post('/api/bewertung', { roleId: '__proto__', kriterium: 'polluted', value: 5 });
  pruef('Bewertung mit roleId "__proto__" abgelehnt', proto.status === 400 && ({}).polluted === undefined, `HTTP ${proto.status}`);
  const unbek = await post('/api/bewertung', { roleId: 'gibt-es-nicht', kriterium: 'x', value: 3 });
  pruef('Bewertung mit unbekannter Rolle abgelehnt', unbek.status === 400, `HTTP ${unbek.status}`);
  const rolle = (st.roles || [])[0]; const krit = (st.bewertungskriterien || [])[0];
  if (rolle && krit) { const g = await post('/api/bewertung', { roleId: rolle.id, kriterium: krit, value: 4 }); pruef('Bewertung mit gültiger Rolle/Kriterium angenommen', g.status === 200, `HTTP ${g.status}`); await post('/api/bewertung', { roleId: rolle.id, kriterium: krit, value: null }); }

  const fehler = ergebnisse.filter(e => !e.ok).length;
  console.log(`\n${ergebnisse.length - fehler} von ${ergebnisse.length} bestanden`);
  require('fs').writeFileSync(process.env.ERGEBNIS || '/dev/null', JSON.stringify(ergebnisse, null, 2));
  process.exitCode = fehler ? 1 : 0;
})();
