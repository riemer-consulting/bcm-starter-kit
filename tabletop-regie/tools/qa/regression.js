// NordTech-Regression: vergleicht das beobachtbare Verhalten des eingefrorenen Ausgangsstands
// (Commit der NordTech-Freigabe) mit dem aktuellen Stand – über die echte Server-Schnittstelle,
// nicht über den Quelltext.
// Je Kombination (25 × Dauer/Schwerpunkt ohne Entscheidungen, 16 × Entscheidungen bei 90 Min.):
//   Ablaufplan (Karten, Reihenfolge, Minuten), jede gezeigte Lage auf der Bühne (Text, Zusatz,
//   Kriseninfo, Aufgabe, Bild, Ton), vertrauliche Karten (Empfängerrolle, Text), Rechnung,
//   Kriterien des Bewertungsrasters im Protokoll.
// Soll (vor dem Lauf festgelegt): in allen Punkten identisch; Kriterien: dieselben 8 Namen.
// Felder, die es nur im aktuellen Stand gibt, werden als „neu“ ausgewiesen, nicht als Abweichung.
// Aufruf: node tools/qa/regression.js <basisOrdner(tabletop-regie des Ausgangsstands)> <ausgabe.json> [spuren]
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { umgebung, sleep, ROOT } = require('./umgebung');
const engine = require(path.join(ROOT, 'server', 'runEngine.js'));
const [BASIS, OUT, SPUREN = 4] = process.argv.slice(2);
const SZ = 'scenario.nordtech.json';
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', SZ), 'utf8'));
const DAUERN = [45, 60, 90, 120, 180];
const SCHWERPUNKTE = ['', ...(s.schwerpunkte || []).map(x => x.key)];
const kombis = [];
DAUERN.forEach(d => SCHWERPUNKTE.forEach(sp => kombis.push({ id: `${d}-${sp || 'ausgewogen'}`, minuten: d, schwerpunkt: sp, wahl: {} })));
const W = s.weichen; const n = W.length;
for (let i = 0; i < (1 << n); i++) { const wahl = {}; W.forEach((w, k) => { wahl[w.id] = w.optionen[(i >> k) & 1].id; }); kombis.push({ id: '90-' + W.map(w => wahl[w.id]).join('-'), minuten: 90, schwerpunkt: '', wahl }); }

// Server des Ausgangsstands: eigene Kopie je Spur (er schreibt in seinen eigenen data/-Ordner)
async function basisServer(spur, port) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `qa-basis-${spur}-`));
  fs.cpSync(BASIS, dir, { recursive: true, filter: q => !/node_modules/.test(q) && !/[\\/]media([\\/]|$)/.test(q.slice(BASIS.length)) });
  fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(dir, 'node_modules'));
  fs.symlinkSync(path.join(BASIS, 'media'), path.join(dir, 'media'));
  ['run-state.json', 'settings.json'].forEach(f => { try { fs.unlinkSync(path.join(dir, 'data', f)); } catch (e) { /* nicht vorhanden */ } });
  const log = fs.openSync(path.join(dir, 'server.log'), 'a');
  const srv = spawn(process.execPath, ['server/index.js'], { cwd: dir, env: Object.assign({}, process.env, { PORT: String(port), HOST: '127.0.0.1' }), stdio: ['ignore', log, log] });
  const B = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 80; i++) { try { await fetch(B + '/api/scenario-meta'); break; } catch (e) { await sleep(250); } }
  const post = (p, b) => fetch(B + p, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Regie': '1' }, body: JSON.stringify(b || {}) }).then(r => r.json().catch(() => null));
  return { B, post, get: p => fetch(B + p).then(r => r.json()), text: p => fetch(B + p).then(r => r.text()), ende: async () => { const p = new Promise(r => srv.once('exit', r)); srv.kill('SIGTERM'); await p; fs.rmSync(dir, { recursive: true, force: true }); } };
}
async function aktuellServer(spur, port) {
  const u = await umgebung({ port, smtpPort: port - 1700, name: 'regr-' + spur, countdown: 0 });
  return { B: u.B, post: (p, b) => u.post(p, b).then(r => r.body), get: u.get, text: u.text, ende: u.ende };
}

