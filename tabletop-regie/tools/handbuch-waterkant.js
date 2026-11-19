// Erzeugt docs/waterkant-moderationshandbuch.md aus dem Drehbuch (Ablauf, Entscheidungen,
// Überraschungen, Gesprächsleitfäden, Bewertungsraster) und festen Moderationstexten.
// Aufruf: node tools/handbuch-waterkant.js [ausgabe.md]
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scenario.waterkant.json'), 'utf8'));
const e = require(path.join(ROOT, 'server', 'runEngine'));
const OUT = process.argv[2] || path.join(ROOT, 'docs', 'waterkant-moderationshandbuch.md');
const out = []; const w = (...l) => out.push(...l);
const role = id => (s.roles.find(r => r.id === id) || {}).funktion || id;
const lk = id => s.lagekarten.find(l => l.id === id);
const AKT = Object.fromEntries(e.AKTE.map(a => [a.key, a.label]));
const mf = s.moderationsleitfaden;

w(`# Moderationshandbuch Waterkant – „${s.title}“`, '', `Version 1.0 · Stand ${new Date().toISOString().slice(0, 10)} · erzeugt mit \`tools/handbuch-waterkant.js\` aus \`data/scenario.waterkant.json\`. Alle Inhalte fiktiv. Die Karten enthalten keine Rechts-, Versicherungs- oder Arbeitsschutzberatung; Fachfragen werden festgehalten und an die zuständigen Fachabteilungen gegeben.`, '',
  '**Status:** Arbeitsfassung für den moderierten Probelauf. Nicht freigegeben für einen externen Pilot (siehe Review-Paket, Dokument 12).', '');

w('## 1. Format und Dauer', '',
  '- **Pilotfestlegung:** Konfiguration 90 Minuten in einem Termin von mindestens 120 Minuten. Abschluss und Rechnung ca. 10 Minuten, danach Debriefing separat mindestens 20 Minuten. Schwerpunkt „Ausgewogen“ (enthält die Rücksicherung mit den Basisdiensten) oder „Krisenführung und Personenschutz“ (enthält Feuerwehr-Gespräch, Verbundbeirat und Versicherer).',
  '- **Pilotstandard: 90 Minuten oder länger.** Nur dann sind alle fünf Entscheidungen mit ausreichender Diskussionszeit spielbar, die Überraschung B7 (Stellvertretung) ist einsetzbar, und für Abschluss und Debriefing bleiben mindestens 9 Minuten.',
  '- **45 und 60 Minuten nur als Executive-Kurzformat:** fünf Entscheidungen bei rund 1–2 Minuten Entscheidungszeit je Lage. Erwartung an die Tiefe ausdrücklich senken („Wir prüfen Prioritäten, nicht Details“), Debriefing gesondert ansetzen (mindestens 20 Minuten im Anschluss).',
  '- 120 und 180 Minuten: mehr Lagen; mit Schwerpunkt „Krisenführung und Personenschutz“ kommen auch Versicherer (LK24, ab 90 Min.), Brandursache (LK26, ab 120 Min.) und die Rückkehrentscheidung (LK28, 180 Min.) ins Spiel.', '');

w('## 2. Vorbereitung (Checkliste)', '',
  '| Wann | Was | Erledigt |', '|---|---|---|',
  '| 2 Wochen vorher | Termin, Raum mit zwei Bildschirmen (Moderation nie geteilt, Bühne für alle), Besetzung nach Rollenvorschlag (unten), Schwerpunkt festlegen | ☐ |',
  '| 2 Wochen vorher | **Alarmtöne abstimmen:** Empfang, Sicherheitsdienst und Brandschutzbeauftragte am Übungsort informieren; klären, ob Alarm-Einspielungen (LK04, B5) abgespielt werden dürfen | ☐ |',
  '| 1 Woche vorher | Mailweg testen: Testmail, ein Durchlauf im Testmodus (alle Mails an eine Dummy-Adresse), danach zwei echte Testpostfächer | ☐ |',
  '| 1 Woche vorher | Rechner der Moderation: Werkzeug lokal (Standard), kein Netzbetrieb; Bildschirmsperre; nach der Übung Lauf zurücksetzen und Personen entfernen | ☐ |',
  '| Vortag | Offline-Fallback: vertrauliche Karten der Besetzung ausdrucken und je Rolle in Umschläge legen (für Mailausfall); Handbuch und Drehbuch-Export (Dokument 05) ausgedruckt | ☐ |',
  '| Vortag | Begrüßung und Rollenbriefing per Mail verschicken („Übung vorbereiten“) | ☐ |',
  '| Am Tag | Türschild „Übung läuft – Alarmtöne sind Einspielungen“; Lautstärke testen (nur Raum, nie Haus- oder Durchsageanlage); Bühne: „Ton aktivieren“ | ☐ |',
  '| Am Tag | Ansage an alle: Bei einem **echten** Alarm wird die Übung sofort unterbrochen („Übung unterbrochen – echter Alarm“), alle folgen den Anweisungen vor Ort | ☐ |', '');
