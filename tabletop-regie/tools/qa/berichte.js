// Erzeugt die datengetriebenen Abnahmedokumente 03–08 aus einem Nachweisordner.
// Nichts wird von Hand übertragen: jede Zeile stammt aus einer Ergebnisdatei des Laufs.
// Aufruf: node tools/qa/berichte.js <nachweisordner> <zielordner>
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const [NW, ZIEL] = process.argv.slice(2).map(p => path.resolve(p));
fs.mkdirSync(ZIEL, { recursive: true });
const lies = p => { try { return JSON.parse(fs.readFileSync(path.join(NW, p), 'utf8')); } catch (e) { return null; } };
const um = lies('umgebung.json') || {}; const gl = lies('gesamtlauf.json') || { schritte: [] };
const esc = s => String(s == null ? '–' : s).replace(/\|/g, '\\|').replace(/\n+/g, ' ');
const kurz = (s, n = 160) => { s = esc(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const erg = ok => ok ? 'bestanden' : '**NICHT bestanden**';
const sz = { nordtech: 'NordTech', waterkant: 'Waterkant' };
const kopf = (titel, zweck) => [`# ${titel}`, '', `**Geprüfter Commit:** \`${um.commit || '–'}\`${um.sauber ? '' : ' (**nicht sauber eingecheckt – nur Vorlauf**)'} · **Lauf:** ${um.start || '–'} bis ${gl.ende || '–'} · erzeugt mit \`tools/qa/berichte.js\` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).`, '', zweck, ''];
const schritt = n => (gl.schritte || []).find(s => s.name === n);
const schrittZeile = n => { const s = schritt(n); return s ? `Prüfschritt \`${n}\`: Exit-Code ${s.exitCode}, ${s.sekunden} s, Konsole \`${s.konsole}\`` : `Prüfschritt \`${n}\`: nicht ausgeführt`; };
const schreibe = (datei, zeilen) => fs.writeFileSync(path.join(ZIEL, datei), zeilen.join('\n') + '\n');
const e2eFaelle = fs.existsSync(path.join(NW, 'e2e')) ? fs.readdirSync(path.join(NW, 'e2e')).filter(d => fs.existsSync(path.join(NW, 'e2e', d, 'ergebnis.json'))).sort() : [];
const faelleDef = require('./e2e-faelle.json').faelle;
// Reihenfolge wie im Fallkatalog
e2eFaelle.sort((a, b) => faelleDef.findIndex(f => f.id === a) - faelleDef.findIndex(f => f.id === b));

// ---------------- 03 Testfallkatalog ----------------
{
  const w = kopf('03 – Testfallkatalog', 'Alle ausgeführten Testfälle mit Kennung. Felder je Fall: Zweck, Voraussetzung, Eingaben, Schritte, erwartet, tatsächlich, Ergebnis, Schweregrad (nur bei Abweichung), Beweispfad. Gemeinsame Voraussetzungen und Schritte einer Gruppe stehen über der Tabelle. Schweregrad und Einordnung jeder Abweichung: Dokument 10.');
  const tab = () => w.push('| ID | Zweck | Eingaben | erwartet | tatsächlich | Ergebnis | Schweregrad | Beweis |', '|---|---|---|---|---|---|---|---|');
  // Browser
  w.push('## A. End-to-End im Browser (Bedienung über die Oberfläche)', '', '**Voraussetzung:** isolierter Server (eigener Datenordner, lokaler SMTP-Testempfänger), Chromium, Countdown 30 s. **Schritte:** Szenario wählen, SMTP-Felder, Testmail, Rollenvorschlag bzw. alle Rollen, CSV-Import, Teams verteilen, Zieldauer und Schwerpunkt, „Übung vorbereiten“, Moderation, „Bühne öffnen“, Ton aktivieren, „Jetzt beginnt die Krise“, Lage für Lage „Zeitsprung hierhin“, Entscheidungen und Überraschungen über die Schaltflächen, Pause/Fortsetzen, Abschluss bis Fazit, Gesamteinschätzung mit Neuladen, Protokoll- und Journal-Download. Einzelprüfungen je Fall: Dokument 05.', '');
  tab();
  e2eFaelle.forEach(id => { const r = lies(`e2e/${id}/ergebnis.json`); const f = r.fall; const ok = r.pruefungen.every(p => p.ok); const nok = r.pruefungen.filter(p => !p.ok);
    w.push(`| E2E-${id} | Übung ${f.minuten} Min., ${f.schwerpunkt || 'ausgewogen'}, ${sz[f.szenario.includes('nordtech') ? 'nordtech' : 'waterkant']} | Entscheidungen ${Object.entries(f.entscheidungen).map(([k, v]) => k + '=' + v).join(', ')}; Überraschungen ${(f.ueberraschungen || []).map(u => u.id).join(', ') || 'keine'}${f.besetzung === 'alle' ? '; alle Rollen' : ''}${f.zusatzPersonen ? `; +${f.zusatzPersonen} Personen` : ''} | alle ${r.pruefungen.length} Einzelprüfungen erfüllt | ${r.pruefungen.length - nok.length}/${r.pruefungen.length} erfüllt${nok.length ? ': ' + kurz(nok.map(p => p.id + ' ' + p.name).join('; '), 200) : ''} | ${erg(ok)} | ${ok ? '–' : 'siehe 10'} | \`e2e/${id}/\` |`); });
  // Negativ
  const neg = lies('negativ/negativ.json');
  w.push('', '## B. Negativ- und Lasttests', '', '**Voraussetzung:** isolierter Server, Waterkant, 7 besetzte Rollen, Countdown 0 s; SMTP-Testempfänger mit Fehlermodi. Das Soll wurde vor der Ausführung im Testcode festgelegt.', '');
  w.push('| ID | Zweck | erwartet (vorab festgelegt) | tatsächlich | Ergebnis | Schweregrad | Beweis |', '|---|---|---|---|---|---|---|');
  (neg ? neg.faelle : []).forEach(f => w.push(`| ${f.id} | ${esc(f.zweck)} | ${kurz(f.erwartet, 400)} | ${kurz(f.bedingungen.map(b => (b.ok ? '✓ ' : '✗ ') + b.name + ': ' + b.beobachtet).join(' · '), 600)}${f.befunde.length ? ' · Befund: ' + kurz(f.befunde.map(b => `[${b.schwere}] ${b.text}`).join(' '), 300) : ''} | ${erg(f.ergebnis === 'bestanden')} | ${f.ergebnis === 'bestanden' ? (f.befunde.length ? 'Befund ' + f.befunde.map(b => b.schwere).join('/') : '–') : 'siehe 10'} | \`negativ/negativ.json\` |`));
  // Sicherheit
  const sich = lies('sicherheit/sicherheit.json');
  w.push('', '## C. Sicherheit', '', '**Voraussetzung:** isolierter Server (`tools/qa/mit-server.js`), Prüfung gegen dessen Adresse. ' + schrittZeile('sicherheit'), '');
  w.push('| ID | Zweck | tatsächlich | Ergebnis | Beweis |', '|---|---|---|---|---|');
  (sich || []).forEach((x, i) => w.push(`| S${i + 1} | ${esc(x.name)} | ${kurz(x.beob, 300)} | ${erg(x.ok)} | \`sicherheit/sicherheit.json\` |`));
  // Referenz
  const ref = lies('referenz/referenz.json');
  w.push('', '## D. Handgerechnete Referenzfälle', '', '**Voraussetzung:** Sollwerte in `docs/final-qa/referenz-sollwerte.json` (feste Zahlen mit Rechenweg). **Schritte:** Übung mit 90 Min. starten, Entscheidungen festhalten bzw. Karte auslösen, Werte der Moderation lesen.', '');
  w.push('| ID | Art | erwartet | tatsächlich | Ergebnis | Beweis |', '|---|---|---|---|---|---|');
  (ref ? ref.faelle : []).forEach(x => w.push(`| ${x.id} | ${esc(x.art)} | ${esc(x.soll)}${x.rechenweg ? ' (' + kurz(x.rechenweg, 200) + ')' : ''} | ${esc(x.ist)} | ${erg(x.ok)} | \`referenz/referenz.json\` |`));
  // Integration
  for (const k of ['nordtech', 'waterkant']) {
    const r = lies(`integration/${k}.json`); if (!r) continue;
    w.push('', `## E. Integration mit Orakel – ${sz[k]}`, '', `**Voraussetzung:** isolierter Server, Countdown 0 s, Lagen per Zeitsprung, empfohlene Besetzung je Dauer. **Orakel:** \`tools/qa/orakel.js\` (eigene Logik, ohne Engine und Server). Orakel-Selbsttest: ${Object.entries(r.orakelSelbsttest || {}).map(([g, t]) => `${g}: ${t.erkannt ? 'falsche Erwartungen erkannt' : '**blind**'} (${t.umgedrehteEntscheidungen}/${t.falscheEmpfaenger}/${t.vertauschteReihenfolge} Befunde)`).join('; ')}. ${schrittZeile('integration-' + k)}`, '');
    w.push('| ID | Gruppe | Eingaben | Lagen | vertrauliche Karten | Brutto (Orakel) | Ergebnis | Befunde |', '|---|---|---|---|---|---|---|---|');
    r.ergebnisse.forEach(x => w.push(`| INT-${k.slice(0, 2).toUpperCase()}-${x.id} | ${esc(x.gruppe)} | ${x.minuten} Min., ${esc(x.schwerpunkt)}, ${Object.values(x.entscheidungen || {}).join('/')} | ${x.lagen} | ${x.zustellungen} | ${x.soll && x.soll.rechnung ? x.soll.rechnung.brutto.toLocaleString('de-DE') : '–'} | ${erg(x.ok)} | ${x.befunde && x.befunde.length ? kurz(x.befunde.join('; '), 200) : '–'} |`));
  }
  // Lauf, Bühne, Protokoll
  for (const [teil, datei, titel] of [['lauf', k => `lauf/${k}.json`, 'Zeitablauf und Mails'], ['buehne', k => `buehne/${k}/ergebnis.json`, 'Bühne im Browser'], ['protokoll', k => `protokoll/${k}.json`, 'Protokoll über alle Varianten']]) {
    for (const k of ['nordtech', 'waterkant']) { const r = lies(datei(k)); if (!r) continue;
      w.push('', `## F. ${titel} – ${sz[k]}`, '', schrittZeile(`${teil}-${k}`), '');
      w.push('| ID | Zweck | erwartet | tatsächlich | Ergebnis | Beweis |', '|---|---|---|---|---|---|');
      r.ergebnisse.forEach((x, i) => w.push(`| ${teil.toUpperCase().slice(0, 3)}-${k.slice(0, 2).toUpperCase()}-${x.id || ''}${i + 1} | ${kurz(x.name, 140)} | ${kurz(x.erwartet, 160)} | ${kurz(x.beobachtet, 200)} | ${erg(x.ok)} | \`${datei(k)}\` |`));
    }
  }
  // Medien, Regression, Replay
  const med = lies('medien/medien.json');
  if (med) { w.push('', '## G. Medien (technische Messung)', '', 'Einzelwerte je Datei: Dokument 06.', ''); w.push('| ID | Szenario | Verweise | technisch in Ordnung | akustisch abgenommen |', '|---|---|---|---|---|');
    med.szenarien.forEach(s => w.push(`| MED-${s.datei.includes('nordtech') ? 'NT' : 'WK'} | ${s.datei} | ${s.gesamt} | ${s.bestanden}/${s.gesamt} | ${s.akustischAbgenommen}/${s.toene} Töne |`)); }
  const reg = lies('regression/nordtech.json');
  if (reg) { w.push('', '## H. NordTech-Regression', '', `${reg.kombinationen} Kombinationen, Ausgangsstand \`${um.baselineNordTech}\` gegen geprüften Stand. Einzelheiten: Dokument 08.`, ''); w.push('| ID | Aspekt | gleich |', '|---|---|---|'); reg.aspekte.forEach(a => w.push(`| REG-${a.aspekt} | ${a.aspekt} | ${a.gleich}/${reg.kombinationen} |`)); }
  ['NT-90-ausgewogen', 'WK-90-ausgewogen'].forEach(id => { const r = lies(`replay/${id}.json`); if (r) w.push('', `**REPLAY-${id}:** ${r.identisch ? 'identischer Verlauf' : '**Abweichung**'} (${r.aktionenWiederholt} Bedienaktionen wiederholt; gleiches Drehbuch: ${r.gleichesDrehbuch ? 'ja' : 'nein'}) – \`replay/${id}.json\``); });
  schreibe('03-testfallkatalog.md', w);
}

// ---------------- 04 Varianten- und Entscheidungsmatrix ----------------
{
  const w = kopf('04 – Varianten und Entscheidungsmatrix', 'Alle Kombinationen aus Dauer (45, 60, 90, 120, 180 Min.) und Schwerpunkt (Ausgewogen und vier fachliche Schwerpunkte = 5; 25 Kombinationen je Szenario) sowie alle Entscheidungskombinationen (NordTech W1–W4: 16; Waterkant W1–W5: 32) – einmal als Regelprüfung des Drehbuchs (`tools/varianten.js`) und einmal über den echten Server gegen das unabhängige Orakel (`tools/qa/integration.js`).');
  w.push('## Je Kombination geprüft (Integration)', '', '| Prüfung | Quelle des Solls |', '|---|---|',
    '| alle Pflichtlagen (Priorität 1) enthalten | Drehbuch, Orakel-Planregel 1 |', '| Lagen in aufsteigender Drehbuchminute (Reihenfolge) | Orakel-Planregel 2 |', '| keine Karte doppelt | Orakel-Planregel 3 |',
    '| vertrauliche Karte erreichbar, nach Voraussetzungen, nach „zu Beginn von“-Lage, nie vor ihrer Heimatlage (keine verfrühte Karte) | Orakel-Planregel 4 und Prüfung der Zustellreihenfolge im Journal |',
    '| Pflichtkarte des Schwerpunkts gespielt, sofern erreichbar | Orakel-Planregel 5 |', '| erste Lage Vorbote, letzte Wiederanlauf | Orakel-Planregel 6 |', '| gezeigte Lagen = Plan | Journal |',
    '| Empfängerrolle jeder Zustellung (inkl. Ersatzrollen), genau eine Mail je Person | Orakel `empfaenger` |', '| eingeplante vertrauliche Karten tatsächlich zugestellt | Plan/Journal |',
    '| Zusatztexte und Krisen-Info der gewählten Option auf der Bühne; keine Zusätze nicht gewählter Optionen (spätere Wirkungen) | Orakel `wirkungen` |', '| Folgekarten der gewählten Option zugestellt, sofern ihre Lage gespielt wird; nie Folgekarten anderer Optionen | Orakel `wirkungen` |',
    '| ersetzte Kartentexte in der Mail | Orakel `wirkungen` |', '| Überraschungen gesperrt/freigegeben wie im Drehbuch (Voraussetzung, Mindestdauer, Pflichtrolle) | Orakel `bonusEinsetzbar` |', '| Rechnung (Brutto, Erstattung, beim Unternehmen) | Orakel `rechnung` (eigene Summierung) |', '| Krisenzeit ≤ Zieldauer | Fallvorgabe |', '');
  for (const k of ['nordtech', 'waterkant']) {
    const r = lies(`integration/${k}.json`); const v = lies(`varianten/${k}.json`);
    w.push(`## ${sz[k]}`, '');
    if (v) w.push(`**Regelprüfung des Drehbuchs** (\`varianten/${k}.md\`, \`varianten/${k}.json\`): ${v.befunde.length ? '**' + v.befunde.length + ' Befunde**: ' + v.befunde.map(b => b.id + ' ' + b.text).join('; ') : 'keine Befunde in den automatisch geprüften Regeln'}. Der Bericht enthält zusätzlich die Abschnitte „in keiner der Kombinationen gespielt“, „Reichweite der Entscheidungsfolgen“ und „über eine Tagesgrenze verschoben“.`, '');
    if (!r) { w.push('Integration: nicht ausgeführt.', ''); continue; }
    const dxs = r.ergebnisse.filter(x => x.gruppe === 'Dauer × Schwerpunkt'); const exs = r.ergebnisse.filter(x => x.gruppe === 'Entscheidungskombination');
    w.push(`**Integration:** ${r.ergebnisse.filter(x => x.ok).length}/${r.ergebnisse.length} Läufe ohne Befund (\`integration/${k}.json\`).`, '');
    const sps = [...new Set(dxs.map(x => x.schwerpunkt))];
    w.push('### Dauer × Schwerpunkt (Anzahl Lagen / vertrauliche Karten; ✓ = ohne Befund)', '', '| Dauer | ' + sps.join(' | ') + ' |', '|---|' + sps.map(() => '---').join('|') + '|');
    [45, 60, 90, 120, 180].forEach(m => w.push(`| ${m} | ` + sps.map(sp => { const x = dxs.find(y => y.minuten === m && y.schwerpunkt === sp); return x ? `${x.ok ? '✓' : '✗'} ${x.lagen}/${x.zustellungen}` : '–'; }).join(' | ') + ' |'));
    w.push('', '### Entscheidungskombinationen bei 90 Min., Ausgewogen', '', '| Lauf | ' + Object.keys(exs[0].entscheidungen).join(' | ') + ' | Lagen | vertr. Karten | Brutto | beim Unternehmen | Ergebnis |', '|---|' + Object.keys(exs[0].entscheidungen).map(() => '---').join('|') + '|---|---|---|---|---|');
    exs.forEach(x => w.push(`| ${x.id} | ${Object.values(x.entscheidungen).join(' | ')} | ${x.lagen} | ${x.zustellungen} | ${x.soll.rechnung.brutto.toLocaleString('de-DE')} € | ${x.soll.rechnung.beimUnternehmen.toLocaleString('de-DE')} € | ${x.ok ? 'ohne Befund' : '**' + kurz(x.befunde.join('; '), 120) + '**'} |`));
    w.push('');
  }
  w.push('## Grenzen', '', '- Welche optionalen Karten das Zeitbudget auswählt, ist kein unabhängiger Sollwert: geprüft werden nur die Regeln (schwache Prüfung im Sinne von Dokument 01, Abschnitt 5).', '- Die 25 Läufe Dauer × Schwerpunkt verwenden je eine Entscheidungskombination (zyklisch), nicht alle Kombinationen je Dauer.', '- Ob eine Variante fachlich und didaktisch trägt, prüft keine dieser Regeln (Gate D).');
  schreibe('04-varianten-und-entscheidungsmatrix.md', w);
}

// ---------------- 05 E2E-Spielverläufe ----------------
{
  const w = kopf('05 – End-to-End-Spielverläufe im Browser', 'Je Fall ein vollständiger Übungsverlauf im echten Browser (Chromium), bedient über die Oberfläche. Die Schnittstelle wurde nur lesend zur Dokumentation genutzt. Kein Teilnehmergespräch wurde simuliert: Gesprächsleitfäden sind nur als „angezeigt“ vermerkt. Zeit: Countdown echt (30 s), Lagen per „Zeitsprung hierhin“, Pause 8 s echt. Jede Lage: Bildschirmfoto Bühne und Moderation, Trace (`trace.zip`, öffnen mit `npx playwright show-trace`), bereinigtes Serverprotokoll (`server.log`), Protokoll- und Journal-Export.');
  w.push('## Übersicht', '', '| Fall | Szenario | Dauer | Schwerpunkt | Besetzung | Entscheidungen | Lagen | Prüfungen | Ersatzklicks | Ergebnis |', '|---|---|---|---|---|---|---|---|---|---|');
  e2eFaelle.forEach(id => { const r = lies(`e2e/${id}/ergebnis.json`); const f = r.fall; const ok = r.pruefungen.every(p => p.ok);
    w.push(`| ${id} | ${f.szenario.includes('nordtech') ? 'NordTech' : 'Waterkant'} | ${f.minuten} | ${f.schwerpunkt || 'ausgewogen'} | ${r.bericht.besetzteRollen ? r.bericht.besetzteRollen.length + ' Rollen, ' + r.bericht.personen + ' Personen' : '–'} | ${Object.values(f.entscheidungen).join('/')} | ${r.lagen.length} | ${r.pruefungen.filter(p => p.ok).length}/${r.pruefungen.length} | ${r.bericht.ersatzklicks || 0} | ${erg(ok)} |`); });
  w.push('', '„Ersatzklicks“: Klicks, bei denen die normale Klickprüfung von Playwright nicht abgeschlossen wurde und ein Mausklick ohne Ruheprüfung auf dieselbe Schaltfläche folgte. Sie sind ausgewiesen, damit die Zahl echter Bedienungen nicht überschätzt wird.', '');
  e2eFaelle.forEach(id => { const r = lies(`e2e/${id}/ergebnis.json`); const f = r.fall; const def = faelleDef.find(x => x.id === id) || {};
    w.push(`## ${id}`, '', `${def.zweck ? esc(def.zweck) + ' · ' : ''}Sitzung \`${r.bericht.sitzung}\` · Entscheidungen: ${Object.entries(f.entscheidungen).map(([k, v]) => k + '=' + v).join(', ')} · Überraschungen: ${(f.ueberraschungen || []).map(u => `${u.id} nach ${u.nach}${u.erwartetGesperrt ? ' (vorher gesperrt erwartet)' : ''}`).join(', ') || 'keine'} · Bilder: Setup \`e2e/${id}/${r.bericht.setupBild}\`, Bilanz \`e2e/${id}/${r.bericht.bilanzBild}\`, Fazit \`e2e/${id}/${r.bericht.fazitBild}\``, '');
    w.push('### Lage für Lage', '', '| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|');
    r.lagen.forEach((l, i) => w.push(`| ${i + 1} | ${l.lage} ${esc(l.titel)} | ${esc(l.simulationszeit)} | ${esc(l.uebungszeit)} | ${l.buehneZeigtTitel ? '✓' : '✗'}/${l.buehneZeigtSimZeit ? '✓' : '✗'} | ${l.moderationZeigtLage ? '✓' : '✗'} | ${(l.zustellungen || []).map(z => typeof z === 'string' ? z : `${z.karte}→${z.rolle || z.empfaengerRolle}`).join(', ') || '–'} | ${(l.entscheidungenStand || []).join(' ')} | ${l.zusaetzeSichtbar ? l.zusaetzeSichtbar + ' Zusatz' : '–'}${l.gespraech ? ' · Gesprächsleitfaden angezeigt' : ''} | ${l.medium ? esc(l.medium.bild) : '–'} / ${l.medium && l.medium.ton && l.medium.ton.laeuft ? esc(l.medium.ton.datei) + ' läuft' : 'kein Ton läuft'} | ${l.spielbrett ? `${l.spielbrett.amZug} am Zug, ${l.spielbrett.nichtErreichbar} nicht erreichbar` : '–'} | ${l.leck} | \`e2e/${id}/${l.bildBuehne}\`, \`e2e/${id}/${l.bildModeration}\` |`));
    w.push('', '### Einzelprüfungen', '', '| ID | Prüfung | erwartet | beobachtet | Ergebnis |', '|---|---|---|---|---|');
    r.pruefungen.forEach(p => w.push(`| ${p.id} | ${esc(p.name)} | ${kurz(p.erwartet, 200)} | ${kurz(p.beobachtet, 260)} | ${erg(p.ok)} |`));
    if ((r.bericht.dialoge || []).length) w.push('', 'Dialoge des Browsers (angenommen): ' + r.bericht.dialoge.map(esc).join(' · '));
    w.push('');
  });
  schreibe('05-e2e-spielverlaeufe.md', w);
}

// ---------------- 06 Browser- und Mediennachweise ----------------
{
  const w = kopf('06 – Browser- und Mediennachweise', 'Bühnentest im Browser (Generalprobe aller Lagen, Stummschalten, Wiederholen, Zeitsprung im Ton, Neuladen, Unterbrechung, Abschluss) und technische Medienmessung. Ob ein Ton im Raum verständlich, passend und angemessen laut ist, kann keine Messung feststellen: jeder Ton trägt „akustisch nicht abgenommen“, bis ein Mensch ihn gehört und in `docs/final-qa/hoerprotokoll.json` eingetragen hat.');
  for (const k of ['nordtech', 'waterkant']) { const r = lies(`buehne/${k}/ergebnis.json`); if (!r) continue;
    w.push(`## Bühne – ${sz[k]}`, '', schrittZeile('buehne-' + k), '', '| ID | Prüfung | Ergebnis | beobachtet |', '|---|---|---|---|');
    r.ergebnisse.forEach(x => w.push(`| ${x.id} | ${esc(x.name)} | ${erg(x.ok)} | ${kurz(x.beobachtet, 300)} |`));
    if (r.generalprobe) { w.push('', '### Generalprobe: jede Lage und jede öffentliche Überraschung auf der Bühne', '', '| Karte | Titel | Bild geladen | Soll-Ton | gespielter Ton | Übungshinweis auf der Bühne | Bildschirmfoto |', '|---|---|---|---|---|---|---|');
      r.generalprobe.forEach(g => w.push(`| ${g.id} | ${esc(g.titel)} | ${g.bildGeladen ? 'ja' : '**nein**'} | ${esc(g.sollTon || '–')} | ${esc(g.ton)} | ${g.uebungshinweis ? esc(g.uebungshinweis) : '–'} | \`buehne/${k}/${g.bild}\` |`)); }
    w.push('');
  }
  const med = lies('medien/medien.json');
  if (med) { w.push('## Medienmessung', '', `Grenzwerte (vor der Messung festgelegt): Lautheit ${med.grenzen.lufsMin} … ${med.grenzen.lufsMax} LUFS, True Peak ≤ ${med.grenzen.truePeakMax} dBTP, Ereignistöne ≤ ${med.grenzen.ereignisMaxSek} s und ≤ Diskussionszeit der Lage. „wirksam“ = Lautheit der Datei zuzüglich der Abspiellautstärke aus dem Drehbuch (nur Information).`, '');
    med.szenarien.forEach(s => { w.push(`### ${s.datei}`, '', `${s.bestanden}/${s.gesamt} Verweise technisch in Ordnung; Töne akustisch abgenommen: ${s.akustischAbgenommen}/${s.toene}.`, '', '| Karte | Art | Datei | Messwerte | Prüfungen | akustisch |', '|---|---|---|---|---|---|');
      s.dateien.forEach(d => w.push(`| ${d.karte} | ${d.art}${d.alarm ? ' (Alarm)' : ''} | \`${path.basename(d.datei)}\` | ${d.art === 'Ton' ? `${d.dauer} s, ${d.lufs} LUFS${d.wirksameLautheit != null ? ` (wirksam ${d.wirksameLautheit})` : ''}, TP ${d.truePeak} dBTP` : `${d.breite}×${d.hoehe} ${d.codec}`} | ${d.pruefungen.map(p => (p.ok ? '✓ ' : '✗ ') + p.name + (p.ok ? '' : ' (' + p.beob + ')')).join('; ')}${d.hinweis ? ' · Hinweis: ' + esc(d.hinweis) : ''} | ${esc(d.akustisch)} |`));
      if (Object.keys(s.mehrfachVerwendet).length) w.push('', 'Mehrfach verwendet: ' + Object.entries(s.mehrfachVerwendet).map(([f, ks]) => `\`${path.basename(f)}\` (${ks.join(', ')})`).join('; '));
      if (s.unbenutzteDateien.length) w.push('', 'Im Medienordner, aber von keinem Drehbuchfeld verwendet (frühere Fassungen, Varianten): ' + s.unbenutzteDateien.map(f => '`' + f + '`').join(', '));
      w.push(''); }); }
  schreibe('06-browser-und-mediennachweise.md', w);
}

// ---------------- 07 Mail- und Sicherheitstests ----------------
{
  const w = kopf('07 – Mail- und Sicherheitstests', 'Alle Mails gingen ausschließlich an den lokalen SMTP-Testempfänger der jeweiligen Testumgebung (127.0.0.1); Adressen nur `@example.com`. Mailzählung und Empfängerprüfung in den Browser-Durchläufen: Prüfungen S2, S5, O1, O2 in Dokument 05.');
  const neg = lies('negativ/negativ.json');
  if (neg) { w.push('## Negativ- und Lasttests', '', `${neg.bestanden}/${neg.gesamt} Fälle bestanden (\`negativ/negativ.json\`, Bilder in \`negativ/bilder/\`). ${schrittZeile('negativ')}`, '');
    neg.faelle.forEach(f => { w.push(`### ${f.id} – ${esc(f.zweck)}`, '', `**Soll (vorab festgelegt):** ${esc(f.erwartet)}`, '', '| Bedingung | beobachtet | erfüllt |', '|---|---|---|'); f.bedingungen.forEach(b => w.push(`| ${esc(b.name)} | ${kurz(b.beobachtet, 300)} | ${b.ok ? 'ja' : '**nein**'} |`)); w.push('', `**Ergebnis:** ${erg(f.ergebnis === 'bestanden')}`); f.befunde.forEach(b => w.push('', `**Befund (${b.schwere}):** ${esc(b.text)}`)); w.push(''); }); }
  const sich = lies('sicherheit/sicherheit.json');
  if (sich) { w.push('## Sicherheitsprüfung', '', schrittZeile('sicherheit'), '', '| ID | Prüfung | beobachtet | Ergebnis |', '|---|---|---|---|'); sich.forEach((x, i) => w.push(`| S${i + 1} | ${esc(x.name)} | ${kurz(x.beob, 300)} | ${erg(x.ok)} |`)); }
  for (const k of ['nordtech', 'waterkant']) { const r = lies(`lauf/${k}.json`); if (!r) continue; const mail = r.ergebnisse.filter(x => /mail|Mail|Begrüßung|Urkunde|SMTP|Zustell|Testmodus/i.test(x.name + x.erwartet));
    w.push('', `## Mailbezogene Prüfungen im Lauftest – ${sz[k]}`, '', '| ID | Prüfung | beobachtet | Ergebnis |', '|---|---|---|---|'); mail.forEach(x => w.push(`| ${x.id} | ${esc(x.name)} | ${kurz(x.beobachtet, 260)} | ${erg(x.ok)} |`)); }
  schreibe('07-mail-und-sicherheitstests.md', w);
}

// ---------------- 08 Szenario-Regression ----------------
{
  const w = kopf('08 – Szenario-Regression', 'NordTech ist eingefroren. Verglichen wird das beobachtbare Verhalten über die Server-Schnittstelle: Ausgangsstand (Commit der NordTech-Freigabe) gegen geprüften Stand, je Kombination mit derselben Besetzung, denselben Startwerten und denselben Entscheidungen.');
  const reg = lies('regression/nordtech.json');
  if (reg) {
    w.push(`**Ausgangsstand:** \`${um.baselineNordTech}\` · **Kombinationen:** ${reg.kombinationen} (25 × Dauer/Schwerpunkt ohne Entscheidungen, 16 × Entscheidungen bei 90 Min.) · **identisch in allen Aspekten:** ${reg.identisch}/${reg.kombinationen} · Dauer ${reg.dauerSekunden} s · ${schrittZeile('regression-nordtech')}`, '');
    w.push('| Aspekt | Inhalt des Vergleichs | gleich |', '|---|---|---|');
    const was = { besetzung: 'empfohlene Rollen je Dauer', ablaufplan: 'Karten, Reihenfolge und Minute jeder Karte', buehne: 'je gezeigter Lage: ID, Titel, Simulationszeit, Text mit Zusätzen, Krisen-Info, Aufgabe, Bild, Ton', zustellungen: 'vertrauliche Karte → Empfängerrolle', kartentexte: 'Text jeder zugestellten Karte (inkl. ersetzter Texte)', rechnung: 'vollständige Rechnung inkl. Posten, Erstattung, Eigenanteil, Kennzahlen', kriterien: 'Kriterien des Bewertungsrasters im Protokoll (Soll: 8)', summenzeile: 'Summenzeile des Rasters' };
    reg.aspekte.forEach(a => w.push(`| ${a.aspekt} | ${was[a.aspekt] || ''} | ${a.gleich}/${reg.kombinationen} |`));
    w.push('', `Kriterien im Ausgangsstand: ${reg.kriterienBasis.filter(k => !/^\*\*/.test(k)).join(' · ')}`, '');
    const ab = reg.vergleiche.filter(v => !v.identisch);
    w.push('### Abweichungen', '', ab.length ? ab.map(v => `- **${v.id}:** ${kurz(JSON.stringify(v.details), 600)}`).join('\n') : 'Keine.', '');
    w.push('### Je Kombination', '', '| Kombination | Lagen | vertrauliche Karten | Brutto | identisch |', '|---|---|---|---|---|');
    reg.vergleiche.forEach(v => w.push(`| ${v.id} | ${v.umfang.lagen} | ${v.umfang.zustellungen} | ${v.umfang.brutto != null ? v.umfang.brutto.toLocaleString('de-DE') + ' €' : '–'} | ${v.identisch ? 'ja' : '**nein**'} |`));
    w.push('', 'Nicht Gegenstand dieses Vergleichs (und bewusst geändert): Plattformfunktionen außerhalb des Drehbuchs – Prüfstand, Ereignisjournal, Gesamteinschätzung mit Werten, CSRF-Kopf, Zustellstatus in der Moderation. Das NordTech-Drehbuch selbst, `server/runEngine.js` und `server/finale.js` sind seit dem Ausgangsstand byteweise unverändert (siehe Prüfsummen in `umgebung.json` und `git diff` im README des Pakets).');
  }
  w.push('', '## Replay aus dem Ereignisjournal', '');
  ['NT-90-ausgewogen', 'WK-90-ausgewogen'].forEach(id => { const r = lies(`replay/${id}.json`); if (!r) { w.push(`- ${id}: nicht ausgeführt`); return; }
    w.push(`### ${id}`, '', `Quelle: Journal des Browser-Durchlaufs (Sitzung \`${r.sitzungOriginal}\`), gleiches Drehbuch: ${r.gleichesDrehbuch ? 'ja' : '**nein**'}, ${r.aktionenWiederholt} Bedienaktionen wiederholt. Ergebnis: **${r.identisch ? 'identischer Verlauf' : 'Abweichung'}**${r.fehler ? ' – ' + esc(r.fehler) : ''}.`, '', '| Vergleich | gleich | Original | Replay |', '|---|---|---|---|');
    Object.entries(r.vergleich || {}).forEach(([k, v]) => w.push(`| ${k} | ${v.gleich ? 'ja' : '**nein**'} | ${kurz(v.original.join(' '), 300)} | ${kurz(v.replay.join(' '), 300)} |`)); w.push(''); });
  w.push('Grenzen des Replays: Wartezeiten der echten Übung werden nicht nachgebildet (ein Zeitsprung löst fällige Ereignisse gesammelt aus); Mailfehler entstehen nur, wenn der Test-Mailempfänger im Replay ebenfalls gestört wird.');
  schreibe('08-szenario-regression.md', w);
}
// ---------------- Anhang zu 09: Delta-Regeln Waterkant ----------------
{
  const d = lies('delta/waterkant.json');
  const w = kopf('Anhang zu 09 – Delta-Regeln Waterkant', 'Je Befund der Fremdprüfung die Text- und Strukturregeln, die die beschlossene Korrektur im Drehbuch bzw. in den Begleitdateien belegen (`tools/qa/delta-waterkant.js`). Stufe: Regelprüfung am Drehbuch; F07 zusätzlich über die Integrationsläufe. Fachliche Richtigkeit: Gate D.');
  if (!d) w.push('Nicht ausgeführt.');
  else d.befunde.forEach(b => { w.push(`## ${b.id} – ${esc(b.titel)}: ${b.ergebnis}`, '', '| Regel | Beleg | erfüllt |', '|---|---|---|'); b.regeln.forEach(r => w.push(`| ${esc(r.name)} | ${kurz(r.beleg, 260)} | ${r.ok ? 'ja' : '**nein**'} |`)); w.push(''); });
  schreibe('09-anhang-delta-regeln.md', w);
}
console.log('Dokumente 03–08 und Anhang zu 09 geschrieben nach ' + ZIEL);
