// Replay: spielt eine aufgezeichnete Übung aus ihrem Ereignisjournal erneut ab und
// vergleicht den Verlauf.
// Aufruf: node tools/qa/replay.js <journal.jsonl> <ergebnis.json> [port] [smtpPort]
// - Besetzung: gleiche Rollen und gleiche Zahl Personen je Rolle (pseudonyme Testadressen)
// - gleicher Modus, gleiche Zieldauer, gleicher Schwerpunkt, gleiche Schwierigkeit
// - jede Bedienaktion zur gleichen Übungsminute (Zeit wird per Zeitsprung erreicht)
// Verglichen werden: Reihenfolge der gezeigten Lagen, vertrauliche Zustellungen (Karte,
// Empfängerrolle, Ergebnis), festgehaltene Entscheidungen, ausgelöste Überraschungen.
// Grenzen: Wartezeiten der echten Übung werden nicht nachgebildet (der Zeitsprung löst
// fällige Ereignisse gesammelt aus); Mailfehler der echten Übung entstehen nur, wenn der
// SMTP-Empfänger im Replay ebenfalls gestört wird.
const fs = require('fs');
const path = require('path');
const { umgebung, sleep } = require('./umgebung');
const [jPfad, OUT, PORT = 4195, SMTP = 2595] = process.argv.slice(2);
const lies = p => fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map(z => JSON.parse(z));
const original = lies(jPfad);
const plan = original.find(e => e.typ === 'plan');
if (!plan) { console.error('Journal enthält keinen Plan (Start der Übung fehlt).'); process.exit(2); }
const kern = j => ({
  lagen: j.filter(e => e.typ === 'lage gezeigt').map(e => e.karte),
  zustellungen: j.filter(e => e.typ === 'vertrauliche karte').map(e => `${e.karte}→${e.details.empfaengerRolle || '–'}:${e.ergebnis}`),
  entscheidungen: j.filter(e => e.typ === 'aktion POST /api/run/weiche' && e.ergebnis === 'ok').map(e => `${e.details.id}=${e.details.option}`),
  ueberraschungen: j.filter(e => /fire-bonuskarte/.test(e.typ)).map(e => `${e.karte}:${e.ergebnis}`)
});
(async () => {
  const u = await umgebung({ port: Number(PORT), smtpPort: Number(SMTP), name: 'replay' });
  const bericht = { quelle: path.basename(jPfad), sitzungOriginal: plan.sitzung, szenario: plan.szenario, szenarioDatei: plan.details.szenarioDatei, zeitpunkt: new Date().toISOString() };
  try {
    const sha = require('crypto').createHash('sha256').update(fs.readFileSync(path.join(u.dataDir, plan.details.szenarioDatei))).digest('hex');
    bericht.gleichesDrehbuch = sha === plan.details.szenarioSha256;
    await u.post('/api/scenarios/select', { file: plan.details.szenarioDatei });
    await u.post('/api/run/reset');
    const jeRolle = plan.details.personenJeRolle || {};
    const leute = plan.details.besetzteRollen.flatMap((r, i) => Array.from({ length: jeRolle[r] || 1 }, (_, k) => ({ name: `Replay ${i + 1}-${k + 1}`, email: `replay${i + 1}-${k + 1}@example.com`, roleIds: [r] })));
    await u.post('/api/participants', leute);
    await u.post('/api/run/start', { durationMode: plan.details.modus, targetMinutes: plan.details.zieldauer, schwerpunkt: plan.details.schwerpunkt, difficulty: plan.details.schwierigkeit });
    // Bedienaktionen nach dem Start in Originalreihenfolge
    const startSeq = original.find(e => e.typ === 'aktion POST /api/run/start').seq;
    const aktionen = original.filter(e => e.seq > startSeq && e.typ.startsWith('aktion POST /api/run/') && !/\/api\/run\/(start|reset)$/.test(e.typ));
    const wiederholt = [];
    for (const a of aktionen) {
      const pfad = a.typ.replace('aktion POST ', '');
      if (pfad === '/api/run/begin-crisis') { await u.post(pfad); await sleep(31000); wiederholt.push(pfad); continue; }
      const jetzt = (await u.get('/api/run/moderator-state')).elapsedMinutes;
      if (typeof a.uebungsminute === 'number' && a.uebungsminute > jetzt + 0.05 && !/jump-to/.test(pfad)) await u.post('/api/run/jump-to-minute', { minute: a.uebungsminute });
      const body = Object.assign({}, a.details);
      if (pfad === '/api/run/weiche' || pfad === '/api/run/ton' || pfad === '/api/run/jump-to-minute' || pfad === '/api/run/einschaetzung' || pfad === '/api/run/finale/option') await u.post(pfad, body); else await u.post(pfad);
      wiederholt.push(pfad + (body.id ? ' ' + body.id : ''));
      await sleep(400);
    }
    await sleep(3500);
    const ms = await u.get('/api/run/moderator-state');
    const replayJournal = (await u.text('/api/run/journal?sitzung=' + encodeURIComponent(ms.sitzungId || ''))).split('\n').filter(Boolean).map(z => JSON.parse(z));
    const a = kern(original), b = kern(replayJournal.length ? replayJournal : []);
    bericht.aktionenWiederholt = wiederholt.length;
    bericht.vergleich = Object.fromEntries(Object.keys(a).map(k => [k, { original: a[k], replay: b[k], gleich: JSON.stringify(a[k]) === JSON.stringify(b[k]) }]));
    bericht.identisch = Object.values(bericht.vergleich).every(v => v.gleich);
  } catch (e) { bericht.fehler = e.message; bericht.identisch = false; }
  finally {
    await u.ende();
    fs.writeFileSync(OUT, JSON.stringify(bericht, null, 2));
    console.log(`Replay ${bericht.quelle}: ${bericht.identisch ? 'identischer Verlauf' : 'ABWEICHUNG'}${bericht.fehler ? ' – ' + bericht.fehler : ''}`);
    process.exitCode = bericht.identisch ? 0 : 1;
  }
})();
