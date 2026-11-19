// Prüft das Übungsprotokoll in allen 25 Kombinationen aus Dauer und Schwerpunkt:
// Raster der Gesamteinschätzung = Drehbuchfeld "protokollKriterien" (sonst das allgemeine
// Raster), richtige Maximalpunktzahl, keine Namen/Adressen. Startet den Server selbst (Port 4183).
// Aufruf: node tools/tests/protokoll.js scenario.<name>.json <ergebnis.json>
const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const ROOT = path.join(__dirname, '..', '..'); const FILE = process.argv[2]; const OUT = process.argv[3] || '/dev/null';
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', FILE), 'utf8'));
const B = 'http://127.0.0.1:4183'; const sleep = ms => new Promise(r => setTimeout(r, ms));
const post = (p, b) => fetch(B + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b || {}) }).then(r => r.status);
const STANDARD = ['Aktivierung / Lagebild', 'Entscheidung / Verantwortung', 'Kommunikation', 'IT-/OT-Sicherheit', 'Geschäftsfortführung', 'Qualität / Datenintegrität', 'Fachliche Prüfpflichten', 'Wiederanlauf / Nachsorge'];
const soll = s.protokollKriterien || STANDARD;
const sicher = {}; ['settings.json', 'run-state.json'].forEach(f => { const p = path.join(ROOT, 'data', f); sicher[f] = fs.existsSync(p) ? fs.readFileSync(p) : null; });
(async () => {
  const srv = spawn(process.execPath, ['server/index.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: '4183', HOST: '127.0.0.1' }), stdio: 'ignore' });
  for (let i = 0; i < 60; i++) { try { await fetch(B + '/api/scenario-meta'); break; } catch (e) { await sleep(250); } }
  const ergebnisse = [];
  try {
    await post('/api/scenarios/select', { file: FILE });
    const e = require(path.join(ROOT, 'server', 'runEngine'));
    for (const m of [45, 60, 90, 120, 180]) for (const sp of [null, ...(s.schwerpunkte || []).map(x => x.key)]) {
      await post('/api/run/reset');
      const rec = e.recommendRoles(s, { targetMinutes: m });
      await post('/api/participants', rec.roleIds.map((r, i) => ({ name: 'Person ' + (i + 1), email: `person${i + 1}@example.com`, roleIds: [r] })));
      await post('/api/run/start', { durationMode: 'target', targetMinutes: m, schwerpunkt: sp });
      const t = await fetch(B + '/api/run/protokoll').then(r => r.text());
      const fehlend = soll.filter(k => !t.includes(`| ${k} | | |`));
      const fremd = s.protokollKriterien ? STANDARD.filter(k => t.includes(`| ${k} | | |`)) : [];
      const max = t.includes(`max. ${soll.length * 2},`);
      const namen = /person\d+@example\.com|Person \d+/.test(t);
      const ok = !fehlend.length && !fremd.length && max && !namen;
      ergebnisse.push({ id: 'PR', name: `Protokoll ${m} Min. / ${sp || 'Ausgewogen'}`, ok, erwartet: `${soll.length} Kriterien des Drehbuchs, max. ${soll.length * 2} Punkte, keine Namen`, beobachtet: ok ? `${soll.length} Kriterien, max. ${soll.length * 2}, keine Namen` : `fehlend: ${fehlend.length}, fremd: ${fremd.join(', ') || '–'}, Maximum ${max ? 'ok' : 'falsch'}, Namen ${namen ? 'enthalten' : 'nein'}` });
    }
    await post('/api/run/reset');
  } finally {
    srv.kill(); await sleep(500);
    ['settings.json', 'run-state.json'].forEach(f => { const p = path.join(ROOT, 'data', f); if (sicher[f]) fs.writeFileSync(p, sicher[f]); else if (fs.existsSync(p)) fs.unlinkSync(p); });
    fs.writeFileSync(OUT, JSON.stringify({ szenario: FILE, zeitpunkt: new Date().toISOString(), kriterien: soll, ergebnisse }, null, 2));
    const f = ergebnisse.filter(x => !x.ok).length;
    console.log(`${FILE}: Protokoll in ${ergebnisse.length - f} von ${ergebnisse.length} Kombinationen korrekt (${soll.length} Kriterien)`);
    process.exitCode = f ? 1 : 0;
  }
})();