w('### Rollenvorschlag je Dauer', '', '| Dauer | Rollen |', '|---:|---|');
[45, 60, 90, 120, 180].forEach(m => { const r = e.recommendRoles(s, { targetMinutes: m }); w(`| ${m} Min. | ${r.roleIds.map(role).join(' · ')} |`); });
w('', 'Kommen mehr Personen, spielen sie in Teams (mehrere Personen je Rolle). Ist eine Rolle nicht besetzt, gehen ihre Karten an die Ersatzrolle; die Mail sagt das ausdrücklich.', '');

w('## 3. Ablauf (Beispiel 90 Minuten, Schwerpunkt „Ausgewogen“)', '');
const rec = e.recommendRoles(s, { targetMinutes: 90 });
const p = e.buildAdaptiveSchedule(s, { targetMinutes: 90, difficulty: 'mittel', roleCount: rec.groups.length, activeRoleIds: rec.roleIds });
w(`Krisenzeit ${p.totalMinutes} Min. + Abschluss ca. ${p.finaleMinutes} Min. Die Minuten sind Richtwerte; das Werkzeug löst die Lagen automatisch aus, die Moderation kann pausieren und springen.`, '', '| Min. | Lage | Station | Ton | Entscheidung | Hinweis für die Moderation |', '|---:|---|---|---|---|---|');
p.schedule.filter(x => x.type === 'lagekarte').forEach(x => { const l = lk(x.id); const wc = (s.weichen || []).find(wv => wv.lagekarten[0] === x.id);
  w(`| ${x.minute.toFixed(0)} | ${l.id} ${l.titel} (${l.simZeit}) | ${AKT[l.akt]} | ${l.sound ? (l.sound.uebungshinweis ? 'Alarm-Einspielung (Übung)' : l.sound.signal ? 'Signal, dann live' : 'Einspielung') : '–'} | ${wc ? wc.id : '–'} | ${(l.moderatorHinweis || '').replace(/\|/g, '/').slice(0, 220)}${(l.moderatorHinweis || '').length > 220 ? ' …' : ''} |`); });
w('', 'Lagen, die in der gewählten Dauer entfallen, zeigt die Moderation unter „Nicht eingeplante Karten“; sie lassen sich bei Bedarf einsetzen.', '');

w('## 4. Begrüßung und Regeln', '', '**Begrüßung (vorlesen):** ' + mf.begruessung, '', '**Eröffnung:** ' + mf.eroeffnungstext, '', '**Spielregeln:**', '', ...mf.spielregeln.map(x => '- ' + x), '', '**Moderationsregel:** ' + mf.moderationsregel, '');
if (mf.highlightHinweis) w('**Die stärksten Szenen:** ' + mf.highlightHinweis, '');

w('## 5. Entscheidungen mit Folgen', '', 'Die Entscheidung des Tisches wird in der Moderation unter „Entscheidungen mit Folgen“ festgehalten – erst wenn der Tisch wirklich entschieden hat. Ohne Eintrag bleibt die Geschichte wie im Drehbuch. Beide Optionen sind jeweils vertretbar; bewertet wird der Weg zur Entscheidung.', '');
(s.weichen || []).forEach(wc => {
  w(`### ${wc.id} – bei ${wc.lagekarten.map(id => id + ' ' + lk(id).titel).join(' / ')}`, '', `**Frage:** ${wc.frage}`, '', `**Moderation:** ${wc.hinweis}`, '');
  wc.optionen.forEach(o => w(`- **${o.label}** – ${o.wirkung}`));
  w('');
});

w('## 6. Überraschungen', '', 'Nur auslösen, wenn der Tisch Luft hat oder zu bequem wird. Die Moderation zeigt vorher, ob eine Karte schon passt („wartet auf …“) und ob die nötige Rolle besetzt ist. Öffentliche Überraschungen erscheinen auf der Bühne, private gehen per Mail an eine Rolle.', '',
  '| ID | Titel | Art | frühestens nach | Bedingung |', '|---|---|---|---|---|');
