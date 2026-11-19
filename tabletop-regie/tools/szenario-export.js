// Exportiert ein Drehbuch vollständig als Markdown (für Review und Abnahme).
// Aufruf: node tools/szenario-export.js data/scenario.<name>.json <ausgabe.md>
const path = require('path');
const ROOT = path.join(__dirname, '..');
const FILE = process.argv[2]; const s = JSON.parse(require('fs').readFileSync(path.resolve(FILE), 'utf8'));
const e = require(ROOT + '/server/runEngine');
const out = [];
const w = (...l) => out.push(...l);
const lkTitel = id => (s.lagekarten.find(l => l.id === id) || {}).titel || id;
const lageVon = k => { if (k.minuteOffset == null) return '–'; const ls = s.lagekarten.filter(l => l.minuteOffset <= k.minuteOffset).sort((a, b) => b.minuteOffset - a.minuteOffset); const l = ls[0]; return l ? `${l.id} ${l.titel} (${l.simZeit})` : 'vor der ersten Lage'; };
const role = id => (s.roles.find(r => r.id === id) || {}).funktion || id;
const AKT = Object.fromEntries(e.AKTE.map(a => [a.key, a.label]));
const EB = { eingang: 'Eingang (Meldungen von draußen)', krisenstab: 'Krisenstab', verteilung: 'Weitergabe nach innen/außen' };
const eur = n => new Intl.NumberFormat('de-DE').format(n) + ' €';
const mf = s.moderationsleitfaden;

const fakten = require('./faktenblatt')[s.id] || [];
w(`# ${s.title} – vollständiges Drehbuch`, '', `*${s.subtitle}*  `, `Stand: ${new Date().toISOString().slice(0, 10)} · automatisch erzeugt mit \`tools/szenario-export.js\` aus \`${path.basename(FILE)}\` (Drehbuch-ID \`${s.id}\`). Alle Inhalte sind fiktiv. Beträge und Fristen sind Szenarioannahmen, keine Rechts- oder Versicherungsauskunft.`, '',
  '**Inhalt:** Teil B Faktenblatt und Zeitleiste · Teil C Szenario vollständig (Begrüßung, Regeln, Rollen, Lagekarten, vertrauliche Karten, Entscheidungen, Schwerpunkte, Überraschungen, Abschluss mit Rechnung, Debriefing) · Teil D Ablauf je Übungsdauer', '', '---', '');
w('## Teil B – Faktenblatt und Zeitleiste', '', 'Diese Eckdaten gelten für alle Karten. Alles, was davon abweicht, ist ein Widerspruch.', '', '| Eckdatum | Wert |', '|---|---|',
  '| Unternehmen | ' + s.company.name + ' (fiktiv), ' + s.company.facts + ' |', ...(s.company.produkte ? ['| Produkte und Leistungen | ' + s.company.produkte + ' |'] : []),
  ...fakten.map(([k, v]) => `| ${k} | ${v} |`), '');
w('### Zeitleiste der Lagekarten (Reihenfolge im vollständigen Drehbuch)', '', '| Minute | ID | Simulationszeit | Titel | Station | Priorität |', '|---:|---|---|---|---|---:|');
s.lagekarten.slice().sort((a, b) => a.minuteOffset - b.minuteOffset).forEach(l => w(`| ${l.minuteOffset} | ${l.id} | ${l.simZeit} | ${l.titel} | ${AKT[l.akt]} | ${l.prioritaet} |`));
w('', 'Priorität 1 = in jeder Übungsdauer enthalten.', '', '---', '');

w('## Teil C – Das Szenario vollständig', '',
`**Titel:** ${s.title}  `, `**Untertitel:** ${s.subtitle}  `,
`**Unternehmen (fiktiv):** ${s.company.name} – ${s.company.facts}  `,
`**Schwierigkeit:** ${s.difficulty} · **Teilnehmende:** ${s.recommendedParticipants.min}–${s.recommendedParticipants.max} (Referenz ${s.recommendedParticipants.reference})`, '');
w('### Begrüßung (vorgelesen)', '', mf.begruessung, '', '### Eröffnung (vorgelesen und auf der Bühne)', '', mf.eroeffnungstext, '');
w('### Spielregeln', '', ...mf.spielregeln.map(x => '- ' + x), '', '### Moderationsregel', '', mf.moderationsregel, '');
if (mf.highlightHinweis) w('### Hinweis zur stärksten Szene', '', mf.highlightHinweis, '');

