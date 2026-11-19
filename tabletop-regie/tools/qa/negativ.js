// Negativ- und Lasttests (Betrieb, Mail, Bühne, Gleichzeitigkeit, Medien, Zugriffe).
// Das erwartete Verhalten steht VOR der Ausführung fest im Feld „erwartet“ jedes Falls
// und wird nicht nachträglich an das Ergebnis angepasst. Ein Fall gilt als bestanden,
// wenn alle seine Bedingungen zutreffen; Beobachtungen ohne Soll werden getrennt
// als „Befund“ ausgewiesen.
// Aufruf: node tools/qa/negativ.js <ausgabeordner> [port] [smtpPort]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { umgebung, personen, sleep, ROOT } = require('./umgebung');
const [OUTDIR, PORT = 4250, SMTPP = 2650] = process.argv.slice(2);
fs.mkdirSync(path.join(OUTDIR, 'bilder'), { recursive: true });
const SZ = 'scenario.waterkant.json';
const faelle = [];
let aktuell = null;
const fall = (id, zweck, erwartet) => { const f = { id, zweck, erwartet, bedingungen: [], befunde: [] }; faelle.push(f); aktuell = f; return f; };
const bed = (f, name, ok, beobachtet) => f.bedingungen.push({ name, ok: !!ok, beobachtet });
const ROLLEN = ['geschaeftsfuehrer-ceo', 'leiter-it', 'rz-betrieb', 'facility-management', 'leiter-arbeitssicherheit', 'partnerbetreuung', 'leiterin-kommunikation-pr'];

