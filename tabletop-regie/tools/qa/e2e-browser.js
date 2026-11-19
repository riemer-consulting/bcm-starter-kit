// Ende-zu-Ende-Durchlauf im echten Browser (Chromium über Playwright), bedient über die
// Oberfläche wie durch eine Moderatorin bzw. einen Moderator:
// Setup (Szenario, SMTP, Testmail, Rollenvorschlag, Import, Teams, Zieldauer, Schwerpunkt,
// „Übung vorbereiten“) → Moderation → „Bühne öffnen“ → Ton aktivieren → Krise starten →
// Lage für Lage („Zeitsprung hierhin“), Entscheidungen, Überraschungen, Pause →
// Abschluss, Gesamteinschätzung (mit Neuladen), Protokoll- und Journal-Download.
// Die API wird nur LESEND genutzt, um den Zustand zu dokumentieren; alle Aktionen laufen
// über Schaltflächen. Kein Teilnehmergespräch wird simuliert: Gesprächsleitfäden werden
// nur als „angezeigt“ protokolliert.
// Aufruf: node tools/qa/e2e-browser.js <fall-id> <ausgabeordner> [port] [smtpPort]
// Fälle: tools/qa/e2e-faelle.json
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { umgebung, sleep, ROOT } = require('./umgebung');
const O = require('./orakel');
const [FALL, OUTDIR, PORT = 4210, SMTPP = 2610] = process.argv.slice(2);
const fall = require('./e2e-faelle.json').faelle.find(f => f.id === FALL);
if (!fall) { console.error('Unbekannter Fall ' + FALL); process.exit(2); }
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', fall.szenario), 'utf8'));
const OUT = path.join(OUTDIR, FALL); fs.mkdirSync(path.join(OUT, 'bilder'), { recursive: true });
const pruef = []; const check = (id, name, ok, erwartet, beobachtet) => pruef.push({ id, name, ok: !!ok, erwartet, beobachtet });
const lk = id => s.lagekarten.find(l => l.id === id);