w('### Rollen', '', `${s.roles.length} Rollen in ${s.roleGroups.length} Funktionsbereichen. „teilnehmer“ ist eine Beobachterrolle ohne eigene Karten.`, '');
s.roleGroups.forEach(g => {
  w(`#### ${g.label}`, '');
  g.members.forEach(id => { const r = s.roles.find(x => x.id === id); w(`- **${r.funktion}** (\`${r.id}\`, Ebene: ${EB[r.ebene] || 'Krisenstab'})  `, `  ${r.beschreibung || ''}`); });
  w('');
});
const ohneGruppe = s.roles.filter(r => !s.roleGroups.some(g => g.members.includes(r.id)));
if (ohneGruppe.length) { w('#### Ohne Funktionsbereich', ''); ohneGruppe.forEach(r => w(`- **${r.funktion}** (\`${r.id}\`): ${r.beschreibung || ''}`)); w(''); }

w('### Lagekarten (öffentlich, chronologisch nach Drehbuch-Minute)', '',
`Minute = Zeitpunkt im vollständigen Drehbuch (letzte Lage bei Minute ${Math.max(...s.lagekarten.map(l => l.minuteOffset))}).` + ' Bei kürzeren Übungen verschiebt das Werkzeug die Zeiten (siehe Teil D).', '');
s.lagekarten.slice().sort((a, b) => a.minuteOffset - b.minuteOffset).forEach(lk => {
  w(`#### ${lk.id} – ${lk.titel}`, '',
    `*Simulationszeit:* ${lk.simZeit} · *Station:* ${AKT[lk.akt] || lk.akt} · *Priorität:* ${lk.prioritaet} · *Drehbuch-Minute:* ${lk.minuteOffset} · *Diskussion:* ${lk.diskussionMinuten} Min.`, '',
    lk.text, '');
  if (lk.kriseninfo) w(`*Krisen-Info (rot hervorgehoben):* ${lk.kriseninfo}`, '');
  if ((lk.aufgabe || []).length) w('*Fragen an die Gruppe:*', '', ...lk.aufgabe.map(a => '- ' + a), '');
  if (lk.media && lk.media.caption) w(`*Bild auf der Bühne:* ${lk.media.caption}`, '');
  if (lk.sprechertext) w(`*${lk.sound && !lk.sound.signal ? 'Einspielung (Ton)' : 'Sprechertext'}:* ${lk.sprechertext}`, '');
  if (lk.gespraech) w(`*Gespräch führen – Nachfragen:* ${lk.gespraech.nachfragen.join(' · ')}  `, `*Gesprächsende:* ${lk.gespraech.abschluss}  `, ...(lk.gespraech.gut ? [`*Gesprächsführung gut:* ${[].concat(lk.gespraech.gut).join(' · ')}  `] : []), ...(lk.gespraech.schwach ? [`*Gesprächsführung schwach:* ${[].concat(lk.gespraech.schwach).join(' · ')}`] : []), '');
  if (lk.sound) w(`*Ton:* \`${lk.sound.src.split('/').pop()}\`${lk.sound.signal ? ' (Signal, danach spricht die Moderation live)' : ''}${lk.sound.uebungshinweis ? ' · Bühne zeigt „Übungseinspielung – kein echter Alarm“' : ''}`, '');
  w(`*Zuständig:* ${(lk.zustaendig || []).map(role).join(', ') || '–'}`, '');
  if (lk.moderatorHinweis) w(`*Hinweis für die Moderation:* ${lk.moderatorHinweis}`, '');
  if (lk.voraussetzung) w(`*Kommt nur mit/nach:* ${lk.voraussetzung.map(id => id + ' ' + lkTitel(id)).join(', ')}`, '');
  if (lk.moderatorGut) w(`*Gute Reaktion:* ${lk.moderatorGut}  `, `*Schwache Reaktion:* ${lk.moderatorSchlecht || ''}`, '');
});