(async () => {
  const u = await umgebung({ port: Number(PORT), smtpPort: Number(SMTPP), name: 'negativ', logDir: OUTDIR, countdown: 0 });
  const browser = await chromium.launch(Object.assign({ args: ['--autoplay-policy=no-user-gesture-required'] }, process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}));
  const ms = () => u.get('/api/run/moderator-state');
  const gewaehlt = (m, wid) => ((m.weichen || []).find(w => w.id === wid) || {}).gewaehlt || null;
  const st = () => u.get('/api/run/stage-state');
  const journal = async () => (await u.text('/api/run/journal?sitzung=' + encodeURIComponent((await ms()).sitzungId || ''))).split('\n').filter(Boolean).map(z => JSON.parse(z));
  const gezeigt = async () => (await journal()).filter(e => e.typ === 'lage gezeigt').map(e => e.karte);
  // Mails nur ab Beginn des laufenden Falls zählen (frühere Fälle verwenden teils dieselbe Karte)
  let mailBasis = 0;
  const skMails = id => u.mails().slice(mailBasis).filter(m => new RegExp('Lageinformation ' + id + '$').test(m.subject)).length;
  const neueUebung = async (minuten = 90) => {
    u.smtp.setModus('normal'); mailBasis = u.mails().length;
    await u.post('/api/scenarios/select', { file: SZ }); await u.post('/api/run/reset');
    await u.post('/api/participants', personen(ROLLEN));
    await u.post('/api/run/start', { durationMode: 'target', targetMinutes: minuten });
    await u.post('/api/run/begin-crisis'); await sleep(1500);
  };
  const s = JSON.parse(fs.readFileSync(path.join(u.dataDir, SZ), 'utf8'));
  // eine vertrauliche Karte ohne Voraussetzung, deren Empfänger besetzt ist und die erst später fällig wird
  const spaeteSk = n => s.sonderlagekarten.filter(k => ROLLEN.includes(k.empfaenger) && !(k.voraussetzung || []).length && !k.zuBeginnVon).slice(-n);
  try {
    // ---------- N-01 Empfänger nicht erreichbar ----------
    { const f = fall('N-01', 'Empfänger nicht erreichbar (SMTP 550 bei RCPT)', 'Versand schlägt fehl, Übung läuft weiter; Moderation zeigt „E-Mail fehlgeschlagen … mündlich oder auf Papier übergeben“; Journal: „zustellung fehlgeschlagen“; kein erneuter Versand ohne Aktion.');
      await neueUebung(); const [k] = spaeteSk(1);
      const p = await (await browser.newContext()).newPage(); await p.goto(u.B + '/moderator.html'); await sleep(2500);
      u.smtp.setModus('ablehnen');
      const t0 = Date.now(); const r = await u.post('/api/run/fire-sonderkarte/' + k.id); const dauer = Date.now() - t0;
      u.smtp.setModus('normal'); await sleep(2500);
      const m = await ms(); const e = m.firedSonderlagekarten.find(x => x.id === k.id) || {};
      bed(f, 'Server antwortet', r.status === 200, `HTTP ${r.status} nach ${dauer} ms`);
      bed(f, 'Ergebnis je Person als fehlgeschlagen vermerkt', (e.emailResults || []).length && e.emailResults.every(x => !x.ok), JSON.stringify((e.emailResults || []).map(x => ({ ok: x.ok, fehler: (x.error || '').slice(0, 60) }))));
      bed(f, 'Übung läuft weiter', m.status === 'running', m.status);
      const j = (await journal()).filter(x => x.typ === 'vertrauliche karte' && x.karte === k.id);
      bed(f, 'Journal vermerkt den Fehlschlag', j.length === 1 && j[0].ergebnis === 'zustellung fehlgeschlagen', j.map(x => x.ergebnis).join(', '));
      const txt = await p.evaluate(() => document.body.innerText);
      bed(f, 'geöffnete Moderation zeigt den Fehlschlag mit Handlungsanweisung', /E-Mail fehlgeschlagen/.test(txt) && /mündlich oder auf Papier/.test(txt), /E-Mail fehlgeschlagen/.test(txt) ? 'Hinweis sichtbar' : 'kein Hinweis');
      await p.screenshot({ path: path.join(OUTDIR, 'bilder', 'N-01-moderation.jpg'), type: 'jpeg', quality: 70 });
      await p.reload(); await sleep(2500); const sent = await p.textContent('#m-sent-sk');
      bed(f, 'nach Neuladen bleibt der Fehlschlag bei der Karte sichtbar', sent.includes(k.id) && /fehlgeschlagen/.test(sent), /fehlgeschlagen/.test(sent) ? 'in „Verschickte vertrauliche Karten“ sichtbar' : 'nur noch die Karte, kein Zustellstatus');
      await p.context().close();
      await sleep(4000); bed(f, 'kein automatischer zweiter Versuch', skMails(k.id) === 0, `${skMails(k.id)} Mails angekommen`);
    }
    // ---------- N-02 SMTP-Verbindung unterbrochen ----------
    { const f = fall('N-02', 'SMTP-Verbindung bricht während der Übertragung ab', 'Versand schlägt nach kurzer Zeit fehl (kein Hängenbleiben über 60 s), Übung läuft weiter, Fehlschlag sichtbar und im Journal; nachfolgende Karten werden wieder normal zugestellt, sobald der Server erreichbar ist.');
      await neueUebung(); const [k1, k2] = spaeteSk(2); u.smtp.setModus('abbrechen');
      const t0 = Date.now(); const r = await u.post('/api/run/fire-sonderkarte/' + k1.id); const dauer = Date.now() - t0;
      u.smtp.setModus('normal');
      bed(f, 'Antwort innerhalb 60 s', r.status === 200 && dauer < 60000, `HTTP ${r.status} nach ${dauer} ms`);
      const e = (await ms()).firedSonderlagekarten.find(x => x.id === k1.id) || {};
      bed(f, 'Fehlschlag vermerkt', (e.emailResults || []).length && e.emailResults.every(x => !x.ok), (e.emailResults || []).map(x => (x.error || 'ok').slice(0, 60)).join('; '));
      await u.post('/api/run/fire-sonderkarte/' + k2.id); await sleep(800);
      bed(f, 'nächste Karte nach Wiederherstellung zugestellt', skMails(k2.id) >= 1, `${skMails(k2.id)} Mail(s) für ${k2.id}`);
      bed(f, 'Übung läuft weiter', (await ms()).status === 'running', (await ms()).status);
    }
    // ---------- N-03 Reload der Bühne während eines Einspielers ----------
    { const f = fall('N-03', 'Bühne wird während eines Einspielers neu geladen', 'Nach dem Neuladen zeigt die Bühne dieselbe Lage; der Browser verlangt erneut die Tonfreigabe; nach „Ton aktivieren“ läuft genau ein Einspieler (der der aktuellen Lage) von vorn, kein zweiter Ton parallel, keine vertraulichen Texte.');
      await neueUebung();
      await u.post('/api/run/jump-to-event/lagekarte/LK04'); await sleep(1200);
      const ctx = await browser.newContext(); const b = await ctx.newPage(); await b.goto(u.B + '/stage.html'); await b.click('#btn-enable-sound'); await sleep(2500);
      const vor = await b.evaluate(() => [...document.querySelectorAll('audio')].map(a => ({ src: (a.getAttribute('src') || '').split('/').pop(), laeuft: !a.paused })));
      await b.reload(); await sleep(1500);
      const freigabe = await b.isVisible('#btn-enable-sound');
      const titel = await b.evaluate(() => document.body.innerText);
      await b.click('#btn-enable-sound'); await sleep(2500);
      const nach = await b.evaluate(() => [...document.querySelectorAll('audio')].map(a => ({ src: (a.getAttribute('src') || '').split('/').pop(), laeuft: !a.paused, zeit: a.currentTime })));
      const lk4 = s.lagekarten.find(l => l.id === 'LK04');
      bed(f, 'vor dem Neuladen lief der Einspieler der Lage', vor.some(a => a.laeuft && a.src === lk4.sound.src.split('/').pop()), JSON.stringify(vor));
      bed(f, 'dieselbe Lage nach dem Neuladen', titel.includes(lk4.titel), lk4.titel);
      bed(f, 'Tonfreigabe wird erneut verlangt', freigabe, freigabe ? 'Freigabe sichtbar' : 'keine Freigabe');
      const laufend = nach.filter(a => a.laeuft);
      bed(f, 'genau ein Ton läuft, der der aktuellen Lage', laufend.length === 1 && laufend[0].src === lk4.sound.src.split('/').pop(), JSON.stringify(nach));
      bed(f, 'keine vertraulichen Texte auf der Bühne', !s.sonderlagekarten.some(k => titel.includes(k.text.slice(0, 60))), 'geprüft gegen alle Kartentexte');
      await b.screenshot({ path: path.join(OUTDIR, 'bilder', 'N-03-buehne-nach-reload.jpg'), type: 'jpeg', quality: 70 }); await ctx.close();
    }
    // ---------- N-04 Bühne geschlossen und wieder geöffnet ----------
    { const f = fall('N-04', 'Bühnenfenster wird geschlossen und später neu geöffnet', 'Die Übung läuft ohne Bühne weiter (Zeit, Lagen, Zustellungen); die neu geöffnete Bühne zeigt sofort die aktuelle Lage.');
      await neueUebung(); const ctx = await browser.newContext(); let b = await ctx.newPage(); await b.goto(u.B + '/stage.html'); await sleep(1500); await b.close();
      const t1 = (await ms()).elapsedMinutes; await u.post('/api/run/jump-to-event/lagekarte/LK06'); await sleep(2000);
      const m = await ms(); bed(f, 'Übung läuft ohne Bühne weiter', m.status === 'running' && m.elapsedMinutes > t1, `${m.status}, Minute ${t1.toFixed(1)} → ${m.elapsedMinutes.toFixed(1)}`);
      b = await ctx.newPage(); await b.goto(u.B + '/stage.html'); await sleep(2500);
      const lk = (await st()).currentLagekarte; const txt = await b.evaluate(() => document.body.innerText);
      bed(f, 'neu geöffnete Bühne zeigt die aktuelle Lage', lk && txt.includes(lk.titel), lk ? lk.id + ' ' + lk.titel : '–'); await ctx.close();
    }
    // ---------- N-05 Server-Neustart während laufender Übung ----------
    { const f = fall('N-05', 'Server-Neustart während laufender Übung', 'Zustand bleibt erhalten (Status, Übungsminute ± 1, gezeigte Lagen, Entscheidungen); bereits verschickte Karten werden nicht erneut verschickt; das Journal setzt die Folgenummern fort.');
      await neueUebung(); await u.post('/api/run/jump-to-event/lagekarte/LK06'); await u.post('/api/run/weiche', { id: 'W1', option: 'herunterfahren' }); await sleep(2500);
      const vor = await ms(); const mailsVor = u.mails().length; const jVor = await journal(); const lVor = await gezeigt();
      await u.neustart(); await sleep(3500);
      const nach = await ms(); const jNach = await journal(); const lNach = await gezeigt();
      bed(f, 'Status erhalten', nach.status === vor.status, `${vor.status} → ${nach.status}`);
      bed(f, 'Übungsminute fortgesetzt', nach.elapsedMinutes >= vor.elapsedMinutes - 0.1 && nach.elapsedMinutes <= vor.elapsedMinutes + 1.5, `${vor.elapsedMinutes.toFixed(2)} → ${nach.elapsedMinutes.toFixed(2)}`);
      bed(f, 'gezeigte Lagen erhalten', lVor.length > 0 && JSON.stringify(lNach) === JSON.stringify(lVor), lNach.join(' '));
      bed(f, 'Entscheidung erhalten', JSON.stringify(nach.weichen) === JSON.stringify(vor.weichen), JSON.stringify(nach.weichen));
      bed(f, 'keine Doppelzustellung durch den Neustart', u.mails().length === mailsVor, `${mailsVor} → ${u.mails().length} Mails`);
      const seqs = jNach.map(x => x.seq); bed(f, 'Journal: Folgenummern lückenlos fortgesetzt', seqs.every((v, i) => v === i + 1) && jNach.length >= jVor.length, `${jVor.length} → ${jNach.length} Einträge, letzte seq ${seqs[seqs.length - 1]}`);
    }
    // ---------- N-06 Zwei schnelle Aktionen ----------
    { const f = fall('N-06', 'Zwei schnelle gleichzeitige Aktionen', 'Gleiche Karte zweimal gleichzeitig ausgelöst → genau eine Zustellung je Person. Zwei verschiedene Optionen derselben Entscheidung gleichzeitig → Endzustand ist genau eine Option, Abschlussposten passen zu ihr.');
      await neueUebung(); const [k] = spaeteSk(1);
      await Promise.all([u.post('/api/run/fire-sonderkarte/' + k.id), u.post('/api/run/fire-sonderkarte/' + k.id), u.post('/api/run/fire-sonderkarte/' + k.id)]); await sleep(800);
      bed(f, 'dreifach gleichzeitig ausgelöst → eine Mail', skMails(k.id) === 1, `${skMails(k.id)} Mail(s)`);
      await u.post('/api/run/jump-to-event/lagekarte/LK15');
      await Promise.all([u.post('/api/run/weiche', { id: 'W4', option: 'minimal' }), u.post('/api/run/weiche', { id: 'W4', option: 'ausbauen' })]); await sleep(500);
      const m = await ms(); const w4 = s.weichen.find(w => w.id === 'W4'); const gew = w4.optionen.find(o => o.id === gewaehlt(m, 'W4'));
      const aktiv = ((m.finale && m.finale.optionen) || []).filter(o => o.aktiv).map(o => o.id);
      const gesteuert = w4.optionen.flatMap(o => o.posten || []);
      bed(f, 'genau eine Option festgehalten', !!gew, gewaehlt(m, 'W4'));
      bed(f, 'Abschlussposten passen zur festgehaltenen Option', gew && gesteuert.every(pid => aktiv.includes(pid) === (gew.posten || []).includes(pid)), `aktiv: ${aktiv.filter(x => gesteuert.includes(x)).join(', ') || 'keine'}`);
    }
    // ---------- N-07 Entscheidung geändert ----------
    { const f = fall('N-07', 'Entscheidung wird nachträglich geändert', 'Die Bühne zeigt danach nur die Folge der neuen Option; die Rechnung enthält nur deren Posten; eine Folgekarte der alten Option, die schon zugestellt war, bleibt zugestellt (wird nicht zurückgeholt) und wird nicht erneut verschickt.');
      await neueUebung(); await u.post('/api/run/jump-to-event/lagekarte/LK03');
      const w1 = s.weichen.find(w => w.id === 'W1'); const [a, b] = w1.optionen;
      await u.post('/api/run/weiche', { id: 'W1', option: a.id }); await sleep(800); const mailsA = u.mails().length;
      await u.post('/api/run/weiche', { id: 'W1', option: b.id }); await sleep(800);
      const ziel = (b.folgen || []).find(x => x.lagekarte && x.zusatz) || (a.folgen || []).find(x => x.lagekarte && x.zusatz);
      if (ziel) { await u.post('/api/run/jump-to-event/lagekarte/' + ziel.lagekarte); await sleep(1500); }
      const sstate = await st(); const bt = JSON.stringify(sstate);
      const zA = (a.folgen || []).filter(x => x.zusatz && x.lagekarte === (ziel || {}).lagekarte).map(x => x.zusatz);
      const zB = (b.folgen || []).filter(x => x.zusatz && x.lagekarte === (ziel || {}).lagekarte).map(x => x.zusatz);
      bed(f, 'Bühne zeigt die Folge der neuen Option', !ziel || zB.every(z => bt.includes(z.slice(0, 50))), ziel ? ziel.lagekarte : 'keine Zusatzfolge');
      bed(f, 'Bühne zeigt keine Folge der alten Option', zA.every(z => !bt.includes(z.slice(0, 50))), zA.length ? 'geprüft' : 'alte Option ohne Zusatz an dieser Lage');
      const m = await ms(); bed(f, 'Endzustand = neue Option', gewaehlt(m, 'W1') === b.id, gewaehlt(m, 'W1'));
      bed(f, 'Wechsel löst keinen erneuten Versand aus', u.mails().length >= mailsA && (await journal()).filter(x => x.typ === 'vertrauliche karte').length === new Set((await journal()).filter(x => x.typ === 'vertrauliche karte').map(x => x.karte)).size, 'jede Karte höchstens einmal im Journal');
    }
    // ---------- N-08 Doppelzustellung durch erneutes Auslösen ----------
    { const f = fall('N-08', 'Bereits zugestellte Karte wird erneut ausgelöst', 'Keine zweite Mail; Übung unverändert.');
      await neueUebung(); const [k] = spaeteSk(1); await u.post('/api/run/fire-sonderkarte/' + k.id); await sleep(600); const n1 = skMails(k.id);
      await u.post('/api/run/fire-sonderkarte/' + k.id); await sleep(600);
      bed(f, 'genau eine Zustellung', n1 >= 1 && skMails(k.id) === n1, `${n1} → ${skMails(k.id)}`);
    }
    // ---------- N-09 Nicht berechtigte Rolle ----------
    { const f = fall('N-09', 'Nicht berechtigte Rolle erhält keine Nachricht', 'Eine Karte an Rolle X erreicht nur Personen mit Rolle X (oder der dokumentierten Ersatzrolle, wenn X unbesetzt ist), niemanden sonst.');
      await neueUebung(); const [k] = spaeteSk(1); const vor = u.mails().length; await u.post('/api/run/fire-sonderkarte/' + k.id); await sleep(800);
      const neu = u.mails().slice(vor).filter(m => /Lageinformation/.test(m.subject));
      const berechtigt = personen(ROLLEN).filter(p => p.roleIds.includes(k.empfaenger)).map(p => p.email);
      bed(f, 'nur berechtigte Empfänger', neu.length && neu.every(m => m.to.every(t => berechtigt.includes(t))), neu.map(m => m.to.join(',')).join('; ') + ` (berechtigt: ${berechtigt.join(',')})`);
    }
    // ---------- N-10 Überraschung zu früh ----------
    { const f = fall('N-10', 'Überraschung vor ihrer Voraussetzung', 'Ablehnung mit Begründung (HTTP 400, Text nennt die fehlende Lage), keine Mail, keine Bühnenanzeige, Journal vermerkt „abgelehnt“; die Moderation zeigt die Schaltfläche gesperrt.');
      await neueUebung(); const vorM = u.mails().length;
      const r = await u.post('/api/run/fire-bonuskarte/B1'); const r2 = await u.post('/api/run/fire-bonuskarte/B5');
      bed(f, 'vertrauliche Überraschung abgelehnt', r.status === 400 && /LK15/.test(r.body.error), `HTTP ${r.status}: ${r.body && r.body.error}`);
      bed(f, 'öffentliche Überraschung abgelehnt', r2.status === 400 && /LK14/.test(r2.body.error), `HTTP ${r2.status}: ${r2.body && r2.body.error}`);
      bed(f, 'keine Mail, keine Bühnenanzeige', u.mails().length === vorM && !(await st()).buehnenEreignis, `${u.mails().length - vorM} Mails`);
      const j = (await journal()).filter(x => /fire-bonuskarte/.test(x.typ)); bed(f, 'Journal vermerkt die Ablehnung', j.length === 2 && j.every(x => /abgelehnt/.test(x.ergebnis)), j.map(x => x.karte + ':' + x.ergebnis).join(', '));
      const p = await (await browser.newContext()).newPage(); await p.goto(u.B + '/moderator.html'); await sleep(2500);
      const gesperrt = await p.$$eval('.fire-bonus', els => els.filter(e => e.disabled).map(e => e.dataset.id));
      bed(f, 'Moderation zeigt B1 und B5 gesperrt', gesperrt.includes('B1') && gesperrt.includes('B5'), 'gesperrt: ' + gesperrt.join(' ')); await p.context().close();
    }
    // ---------- N-11 Pause ----------
    { const f = fall('N-11', 'Pause hält Zeit und Versand an', 'Während der Pause steht die Übungsminute, es wird keine Lage gezeigt und keine Karte verschickt; nach dem Fortsetzen läuft die Zeit ab dem Pausenstand weiter.');
      await neueUebung(); await u.post('/api/run/pause'); const a = await ms(); const mA = u.mails().length; const lA = await gezeigt(); await sleep(9000); const b = await ms(); const lB = await gezeigt();
      bed(f, 'Zeit steht', Math.abs(b.elapsedMinutes - a.elapsedMinutes) < 0.01, `${a.elapsedMinutes.toFixed(3)} → ${b.elapsedMinutes.toFixed(3)}`);
      bed(f, 'keine neue Lage, keine Mail', lB.length === lA.length && u.mails().length === mA, `${lB.length - lA.length} Lagen, ${u.mails().length - mA} Mails`);
      await u.post('/api/run/resume'); await sleep(6000); const c = await ms();
      bed(f, 'Zeit läuft nach dem Fortsetzen ab Pausenstand weiter', c.elapsedMinutes > b.elapsedMinutes && c.elapsedMinutes < b.elapsedMinutes + 1, `${b.elapsedMinutes.toFixed(3)} → ${c.elapsedMinutes.toFixed(3)}`);
    }
    // ---------- N-12 Medien fehlen oder sind beschädigt ----------
    { const f = fall('N-12', 'Mediendatei fehlt bzw. ist keine Audiodatei', 'Fehlende Datei: die Drehbuchprüfung meldet sie als Fehler (sichtbar in der Einrichtung). Beschädigte Datei: die Bühne zeigt die Lage weiter, ohne Skriptabbruch; die Übung läuft weiter.');
      const kopie = JSON.parse(JSON.stringify(s));
      kopie.lagekarten.find(l => l.id === 'LK04').sound.src = '/media/waterkant/gibt-es-nicht.mp3';
      kopie.lagekarten.find(l => l.id === 'LK05').sound.src = '/media/waterkant/lk04-brandalarm.png';
      kopie.title = 'QA-Kopie mit Medienfehlern';
      fs.writeFileSync(path.join(u.dataDir, 'scenario.qa-medien.json'), JSON.stringify(kopie));
      await u.post('/api/scenarios/select', { file: 'scenario.qa-medien.json' }); await sleep(800);
      const meta = await u.get('/api/scenario-meta'); const fehler = ((meta.pruefung || {}).errors || []).filter(e => /gibt-es-nicht/.test(e));
      bed(f, 'fehlende Datei in der Drehbuchprüfung gemeldet', fehler.length === 1, fehler[0] || 'nicht gemeldet');
      await u.post('/api/run/reset'); await u.post('/api/participants', personen(ROLLEN)); await u.post('/api/run/start', { durationMode: 'target', targetMinutes: 90 }); await u.post('/api/run/begin-crisis'); await sleep(1500);
      const ctx = await browser.newContext(); const b = await ctx.newPage(); const fehlerSeite = []; b.on('pageerror', e => fehlerSeite.push(e.message));
      await b.goto(u.B + '/stage.html'); await b.click('#btn-enable-sound');
      for (const id of ['LK04', 'LK05']) { await u.post('/api/run/jump-to-event/lagekarte/' + id); await sleep(3000); const txt = await b.evaluate(() => document.body.innerText); bed(f, `Bühne zeigt ${id} trotz Medienfehler`, txt.includes(kopie.lagekarten.find(l => l.id === id).titel), kopie.lagekarten.find(l => l.id === id).titel); }
      bed(f, 'kein Skriptabbruch auf der Bühne', !fehlerSeite.length, fehlerSeite.join(' | ') || 'keine Fehler');
      bed(f, 'Übung läuft weiter', (await ms()).status === 'running', (await ms()).status);
      const p = await ctx.newPage(); await p.goto(u.B + '/moderator.html'); await sleep(2500); const mt = await p.evaluate(() => document.body.innerText);
      f.befunde.push({ schwere: 'niedrig', text: /Ton|Datei/.test(mt) && /fehl|nicht abspielbar/i.test(mt) ? 'Moderation zeigt einen Hinweis auf den Medienfehler.' : 'Die Moderation erhält während der Übung keinen Hinweis, dass ein Ton nicht abgespielt werden konnte; die Bühne bleibt still. Abhilfe heute: Generalprobe und Drehbuchprüfung vor der Übung.' });
      await b.screenshot({ path: path.join(OUTDIR, 'bilder', 'N-12-buehne-medienfehler.jpg'), type: 'jpeg', quality: 70 }); await ctx.close();
      fs.unlinkSync(path.join(u.dataDir, 'scenario.qa-medien.json'));
    }
    // ---------- N-13 Zwei Browser gleichzeitig ----------
    { const f = fall('N-13', 'Zwei Moderationsfenster und zwei Bühnen gleichzeitig', 'Beide Moderationsfenster zeigen nach spätestens 3 s denselben Zustand (Pause, Entscheidung); von zwei Bühnen mit Ton spielt nur die zuletzt freigegebene, die andere zeigt „Ton läuft auf einer anderen Bühne“.');
      await neueUebung(); await u.post('/api/run/jump-to-event/lagekarte/LK04');
      const c1 = await browser.newContext(), c2 = await browser.newContext(); const m1 = await c1.newPage(), m2 = await c2.newPage();
      await m1.goto(u.B + '/moderator.html'); await m2.goto(u.B + '/moderator.html'); await sleep(2500);
      await m1.click('#btn-pause'); await sleep(3000);
      const p2 = await m2.evaluate(() => document.body.innerText);
      bed(f, 'Pause aus Fenster 1 in Fenster 2 sichtbar', /pausiert/i.test(p2), /pausiert/i.test(p2) ? 'pausiert angezeigt' : 'nicht sichtbar');
      await m2.click('#btn-resume'); await sleep(3000); bed(f, 'Fortsetzen aus Fenster 2 wirksam', (await ms()).status === 'running', (await ms()).status);
      const b1 = await c1.newPage(), b2 = await c2.newPage(); await b1.goto(u.B + '/stage.html'); await b1.click('#btn-enable-sound'); await sleep(1500);
      await b2.goto(u.B + '/stage.html'); await b2.click('#btn-enable-sound'); await sleep(4000);
      const laeuft = async b => b.evaluate(() => [...document.querySelectorAll('audio')].some(a => !a.paused));
      const anders = await b1.isVisible('#sound-elsewhere');
      bed(f, 'nur die zuletzt freigegebene Bühne spielt Ton', !(await laeuft(b1)) && (await laeuft(b2)), `Bühne 1 ${await laeuft(b1) ? 'spielt' : 'still'}, Bühne 2 ${await laeuft(b2) ? 'spielt' : 'still'}`);
      bed(f, 'Bühne 1 zeigt den Hinweis „Ton auf anderer Bühne“', anders, anders ? 'sichtbar' : 'nicht sichtbar');
      await c1.close(); await c2.close();
    }
    // ---------- N-14 Bühne versucht Moderationsdaten abzurufen ----------
    { const f = fall('N-14', 'Bühnenseite ruft Moderationsdaten ab', 'Erwartung nach heutiger Architektur (Einzelplatz, nur 127.0.0.1, keine Anmeldung): der Abruf GELINGT – es gibt keine Zugriffstrennung zwischen Bühne und Moderation. Geschützt ist nur, dass die Bühne von sich aus keine vertraulichen Inhalte lädt oder zeigt: die Bühnen-Schnittstelle enthält keinen Text einer vertraulichen Karte.');
      await neueUebung(); await u.post('/api/run/jump-to-event/lagekarte/LK15'); await sleep(1500);
      const ctx = await browser.newContext(); const b = await ctx.newPage(); await b.goto(u.B + '/stage.html'); await sleep(1500);
      const r = await b.evaluate(async () => { const x = await fetch('/api/run/moderator-state'); return { status: x.status, laenge: (await x.text()).length }; });
      bed(f, 'Abruf der Moderationsdaten aus der Bühnenseite gelingt (bekannte Einschränkung)', r.status === 200, `HTTP ${r.status}, ${r.laenge} Zeichen`);
      const stage = JSON.stringify(await st()); const treffer = s.sonderlagekarten.filter(k => stage.includes(k.text.slice(0, 60))).map(k => k.id);
      bed(f, 'Bühnen-Schnittstelle enthält keine vertraulichen Kartentexte', !treffer.length, treffer.join(' ') || '0 Treffer');
      f.befunde.push({ schwere: 'mittel', text: 'Keine Zugriffstrennung: Wer den Rechner der Moderation im Netz erreicht oder an der Bühne die Adresse ändert, kann die Moderationsansicht mit allen vertraulichen Texten öffnen. Gemindert durch Bindung an 127.0.0.1 (Standard). Eigenes Projekt „Zugriffsschutz“ (siehe offene Risiken).' });
      await ctx.close();
    }
    // ---------- N-15 Unzulässiger Medienpfad ----------
    { const f = fall('N-15', 'Unzulässige Medien- und Pfadangaben', 'Kein Abruf von Dateien außerhalb von media/ (Projektquellen, Daten, Einstellungen), weder direkt noch kodiert; Logo-Pfad mit „../“ wird ignoriert.');
      const pfade = ['/media/../server/index.js', '/media/%2e%2e/server/index.js', '/media/..%2fserver/index.js', '/media/%2e%2e%2fdata%2fsettings.json', '/../data/settings.json', '/media/waterkant/../../package.json'];
      const ergebnisse = []; for (const p of pfade) { const r = await fetch(u.B + p); const t = await r.text(); ergebnisse.push({ p, status: r.status, leck: /require\(|"smtp"|"dependencies"/.test(t) }); }
      bed(f, 'keine Datei außerhalb media/ ausgeliefert', ergebnisse.every(x => !x.leck), ergebnisse.map(x => `${x.p} → ${x.status}${x.leck ? ' LECK' : ''}`).join('; '));
      const r = await u.post('/api/settings', { branding: { logo: '/media/branding/x/../../../server/index.js' } });
      const ex = await u.get('/api/template/export');
      bed(f, 'Logo-Pfad mit „../“ wird nicht in den Export eingebettet', !ex.brandingLogoFile, `HTTP ${r.status}; eingebettet: ${ex.brandingLogoFile ? ex.brandingLogoFile.name : 'nichts'}`);
      await u.post('/api/settings', { branding: { logo: '/media/branding/excon-logo.png' } });
    }
    // ---------- N-16 Browserabbruch ----------
    { const f = fall('N-16', 'Browser der Moderation stürzt während der Übung ab (Prozess beendet)', 'Die Übung läuft serverseitig weiter (Zeit, Lagen, Zustellungen); ein neu gestarteter Browser zeigt in der Moderation den aktuellen Stand einschließlich festgehaltener Entscheidung; keine Doppelzustellung durch den Abbruch.');
      await neueUebung(); await u.post('/api/run/jump-to-event/lagekarte/LK04');
      // Eigener Browserprozess (launchServer), damit er sich hart beenden lässt. Zyklus 2 nutzte
      // b1.process() – das gibt es an einem Browser-Objekt nicht; der Fehler wurde verschluckt,
      // der Absturz fand nie statt (Befund Z2-01). Deshalb ist der Absturz jetzt selbst eine Bedingung.
      const srv1 = await chromium.launchServer(Object.assign({}, process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}));
      const b1 = await chromium.connect(srv1.wsEndpoint());
      const p1 = await b1.newPage(); await p1.goto(u.B + '/moderator.html'); await sleep(2500);
      let geklickt = true; await p1.locator('.weiche-opt').first().click({ timeout: 5000 }).catch(() => { geklickt = false; }); await sleep(1500);
      bed(f, 'Entscheidung vor dem Absturz über die Oberfläche festgehalten', geklickt && !!gewaehlt(await ms(), 'W1'), geklickt ? `W1 = ${gewaehlt(await ms(), 'W1')}` : 'Klick auf die Entscheidung gescheitert');
      const vorW = gewaehlt(await ms(), 'W1'); const mailsVor = u.mails().length;
      const proz = srv1.process(); const pid = proz.pid;
      const getrennt = new Promise(r => b1.once('disconnected', () => r(true)));
      // Prozessende über das exit-Ereignis feststellen: eine Signal-0-Probe meldet einen noch nicht
      // abgeholten (Zombie-)Kindprozess fälschlich als lebend (beim Retest von Zyklus 3 beobachtet).
      const beendet = new Promise(r => proz.once('exit', (code, sig) => r(sig || String(code))));
      process.kill(-pid, 'SIGKILL'); // ganze Prozessgruppe des Browsers, wie bei einem Absturz
      const [trennung, ende] = await Promise.all([Promise.race([getrennt, sleep(5000).then(() => false)]), Promise.race([beendet, sleep(5000).then(() => null)])]);
      bed(f, 'Browser tatsächlich abgestürzt (Verbindung getrennt, Prozess beendet)', trennung && !!ende && !b1.isConnected(), `getrennt: ${trennung}, Hauptprozess beendet: ${ende ? 'ja (' + ende + ')' : 'nein'}`);
      await sleep(1500);
      await u.post('/api/run/jump-to-event/lagekarte/LK06'); await sleep(2500);
      const m = await ms(); bed(f, 'Übung läuft serverseitig weiter', m.status === 'running', m.status);
      bed(f, 'Entscheidung aus dem abgestürzten Fenster erhalten', !!vorW && gewaehlt(m, 'W1') === vorW, `W1 = ${gewaehlt(m, 'W1')}`);
      const b2 = await chromium.launch(Object.assign({}, process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}));
      const p2 = await b2.newPage(); await p2.goto(u.B + '/moderator.html'); await sleep(2500);
      const lkTitel = s.lagekarten.find(l => l.id === 'LK06').titel; const t = await p2.evaluate(() => document.body.innerText);
      bed(f, 'neuer Browser zeigt die aktuelle Lage', t.includes(lkTitel), lkTitel);
      const zust = (await journal()).filter(x => x.typ === 'vertrauliche karte'); const ids = zust.map(x => x.karte);
      bed(f, 'keine Doppelzustellung', ids.length === new Set(ids).size && u.mails().length >= mailsVor, `${ids.length} Zustellungen, ${new Set(ids).size} verschiedene Karten`);
      await p2.screenshot({ path: path.join(OUTDIR, 'bilder', 'N-16-moderation-nach-abbruch.jpg'), type: 'jpeg', quality: 70 }); await b2.close();
    }
    // ---------- N-17 Rücksprung in der Zeit ----------
    { const f = fall('N-17', 'Zeitsprung zurück auf eine frühere Übungsminute', 'Die Bühne zeigt die zur neuen Minute gehörende frühere Lage; bereits gezeigte Lagen und verschickte Karten werden weder erneut ausgelöst noch erneut verschickt – auch nicht, wenn die Zeit danach wieder über ihre Minuten läuft; festgehaltene Entscheidungen bleiben.');
      await neueUebung(); await u.post('/api/run/jump-to-event/lagekarte/LK09'); await u.post('/api/run/weiche', { id: 'W1', option: 'herunterfahren' }); await sleep(1500);
      const mailsVor = u.mails().length; const lVor = await gezeigt(); const zVor = (await journal()).filter(x => x.typ === 'vertrauliche karte').length;
      const lk04 = s.lagekarten.find(l => l.id === 'LK04');
      const ziel = (await ms()).fullTimeline.find(e => e.type === 'lagekarte' && e.id === 'LK04');
      await u.post('/api/run/jump-to-minute', { minute: ziel.minute + 0.1 }); await sleep(2000);
      const buehne = (await st()).currentLagekarte || {};
      bed(f, 'Bühne zeigt die frühere Lage', buehne.id === 'LK04', `${buehne.id || '–'} (erwartet LK04 ${lk04.titel})`);
      bed(f, 'kein erneuter Versand beim Rücksprung', u.mails().length === mailsVor, `${u.mails().length - mailsVor} neue Mails`);
      await u.post('/api/run/jump-to-event/lagekarte/LK09'); await sleep(2500);
      const lNach = await gezeigt(); const zNach = (await journal()).filter(x => x.typ === 'vertrauliche karte');
      bed(f, 'beim erneuten Vorlauf keine Lage doppelt gezeigt', lNach.length === new Set(lNach).size && lNach.length === lVor.length, `${lVor.length} → ${lNach.length} Einträge „lage gezeigt“`);
      bed(f, 'beim erneuten Vorlauf keine Karte doppelt zugestellt', zNach.length === new Set(zNach.map(x => x.karte)).size && zNach.length === zVor, `${zVor} → ${zNach.length} Zustellungen`);
      bed(f, 'Entscheidung bleibt festgehalten', gewaehlt(await ms(), 'W1') === 'herunterfahren', gewaehlt(await ms(), 'W1'));
    }
  } catch (e) { const z = { name: 'Testlauf an dieser Stelle abgebrochen: ' + e.message, ok: false, beobachtet: (e.stack || '').split('\n').slice(0, 3).join(' ') }; if (aktuell) aktuell.bedingungen.push(z); else faelle.push({ id: 'ABBRUCH', zweck: 'Testlauf abgebrochen', erwartet: '–', bedingungen: [z], befunde: [] }); }
  finally {
    await browser.close().catch(() => {}); await u.ende();
    faelle.forEach(f => { f.ergebnis = f.bedingungen.length && f.bedingungen.every(b => b.ok) ? 'bestanden' : 'NICHT bestanden'; });
    const erg = { zeitpunkt: new Date().toISOString(), szenario: SZ, faelle, bestanden: faelle.filter(f => f.ergebnis === 'bestanden').length, gesamt: faelle.length };
    fs.writeFileSync(path.join(OUTDIR, 'negativ.json'), JSON.stringify(erg, null, 2));
    faelle.forEach(f => console.log(`${f.id} ${f.ergebnis}: ${f.zweck}` + f.bedingungen.filter(b => !b.ok).map(b => `\n   ✗ ${b.name}: ${b.beobachtet}`).join('')));
    console.log(`Negativtests: ${erg.bestanden}/${erg.gesamt} bestanden`);
    process.exitCode = erg.bestanden === erg.gesamt ? 0 : 1;
  }
})();
