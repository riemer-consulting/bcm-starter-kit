// Integrierter Variantentest über den echten Server (keine Browserbedienung):
// A) alle Entscheidungskombinationen (16 bzw. 32) bei 90 Min. „Ausgewogen“
// B) alle 25 Kombinationen aus Dauer und Schwerpunkt mit je einer Entscheidungsfolge
// Je Lauf: Lagen per Zeitsprung durchspielen, an der Entscheidungslage entscheiden, bis
// zum Ende springen, Abschluss bis zur Bilanz. Beobachtet über Journal, Bühnendaten,
// SMTP-Testempfänger und Abschluss; verglichen mit dem Orakel (tools/qa/orakel.js).
// Beschleunigung: Countdown 0 s (TABLETOP_COUNTDOWN_SEKUNDEN=0) – Timer und Countdown
// werden gesondert mit Standardwerten geprüft.
// Aufruf: node tools/qa/integration.js scenario.<name>.json <ausgabe.json> [port] [smtpPort]
const fs = require('fs');
const path = require('path');
const { umgebung, personen, sleep, ROOT } = require('./umgebung');
const O = require('./orakel');
const [FILE, OUT, PORT = 4200, SMTPP = 2600] = process.argv.slice(2);
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', FILE), 'utf8'));
const e = require(path.join(ROOT, 'server', 'runEngine')); // nur für die Besetzung (Eingabe), nicht als Sollwert
const W = s.weichen || [];
const alleWahlen = Array.from({ length: 2 ** W.length }, (_, m) => Object.fromEntries(W.map((w, i) => [w.id, w.optionen[(m >> (W.length - 1 - i)) & 1].id])));
const SP = [null, ...(s.schwerpunkte || []).map(x => x.key)];

async function einLauf(u, { minuten, sp, wahl }) {
  const vorMails = u.smtp.mails.length;
  await u.post('/api/run/reset');
  const rollen = e.recommendRoles(s, { targetMinutes: minuten }).roleIds;
  await u.post('/api/participants', personen(rollen));
  await u.post('/api/run/start', { durationMode: 'target', targetMinutes: minuten, schwerpunkt: sp });
  await u.post('/api/run/begin-crisis');
  let ms; for (let i = 0; i < 40; i++) { ms = await u.get('/api/run/moderator-state'); if (ms.status === 'running') break; await sleep(150); }
  const ablauf = ms.fullTimeline.map(x => ({ typ: x.type === 'lagekarte' ? 'LK' : 'SK', id: x.id }));
  const lks = ablauf.filter(x => x.typ === 'LK').map(x => x.id);
  const buehne = {};
  for (const lk of lks) {
    await u.post('/api/run/jump-to-event/lagekarte/' + lk);
    const st = await u.get('/api/run/stage-state');
    buehne[lk] = { gezeigt: st.currentLagekarte && st.currentLagekarte.id, text: (st.currentLagekarte || {}).text || '', kriseninfo: (st.currentLagekarte || {}).kriseninfo || '' };
    for (const w of W) if (w.lagekarten.find(id => lks.includes(id)) === lk) await u.post('/api/run/weiche', { id: w.id, option: wahl[w.id] });
  }
  const msEnde = await u.get('/api/run/moderator-state');
  await u.post('/api/run/jump-to-minute', { minute: Math.max(0, msEnde.totalPlannedMinutes - 0.05) });
  await sleep(300);
  const msVorAbschluss = await u.get('/api/run/moderator-state');
  await u.post('/api/run/finale/start');
  let fv; for (let i = 0; i < 80; i++) { fv = (await u.get('/api/run/stage-state')).finale; if (fv && fv.phase === 'bilanz') break; await u.post('/api/run/finale/next'); }
  const journal = (await u.text('/api/run/journal?sitzung=' + encodeURIComponent(ms.sitzungId))).split('\n').filter(Boolean).map(z => JSON.parse(z));
  const mails = u.mails().slice(vorMails);
  return { rollen, ablauf, lks, buehne, journal, mails, bonus: msVorAbschluss.bonuskarten, fv, sitzung: ms.sitzungId, plan: { total: msEnde.totalPlannedMinutes } };
}