w('### Vertrauliche Karten (per E-Mail an eine Rolle, chronologisch)', '');
s.sonderlagekarten.filter(k => !k.nurNachWeiche).sort((a, b) => (a.minuteOffset ?? 999) - (b.minuteOffset ?? 999)).forEach(sk => {
  w(`#### ${sk.id} – an ${role(sk.empfaenger)}`, '',
    `*Drehbuch-Minute:* ${sk.minuteOffset ?? 'nur manuell'} · *fällt in die Lage:* ${lageVon(sk)} · *Priorität:* ${sk.prioritaet} · *Ersatzrollen:* ${(sk.fallbackEmpfaenger || []).map(role).join(' → ') || '–'}`, '',
    ...(sk.nurInEigenerLage ? ['*Nur in ihrer eigenen Lage:* entfällt, wenn diese Lage nicht gespielt wird (statt mit einer späteren Lage zu kommen).', ''] : []),
    ...(sk.voraussetzung ? [`*Kommt nur nach:* ${sk.voraussetzung.map(id => id + ' ' + lkTitel(id)).join(', ')}`, ''] : []),
    ...(sk.zuBeginnVon ? [`*Kommt zusammen mit (zu Beginn dieser Lage; entfällt, wenn sie nicht eingeplant ist oder das Kartenbudget der Dauer ausgeschöpft ist):* ${sk.zuBeginnVon} ${lkTitel(sk.zuBeginnVon)}`, ''] : []),
    ...((sk.textVarianten || []).map(v => `*Text, wenn ${v.nachLagekarte} ${lkTitel(v.nachLagekarte)} schon gezeigt ist:* ${v.text}`).flatMap(x => [x, ''])),
    sk.text, '', `*Gute Reaktion:* ${sk.moderatorGut}  `, `*Schwache Reaktion:* ${sk.moderatorSchlecht}`, '');
});

