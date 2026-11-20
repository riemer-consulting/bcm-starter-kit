// Browsertest zum Handbuchabschnitt „SK36 – von Hand in langen Formaten“ (Entscheidung der
// Spielleitung zu O-11): Waterkant 120 Min., Schwerpunkt Krisenführung, empfohlene Besetzung.
// Soll (vor der Ausführung festgelegt):
//  1. SK36 ist nicht automatisch eingeplant.
//  2. Vor LK26 erscheint SK36 nicht als „passt jetzt“; nach dem Zeitsprung zu LK26 steht SK36 unter
//     „Nicht eingeplante Karten“ mit „passt jetzt“.
//  3. „Jetzt einsetzen“ (Klick in der Oberfläche) verschickt SK36 genau einmal an die Gebäudetechnik
//     (bzw. die erste besetzte Ersatzrolle); Journal „vertrauliche karte SK36 zugestellt“.
//  4. Der Text von SK36 erscheint nicht auf der Bühne.
// Setup über die Schnittstelle (nicht Gegenstand dieses Tests), Bedienung von SK36 über die Oberfläche.
// Aufruf: node tools/qa/sk36-manuell.js <ausgabeordner> [port] [smtpPort]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { umgebung, sleep, ROOT } = require('./umgebung');
const engine = require(path.join(ROOT, 'server', 'runEngine.js'));
const [OUT, PORT = 4280, SMTPP = 2680] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
const pruef = []; const check = (id, name, ok, beobachtet) => pruef.push({ id, name, ok: !!ok, beobachtet });
(async () => {
  const u = await umgebung({ port: Number(PORT), smtpPort: Number(SMTPP), name: 'sk36', logDir: OUT, countdown: 0 });
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  try {
    const s = JSON.parse(fs.readFileSync(path.join(u.dataDir, 'scenario.waterkant.json'), 'utf8'));
    const rollen = engine.recommendRoles(s, { targetMinutes: 120 }).roleIds;
    await u.post('/api/scenarios/select', { file: 'scenario.waterkant.json' }); await u.post('/api/run/reset');
    await u.post('/api/participants', rollen.map((r, i) => ({ name: `Person ${i + 1}`, email: `person${i + 1}@example.com`, roleIds: [r] })));
    await u.post('/api/run/start', { durationMode: 'target', targetMinutes: 120, schwerpunkt: 'fuehrung' }); await u.post('/api/run/begin-crisis'); await sleep(1500);
    const ms0 = await u.get('/api/run/moderator-state');
    check('K1', 'SK36 nicht automatisch eingeplant', !ms0.fullTimeline.some(e => e.id === 'SK36'), ms0.fullTimeline.some(e => e.id === 'SK36') ? 'eingeplant' : 'nicht im Plan');
    check('K2', 'LK26 ist in diesem Format im Plan', ms0.fullTimeline.some(e => e.id === 'LK26'), ms0.fullTimeline.filter(e => e.type === 'lagekarte').map(e => e.id).join(' '));
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } }); await p.goto(u.B + '/moderator.html'); await sleep(2500);
    // genau die Zeile von SK36: Elternelement der Schaltfläche (Textblock + Schaltfläche), nicht die ganze Liste
    const zeile = async () => p.evaluate(() => { const b = document.querySelector('#m-skipped .promote-event[data-id="SK36"]'); if (!b) return null; const z = b.parentElement; return z.querySelectorAll('.promote-event').length === 1 ? z.innerText : 'MEHRDEUTIG'; });
    const vorher = await zeile();
    check('K3', 'vor LK26 nicht als „passt jetzt“ angeboten', !vorher || !/passt jetzt/.test(vorher), vorher ? vorher.slice(0, 80) : 'nicht sichtbar');
    await u.post('/api/run/jump-to-event/lagekarte/LK26'); await sleep(3000);
    const jetzt = await zeile();
    check('K4', 'zu Beginn von LK26 unter „Nicht eingeplante Karten“ mit „passt jetzt“', jetzt && /passt jetzt/.test(jetzt), jetzt ? jetzt.replace(/\s+/g, ' ').slice(0, 120) : 'nicht sichtbar');
    await p.screenshot({ path: path.join(OUT, 'sk36-moderation-lk26.jpg'), type: 'jpeg', quality: 75 });
    const vorMails = u.mails().length;
    const knopf = p.locator('#m-skipped .promote-event[data-id="SK36"]');
    if (await knopf.count()) { await knopf.scrollIntoViewIfNeeded(); await knopf.click(); }
    await sleep(5000);
    const j = (await u.text('/api/run/journal?sitzung=' + encodeURIComponent((await u.get('/api/run/moderator-state')).sitzungId))).split('\n').filter(Boolean).map(z => JSON.parse(z));
    const z = j.filter(x => x.typ === 'vertrauliche karte' && x.karte === 'SK36');
    const k = s.sonderlagekarten.find(x => x.id === 'SK36'); const soll = [k.empfaenger, ...(k.fallbackEmpfaenger || [])].find(r => rollen.includes(r));
    check('K5', '„Jetzt einsetzen“ stellt SK36 genau einmal an die richtige Rolle zu', z.length === 1 && z[0].ergebnis === 'zugestellt' && z[0].details.empfaengerRolle === soll, z.map(x => `${x.details.empfaengerRolle}: ${x.ergebnis}`).join('; ') || 'nicht zugestellt');
    const neu = u.mails().slice(vorMails).filter(m => /Lageinformation SK36$/.test(m.subject));
    check('K6', 'genau eine Mail an die Person der Rolle', neu.length === 1, neu.map(m => m.to.join(',')).join('; ') || '0 Mails');
    const b = await browser.newPage(); await b.goto(u.B + '/stage.html'); await sleep(2000);
    const buehne = await b.evaluate(() => document.body.innerText);
    check('K7', 'SK36-Text nicht auf der Bühne', !buehne.includes(k.text.slice(0, 50)), 'geprüft');
  } catch (e) { check('X', 'Testablauf ohne Abbruch', false, e.message); }
  finally {
    await browser.close().catch(() => {}); await u.ende();
    fs.writeFileSync(path.join(OUT, 'sk36.json'), JSON.stringify({ zeitpunkt: new Date().toISOString(), pruefungen: pruef }, null, 2));
    pruef.forEach(x => console.log(`${x.ok ? 'BESTANDEN' : 'FEHLER   '} ${x.id} ${x.name} – ${x.beobachtet}`));
    console.log(`SK36 von Hand: ${pruef.filter(x => x.ok).length}/${pruef.length} bestanden`);
    process.exitCode = pruef.every(x => x.ok) ? 0 : 1;
  }
})();