function pruefe(r, { minuten, sp, wahl }) {
  const besetzt = new Set(r.rollen);
  const befunde = [];
  // Plan-Regeln (Orakel)
  O.planRegeln(s, r.ablauf, { minuten, besetzt, schwerpunkt: sp }).forEach(v => befunde.push('Plan: ' + v));
  // gezeigte Lagen = Plan (Journal)
  const gezeigt = r.journal.filter(j => j.typ === 'lage gezeigt').map(j => j.karte);
  if (JSON.stringify(gezeigt) !== JSON.stringify(r.lks)) befunde.push(`Gezeigt ${gezeigt.join(' ')} ≠ Plan ${r.lks.join(' ')}`);
  // Zustellungen: Empfängerrolle laut Orakel, genau eine Mail je Person der Rolle, nie vor ihrer Lage
  const zustellungen = r.journal.filter(j => j.typ === 'vertrauliche karte');
  zustellungen.forEach(z => {
    const k = s.sonderlagekarten.find(x => x.id === z.karte);
    const soll = O.empfaenger(k, besetzt);
    if (z.details.empfaengerRolle !== soll) befunde.push(`${z.karte}: Rolle ${z.details.empfaengerRolle} statt ${soll}`);
    const mails = r.mails.filter(m => m.subject.endsWith('Lageinformation ' + z.karte));
    if (mails.length !== 1) befunde.push(`${z.karte}: ${mails.length} Mails statt 1`);
    const idx = r.journal.indexOf(z);
    const davor = r.journal.slice(0, idx).filter(j => j.typ === 'lage gezeigt').map(j => j.karte);
    if (k.zuBeginnVon && !davor.includes(k.zuBeginnVon)) befunde.push(`${z.karte} vor ${k.zuBeginnVon} zugestellt`);
    (k.voraussetzung || []).forEach(v => { if (!davor.includes(v)) befunde.push(`${z.karte} vor ${v} zugestellt`); });
  });
  // eingeplante vertrauliche Karten sind alle zugestellt (am Ende)
  r.ablauf.filter(x => x.typ === 'SK').forEach(x => { if (!zustellungen.some(z => z.karte === x.id)) befunde.push(`${x.id} eingeplant, nicht zugestellt`); });
  // Wirkungen der Entscheidungen
  const wk = O.wirkungen(s, wahl, r.lks);
  Object.entries(wk.zusaetze).forEach(([lk, texte]) => texte.forEach(t => { if (!r.buehne[lk].text.includes(t)) befunde.push(`Zusatz fehlt auf ${lk}`); }));
  Object.entries(wk.kriseninfo).forEach(([lk, t]) => { if (r.buehne[lk].kriseninfo !== t) befunde.push(`Krisen-Info ${lk} nicht ersetzt`); });
  // keine Zusätze nicht gewählter Optionen
  W.forEach(w => w.optionen.filter(o => o.id !== wahl[w.id]).forEach(o => (o.folgen || []).filter(f => f.lagekarte && f.zusatz && r.lks.includes(f.lagekarte)).forEach(f => { if (r.buehne[f.lagekarte].text.includes(f.zusatz)) befunde.push(`Zusatz der nicht gewählten Option ${w.id}/${o.id} auf ${f.lagekarte}`); })));
  wk.folgekarten.forEach(f => { const da = zustellungen.some(z => z.karte === f.id); if (da !== f.erwartet) befunde.push(`Folgekarte ${f.id}: ${da ? 'zugestellt' : 'fehlt'}, erwartet ${f.erwartet ? 'zugestellt' : 'nicht'}`); });
  // Folgekarten nicht gewählter Optionen nie
  W.forEach(w => w.optionen.filter(o => o.id !== wahl[w.id] && o.karte).forEach(o => { const andere = W.some(w2 => w2.optionen.some(o2 => o2.id === wahl[w2.id] && o2.karte && o2.karte.sonderlagekarte === o.karte.sonderlagekarte)); if (!andere && zustellungen.some(z => z.karte === o.karte.sonderlagekarte) && s.sonderlagekarten.find(k => k.id === o.karte.sonderlagekarte).nurNachWeiche) befunde.push(`Folgekarte ${o.karte.sonderlagekarte} trotz anderer Entscheidung`); }));
  Object.entries(wk.ersetzteTexte).forEach(([id, t]) => { const m = r.mails.find(x => x.subject.endsWith('Lageinformation ' + id)); if (m && !m.text.replace(/\s+/g, ' ').includes(t.slice(0, 60))) befunde.push(`${id}: ersetzter Text nicht in der Mail`); });
  // Überraschungen: Einsetzbarkeit laut Orakel = Anzeige in der Moderation
  s.bonuskarten.forEach(b => { const soll = O.bonusEinsetzbar(b, r.lks, minuten, besetzt); const ist = (r.bonus.find(x => x.id === b.id) || {}); const istFrei = !(ist.wartetAuf || []).length; if (soll !== istFrei) befunde.push(`${b.id}: einsetzbar laut Orakel ${soll}, Moderation ${istFrei}`); });
  // Rechnung (unabhängig summiert)
  const rg = O.rechnung(s, wahl);
  if (!r.fv || !r.fv.bilanz) befunde.push('Bilanz nicht erreicht');
  else if (r.fv.bilanz.summe !== rg.brutto || r.fv.bilanz.versicherung !== rg.erstattung || r.fv.bilanz.eigenanteil !== rg.beimUnternehmen) befunde.push(`Rechnung ${r.fv.bilanz.summe}/${r.fv.bilanz.versicherung}/${r.fv.bilanz.eigenanteil} statt ${rg.brutto}/${rg.erstattung}/${rg.beimUnternehmen}`);
  // Dauer
  if (r.plan.total > minuten) befunde.push(`Krisenzeit ${r.plan.total} > ${minuten}`);
  return { befunde, soll: { rechnung: rg, folgekarten: wk.folgekarten }, ist: { lagen: r.lks, zustellungen: zustellungen.map(z => `${z.karte}→${z.details.empfaengerRolle}`), bilanz: r.fv && r.fv.bilanz } };
}

