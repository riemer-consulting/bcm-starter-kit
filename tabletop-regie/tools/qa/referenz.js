// Prüft den laufenden Server gegen die von Hand nachgerechneten Referenzfälle in
// docs/final-qa/referenz-sollwerte.json (Rechnung, Empfänger mit Ersatzrollen, Bewertungsraster).
// Aufruf: node tools/qa/referenz.js <ausgabe.json> [port] [smtpPort]
const fs = require('fs');
const path = require('path');
const { umgebung, sleep, ROOT } = require('./umgebung');
const [OUT, PORT = 4260, SMTPP = 2660] = process.argv.slice(2);
const ref = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'final-qa', 'referenz-sollwerte.json'), 'utf8'));
const engine = require(path.join(ROOT, 'server', 'runEngine.js'));
(async () => {
  const u = await umgebung({ port: Number(PORT), smtpPort: Number(SMTPP), name: 'referenz', countdown: 0 });
  const erg = [];
  const starte = async (datei, rollen, minuten = 90) => {
    await u.post('/api/scenarios/select', { file: datei }); await u.post('/api/run/reset');
    await u.post('/api/participants', rollen.map((r, i) => ({ name: `Referenz ${i + 1}`, email: `referenz${i + 1}@example.com`, roleIds: [r] })));
    await u.post('/api/run/start', { durationMode: 'target', targetMinutes: minuten }); await u.post('/api/run/begin-crisis'); await sleep(1500);
  };
  try {
    for (const r of ref.rechnungen) {
      const s = JSON.parse(fs.readFileSync(path.join(u.dataDir, r.szenario), 'utf8'));
      await starte(r.szenario, engine.recommendRoles(s, { targetMinutes: 90 }).roleIds);
      for (const [w, o] of Object.entries(r.entscheidungen)) await u.post('/api/run/weiche', { id: w, option: o });
      const b = (await u.get('/api/run/moderator-state')).finale.rechnung;
      const ok = b.summe === r.brutto && b.versicherung === r.erstattung && b.eigenanteil === r.beimUnternehmen;
      erg.push({ id: r.id, art: 'Rechnung', ok, soll: `${r.brutto} / ${r.erstattung} / ${r.beimUnternehmen}`, ist: `${b.summe} / ${b.versicherung} / ${b.eigenanteil}`, rechenweg: r.rechenweg });
    }
    for (const r of ref.empfaenger) {
      await starte(r.szenario, r.besetzt);
      await u.post('/api/run/fire-sonderkarte/' + r.karte); await sleep(500);
      const f = (await u.get('/api/run/moderator-state')).firedSonderlagekarten.find(x => x.id === r.karte) || {};
      const ist = f.recipientRoleId || null;
      erg.push({ id: r.id, art: 'Empfänger', ok: ist === r.soll, soll: String(r.soll), ist: String(ist), begruendung: r.begruendung });
    }
    for (const r of ref.bewertungsraster) {
      const s = JSON.parse(fs.readFileSync(path.join(u.dataDir, r.szenario), 'utf8'));
      await starte(r.szenario, engine.recommendRoles(s, { targetMinutes: 90 }).roleIds);
      const k = (await u.get('/api/run/moderator-state')).einschaetzung.kriterien;
      const themen = (r.pflichtThemen || []).filter(t => !k.some(x => x.includes(t)));
      erg.push({ id: r.id, art: 'Bewertungsraster', ok: k.length === r.anzahl && !themen.length, soll: `${r.anzahl} Kriterien${r.pflichtThemen ? ', Themen: ' + r.pflichtThemen.join(', ') : ''}`, ist: `${k.length} Kriterien${themen.length ? ', fehlend: ' + themen.join(', ') : ''}` });
    }
  } catch (e) { erg.push({ id: 'ABBRUCH', ok: false, ist: e.message }); }
  finally {
    await u.ende();
    fs.writeFileSync(OUT, JSON.stringify({ zeitpunkt: new Date().toISOString(), faelle: erg, bestanden: erg.filter(x => x.ok).length, gesamt: erg.length }, null, 2));
    erg.forEach(x => console.log(`${x.ok ? 'BESTANDEN' : 'FEHLER   '} ${x.id} ${x.art}: soll ${x.soll} – ist ${x.ist}`));
    process.exitCode = erg.every(x => x.ok) ? 0 : 1;
  }
})();