(async () => {
  const u = await umgebung({ port: Number(PORT), smtpPort: Number(SMTPP), name: 'e2e-' + FALL, logDir: OUT });
  const browser = await chromium.launch(Object.assign({ args: ['--autoplay-policy=no-user-gesture-required'] }, process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}));
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  await ctx.tracing.start({ screenshots: false, snapshots: true, sources: false });
  const dialoge = []; const seitenfehler = [];
  const beobachte = p => { p.on('dialog', d => { dialoge.push(d.message().slice(0, 200)); d.accept(); }); p.on('pageerror', e => seitenfehler.push(e.message)); };
  const lagen = []; let bericht = {}; let quittiert = 0; let ersatzklicks = 0;
  // Klick über die Oberfläche: erst mit allen Prüfungen; wird das Element bei der laufenden
  // Aktualisierung ersetzt, echter Mausklick auf die aktuelle Position ohne Ruhe-Prüfung.
  // Vor jeder Bedienung die Seite in den Vordergrund holen: In einem Hintergrundfenster drosselt
  // Chromium die Bildwiederholung, die Ruhe-Prüfung des Klicks käme dann nicht zum Abschluss
  // (so bedient auch ein Mensch das Fenster, das er gerade ansieht).
  const klick = async loc => { await loc.page().bringToFront(); try { await loc.first().click({ timeout: 4000 }); } catch (e) { ersatzklicks++; for (let i = 0; i < 5; i++) { try { await loc.first().scrollIntoViewIfNeeded({ timeout: 2000 }); await loc.first().click({ force: true, timeout: 2000 }); return; } catch (e2) { await sleep(300); } } throw e; } };
  // Hinweise „Soeben verschickt“ wie ein Mensch quittieren (sie liegen über den Schaltflächen)
  const quittiere = async p => { await p.bringToFront(); for (let i = 0; i < 10; i++) { const alle = p.locator('.sk-alert-all'); if (await alle.count()) { await alle.first().click().catch(() => {}); quittiert++; await sleep(200); continue; } const ok = p.locator('.sk-alert-ok'); if (!(await ok.count())) break; await ok.first().click().catch(() => {}); quittiert++; await sleep(200); } };
  const shot = async (p, name) => { const f = path.join('bilder', name + '.jpg'); await p.screenshot({ path: path.join(OUT, f), type: 'jpeg', quality: 70 }); return f; };
  try {
    // ---------- Setup ----------
    const setup = await ctx.newPage(); beobachte(setup);
    await setup.goto(u.B + '/setup.html'); await setup.waitForSelector('#scenario-select option', { state: 'attached' });
    if ((await setup.inputValue('#scenario-select')) !== fall.szenario) { await setup.selectOption('#scenario-select', fall.szenario); await setup.click('#btn-switch-scenario'); await sleep(1500); await setup.reload(); await setup.waitForSelector('#scenario-select option', { state: 'attached' }); }
    check('S1', 'Szenario über die Oberfläche gewählt', (await setup.inputValue('#scenario-select')) === fall.szenario, fall.szenario, await setup.inputValue('#scenario-select'));
    await setup.fill('#smtp-host', '127.0.0.1'); await setup.fill('#smtp-port', String(SMTPP)); await setup.fill('#smtp-from', 'regie@example.com'); await setup.fill('#smtp-pass', '');
    await setup.click('#btn-save-settings'); await sleep(600);
    await setup.fill('#test-email-to', 'qa-testpostfach@example.com'); await setup.click('#btn-test-email'); await sleep(1500);
    const testmail = u.mails().filter(m => m.to.includes('qa-testpostfach@example.com'));
    check('S2', 'Testmail über die Oberfläche', testmail.length === 1, 'genau eine Testmail an das lokale Testpostfach', `${testmail.length} Mail(s); Status „${(await setup.textContent('#settings-status')).trim().slice(0, 80)}“`);
    await setup.selectOption('#role-duration', String(fall.minuten));
    if (fall.besetzung === 'alle') { await setup.click('#btn-roles-all'); const tn = setup.locator('#role-checkboxes input[value="teilnehmer"]'); if (await tn.count() && await tn.isChecked()) await tn.uncheck(); }
    else await setup.click('#btn-suggest-roles');
    await sleep(800);
    const aktiveRollen = await setup.$$eval('#role-checkboxes input:checked', els => els.map(e => e.value).filter(v => v !== 'teilnehmer'));
    const anzahl = aktiveRollen.length + (fall.zusatzPersonen || 0);
    const csv = ['Vorname;Nachname;E-Mail', ...Array.from({ length: anzahl }, (_, i) => `Test;Person${i + 1};person${i + 1}@example.com`)].join('\n');
    await setup.click('#import-box summary'); await sleep(300);
    await setup.fill('#import-text', csv); await setup.click('#btn-import-participants'); await sleep(1000);
    check('S3', 'Teilnehmer-Import (CSV, Testadressen)', /übernommen/.test(await setup.textContent('#import-status')), `${anzahl} Personen übernommen`, (await setup.textContent('#import-status')).trim().slice(0, 120));
    await setup.click('#btn-distribute-teams'); await sleep(500); await setup.click('#btn-save-participants'); await sleep(1000);
    const gespeichert = await u.get('/api/participants');
    const besetzt = new Set(gespeichert.flatMap(p => p.roleIds || []).filter(r => r !== 'teilnehmer'));
    check('S4', 'Rollenzuordnung über „Auf Teams verteilen“', aktiveRollen.every(r => besetzt.has(r)) && gespeichert.length === anzahl, `${aktiveRollen.length} Rollen besetzt, ${anzahl} Personen`, `${besetzt.size} Rollen besetzt, ${gespeichert.length} Personen; Teams: ${gespeichert.length - besetzt.size}`);
    await setup.selectOption('#duration-mode', 'target'); await setup.selectOption('#target-preset', String(fall.minuten));
    await setup.selectOption('#schwerpunkt', fall.schwerpunkt || ''); await sleep(800);
    bericht.setupBild = await shot(setup, '00-setup');
    const [mod] = await Promise.all([ctx.waitForEvent('page'), setup.click('#btn-start')]); beobachte(mod);
    await setup.waitForFunction(() => /Übung vorbereitet/.test(document.getElementById('start-status').textContent), null, { timeout: 30000 });
    const w0 = u.mails().filter(m => /^Willkommen/.test(m.subject)).length, b0 = u.mails().filter(m => /^Deine Rolle/.test(m.subject)).length;
    check('S5', 'Begrüßung und Rollenbriefing beim Vorbereiten', w0 === anzahl && b0 === anzahl, `je ${anzahl}`, `Begrüßung ${w0}, Briefing ${b0}`);
    // ---------- Moderation und Bühne ----------
    await mod.waitForSelector('#btn-open-stage');
    const [buehne] = await Promise.all([ctx.waitForEvent('page'), klick(mod.locator('#btn-open-stage'))]); beobachte(buehne);
    await buehne.setViewportSize({ width: 1600, height: 900 });
    await buehne.waitForSelector('#btn-enable-sound'); await klick(buehne.locator('#btn-enable-sound')); await sleep(800);
    bericht.vorStart = await shot(buehne, '01-buehne-vor-start');
    await klick(mod.locator('#btn-begin-crisis')); await sleep(1500);
    const cd = (await u.get('/api/run/stage-state')).crisisCountdownSeconds;
    check('T1', 'Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s)', cd >= 25 && cd <= 30, '25–30 s Restzeit kurz nach dem Klick', `${cd} s`);
    for (let i = 0; i < 70; i++) { if ((await u.get('/api/run/moderator-state')).status === 'running') break; await sleep(500); }
    let ms = await u.get('/api/run/moderator-state');
    const sitzung = ms.sitzungId;
    const planLks = ms.fullTimeline.filter(x => x.type === 'lagekarte').map(x => x.id);
    const ablauf = ms.fullTimeline.map(x => ({ typ: x.type === 'lagekarte' ? 'LK' : 'SK', id: x.id }));
    O.planRegeln(s, ablauf, { minuten: fall.minuten, besetzt, schwerpunkt: fall.schwerpunkt }).forEach(v => check('P', 'Planregel (Orakel)', false, 'keine Verletzung', v));
    const journalBis = async () => (await u.text('/api/run/journal?sitzung=' + encodeURIComponent(sitzung))).split('\n').filter(Boolean).map(z => JSON.parse(z));
    let gesehenSeq = 0; let pausiert = false; const entschieden = {};
    const geheim = [...s.sonderlagekarten.flatMap(k => [k.text, k.moderatorGut, k.moderatorSchlecht]), ...s.bonuskarten.filter(b => !b.oeffentlich).map(b => b.text), ...(s.weichen || []).map(w => w.hinweis)].filter(t => t && t.length > 30);
    // ---------- Lage für Lage ----------
    for (let schritt = 0; schritt < 60; schritt++) {
      await sleep(1600);
      ms = await u.get('/api/run/moderator-state'); const st = await u.get('/api/run/stage-state');
      const aktuell = st.currentLagekarte && st.currentLagekarte.id;
      if (!aktuell) break;
      if (lagen.length && lagen[lagen.length - 1].lage === aktuell) { /* keine neue Lage */ }
      else {
        const j = await journalBis(); const neu = j.filter(e => e.seq > gesehenSeq); gesehenSeq = j.length ? j[j.length - 1].seq : gesehenSeq;
        const buehnenText = await buehne.evaluate(() => document.body.innerText);
        const modText = (await mod.textContent('#m-current-lk')) || '';
        const audio = await buehne.evaluate(() => { const x = document.getElementById('event-audio'); const a = document.getElementById('ambient-audio'); return { datei: decodeURIComponent((x.getAttribute('src') || '').split('/').pop()), laeuft: !x.paused, hintergrund: !a.paused }; });
        const brett = await buehne.evaluate(() => ({ amZug: (document.body.innerText.match(/AM ZUG/gi) || []).length, nichtErreichbar: (document.body.innerText.match(/NICHT ERREICHBAR/gi) || []).length }));
        const l = lk(aktuell);
        const rec = {
          lage: aktuell, titel: l.titel, simulationszeit: l.simZeit, uebungszeit: (await mod.textContent('#m-elapsed')).trim(),
          buehneZeigtTitel: buehnenText.includes(l.titel), buehneZeigtSimZeit: buehnenText.includes(l.simZeit),
          moderationZeigtLage: modText.includes(l.titel), zustellungen: neu.filter(e => e.typ === 'vertrauliche karte').map(e => `${e.karte}→${e.details.empfaengerRolle}:${e.ergebnis}`),
          entscheidungenStand: (ms.weichen || []).map(w => `${w.id}=${w.gewaehlt || 'offen'}`), zusaetzeSichtbar: (st.currentLagekarte.weichenZusatz || []).length,
          medium: { bild: st.currentLagekarte.media ? st.currentLagekarte.media.src.split('/').pop() : null, ton: audio }, spielbrett: brett,
          gespraech: l.gespraech ? (modText.includes(l.gespraech.nachfragen[0].replace(/[„“"]/g, '').slice(0, 25)) || modText.includes((l.sprechertext || '').slice(0, 30)) ? 'Leitfaden in der Moderation angezeigt; Gespräch nicht geführt (keine Menschen im Test)' : 'Leitfaden NICHT gefunden') : null,
          leck: geheim.filter(t => buehnenText.includes(t.slice(0, 50))).length,
          bildBuehne: await shot(buehne, `L${String(lagen.length + 1).padStart(2, '0')}-${aktuell}-buehne`), bildModeration: await shot(mod, `L${String(lagen.length + 1).padStart(2, '0')}-${aktuell}-moderation`)
        };
        if (l.sound) rec.tonSoll = l.sound.src.split('/').pop();
        lagen.push(rec);
        // Pause über die Oberfläche
        if (!pausiert && fall.pauseNachLage === lagen.length) {
          await quittiere(mod); await klick(mod.locator('#btn-pause')); await sleep(800); const t1 = (await u.get('/api/run/moderator-state')).elapsedMinutes; await sleep(8000); const t2 = (await u.get('/api/run/moderator-state')).elapsedMinutes;
          await klick(mod.locator('#btn-resume')); await sleep(8000); const t3 = (await u.get('/api/run/moderator-state')).elapsedMinutes; pausiert = true;
          check('T2', 'Pause und Fortsetzen über die Oberfläche', t1 === t2 && t3 > t2, 'Zeit steht in der Pause (8 s), läuft danach weiter (8 s; Anzeige auf 0,1 Min. gerundet)', `${t1} → ${t2} (8 s Pause) → ${t3}`);
        }
        // Entscheidung über die Oberfläche
        for (const w of s.weichen || []) {
          if (w.lagekarten.find(id => planLks.includes(id)) !== aktuell || !fall.entscheidungen[w.id] || entschieden[w.id]) continue;
          await quittiere(mod); await klick(mod.locator(`.weiche-opt[data-weiche="${w.id}"][data-option="${fall.entscheidungen[w.id]}"]`)); await sleep(900);
          const g = ((await u.get('/api/run/moderator-state')).weichen || []).find(x => x.id === w.id);
          entschieden[w.id] = true;
          check('W-' + w.id, `Entscheidung ${w.id} über die Oberfläche festgehalten`, g && g.gewaehlt === fall.entscheidungen[w.id], fall.entscheidungen[w.id], g ? g.gewaehlt : '–');
        }
        // Überraschungen über die Oberfläche
        for (const b of fall.ueberraschungen || []) {
          if (b.nach !== aktuell || b.erledigt) continue; b.erledigt = true;
          await quittiere(mod); const btn = mod.locator(`.fire-bonus[data-id="${b.id}"]`).first();
          const gesperrt = await btn.isDisabled(); const titel = await btn.getAttribute('title');
          const bk = s.bonuskarten.find(x => x.id === b.id); const soll = O.bonusEinsetzbar(bk, lagen.map(x => x.lage).concat(planLks.filter(x => lagen.every(y => y.lage !== x)).filter(() => false)), fall.minuten, besetzt);
          if (gesperrt) check('B-' + b.id, `Überraschung ${b.id}: Auslösesperre`, !soll || b.erwartetGesperrt, b.erwartetGesperrt ? 'gesperrt' : 'einsetzbar', `gesperrt („${(titel || '').slice(0, 90)}“)`);
          else {
            await klick(btn); await sleep(1800);
            const ev = (await u.get('/api/run/stage-state')).buehnenEreignis;
            const bild = await shot(buehne, `U-${b.id}-buehne`);
            check('B-' + b.id, `Überraschung ${b.id} über die Oberfläche`, bk.oeffentlich ? !!(ev && ev.id === b.id) : u.mails().some(m => m.subject.endsWith('Bonusereignis ' + b.id)), bk.oeffentlich ? 'auf der Bühne' : 'per Mail an die Rolle', `${bk.oeffentlich ? (ev && ev.id === b.id ? 'auf der Bühne' : 'nicht auf der Bühne') : (u.mails().filter(m => m.subject.endsWith('Bonusereignis ' + b.id)).length + ' Mail(s)')}; Bild ${bild}`);
            if (bk.oeffentlich) { const hide = mod.locator('.hide-event').first(); if (await hide.count()) { await hide.click().catch(() => {}); await sleep(300); await mod.locator('.hide-event').first().click().catch(() => {}); } }
          }
        }
      }
      // nächste Lage über „Zeitsprung hierhin“
      const naechste = mod.locator('#m-upcoming button.jump-to-event[data-type="lagekarte"]').first();
      if (!(await naechste.count())) break;
      await quittiere(mod); await klick(naechste);
    }
    (fall.ueberraschungen || []).filter(b => !b.erledigt).forEach(b => check('B-' + b.id, `Überraschung ${b.id}`, true, `nach ${b.nach}`, `nicht ausgelöst: ${b.nach} ist in diesem Ablauf nicht enthalten (kein Fehler, dokumentiert)`));
    // restliche vertrauliche Karten (Zeit läuft bis Ende) über „Zeitsprung hierhin“
    for (let i = 0; i < 20; i++) { await quittiere(mod); const b = mod.locator('#m-upcoming button.jump-to-event').first(); if (!(await b.count())) break; await klick(b); await sleep(1200); }
    // ---------- Abschluss ----------
    await quittiere(mod); await klick(mod.locator('#btn-finale-start')); await sleep(1500); await quittiere(mod);
    const j = await journalBis();
    const kriterien = (await u.get('/api/run/moderator-state')).einschaetzung.kriterien;
    for (let i = 0; i < kriterien.length; i++) {
      await mod.selectOption(`.einsch-wert[data-i="${i}"]`, String([2, 1, 0][i % 3])); await sleep(250);
      await mod.fill(`.einsch-notiz[data-i="${i}"]`, `QA-Beobachtung ${i + 1}`); await mod.press(`.einsch-notiz[data-i="${i}"]`, 'Tab'); await sleep(300);
    }
    await mod.reload(); await mod.waitForSelector('.einsch-wert', { state: 'attached' }); await sleep(2500);
    const nachReload = await mod.$$eval('.einsch-wert', els => els.map(e => e.value));
    const notizen = await mod.$$eval('.einsch-notiz', els => els.map(e => e.value));
    check('E1', `Gesamteinschätzung (${kriterien.length} Kriterien) gespeichert und nach Neuladen angezeigt`, nachReload.every((v, i) => v === String([2, 1, 0][i % 3])) && notizen.every((v, i) => v === `QA-Beobachtung ${i + 1}`), `${kriterien.length} Werte und Notizen wie eingegeben`, `Werte ${nachReload.join(',')}; Notizen ${notizen.filter((v, i) => v === `QA-Beobachtung ${i + 1}`).length}/${kriterien.length}`);
    check('E2', 'Szenariospezifisches Raster', s.protokollKriterien ? kriterien.length === s.protokollKriterien.length : kriterien.length === 8, s.protokollKriterien ? `${s.protokollKriterien.length} Kriterien aus dem Drehbuch` : '8 allgemeine Kriterien', `${kriterien.length}`);
    let fv; for (let i = 0; i < 80; i++) { fv = (await u.get('/api/run/stage-state')).finale; if (fv && fv.phase === 'bilanz') { bericht.bilanzBild = await shot(buehne, '90-abschluss-bilanz'); } if (fv && fv.phase === 'fazit') break; await klick(mod.locator('#btn-finale-next')); await sleep(350); }
    bericht.fazitBild = await shot(buehne, '91-abschluss-fazit');
    const rg = O.rechnung(s, fall.entscheidungen);
    const bil = (await u.get('/api/run/moderator-state')).finale;
    // ---------- Downloads ----------
    const [dlP] = await Promise.all([mod.waitForEvent('download'), klick(mod.locator('#btn-protokoll'))]); await dlP.saveAs(path.join(OUT, 'protokoll.md'));
    const [dlJ] = await Promise.all([mod.waitForEvent('download'), klick(mod.locator('#btn-journal'))]); await dlJ.saveAs(path.join(OUT, 'journal.jsonl'));
    const prot = fs.readFileSync(path.join(OUT, 'protokoll.md'), 'utf8');
    const journal = fs.readFileSync(path.join(OUT, 'journal.jsonl'), 'utf8').split('\n').filter(Boolean).map(z => JSON.parse(z));
    // ---------- Abgleich Protokoll ↔ Ereignisse ----------
    const gezeigt = journal.filter(e => e.typ === 'lage gezeigt').map(e => e.karte);
    const zugestellt = journal.filter(e => e.typ === 'vertrauliche karte').map(e => e.karte);
    const bonus = journal.filter(e => /fire-bonuskarte/.test(e.typ) && e.ergebnis === 'ok').map(e => e.karte);
    const eur = n => new Intl.NumberFormat('de-DE').format(Math.round(n)) + ' €';
    // Das Protokoll nennt Lagen mit Zeit und Titel (nicht mit ID): Abschnitt zeilengenau und in Reihenfolge vergleichen
    const lagenSoll = gezeigt.map(id => `- ${lk(id).simZeit}: ${lk(id).titel}`);
    const lagenIst = ((prot.split('## Gespielte Lagen')[1] || '').split('\n## ')[0]).split('\n').filter(z => z.startsWith('- '));
    check('P1', 'Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge)', JSON.stringify(lagenSoll) === JSON.stringify(lagenIst), lagenSoll.length + ' Zeilen wie im Journal', lagenIst.length + ' Zeilen' + (JSON.stringify(lagenSoll) === JSON.stringify(lagenIst) ? ', identisch' : ': ' + lagenIst.join(' | ').slice(0, 300)));
    check('P2', 'Protokoll: alle zugestellten vertraulichen Karten', zugestellt.every(id => prot.includes(id)), zugestellt.join(' '), zugestellt.filter(id => !prot.includes(id)).join(' ') || 'alle enthalten');
    check('P3', 'Protokoll: Entscheidungen im Wortlaut', Object.entries(fall.entscheidungen).filter(([w]) => entschieden[w]).every(([w, o]) => prot.includes(s.weichen.find(x => x.id === w).optionen.find(x => x.id === o).label)), 'Wortlaut jeder festgehaltenen Option', Object.keys(entschieden).join(', '));
    check('P4', 'Protokoll: ausgelöste Überraschungen', bonus.every(id => prot.includes(id)), bonus.join(' ') || 'keine', bonus.filter(id => !prot.includes(id)).join(' ') || 'alle enthalten');
    const bogen = bonus.map(id => s.bonuskarten.find(b => b.id === id)).filter(b => (b.beobachtung || []).length);
    check('P5', 'Protokoll: Beobachtungsbögen der ausgelösten Überraschungen', bogen.every(b => prot.includes(b.beobachtung[0])), bogen.map(b => b.id).join(' ') || 'keine', bogen.filter(b => !prot.includes(b.beobachtung[0])).map(b => b.id).join(' ') || 'alle enthalten');
    check('P6', 'Protokoll: Gesamteinschätzung mit gespeicherten Werten', kriterien.every((k, i) => prot.includes(`| ${k} | ${[2, 1, 0][i % 3]} | QA-Beobachtung ${i + 1} |`)), 'jede Zeile mit Wert und Beobachtung', `${kriterien.filter((k, i) => prot.includes(`| ${k} | ${[2, 1, 0][i % 3]} | QA-Beobachtung ${i + 1} |`)).length}/${kriterien.length}`);
    check('P7', 'Protokoll: Rechnung = unabhängige Berechnung', prot.includes(eur(rg.brutto)) && bil.rechnung && bil.rechnung.summe === rg.brutto, `Brutto ${eur(rg.brutto)}, beim Unternehmen ${eur(rg.beimUnternehmen)}`, `Protokoll enthält Brutto: ${prot.includes(eur(rg.brutto)) ? 'ja' : 'nein'}; Moderation ${bil.rechnung ? eur(bil.rechnung.summe) : '–'}`);
    check('P8', 'Protokoll: Maßnahmenplan und keine Namen/Adressen', /Maßnahmenplan/.test(prot) && !/@example\.com|Person\d/.test(prot), 'Maßnahmenplan vorhanden, keine Namen', `${/Maßnahmenplan/.test(prot) ? 'vorhanden' : 'fehlt'}; Namen/Adressen ${/@example\.com|Person\d/.test(prot) ? 'ENTHALTEN' : 'keine'}`);
    // ---------- Orakel: Zustellung, Folgen, Lecks, Medien ----------
    const zust = journal.filter(e => e.typ === 'vertrauliche karte');
    const falsch = zust.filter(z => z.details.empfaengerRolle !== O.empfaenger(s.sonderlagekarten.find(k => k.id === z.karte), besetzt));
    check('O1', 'Empfängerrolle jeder vertraulichen Karte (Orakel)', !falsch.length, 'erste besetzte Rolle aus Empfänger und Ersatzrollen', falsch.map(z => z.karte).join(' ') || 'alle korrekt');
    const proPerson = gespeichert.map(p => ({ p, n: u.mails().filter(m => m.to.includes(p.email) && /Lageinformation SK/.test(m.subject)).length, soll: zust.filter(z => (p.roleIds || []).includes(z.details.empfaengerRolle)).length }));
    check('O2', 'Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung)', proPerson.every(x => x.n === x.soll), 'Mails je Person = Karten ihrer Rolle', proPerson.filter(x => x.n !== x.soll).map(x => `${x.p.email}: ${x.n}/${x.soll}`).join('; ') || `alle ${proPerson.length} Personen korrekt`);
    const wk = O.wirkungen(s, fall.entscheidungen, gezeigt);
    wk.folgekarten.forEach(f => check('O3', `Folgekarte ${f.id}`, zust.some(z => z.karte === f.id) === f.erwartet, f.erwartet ? 'zugestellt' : 'nicht zugestellt (Lage nicht gespielt)', zust.some(z => z.karte === f.id) ? 'zugestellt' : 'nicht zugestellt'));
    check('O4', 'Keine vertraulichen Texte auf der Bühne (je Lage geprüft)', lagen.every(x => !x.leck), '0 Treffer', `${lagen.reduce((a, x) => a + x.leck, 0)} Treffer`);
    const tonFehler = lagen.filter(x => x.tonSoll && x.medium.ton.datei !== x.tonSoll);
    check('O5', 'Ton der Lage gestartet (vorgesehene Datei)', !tonFehler.length, 'vorgesehene Datei je Lage mit Ton', tonFehler.map(x => `${x.lage}: ${x.medium.ton.datei || '–'}`).join('; ') || 'alle korrekt');
    check('O6', 'Bühne und Moderation zeigen jede Lage', lagen.every(x => x.buehneZeigtTitel && x.moderationZeigtLage), 'Titel auf Bühne und in Moderation', lagen.filter(x => !x.buehneZeigtTitel || !x.moderationZeigtLage).map(x => x.lage).join(' ') || 'alle');
    check('O7', 'Keine Browserfehler', !seitenfehler.length, 'keine', seitenfehler.slice(0, 3).join(' | ') || 'keine');
    bericht = Object.assign(bericht, { hinweiseQuittiert: quittiert, ersatzklicks, sitzung, plan: ablauf, besetzteRollen: [...besetzt], personen: gespeichert.length, entscheidungen: fall.entscheidungen, rechnungSoll: rg, dialoge });
  } catch (err) {
    check('X', 'Durchlauf', false, 'ohne Abbruch', 'Abbruch: ' + err.message.slice(0, 1500));
    try { for (const p of ctx.pages()) await p.screenshot({ path: path.join(OUT, 'bilder', 'abbruch-' + ctx.pages().indexOf(p) + '.jpg'), type: 'jpeg', quality: 60, fullPage: true }); } catch (e) { /* ignorieren */ }
  } finally {
    await ctx.tracing.stop({ path: path.join(OUT, 'trace.zip') }).catch(() => {});
    await browser.close(); await u.ende();
    // Serverprotokoll bereinigen (keine Adressen)
    try { const t = fs.readFileSync(u.logDatei, 'utf8').replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '<adresse>'); fs.writeFileSync(path.join(OUT, 'server.log'), t); if (path.resolve(u.logDatei) !== path.resolve(path.join(OUT, 'server.log'))) fs.unlinkSync(u.logDatei); } catch (e) {}
    const f = pruef.filter(x => !x.ok).length;
    fs.writeFileSync(path.join(OUT, 'ergebnis.json'), JSON.stringify({ fall, zeitpunkt: new Date().toISOString(), art: 'End-to-End im Browser (Bedienung über die Oberfläche)', pruefungen: pruef, lagen, bericht }, null, 1));
    console.log(`${FALL}: ${pruef.length - f} von ${pruef.length} Prüfungen bestanden, ${lagen.length} Lagen`);
    process.exitCode = f ? 1 : 0;
  }
})();