s.bonuskarten.forEach(b => w(`| ${b.id} | ${b.titel || ''} | ${b.oeffentlich ? 'öffentlich' : 'privat an ' + role(b.empfaenger)} | ${(b.voraussetzung || []).map(id => id + ' ' + lk(id).titel).join(', ') || '–'} | ${[b.minDauer ? 'ab ' + b.minDauer + ' Min.' : '', b.erfordertBesetzt ? role(b.erfordertBesetzt) + ' besetzt' : ''].filter(Boolean).join('; ') || '–'} |`));
w('');
const b7 = s.bonuskarten.find(b => b.id === 'B7');
if (b7) w('### B7 – Stellvertretung (Ablauf)', '', '1. Im Briefing allgemein ankündigen: Rollen können zeitweise „ausfallen“; geprüft wird die Organisation, nicht die Person.',
  `2. Auslösen nach ${b7.voraussetzung.join(', ')}; die Bühne zeigt den Countdown (${b7.unterbrechung.minuten} Min.). Die Person verlässt den Tisch ohne Bloßstellung.`,
  '3. Vertrauliche Karten an die abwesende Rolle in dieser Zeit mündlich an die Vertretung geben oder bis zur Rückkehr zurückhalten – vorher festlegen.',
  `4. Rückkehr: ${b7.unterbrechung.rueckkehr}`, '', '**Beobachtungsbogen:**', '', ...(b7.beobachtung || []).map(x => '- [ ] ' + x), '- [ ] Welche Informationen hatte nur die IT-Leitung – und haben sie gefehlt?', '');

w('## 7. Live-Gespräche (Telefon, Funk)', '', 'Bei diesen Lagen spielt die Bühne nur ein Signal; die Moderation spricht die Rolle des Anrufers live. In der Rolle bleiben, nachfragen, nicht helfen.', '');
s.lagekarten.filter(l => l.gespraech).forEach(l => {
  w(`### ${l.id} ${l.titel}`, '', `**Einstieg (vorlesen):** ${l.sprechertext || ''}`, '', '**Nachfragen:**', '', ...l.gespraech.nachfragen.map(x => '- ' + x), '', `**Gesprächsende:** ${l.gespraech.abschluss}`, '');
  if (l.gespraech.gut) w(`*Gut:* ${[].concat(l.gespraech.gut).join(' ')}  `, `*Schwach:* ${[].concat(l.gespraech.schwach || []).join(' ')}`, '');
});

w('## 8. Störungen, Fallbacks und Abbruch', '',
  '| Situation | Vorgehen |', '|---|---|',
  '| **Echter Alarm oder Notfall im Gebäude** | Übung sofort unterbrechen: „Übung unterbrochen – echter Alarm“. Ton aus, Pause, allen Anweisungen vor Ort folgen. Fortsetzen nur nach ausdrücklicher Entwarnung. |',
  '| Person reagiert belastet (Brand, Vermisste, Erschöpfung) | Pause anbieten, Szene entschärfen, nicht weiterspielen „weil es im Drehbuch steht“. |',
  '| Mail kommt nicht an (rot im Log) | Karte aus dem Umschlag übergeben oder unter vier Augen vorlesen; im Protokoll vermerken. Es gibt keinen Knopf für erneuten Versand. |',
  '| Ton läuft nicht oder ist zu laut | „Ton aus“; Sprechertext bzw. Abschrift aus der Moderation vorlesen. |',
  '| Werkzeug stürzt ab | Neu starten; Lauf, Entscheidungen und Karten bleiben erhalten. Die Ausfallzeit zählt als Übungszeit; in dieser Zeit fällige Karten können danach gebündelt kommen – die Moderation kündigt das an. Stummschaltung danach neu prüfen. |',
  '| Tisch verliert sich in Details | Auf die Frage der Lage zurückführen; Fachfragen (Recht, Versicherung, Arbeitsschutz) festhalten und als Prüfauftrag notieren. |',
  '| Zeit läuft davon | Pause nutzen, Lagen springen; Abschluss nie streichen – lieber eine Lage weniger. |', '');

w('## 9. Abschluss, Debriefing und Bewertung', '', `**Abschluss auf der Bühne:** ${s.nachspiel.titel}. Schritt für Schritt: Nacharbeiten, Rechnung, Bilanz (brutto, mögliche Erstattung als unbestätigte Modellannahme, beim Unternehmen), Einordnung am Jahresgewinn, Fazit. Vorher sagen: „Die Rechnung bewertet nicht, ob richtig entschieden wurde.“`, '',
  '**Kurze Runde vor dem Debriefing:**', '', ...mf.abschlussfragenVorDebrief.map(x => '- ' + x), '', '**Debriefing-Fragen:**', '', ...mf.debriefingFragen.map(x => '- ' + x), '',
  '**Gesamteinschätzung im Protokoll** (0 = fehlt/riskant, 1 = teilweise, 2 = tragfähig; bewertet wird der Krisenstab, nicht Personen):', '', ...(s.protokollKriterien || []).map(x => '- ' + x), '',
  'Danach „Protokoll herunterladen“ (ohne Namen), Maßnahmenplan mit Verantwortlichen und Terminen füllen, im Setup Lauf zurücksetzen und die eingetragenen Personen entfernen.', '');
fs.writeFileSync(OUT, out.join('\n') + '\n');
console.log('geschrieben:', OUT);