(async () => {
  const u = await umgebung({ port: Number(PORT), smtpPort: Number(SMTPP), name: 'integration-' + FILE.replace(/\W/g, ''), countdown: 0, logDir: path.dirname(path.resolve(OUT)) });
  const ergebnisse = []; const selbsttest = {};
  try {
    await u.post('/api/scenarios/select', { file: FILE });
    const faelle = [
      ...alleWahlen.map((wahl, i) => ({ id: `E${String(i + 1).padStart(2, '0')}`, gruppe: 'Entscheidungskombination', minuten: 90, sp: null, wahl })),
      ...[45, 60, 90, 120, 180].flatMap((m, mi) => SP.map((sp, si) => ({ id: `D${m}-${sp || 'ausgewogen'}`, gruppe: 'Dauer × Schwerpunkt', minuten: m, sp, wahl: alleWahlen[(mi * SP.length + si) % alleWahlen.length] })))
    ];
    for (const f of faelle) {
      const r = await einLauf(u, f);
      const p = pruefe(r, f);
      // Selbsttest des Orakels (Mutationsprobe) beim ersten Lauf jeder Gruppe: Prüfung gegen
      // absichtlich falsche Erwartungen muss Befunde liefern, sonst ist die Prüfung blind.
      if (!selbsttest[f.gruppe]) {
        const umgedreht = Object.fromEntries(W.map(w => [w.id, w.optionen.find(o => o.id !== f.wahl[w.id]).id]));
        const m1 = pruefe(r, Object.assign({}, f, { wahl: umgedreht })).befunde;
        const mutiert = Object.assign({}, r, { journal: r.journal.map(j => j.typ === 'vertrauliche karte' ? Object.assign({}, j, { details: Object.assign({}, j.details, { empfaengerRolle: 'falsche-rolle' }) }) : j) });
        const m2 = pruefe(mutiert, f).befunde;
        const m3 = pruefe(Object.assign({}, r, { lks: r.lks.slice().reverse(), ablauf: r.ablauf.slice().reverse() }), f).befunde;
        selbsttest[f.gruppe] = { lauf: f.id, umgedrehteEntscheidungen: m1.length, falscheEmpfaenger: m2.length, vertauschteReihenfolge: m3.length, erkannt: m1.length > 0 && m2.length > 0 && m3.length > 0, beispiele: [m1[0], m2[0], m3[0]] };
      }
      ergebnisse.push({ id: f.id, gruppe: f.gruppe, minuten: f.minuten, schwerpunkt: f.sp || 'ausgewogen', entscheidungen: f.wahl, sitzung: r.sitzung, ok: !p.befunde.length, befunde: p.befunde, soll: p.soll, ist: p.ist, lagen: r.lks.length, zustellungen: p.ist.zustellungen.length, mails: r.mails.length });
      process.stdout.write(p.befunde.length ? 'F' : '.');
    }
  } catch (err) { ergebnisse.push({ id: 'X', ok: false, befunde: ['Abbruch: ' + err.message] }); }
  finally {
    await u.ende();
    const f = ergebnisse.filter(x => !x.ok).length + (Object.values(selbsttest).every(t => t.erkannt) ? 0 : 1);
    fs.writeFileSync(OUT, JSON.stringify({ szenario: FILE, szenarioId: s.id, zeitpunkt: new Date().toISOString(), beschleunigung: 'Countdown 0 s; Lagen per Zeitsprung', orakel: 'tools/qa/orakel.js (eigene Logik aus der Drehbuch-Spezifikation)', orakelSelbsttest: selbsttest, laeufe: ergebnisse.length, fehlgeschlagen: f, ergebnisse }, null, 1));
    console.log(`\n${FILE}: ${ergebnisse.length - f} von ${ergebnisse.length} Läufen ohne Befund`);
    process.exitCode = f ? 1 : 0;
  }
})();
