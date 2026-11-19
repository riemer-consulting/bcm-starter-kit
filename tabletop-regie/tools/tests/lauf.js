// Lauftest gegen den echten Server mit lokalem Test-Mailempfänger.
// Aufruf: node tools/tests/lauf.js scenario.<name>.json <ergebnis.json> [minuten]
// Startet den Server selbst (Port 4180, nur 127.0.0.1) und einen SMTP-Testempfänger
// (Port 2525). Teilnehmende sind Testadressen @example.com. Vorhandene
// data/settings.json und data/run-state.json werden gesichert und danach zurückgelegt.
//
// Geprüft wird (Bezeichner wie im Testbericht):
//  M1  Begrüßung und Rollenbriefing: jede Person genau einmal
//  M2  jede ausgelöste vertrauliche Karte genau einmal bei genau den richtigen Personen
//  M3  Folgekarten der gewählten Entscheidungen zugestellt
//  M4  private Überraschung per Mail, öffentliche Überraschung nicht per Mail
//  M5  Ersatzrolle: Karte an Ersatzrolle mit Hinweis
//  V1  keine vertraulichen Inhalte in Bühnen- und Ablaufdaten
//  R1  Rechnung im Abschluss = Grundschaden + Posten der gewählten Optionen
//  P1  Protokoll enthält Entscheidungen, Überraschungen, keine Namen/Adressen, kein Passwort
//  N1  Mailversand schlägt fehl          N2  Server-Neustart mitten im Lauf
//  N5  Überraschung zu früh              N6  fehlende Rolle
//  N7  Timer-Pause                       N8  Entscheidung geändert
//  N9  Doppelauslösung                   N10 fehlende Mediendatei
const fs = require('fs');
const path = require('path');
const net = require('net');
const { spawn } = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
// Isolierter Datenordner: Kopie der Drehbücher; die Projektkonfiguration in data/ bleibt unberührt.
const DATADIR = fs.mkdtempSync(path.join(require('os').tmpdir(), 'qa-test-'));
fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^scenario\..*\.json$/.test(f)).forEach(f => fs.copyFileSync(path.join(ROOT, 'data', f), path.join(DATADIR, f)));
const FILE = process.argv[2] || 'scenario.nordtech.json';
const OUT = process.argv[3] || '/dev/null';
const MIN = Number(process.argv[4] || 90);
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', FILE), 'utf8'));
const e = require(path.join(ROOT, 'server', 'runEngine'));
const PORT = 4180; const B = `http://127.0.0.1:${PORT}`; const SMTP = 2525;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ergebnisse = [];
const pruef = (id, name, ok, erwartet, beobachtet) => { ergebnisse.push({ id, name, ok: !!ok, erwartet, beobachtet }); console.log(`${ok ? 'BESTANDEN' : 'FEHLER   '} ${id} ${name} – ${beobachtet}`); };
const post = (p, b) => fetch(B + p, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Regie': '1' }, body: JSON.stringify(b || {}) }).then(async r => ({ status: r.status, body: await r.json().catch(() => null) }));
const get = p => fetch(B + p).then(r => r.json());

// ---- SMTP-Testempfänger
const mails = [];
const smtp = net.createServer(sock => {
  let rcpt = [], inData = false, data = '', buf = '';
  sock.write('220 test ESMTP\r\n');
  sock.on('data', chunk => {
    buf += chunk.toString('utf8'); let i;
    while ((i = buf.indexOf('\r\n')) >= 0) {
      const line = buf.slice(0, i); buf = buf.slice(i + 2);
      if (inData) { if (line === '.') { inData = false; mails.push({ to: rcpt, raw: data }); rcpt = []; data = ''; sock.write('250 OK\r\n'); } else data += line + '\n'; continue; }
      const c = line.toUpperCase();
      if (c.startsWith('EHLO') || c.startsWith('HELO')) sock.write('250 test\r\n');
      else if (c.startsWith('MAIL FROM')) sock.write('250 OK\r\n');
      else if (c.startsWith('RCPT TO')) { rcpt.push(line.slice(8).replace(/[<>]/g, '').trim()); sock.write('250 OK\r\n'); }
      else if (c === 'DATA') { inData = true; sock.write('354 go\r\n'); }
      else if (c === 'QUIT') { sock.write('221 bye\r\n'); sock.end(); }
      else sock.write('250 OK\r\n');
    }
  });
});
const dec = h => h.replace(/=\?UTF-8\?([QB])\?([^?]*)\?=\s*/gi, (m, enc, t) => enc.toUpperCase() === 'B' ? Buffer.from(t, 'base64').toString('utf8') : Buffer.from(t.replace(/_/g, ' ').replace(/=([0-9A-F]{2})/gi, (x, hh) => String.fromCharCode(parseInt(hh, 16))), 'latin1').toString('utf8'));
const mailListe = () => mails.map(m => { const head = m.raw.split('\n\n')[0].replace(/\n[ \t]+/g, ' '); const body = m.raw.split('\n\n').slice(1).join('\n\n');
  const qp = body.replace(/=\n/g, '').replace(/=([0-9A-F]{2})/g, (x, h) => '%' + h); let text = body; try { text = decodeURIComponent(qp); } catch (er) { /* base64 o. ä. */ }
  return { to: m.to, subject: dec(((head.match(/^Subject: (.*)$/mi) || [])[1] || '').trim()), text }; });

// ---- Server starten/stoppen
let srv = null;
async function starteServer() {
  srv = spawn(process.execPath, ['server/index.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(PORT), HOST: '127.0.0.1', TABLETOP_DATA_DIR: DATADIR }), stdio: ['ignore', 'pipe', 'pipe'] });
  srv.stdout.on('data', () => {}); srv.stderr.on('data', d => process.stderr.write(d));
  for (let i = 0; i < 60; i++) { try { await fetch(B + '/api/scenario-meta'); return; } catch (er) { await sleep(250); } }
  throw new Error('Server startet nicht');
}
async function stoppeServer() { if (!srv) return; const p = new Promise(r => srv.once('exit', r)); srv.kill('SIGTERM'); await p; srv = null; }

const sicher = {};
function sichern() { ['settings.json', 'run-state.json'].forEach(f => { const p = path.join(DATADIR, f); sicher[f] = fs.existsSync(p) ? fs.readFileSync(p) : null; }); }
function zuruecklegen() { ['settings.json', 'run-state.json'].forEach(f => { const p = path.join(DATADIR, f); if (sicher[f]) fs.writeFileSync(p, sicher[f]); else if (fs.existsSync(p)) fs.unlinkSync(p); }); }

(async () => {
  sichern();
  await new Promise(r => smtp.listen(SMTP, '127.0.0.1', r));
  try {
    await starteServer();
    await post('/api/settings', { smtp: { host: '127.0.0.1', port: SMTP, secure: false, user: '', pass: '', fromAddress: 'regie@example.com' }, testMode: { enabled: false, dummyEmail: '' } });
    const sel = await post('/api/scenarios/select', { file: FILE });
    if (sel.status !== 200) throw new Error('Szenario nicht wählbar: ' + JSON.stringify(sel.body));
    await post('/api/run/reset');

    // Besetzung: empfohlene Rollen; eine Rolle mit Ersatzrolle bleibt bewusst frei (M5/N6)
    const rec = e.recommendRoles(s, { targetMinutes: MIN });
    const bonusMitRolle = s.bonuskarten.find(b => b.erfordertBesetzt);
    // Freizulassen: Empfänger einer zeitgebundenen Karte, deren Ersatzrolle besetzt ist
    const frei = rec.roleIds.find(r => r !== (bonusMitRolle || {}).erfordertBesetzt && r !== rec.roleIds[0]
      && s.sonderlagekarten.some(k => k.empfaenger === r && typeof k.minuteOffset === 'number' && !k.nurNachWeiche && (k.fallbackEmpfaenger || []).some(f => rec.roleIds.includes(f) && f !== r)));
    const besetzt = rec.roleIds.filter(r => r !== frei);
    // Team: die erste Rolle mit zwei Personen (alle bekommen dieselben Karten)
    const parts = besetzt.map((rid, i) => ({ name: 'Person ' + (i + 1), email: `person${i + 1}@example.com`, roleIds: [rid] }));
    parts.push({ name: 'Person Team', email: 'person-team@example.com', roleIds: [besetzt[0]] });
    await post('/api/participants', parts);
    const plist = await get('/api/participants');
    await post('/api/participants/send-briefings'); await post('/api/participants/send-welcome');
    await sleep(500);
    let ml = mailListe();
    const welcome = ml.filter(m => /^Willkommen/.test(m.subject)); const brief = ml.filter(m => /^Deine Rolle/.test(m.subject));
    const jeEinmal = list => plist.every(p => list.filter(m => m.to.includes(p.email)).length === 1);
    pruef('M1', 'Begrüßung und Rollenbriefing je Person genau einmal', jeEinmal(welcome) && jeEinmal(brief), `${plist.length} Personen: je 1 Begrüßung, je 1 Briefing`, `Begrüßungen ${welcome.length}, Briefings ${brief.length}, Personen ${plist.length}`);

    const sp = (s.schwerpunkte || [])[0];
    const start = await post('/api/run/start', { durationMode: 'target', targetMinutes: MIN, schwerpunkt: sp ? sp.key : null });
    // N5a: öffentliche Überraschung vor Beginn der Krise
    let oeff = s.bonuskarten.find(b => b.oeffentlich && !(b.voraussetzung || []).length && !b.minDauer && !b.erfordertBesetzt) || s.bonuskarten.find(b => b.oeffentlich);
    const frueh = await post('/api/run/fire-bonuskarte/' + oeff.id);
    await post('/api/run/begin-crisis');
    const frueh2 = await post('/api/run/fire-bonuskarte/' + oeff.id);
    pruef('N5', 'Öffentliche Überraschung vor laufender Lage', frueh.status === 400 && frueh2.status === 400, 'abgelehnt mit verständlicher Meldung; nichts auf der Bühne', `vor Start: HTTP ${frueh.status} „${(frueh.body || {}).error}“; im Countdown: HTTP ${frueh2.status}`);
    // N5b: Überraschung mit Voraussetzung, bevor die Lage gespielt wurde
    const mitVor = s.bonuskarten.find(b => (b.voraussetzung || []).length);
    await sleep(31500);
    if (mitVor) { const r = await post('/api/run/fire-bonuskarte/' + mitVor.id); pruef('N5', `Überraschung ${mitVor.id} vor ihrer Lage ${mitVor.voraussetzung.join(', ')}`, r.status === 400, 'abgelehnt', `HTTP ${r.status} „${(r.body || {}).error}“`); }

    // N7: Pause
    let ms = await get('/api/run/moderator-state');
    await post('/api/run/pause'); const t0 = (await get('/api/run/moderator-state')).elapsedMinutes; await sleep(4000);
    const t1 = (await get('/api/run/moderator-state')).elapsedMinutes; await post('/api/run/resume'); await sleep(2500);
    const t2 = (await get('/api/run/moderator-state')).elapsedMinutes;
    pruef('N7', 'Timer-Pause', t1 === t0 && t2 > t1, 'Zeit steht während der Pause und läuft danach weiter', `vor Pause ${t0} Min., nach 4 s Pause ${t1} Min., 2,5 s nach Fortsetzen ${t2} Min.`);

    // Entscheidungen: alle Weichen im Plan, jeweils Option 2; erste Weiche vorher auf Option 1 (N8)
    const W = s.weichen || [];
    const gewaehlt = {};
    ms = await get('/api/run/moderator-state');
    const imPlan = W.filter(w => w.lagekarten.some(id => (ms.fullTimeline || []).some(x => x.type === 'lagekarte' && x.id === id)));
    for (const [i, w] of imPlan.entries()) {
      const lk = w.lagekarten.find(id => ms.fullTimeline.some(x => x.type === 'lagekarte' && x.id === id));
      await post('/api/run/jump-to-event/lagekarte/' + lk); await sleep(1200);
      if (i === 0) {
        await post('/api/run/weiche', { id: w.id, option: w.optionen[0].id });
        const vorher = await get('/api/run/stage-state');
        await post('/api/run/weiche', { id: w.id, option: w.optionen[1].id });
        const f = (await get('/api/run/moderator-state')).finale || {};
        const posten0 = w.optionen[0].posten || [], posten1 = w.optionen[1].posten || [];
        const aktiv = id => ((f.optionen || []).find(x => x.id === id) || {}).aktiv;
        const optOk = posten0.every(p => posten1.includes(p) || !aktiv(p)) && posten1.every(p => aktiv(p));
        pruef('N8', `Entscheidung ${w.id} geändert (${w.optionen[0].id} → ${w.optionen[1].id})`, optOk, 'Posten der Rechnung folgen der neuen Entscheidung; Folgen der alten Option entfallen', `Posten vorher (Option 1): ${posten0.join(', ') || 'keine'}; danach aktiv: ${(f.optionen || []).filter(x => x.aktiv).map(x => x.id).join(', ') || 'keine'}; Bühne vorher Lage ${vorher.currentLagekarte && vorher.currentLagekarte.id}`);
      } else await post('/api/run/weiche', { id: w.id, option: w.optionen[1].id });
      gewaehlt[w.id] = w.optionen[1];
    }

    // Private und öffentliche Überraschung während laufender Lage
    ms = await get('/api/run/moderator-state');
    const gespielt = new Set(ms.fullTimeline.filter(x => x.type === 'lagekarte' && x.fired).map(x => x.id));
    const spielbar = b => (b.voraussetzung || []).every(v => gespielt.has(v)) && (!b.minDauer || b.minDauer <= MIN) && !b.erfordertBesetzt;
    const erreichbar = b => [b.empfaenger, ...(b.fallbackEmpfaenger || [])].some(r => besetzt.includes(r));
    const privat = s.bonuskarten.find(b => !b.oeffentlich && spielbar(b) && erreichbar(b));
    const privatOhne = s.bonuskarten.find(b => !b.oeffentlich && spielbar(b) && !erreichbar(b));
    oeff = s.bonuskarten.find(b => b.oeffentlich && spielbar(b) && !b.unterbrechung) || oeff;
    const rp = privat ? await post('/api/run/fire-bonuskarte/' + privat.id) : null;
    if (privatOhne) {
      const vorOhne = mails.length; const r = await post('/api/run/fire-bonuskarte/' + privatOhne.id);
      const lg = ((await get('/api/run/moderator-state')).log || []).find(l => l.message && l.message.includes(privatOhne.id));
      pruef('N6', `Private Überraschung ${privatOhne.id}: weder ${privatOhne.empfaenger} noch Ersatzrolle besetzt`, r.status === 200 && mails.length === vorOhne && lg && lg.type === 'warn', 'keine Mail; Warnung im Moderations-Log (Moderation entscheidet, ob sie die Karte mündlich einbringt)', `HTTP ${r.status}; Mails ${mails.length - vorOhne}; Log: ${lg ? lg.type + ' „' + lg.message + '“' : 'kein Eintrag'}`);
    }
    const ro = await post('/api/run/fire-bonuskarte/' + oeff.id);
    const st0 = await get('/api/run/stage-state');
    const ereignisAufBuehne = !!(st0.buehnenEreignis && st0.buehnenEreignis.id === oeff.id);
    // N9: Doppelauslösung (Überraschung und vertrauliche Karte)
    const ro2 = await post('/api/run/fire-bonuskarte/' + oeff.id);
    ms = await get('/api/run/moderator-state');
    const offenSk = s.sonderlagekarten.find(k => !k.nurNachWeiche && !ms.firedSonderlagekarten.some(f => f.id === k.id) && besetzt.includes(k.empfaenger));
    const vorDoppel = mails.length;
    await Promise.all([post('/api/run/fire-sonderkarte/' + offenSk.id), post('/api/run/fire-sonderkarte/' + offenSk.id), post('/api/run/fire-sonderkarte/' + offenSk.id)]);
    await sleep(500);
    const doppelMails = mailListe().slice(vorDoppel).filter(m => m.subject.endsWith('Lageinformation ' + offenSk.id));
    const soll = plist.filter(p => p.roleIds.includes(offenSk.empfaenger)).length;
    pruef('N9', `Doppelauslösung: ${offenSk.id} dreimal gleichzeitig`, doppelMails.length === soll, `genau ${soll} Mail(s) (eine je Person der Rolle)`, `${doppelMails.length} Mail(s)`);
    pruef('N9', `Doppelauslösung: öffentliche Überraschung ${oeff.id} zweimal`, ro.status === 200 && ro2.status === 400, 'erste angenommen, zweite abgelehnt', `HTTP ${ro.status}, dann HTTP ${ro2.status} „${(ro2.body || {}).error}“`);

    // Bis kurz vor Ende spielen: alle fälligen Karten gehen raus
    await post('/api/run/jump-to-minute', { minute: Math.max(1, MIN * 0.8) }); await sleep(4500);
    // N6: fehlende Rolle für eine Überraschung mit Pflichtrolle
    if (bonusMitRolle) {
      const besetztPflicht = besetzt.includes(bonusMitRolle.erfordertBesetzt);
      const msv = await get('/api/run/moderator-state');
      for (const v of bonusMitRolle.voraussetzung || []) if (!msv.fullTimeline.some(x => x.id === v && x.fired)) { await post('/api/run/jump-to-event/lagekarte/' + v); await sleep(1500); }
      const r = await post('/api/run/fire-bonuskarte/' + bonusMitRolle.id);
      pruef('N6', `Überraschung ${bonusMitRolle.id} braucht ${bonusMitRolle.erfordertBesetzt}`, besetztPflicht ? r.status === 200 : r.status === 400, besetztPflicht ? 'Rolle besetzt → angenommen' : 'Rolle nicht besetzt → abgelehnt mit Begründung', `Rolle ${besetztPflicht ? 'besetzt' : 'nicht besetzt'}: HTTP ${r.status} ${(r.body || {}).error ? '„' + r.body.error + '“' : ''}`);
      if (besetztPflicht) await post('/api/run/buehnenereignis/ausblenden');
    }

    ms = await get('/api/run/moderator-state');
    const st = await fetch(B + '/api/run/stage-state').then(r => r.text());
    const ab = await fetch(B + '/api/run/ablauf-state').then(r => r.text());
    ml = mailListe();
    const skMails = ml.filter(m => /Lageinformation SK/.test(m.subject));
    const falsch = [];
    ms.firedSonderlagekarten.forEach(f => {
      const sollM = plist.filter(p => (p.roleIds || []).includes(f.recipientRoleId)).map(p => p.email).sort();
      const ist = skMails.filter(m => m.subject.endsWith('Lageinformation ' + f.id)).flatMap(m => m.to).sort();
      if (sollM.join() !== ist.join()) falsch.push(`${f.id}: soll ${sollM.join('+') || '–'}, ist ${ist.join('+') || '–'}`);
    });
    pruef('M2', 'Jede ausgelöste vertrauliche Karte genau einmal bei den richtigen Personen', !falsch.length && ms.firedSonderlagekarten.length > 0, 'alle Empfänger der Rolle (inkl. Team), niemand sonst, keine Doppelung', `${ms.firedSonderlagekarten.length} Karten, ${skMails.length} Mails, Abweichungen: ${falsch.join('; ') || 'keine'}`);
    // M3 Folgekarten
    const folge = Object.values(gewaehlt).filter(o => o.karte);
    const folgeOk = folge.map(o => { const f = ms.firedSonderlagekarten.find(x => x.id === o.karte.sonderlagekarte); const gespielt = ms.fullTimeline.some(x => x.type === 'lagekarte' && x.id === o.karte.beiLagekarte && x.fired); return { id: o.karte.sonderlagekarte, bei: o.karte.beiLagekarte, gespielt, zugestellt: !!f }; });
    pruef('M3', 'Folgekarten der gewählten Entscheidungen', folgeOk.every(x => x.zugestellt === x.gespielt || (x.zugestellt && !x.gespielt)), 'Folgekarte kommt, sobald ihre Lage gespielt ist', folgeOk.map(x => `${x.id} bei ${x.bei}: Lage ${x.gespielt ? 'gespielt' : 'nicht gespielt'}, ${x.zugestellt ? 'zugestellt' : 'nicht zugestellt'}`).join('; ') || 'keine Folgekarte gewählt');
    // M4 Überraschungen
    const privMails = privat ? ml.filter(m => m.subject.endsWith('Bonusereignis ' + privat.id)) : [];
    const oeffMails = ml.filter(m => m.subject.endsWith('Bonusereignis ' + oeff.id));
    pruef('M4', 'Private Überraschung per Mail, öffentliche nur auf der Bühne', (!privat || (rp.status === 200 && privMails.length >= 1)) && oeffMails.length === 0 && ereignisAufBuehne, `${privat ? privat.id : '–'} per Mail an ${privat ? privat.empfaenger : '–'}; ${oeff.id} auf der Bühne, keine Mail`, `${privat ? privat.id + ': ' + privMails.flatMap(m => m.to).join(', ') : 'keine private Karte prüfbar'}; ${oeff.id}: Mails ${oeffMails.length}, Bühne ${ereignisAufBuehne ? 'zeigt Ereignis' : 'zeigt nichts'}`);
    // M5 Ersatzrolle
    const ersatz = ms.firedSonderlagekarten.filter(f => { const k = s.sonderlagekarten.find(x => x.id === f.id); return k && f.recipientRoleId && f.recipientRoleId !== k.empfaenger; });
    const ersatzMitHinweis = ersatz.filter(f => skMails.some(m => m.subject.endsWith(' ' + f.id) && /Ersatz|vertritt|eigentlich|stellvertret/i.test(m.text)));
    pruef('M5', `Ersatzrolle (Rolle ${frei || '–'} bewusst nicht besetzt)`, ersatz.length > 0 && ersatzMitHinweis.length === ersatz.length, 'Karten der freien Rolle gehen an die Ersatzrolle, mit Hinweis im Text', `${ersatz.length} Karte(n) an Ersatzrolle (${ersatz.map(f => f.id + '→' + f.recipientRoleId).join(', ')}), davon mit Hinweis: ${ersatzMitHinweis.length}`);
    // V1 Vertraulichkeit
    const geheim = [];
    s.sonderlagekarten.forEach(k => geheim.push([k.id, k.text], [k.id + ' (gut)', k.moderatorGut], [k.id + ' (schwach)', k.moderatorSchlecht]));
    s.sonderlagekarten.forEach(k => (k.textVarianten || []).forEach(v => geheim.push([k.id + ' (Variante)', v.text])));
    s.bonuskarten.filter(b => !b.oeffentlich).forEach(b => geheim.push([b.id, b.text]));
    (s.weichen || []).forEach(w => { geheim.push([w.id + ' (Hinweis)', w.hinweis]); w.optionen.forEach(o => (o.folgen || []).filter(f => f.sonderlagekarte).forEach(f => geheim.push([w.id + '/' + o.id + ' Folgetext', f.text]))); });
    s.lagekarten.forEach(l => { if (l.gespraech) geheim.push([l.id + ' (Gesprächsleitfaden)', [].concat(l.gespraech.gut || [])[0]]); geheim.push([l.id + ' (gut)', l.moderatorGut]); });
    const roh = (st + ab).replace(/\\n/g, '\n').replace(/\\"/g, '"');
    const lecks = geheim.filter(([, t]) => t && t.length > 25 && roh.includes(t.slice(0, 50))).map(([id]) => id);
    const namen = plist.filter(p => roh.includes(p.email)).map(p => p.email);
    pruef('V1', 'Keine vertraulichen Inhalte in Bühnen- und Ablaufdaten', !lecks.length && !namen.length, 'kein Text vertraulicher Karten, Moderationshinweise, Gesprächsleitfäden, privater Überraschungen; keine Mailadressen', `${geheim.filter(([, t]) => t && t.length > 25).length} Texte geprüft; Treffer: ${lecks.join(', ') || 'keine'}; Adressen: ${namen.length}`);

    // N1 Mailversand schlägt fehl
    await post('/api/settings', { smtp: { host: '127.0.0.1', port: 2599 } });
    ms = await get('/api/run/moderator-state');
    const fehlSk = s.sonderlagekarten.find(k => !k.nurNachWeiche && !ms.firedSonderlagekarten.some(f => f.id === k.id) && besetzt.includes(k.empfaenger));
    const vorFehl = mails.length;
    const rf = fehlSk ? await post('/api/run/fire-sonderkarte/' + fehlSk.id) : null;
    ms = await get('/api/run/moderator-state');
    const eintrag = fehlSk && ms.firedSonderlagekarten.find(f => f.id === fehlSk.id);
    const fehlerLog = (ms.log || []).filter(l => l.type === 'error' && fehlSk && l.message && l.message.includes(fehlSk.id));
    pruef('N1', 'Mailversand schlägt fehl (SMTP nicht erreichbar)', rf && rf.status === 200 && eintrag && eintrag.emailResults.every(r => !r.ok) && fehlerLog.length > 0 && ms.status === 'running' && mails.length === vorFehl,
      'Lauf geht weiter; Fehler im Moderations-Log je Person; Karte als ausgelöst mit Fehlerstatus vermerkt; keine erneute automatische Zustellung',
      fehlSk ? `HTTP ${rf.status}; Status ${ms.status}; Log-Einträge „fehlgeschlagen“: ${fehlerLog.length}; Ergebnis je Person: ${eintrag ? eintrag.emailResults.map(r => r.ok ? 'ok' : 'Fehler').join(', ') : '–'}; Hinweis: kein Knopf für erneuten Versand vorhanden – Moderation muss die Karte vorlesen oder manuell weitergeben` : 'keine offene Karte');
    await post('/api/settings', { smtp: { host: '127.0.0.1', port: SMTP } });

    // N2 Server-Neustart mitten im Lauf
    const vor = await get('/api/run/moderator-state');
    await stoppeServer(); await sleep(1500); await starteServer();
    const nach = await get('/api/run/moderator-state');
    const gleich = vor.status === nach.status && vor.firedSonderlagekarten.length === nach.firedSonderlagekarten.length && JSON.stringify(vor.weichen) === JSON.stringify(nach.weichen) && (vor.currentLagekarte || {}).id === (nach.currentLagekarte || {}).id;
    pruef('N2', 'Server-Neustart mitten im Lauf', gleich && nach.elapsedMinutes >= vor.elapsedMinutes,
      'Lauf, Entscheidungen, ausgelöste Karten und aktuelle Lage bleiben erhalten; keine Karte wird doppelt verschickt',
      `Status ${vor.status}→${nach.status}; Karten ${vor.firedSonderlagekarten.length}→${nach.firedSonderlagekarten.length}; Lage ${(vor.currentLagekarte || {}).id}→${(nach.currentLagekarte || {}).id}; Zeit ${vor.elapsedMinutes}→${nach.elapsedMinutes} Min. (die Ausfallzeit zählt als Übungszeit); Stummschaltung danach: ${(await get('/api/run/stage-state')).soundMuted ? 'an' : 'aus'}`);
    await sleep(3500);
    const nachMails = mailListe().filter(m => /Lageinformation SK/.test(m.subject));
    const doppelt = Object.entries(nachMails.reduce((a, m) => { m.to.forEach(t => { const k = t + m.subject; a[k] = (a[k] || 0) + 1; }); return a; }, {})).filter(([, n]) => n > 1);
    pruef('N2', 'Nach Neustart keine Doppelzustellung', !doppelt.length, 'jede Karte je Person höchstens einmal', `${doppelt.length} doppelte Zustellungen`);

    // R1 Rechnung
    await post('/api/run/finale/start');
    let fv; for (let i = 0; i < 60; i++) { fv = (await get('/api/run/stage-state')).finale; if (fv && fv.phase === 'bilanz') break; await post('/api/run/finale/next'); }
    const n = s.nachspiel; const basis = n.rechnung.reduce((a, p) => a + p.betrag, 0);
    const extra = [...new Set(Object.values(gewaehlt).flatMap(o => o.posten || []))].map(pid => n.optionalePosten.find(p => p.id === pid).betrag).reduce((a, b) => a + b, 0);
    const sollSumme = basis + extra; const sollErst = n.versicherung ? Math.min(sollSumme, n.versicherung.betrag) : 0;
    pruef('R1', 'Rechnung im Abschluss', fv && fv.bilanz && fv.bilanz.summe === sollSumme && fv.bilanz.versicherung === sollErst && fv.bilanz.eigenanteil === sollSumme - sollErst,
      `Brutto ${sollSumme} € = Grundschaden ${basis} € + Posten der gewählten Optionen ${extra} €; Erstattung ${sollErst} € (Modellannahme); beim Unternehmen ${sollSumme - sollErst} €`,
      fv && fv.bilanz ? `Brutto ${fv.bilanz.summe} €, Erstattung ${fv.bilanz.versicherung} €, beim Unternehmen ${fv.bilanz.eigenanteil} €` : 'Bilanz nicht erreicht');

    // P1 Protokoll
    const prot = await fetch(B + '/api/run/protokoll').then(r => r.text());
    const protOk = Object.values(gewaehlt).every(o => prot.includes(o.label)) && /Überraschungen/.test(prot) && !plist.some(p => prot.includes(p.email) || prot.includes(p.name)) && !/GEHEIM-TEST|@example\.com/.test(prot);
    pruef('P1', 'Übungsprotokoll (Export)', protOk, 'Entscheidungen mit Wortlaut, Abschnitt Überraschungen, keine Namen oder Adressen, kein Passwort', `${prot.length} Zeichen; Entscheidungen enthalten: ${Object.values(gewaehlt).filter(o => prot.includes(o.label)).length}/${Object.keys(gewaehlt).length}; Namen/Adressen: ${plist.filter(p => prot.includes(p.email) || prot.includes(p.name)).length}`);
    fs.writeFileSync(OUT.replace(/\.json$/, '-protokoll.md'), prot);

    // N10 fehlende Mediendatei
    const lkMitBild = s.lagekarten.find(l => l.media && l.media.src);
    const tmp = path.join(DATADIR, 'scenario.zz-test-fehlende-medien.json');
    const kopie = JSON.parse(JSON.stringify(s)); kopie.id += '-test'; kopie.lagekarten.find(l => l.id === lkMitBild.id).media.src = '/media/gibt-es-nicht.png';
    fs.writeFileSync(tmp, JSON.stringify(kopie));
    const { execFileSync } = require('child_process');
    let val = ''; try { val = execFileSync(process.execPath, ['server/validate.js'], { cwd: ROOT, encoding: 'utf8', env: Object.assign({}, process.env, { TABLETOP_DATA_DIR: DATADIR }) }); } catch (er) { val = (er.stdout || '') + (er.stderr || ''); }
    fs.unlinkSync(tmp);
    const http404 = (await fetch(B + '/media/gibt-es-nicht.png')).status;
    pruef('N10', 'Fehlende Mediendatei', /gibt-es-nicht\.png/.test(val) && /FEHLER|Fehler/.test(val) && http404 === 404, 'Prüfung meldet die fehlende Datei als Fehler, bevor geübt wird; Server liefert 404 statt Absturz', `Prüfung: „${(val.split('\n').find(l => /gibt-es-nicht/.test(l)) || '').trim()}“; HTTP ${http404}`);

    // N6b: dieselbe Überraschung, wenn ihre Pflichtrolle NICHT besetzt ist
    if (bonusMitRolle) {
      await post('/api/run/reset');
      await post('/api/participants', parts.filter(p => !p.roleIds.includes(bonusMitRolle.erfordertBesetzt)));
      await post('/api/run/start', { durationMode: 'target', targetMinutes: Math.max(MIN, bonusMitRolle.minDauer || 0), schwerpunkt: null });
      await post('/api/run/begin-crisis'); await sleep(31500);
      for (const v of bonusMitRolle.voraussetzung || []) { await post('/api/run/jump-to-event/lagekarte/' + v); await sleep(800); }
      const r = await post('/api/run/fire-bonuskarte/' + bonusMitRolle.id);
      const msb = await get('/api/run/moderator-state');
      const hinweis = ((msb.bonuskarten || []).find(b => b.id === bonusMitRolle.id) || {});
      pruef('N6', `Überraschung ${bonusMitRolle.id}, Pflichtrolle ${bonusMitRolle.erfordertBesetzt} nicht besetzt`, r.status === 400, 'abgelehnt mit Begründung; Moderation sieht vorab, warum die Karte nicht passt', `HTTP ${r.status} „${(r.body || {}).error}“; Anzeige in der Moderation: ${JSON.stringify(hinweis.wartetAuf || hinweis.nichtImAblauf || hinweis.gesperrt || '').slice(0, 160)}`);
    }
    await post('/api/run/reset');
  } catch (er) {
    pruef('X', 'Testablauf', false, 'ohne Abbruch', 'Abbruch: ' + er.message);
  } finally {
    await stoppeServer(); smtp.close(); zuruecklegen();
    const fehler = ergebnisse.filter(x => !x.ok).length;
    fs.writeFileSync(OUT, JSON.stringify({ szenario: FILE, minuten: MIN, zeitpunkt: new Date().toISOString(), ergebnisse }, null, 2));
    console.log(`\n${FILE}: ${ergebnisse.length - fehler} von ${ergebnisse.length} bestanden`);
    process.exitCode = fehler ? 1 : 0;
  }
})();