w('### Entscheidungen mit Folgen (Weichen)', '', 'Die Moderation hält fest, wie der Tisch entschieden hat. Ohne Eintrag bleibt die Geschichte wie im Drehbuch.', '');
(s.weichen || []).forEach(wc => {
  w(`#### ${wc.id} – bei ${wc.lagekarten.map(id => id + ' ' + lkTitel(id)).join(' oder ')}`, '', `**Frage:** ${wc.frage}`, '', ...(wc.hinweis ? [`*Hinweis für die Moderation:* ${wc.hinweis}`, ''] : []));
  wc.optionen.forEach(o => {
    w(`- **${o.label}** – ${o.wirkung || ''}`);
    (o.folgen || []).forEach(f => f.sonderlagekarte
      ? w(`  - vertrauliche Karte ${f.sonderlagekarte} kommt mit geändertem Text: „${f.text}“`)
      : w(`  - ${f.lagekarte} bekommt dazu: „${f.zusatz || ''}“${f.kriseninfo ? ' · Krisen-Info: ' + f.kriseninfo : ''}`));
    if (o.karte) { const k = s.sonderlagekarten.find(x => x.id === o.karte.sonderlagekarte); w(`  - Folgekarte ${k.id} an ${role(k.empfaenger)} bei ${o.karte.beiLagekarte}: „${k.text}“`); }
    (o.posten || []).forEach(pid => { const po = s.nachspiel.optionalePosten.find(x => x.id === pid); w(`  - Abschluss: ${po.posten} (${eur(po.betrag)})`); });
  });
  w('');
});
w('### Übungsschwerpunkte (Auswahl im Setup)', '', 'Pflichtkarten und Spannungsbogen bleiben gleich; die genannten Karten werden beim Auffüllen bevorzugt.', '');
(s.schwerpunkte || []).forEach(x => {
  w(`#### ${x.label}`, '', `${x.beschreibung} **Leitfrage:** ${x.leitfrage || '–'}`, '', `Bevorzugt: ${x.karten.join(', ')} · immer dabei (sofern besetzt): ${(x.pflicht || []).join(', ') || '–'}`, '');
  Object.entries(x.zusatzfragen || {}).forEach(([id, q]) => w(`- ${id} ${lkTitel(id)}: ${q}`));
  w('', ...(x.debriefing || []).map(q => '- Debriefing: ' + q), '');
});
w('');
w('### Bonuskarten (nur bei Bedarf manuell)', '');
s.bonuskarten.forEach(b => w(b.oeffentlich
  ? `- **${b.id}${b.titel ? ' – ' + b.titel : ''}**${b.voraussetzung ? ' (erst nach ' + b.voraussetzung.join(', ') + ')' : ''}, **öffentlich auf der Bühne**${b.unterbrechung ? ` (${role(b.unterbrechung.rolle)} ${b.unterbrechung.minuten} Minuten nicht erreichbar, Countdown)` : ''}: ${b.buehnentext || b.text}${b.kriseninfo ? ' *Krisen-Info:* ' + b.kriseninfo : ''}${b.sprechertext ? '  \n  *Ton/Sprechertext:* ' + b.sprechertext : ''}${b.regie ? '  \n  *Regie:* ' + b.regie : ''}${b.moderatorHinweis ? '  \n  *Moderation:* ' + b.moderatorHinweis : ''}`
  : `- **${b.id}${b.titel ? ' – ' + b.titel : ''}**${b.voraussetzung ? ' (erst nach ' + b.voraussetzung.join(', ') + ')' : ''} an ${role(b.empfaenger)}${(b.fallbackEmpfaenger || []).length ? ' (Ersatz: ' + b.fallbackEmpfaenger.map(role).join(' → ') + ')' : ''}: ${b.text}${b.moderatorHinweis ? '  \n  *Moderation:* ' + b.moderatorHinweis : ''}`));
s.bonuskarten.filter(b => b.regie || (b.beobachtung || []).length || b.minDauer || b.erfordertBesetzt).forEach(b => w('', `**${b.id} – Regie und Beobachtung:**${b.minDauer ? ' nur in Übungen ab ' + b.minDauer + ' Min.' : ''}${b.erfordertBesetzt ? ' · setzt voraus, dass ' + role(b.erfordertBesetzt) + ' besetzt ist' : ''}`, ...(b.regie ? ['', b.regie] : []), ...(b.unterbrechung ? ['', `*Unterbrechung:* ${b.unterbrechung.text || ''} *Rückkehr:* ${b.unterbrechung.rueckkehr || ''}`] : []), ...((b.beobachtung || []).length ? ['', ...b.beobachtung.map(x => '- [ ] ' + x)] : [])));
w('');

const n = s.nachspiel;
w('### Abschluss: „' + n.titel + '“', '', n.einleitung, '', '**Nacharbeiten:**', '', ...n.nacharbeiten.map(x => `- **${x.zahl}** ${x.text}`), '',
  '**Rechnung (fiktiv):**', '', '| Posten | Betrag | Was vorher geholfen hätte |', '|---|---:|---|',
  ...n.rechnung.map(p => `| ${p.posten}${p.herleitung ? '<br>*Rechenweg:* ' + p.herleitung : ''} | ${eur(p.betrag)} | ${p.bcmHebel || ''} |`), '',
  '**Zusätzliche Posten, je nach Entscheidung in der Übung:**', '', '| Frage an die Moderation | Posten | Betrag | Rechenweg |', '|---|---|---:|---|',
  ...(n.optionalePosten || []).map(o => `| ${o.frage} | ${o.posten} | ${eur(o.betrag)} | ${(o.herleitung || '–').replace(/\|/g, '/')} |`), '',
  `**Versicherung:** ${n.versicherung.text}: − ${eur(n.versicherung.betrag)}  `, n.versicherung.erlaeuterung ? `*${n.versicherung.erlaeuterung}*  ` : '',
  `**Jahresumsatz:** ${eur(n.jahresumsatz)} · **Umsatzrendite:** ${Math.round(n.umsatzrendite * 100)} %`, '',
  `**Fazit:** ${n.fazit}`, '', n.hinweis ? `*${n.hinweis}*` : '', '');