const LK_FELDER = ['id', 'titel', 'simZeit', 'text', 'kriseninfo', 'aufgabe', 'media', 'sound'];
async function lauf(srv, k) {
  const rollen = engine.recommendRoles(s, { targetMinutes: k.minuten });
  const ids = (Array.isArray(rollen) ? rollen : (rollen.roles || rollen.roleIds || [])).map(r => typeof r === 'string' ? r : r.id);
  await srv.post('/api/scenarios/select', { file: SZ });
  await srv.post('/api/run/reset');
  await srv.post('/api/participants', ids.map((r, i) => ({ name: `Regression ${i + 1}`, email: `regression${i + 1}@example.com`, roleIds: [r] })));
  await srv.post('/api/run/start', { durationMode: 'target', targetMinutes: k.minuten, schwerpunkt: k.schwerpunkt || undefined });
  for (const [wid, oid] of Object.entries(k.wahl)) await srv.post('/api/run/weiche', { id: wid, option: oid });
  await srv.post('/api/run/begin-crisis');
  for (let i = 0; i < 80; i++) { if ((await srv.get('/api/run/stage-state')).status === 'running') break; await sleep(500); }
  const m0 = await srv.get('/api/run/moderator-state');
  const plan = m0.fullTimeline.map(e => `${e.type === 'lagekarte' ? 'LK' : 'SK'}:${e.id}@${e.minute}`);
  const lagen = [];
  for (const e of m0.fullTimeline.filter(x => x.type === 'lagekarte')) {
    await srv.post(`/api/run/jump-to-event/lagekarte/${e.id}`); await sleep(150);
    const lk = (await srv.get('/api/run/stage-state')).currentLagekarte || {};
    lagen.push(Object.fromEntries(LK_FELDER.map(f => [f, lk[f] === undefined ? null : lk[f]])));
  }
  await srv.post('/api/run/jump-to-minute', { minute: m0.totalPlannedMinutes + 1 }); await sleep(800);
  const m = await srv.get('/api/run/moderator-state');
  const zustellungen = (m.firedSonderlagekarten || []).map(f => ({ id: f.id, rolle: f.recipientRoleId, text: f.text })).sort((a, b) => a.id.localeCompare(b.id));
  const rechnung = m.finale && m.finale.rechnung;
  const prot = await srv.text('/api/run/protokoll');
  const abschnitt = (prot.split(/^## Gesamteinschätzung[^\n]*$/m)[1] || '').split(/\n## /)[0];
  const zeilen = abschnitt.split('\n').filter(z => /^\| /.test(z) && !/^\| ?(Kriterium|---)/.test(z)).map(z => z.split('|')[1].trim());
  // Summenzeile getrennt vergleichen, sie ist kein Kriterium
  const kriterien = zeilen.filter(z => !/^\*\*Summe/.test(z)); const summenzeile = zeilen.find(z => /^\*\*Summe/.test(z)) || null;
  return { plan, lagen, zustellungen, rechnung, kriterien, summenzeile, rollen: ids };
}

(async () => {
  const spuren = Number(SPUREN); const ergebnisse = {};
  const t0 = Date.now();
  await Promise.all(Array.from({ length: spuren }, async (_, sp) => {
    const basis = await basisServer(sp, 4400 + sp); const akt = await aktuellServer(sp, 4500 + sp);
    try {
      for (let i = sp; i < kombis.length; i += spuren) {
        const k = kombis[i];
        const [a, b] = await Promise.all([lauf(basis, k), lauf(akt, k)]);
        ergebnisse[k.id] = { kombi: k, basis: a, aktuell: b };
        process.stdout.write('.');
      }
    } finally { await basis.ende(); await akt.ende(); }
  }));
  // Vergleich
  const gleich = (x, y) => JSON.stringify(x) === JSON.stringify(y);
  const vergleiche = kombis.map(k => {
    const { basis: a, aktuell: b } = ergebnisse[k.id];
    const lagenDiff = a.lagen.map((l, i) => ({ id: l.id, felder: LK_FELDER.filter(f => !gleich(l[f], (b.lagen[i] || {})[f])) })).filter(x => x.felder.length);
    const asp = {
      besetzung: gleich(a.rollen, b.rollen),
      ablaufplan: gleich(a.plan, b.plan),
      buehne: !lagenDiff.length && a.lagen.length === b.lagen.length,
      zustellungen: gleich(a.zustellungen.map(z => z.id + '→' + z.rolle), b.zustellungen.map(z => z.id + '→' + z.rolle)),
      kartentexte: gleich(a.zustellungen.map(z => z.text), b.zustellungen.map(z => z.text)),
      rechnung: gleich(a.rechnung, b.rechnung),
      kriterien: gleich(a.kriterien, b.kriterien) && a.kriterien.length === 8,
      summenzeile: a.summenzeile === b.summenzeile
    };
    return { id: k.id, aspekte: asp, identisch: Object.values(asp).every(Boolean),
      details: Object.assign({}, !asp.ablaufplan ? { plan: { basis: a.plan, aktuell: b.plan } } : {}, lagenDiff.length ? { buehne: lagenDiff.slice(0, 5) } : {},
        !asp.zustellungen ? { zustellungen: { basis: a.zustellungen.map(z => z.id + '→' + z.rolle), aktuell: b.zustellungen.map(z => z.id + '→' + z.rolle) } } : {},
        !asp.rechnung ? { rechnung: { basis: a.rechnung, aktuell: b.rechnung } } : {}, !asp.kriterien ? { kriterien: { basis: a.kriterien, aktuell: b.kriterien } } : {}),
      umfang: { lagen: b.lagen.length, zustellungen: b.zustellungen.length, brutto: b.rechnung && (b.rechnung.summe || b.rechnung.brutto) } };
  });
  const bericht = { zeitpunkt: new Date().toISOString(), dauerSekunden: Math.round((Date.now() - t0) / 1000), szenario: SZ, kombinationen: kombis.length,
    identisch: vergleiche.filter(v => v.identisch).length, aspekte: Object.keys(vergleiche[0].aspekte).map(a => ({ aspekt: a, gleich: vergleiche.filter(v => v.aspekte[a]).length })),
    kriterienBasis: ergebnisse[kombis[0].id].basis.kriterien, vergleiche, rohdaten: ergebnisse };
  fs.writeFileSync(OUT, JSON.stringify(bericht, null, 2));
  console.log(`\nNordTech-Regression: ${bericht.identisch}/${bericht.kombinationen} Kombinationen identisch (${bericht.dauerSekunden} s)`);
  bericht.aspekte.forEach(a => console.log(`  ${a.aspekt}: ${a.gleich}/${kombis.length}`));
  vergleiche.filter(v => !v.identisch).slice(0, 5).forEach(v => console.log('  ✗ ' + v.id + ' ' + JSON.stringify(v.details).slice(0, 400)));
  process.exitCode = bericht.identisch === bericht.kombinationen ? 0 : 1;
})();