w('### Debriefing', '', '**Kurze Runde vor dem Debriefing:**', '', ...mf.abschlussfragenVorDebrief.map(x => '- ' + x), '', '**Debriefing-Fragen:**', '', ...mf.debriefingFragen.map(x => '- ' + x), '');
w('---', '', '## Teil D – Was bei welcher Übungsdauer gespielt wird', '',
'Automatisch erzeugt vom Werkzeug, Schwierigkeit „mittel“, mit den vom Werkzeug vorgeschlagenen Rollen. Karten an unbesetzte Rollen gehen an die Ersatzrolle (in Klammern). Die Folgekarten aus Entscheidungen (' + s.sonderlagekarten.filter(k => k.nurNachWeiche).map(k => k.id).join(', ') + ') stehen nicht in den Tabellen; sie kommen zusätzlich, wenn die jeweilige Entscheidung fällt.', '');
const lkById = id => s.lagekarten.find(l => l.id === id);
const skById = id => s.sonderlagekarten.find(l => l.id === id);
for (const m of [45, 60, 90, 120, 180]) {
  const rec = e.recommendRoles(s, { targetMinutes: m, difficulty: 'mittel' });
  const p = e.buildAdaptiveSchedule(s, { targetMinutes: m, difficulty: 'mittel', roleCount: rec.groups.length, activeRoleIds: rec.roleIds });
  const besetzt = new Set(rec.roleIds);
  const lkIds = p.schedule.filter(x => x.type === 'lagekarte').map(x => x.id);
  w(`### ${m} Minuten`, '', `**Besetzte Rollen (${rec.roleIds.length}):** ${rec.roleIds.map(role).join(', ')}`, '',
    `**Geplante Krisenzeit:** ${p.totalMinutes} Min. + ca. ${p.finaleMinutes} Min. Abschluss${p.warning ? ' · Hinweis des Werkzeugs: ' + p.warning : ''}`, '',
    '| Minute | Art | ID | Inhalt |', '|---:|---|---|---|');
  p.schedule.forEach(ev => {
    if (ev.type === 'lagekarte') { const l = lkById(ev.id); const wc = (s.weichen || []).find(x => x.lagekarten.find(id => lkIds.includes(id)) === ev.id); w(`| ${ev.minute.toFixed(1)} | Lagekarte (${AKT[l.akt]}) | ${ev.id} | ${l.simZeit}: ${l.titel}${wc ? ' · **Weiche ' + wc.id + '**' : ''} |`); }
    else { const k = skById(ev.id); const an = e.resolveRecipient(k, besetzt); w(`| ${ev.minute.toFixed(1)} | vertraulich | ${ev.id} | an ${role(an)}${an !== k.empfaenger ? ' (statt ' + role(k.empfaenger) + ')' : ''}: ${k.text.slice(0, 90).replace(/\|/g, '/')}… |`); }
  });
  const sl = p.skipped.filter(x => x.type === 'lagekarte'), ss = p.skipped.filter(x => x.type !== 'lagekarte');
  w('', `**Entfallene Lagekarten (${sl.length}):** ${sl.map(x => x.id + ' ' + lkById(x.id).titel).join(' · ') || '–'}`, '',
    `**Entfallene vertrauliche Karten (${ss.length}):** ${ss.map(x => x.id).join(', ') || '–'}`, '');
  const gruende = [...new Set(p.skipped.map(x => x.reason))];
  w('*Gründe laut Werkzeug:* ' + gruende.join(' / '), '');
}
require('fs').writeFileSync(process.argv[3], out.join('\n') + '\n');
console.log('geschrieben:', process.argv[3]);
