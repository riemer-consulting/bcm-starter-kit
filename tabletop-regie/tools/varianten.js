// Prüft ein Drehbuch über alle Varianten und schreibt einen Markdown-Bericht.
// Aufruf: node tools/varianten.js data/scenario.<name>.json <bericht.md> [befunde.json]
// - 25 Kombinationen aus Dauer (45/60/90/120/180) und Schwerpunkt (Ausgewogen + alle Schwerpunkte)
// - alle 2^n Kombinationen der Entscheidungen (Weichen)
// Prüfregeln: keine doppelte Karte, keine verletzte Abhängigkeit, keine vertrauliche
// Karte vor ihrer Lage, Zieldauer eingehalten, Pflichtkarte des Schwerpunkts enthalten,
// jede Folge erst nach ihrer Entscheidung, Rechnung = Grundschaden + Posten der Optionen.
const fs = require('fs');
const path = require('path');
const e = require('../server/runEngine');
const file = process.argv[2]; const outFile = process.argv[3];
const s = JSON.parse(fs.readFileSync(file, 'utf8'));
const out = []; const w = (...l) => out.push(...l);
const eur = n => new Intl.NumberFormat('de-DE').format(Math.round(n)) + ' €';
const lk = id => s.lagekarten.find(l => l.id === id);
const fehler = [];
const DAUERN = [45, 60, 90, 120, 180];
const SP = [null, ...(s.schwerpunkte || []).map(x => x.key)];
const spLabel = k => (k ? s.schwerpunkte.find(x => x.key === k).label : 'Ausgewogen');

function plan(m, sp, roleIds) {
  const rec = e.recommendRoles(s, { targetMinutes: m });
  const ids = roleIds || rec.roleIds;
  const p = e.buildAdaptiveSchedule(s, { targetMinutes: m, difficulty: 'mittel', roleCount: roleIds ? new Set(roleIds.map(r => (s.roles.find(x => x.id === r) || {}).group)).size : rec.groups.length, activeRoleIds: ids, schwerpunkt: sp });
  return { rec, ids, p };
}

w(`# Variantenprüfung: ${s.title}`, '', `Stand: ${new Date().toISOString().slice(0, 10)} · erzeugt mit \`tools/varianten.js\` direkt aus \`${path.basename(file)}\` und der Ablauf-Engine des Werkzeugs. Rollen: die vom Werkzeug für die Dauer empfohlene Besetzung, Schwierigkeit „mittel“.`, '');

// ---- 25 Kombinationen
w('## Dauer × Schwerpunkt', '', '| Dauer | Schwerpunkt | Rollen | Lagen gespielt | ausgelassen | vertraulich | max. je Rolle | Krise + Abschluss | Entscheidung je Lage | Weichen im Ablauf | Überraschungen einsetzbar | Pflichtkarte | Befund |', '|---:|---|---:|---:|---:|---:|---:|---|---:|---|---|---|---|');
const detail = []; const gespieltLk = new Set(), gespieltSk = new Set(); const verschoben = {}; const lkHaeufigkeit = {};
DAUERN.forEach(m => SP.forEach(sp => {
  const { rec, ids, p } = plan(m, sp);
  const set = new Set(ids);
  const lks = p.schedule.filter(x => x.type === 'lagekarte').map(x => x.id);
  const sks = p.schedule.filter(x => x.type !== 'lagekarte');
  const probleme = [];
  const seen = new Set(); p.schedule.forEach(x => { const k = x.type + x.id; if (seen.has(k)) probleme.push('doppelt ' + x.id); seen.add(k); });
  // Abhängigkeiten
  p.schedule.forEach((x, i) => {
    const ref = x.type === 'lagekarte' ? lk(x.id) : s.sonderlagekarten.find(k => k.id === x.id);
    (ref.voraussetzung || []).forEach(v => { const j = p.schedule.findIndex(y => y.type === 'lagekarte' && y.id === v); if (j < 0 || j > i) probleme.push(`${x.id} vor/ohne ${v}`); });
    if (x.type !== 'lagekarte' && ref.zuBeginnVon) { const j = p.schedule.findIndex(y => y.type === 'lagekarte' && y.id === ref.zuBeginnVon); if (j >= 0 && j > i) probleme.push(`${x.id} vor ${ref.zuBeginnVon}`); }
  });
  // Zeitbindung: vertrauliche Karte nie vor der Lage, deren Drehbuch-Minute sie hat
  sks.forEach(x => { const ref = s.sonderlagekarten.find(k => k.id === x.id); if (typeof ref.minuteOffset !== 'number') return;
    const vorher = p.schedule.slice(0, p.schedule.indexOf(x)).filter(y => y.type === 'lagekarte').map(y => lk(y.id).minuteOffset);
    const nachher = p.schedule.slice(p.schedule.indexOf(x)).filter(y => y.type === 'lagekarte').map(y => lk(y.id).minuteOffset);
    if (vorher.length && Math.max(...vorher) > ref.minuteOffset + 0.01 && nachher.some(mm => mm <= ref.minuteOffset)) probleme.push(`${x.id} zu spät einsortiert`); });
  const dauer = p.totalMinutes + p.finaleMinutes; if (dauer > m + 0.5) probleme.push(`Dauer ${dauer} > ${m}`);
  const spObj = sp ? s.schwerpunkte.find(x => x.key === sp) : null;
  const pfl = spObj ? (spObj.pflicht || []).map(id => id + (sks.some(x => x.id === id) ? ' ✓' : ' fehlt')) : [];
  if (pfl.some(x => x.endsWith('fehlt'))) probleme.push('Pflichtkarte fehlt');
  const proRolle = {}; sks.forEach(x => { const r = e.resolveRecipient(s.sonderlagekarten.find(k => k.id === x.id), set); proRolle[r] = (proRolle[r] || 0) + 1; });
  const ohne = ids.filter(r => !proRolle[r]);
  const weichen = (s.weichen || []).filter(wc => wc.lagekarten.some(id => lks.includes(id))).map(wc => wc.id);
  const lkSet = new Set(lks);
  const bOk = s.bonuskarten.filter(b => (b.voraussetzung || []).every(v => lkSet.has(v)) && (!b.minDauer || b.minDauer <= m));
  if (bOk.length < Math.ceil(s.bonuskarten.length / 2) && m >= 60) probleme.push(`nur ${bOk.length} von ${s.bonuskarten.length} Überraschungen einsetzbar`);
  if (probleme.length) fehler.push(`${m}/${spLabel(sp)}: ${probleme.join(', ')}`);
  w(`| ${m} | ${spLabel(sp)} | ${ids.length} | ${lks.length} | ${s.lagekarten.length - lks.length} | ${sks.length} | ${Math.max(0, ...Object.values(proRolle))} | ${p.totalMinutes} + ${p.finaleMinutes} Min. | ${String(p.decisionMinutesUsed).replace('.', ',')} Min. | ${weichen.join(', ') || '–'} | ${bOk.length}/${s.bonuskarten.length} (${s.bonuskarten.filter(b => !bOk.includes(b)).map(b => b.id).join(' ') || 'alle'}${bOk.length < s.bonuskarten.length ? ' nicht' : ''}) | ${pfl.join(', ') || '–'} | ${probleme.join('; ') || (ohne.length ? 'ohne eigene Karte: ' + ohne.length + ' Rolle(n)' : 'ok')} |`);
  lks.forEach(id => { gespieltLk.add(id); lkHaeufigkeit[id] = (lkHaeufigkeit[id] || 0) + 1; }); sks.forEach(x => gespieltSk.add(x.id));
  sks.forEach(x => { const ref = s.sonderlagekarten.find(k => k.id === x.id); if (typeof ref.minuteOffset !== 'number') return;
    const heim = s.lagekarten.filter(l => l.minuteOffset <= ref.minuteOffset).sort((p, q) => q.minuteOffset - p.minuteOffset)[0];
    const davor = p.schedule.slice(0, p.schedule.indexOf(x)).filter(y => y.type === 'lagekarte').map(y => lk(y.id)).pop();
    const tag = l => (l && l.simZeit || '').split(' ')[0];
    if (heim && davor && davor.id !== heim.id && tag(davor) !== tag(heim)) (verschoben[x.id] = verschoben[x.id] || new Set()).add(`${m}/${spLabel(sp)}: Heimatlage ${heim.id} (${tag(heim)}) → kommt nach ${davor.id} (${tag(davor)})`); });
  detail.push({ m, sp, lks, skipped: s.lagekarten.filter(l => !lks.includes(l.id)).map(l => l.id), ids, sks: sks.map(x => `${x.id}→${e.resolveRecipient(s.sonderlagekarten.find(k => k.id === x.id), set) || '–'}`), weichen });
}));
w('', `**Ergebnis:** ${fehler.length ? 'Befunde: ' + fehler.join(' · ') : 'In allen ' + DAUERN.length * SP.length + ' Kombinationen: keine doppelte Karte, keine verletzte Abhängigkeit, keine zu früh einsortierte vertrauliche Karte, Zieldauer eingehalten, Pflichtkarten enthalten; ab 60 Min. mindestens die Hälfte der Überraschungen einsetzbar (Voraussetzung gespielt, Mindestdauer erfüllt).'}`, '');

w('### Abdeckung: in keiner der Kombinationen gespielt', '', 'Hinweis, kein Fehler: Im Modus „Erprobte Zeiten aus dem Drehbuch“ werden alle Lagen gespielt. In der Zieldauer entfallen Karten mit niedriger Priorität; was hier steht, erreicht den Tisch nur in diesem Modus, über einen Schwerpunkt mit anderer Auswahl oder durch manuelle Auslösung.', '',
  `- Lagekarten: ${s.lagekarten.filter(l => !gespieltLk.has(l.id)).map(l => l.id + ' ' + l.titel).join(' · ') || 'keine'}`,
  `- vertrauliche Karten (ohne Folgekarten): ${s.sonderlagekarten.filter(k => !k.nurNachWeiche && !gespieltSk.has(k.id)).map(k => k.id).join(', ') || 'keine'}`, '');
if ((s.weichen || []).length) {
  w('### Reichweite der Entscheidungsfolgen', '', 'Hinweis: In wie vielen der 25 Kombinationen die Lage gespielt wird, an der eine Folge sichtbar wird. Eine Folge, die fast nie ankommt, verspricht in der Option mehr, als der Tisch erlebt.', '', '| Entscheidung | Option | Folge bei | in Kombinationen sichtbar |', '|---|---|---|---:|');
  s.weichen.forEach(wc => wc.optionen.forEach(o => {
    const ziele = [...new Set([...(o.folgen || []).filter(f => f.lagekarte).map(f => f.lagekarte), ...(o.karte ? [o.karte.beiLagekarte] : [])])];
    ziele.forEach(z => w(`| ${wc.id} | ${o.id} | ${z}${o.karte && o.karte.beiLagekarte === z ? ' (Folgekarte ' + o.karte.sonderlagekarte + ')' : ''} | ${lkHaeufigkeit[z] || 0} von 25 |`));
    if (!ziele.length) w(`| ${wc.id} | ${o.id} | – (nur Rechnung) | – |`);
  }));
  w('');
}
w('### Vertrauliche Karten, die über eine Tagesgrenze verschoben werden', '', 'Hinweis: Fehlt die Heimatlage einer vertraulichen Karte im Plan, kommt sie mit der nächsten gespielten Lage. Liegt diese an einem anderen Wochentag, müssen Zeitangaben im Kartentext dazu passen (zeitneutral formulieren oder die Karte an eine Kernlage binden).', '',
  ...(Object.keys(verschoben).length ? Object.entries(verschoben).map(([id, v]) => `- **${id}** (${v.size}×): ${[...v].slice(0, 3).join('; ')}${v.size > 3 ? ' …' : ''}`) : ['- keine']), '');
// ---- Mehr als einen Tag zu spät (Prüfhinweis, O-11): Tagesindex entlang der Drehbuchreihenfolge,
// damit auch ein Montag der Folgewoche als späterer Tag zählt. Geprüft mit empfohlener und voller Besetzung.
const tagIndex = (() => { const m = {}; let t = 0, vor = null; s.lagekarten.slice().sort((a, b) => a.minuteOffset - b.minuteOffset).forEach(l => { const d = l.simZeit.split(' ')[0]; if (vor !== null && d !== vor) t++; vor = d; m[l.id] = t; }); return m; })();
const heimatVon = k => k.zuBeginnVon || (typeof k.minuteOffset === 'number' ? (s.lagekarten.filter(l => l.minuteOffset <= k.minuteOffset).sort((a, b) => b.minuteOffset - a.minuteOffset)[0] || {}).id : null);
const zuSpaet = {};
const alleRollen = s.roles.filter(r => r.id !== 'teilnehmer').map(r => r.id);
for (const besetzung of ['empfohlen', 'alle Rollen']) for (const m of DAUERN) for (const sp of SP) {
  const { p } = plan(m, sp, besetzung === 'alle Rollen' ? alleRollen : null); let maxTag = -1, letzte = null;
  p.schedule.forEach(ev => { if (ev.type === 'lagekarte') { if (tagIndex[ev.id] > maxTag) { maxTag = tagIndex[ev.id]; } letzte = ev.id; return; }
    const k = s.sonderlagekarten.find(x => x.id === ev.id); const h = k && heimatVon(k); if (!h) return;
    if (maxTag - tagIndex[h] >= 2) (zuSpaet[k.id] = zuSpaet[k.id] || []).push(`${m} Min. ${spLabel(sp)}, ${besetzung}: nach ${letzte} (${lk(letzte).simZeit}), Heimat ${h} (${lk(h).simZeit})`); });
}
w('### Vertrauliche Karten mindestens zwei Tage nach ihrer Heimatlage (Prüfhinweis)', '', 'Hinweis, kein automatischer Befund: Die Karte kommt erst, nachdem der Tisch schon Lagen von mindestens zwei Tagen später gesehen hat (Prüfung mit empfohlener Besetzung und mit allen Rollen, je 25 Kombinationen). Ob das inhaltlich trägt, hängt vom Kartentext ab und ist fachlich zu bewerten. Eine Verschiebung um genau einen Tag steht im Abschnitt davor.', '',
  ...(Object.keys(zuSpaet).length ? Object.entries(zuSpaet).map(([id, v]) => `- **${id}** (${v.length} von 50 Kombinationen): „${s.sonderlagekarten.find(x => x.id === id).text.slice(0, 110)}…“ – z. B. ${v.slice(0, 2).join('; ')}${v.length > 2 ? ' …' : ''}`) : ['- keine']), '');
w('### Ablauf je Kombination (Lagen, ausgelassene Lagen, vertrauliche Karten → Empfänger)', '');
detail.forEach(d => w(`- **${d.m} Min. · ${spLabel(d.sp)}** – gespielt: ${d.lks.join(' ')} · ausgelassen: ${d.skipped.join(' ') || '–'} · Rollen (${d.ids.length}): ${d.ids.join(', ')} · vertraulich: ${d.sks.join(', ')} · Weichen: ${d.weichen.join(', ') || '–'}`));
w('');

// ---- Weichen-Kombinationen
const W = s.weichen || [];
if (W.length) {
  const n = s.nachspiel; const basis = n.rechnung.reduce((a, p) => a + p.betrag, 0);
  const jg = n.jahresumsatz * n.umsatzrendite;
  w(`## Alle ${2 ** W.length} Kombinationen der Entscheidungen`, '', 'Für jede Kombination: welche Lagen einen Zusatzsatz oder eine andere Krisen-Info bekommen, welche vertraulichen Folgekarten wo kommen, welche Posten die Rechnung bekommt. Prüfregeln: jede Folge liegt zeitlich nach ihrer Entscheidung, jede Folgekarte ist als „nur nach Entscheidung“ markiert, jeder Posten existiert, Rechnung = Grundschaden + Posten.', '',
    `| Nr. | ${W.map(x => x.id).join(' | ')} | Zusatzsätze / Krisen-Infos | Folgekarten | Zusatzposten | Brutto | beim Unternehmen (mit angenommener Erstattung) | ohne Erstattung (% Jahresgewinn) | Regelprüfung |`, `|---:|${W.map(() => '---').join('|')}|---|---|---|---:|---:|---:|---|`);
  let min = Infinity, max = 0;
  for (let mask = 0; mask < 2 ** W.length; mask++) {
    const wahl = W.map((wc, i) => wc.optionen[(mask >> (W.length - 1 - i)) & 1]);
    const probleme = []; const zus = []; const karten = []; const posten = [];
    wahl.forEach((o, i) => {
      const wc = W[i]; const tW = Math.min(...wc.lagekarten.map(id => lk(id).minuteOffset));
      (o.folgen || []).forEach(f => {
        if (f.lagekarte) { if (lk(f.lagekarte).minuteOffset <= tW) probleme.push(`${wc.id}: Folge auf ${f.lagekarte} vor der Entscheidung`); zus.push(`${f.lagekarte}${f.kriseninfo ? '*' : ''}`); }
        if (f.sonderlagekarte) zus.push(f.sonderlagekarte + ' (Text)');
      });
      if (o.karte) { const k = s.sonderlagekarten.find(x => x.id === o.karte.sonderlagekarte); if (!k) probleme.push(`${o.karte.sonderlagekarte} fehlt`);
        else if (!k.nurNachWeiche && !(typeof k.minuteOffset === 'number' && (o.folgen || []).some(f => f.sonderlagekarte === k.id))) probleme.push(`${k.id} ist weder Folgekarte noch reguläre Karte mit ersetztem Text`);
        if (lk(o.karte.beiLagekarte).minuteOffset <= tW) probleme.push(`${o.karte.sonderlagekarte} vor der Entscheidung`); karten.push(`${o.karte.sonderlagekarte} bei ${o.karte.beiLagekarte}${k && !k.nurNachWeiche ? ' (reguläre Karte, vorgezogen, Text ersetzt)' : ''}`); }
      (o.posten || []).forEach(pid => { const p = n.optionalePosten.find(x => x.id === pid); if (!p) probleme.push('Posten ' + pid + ' fehlt'); else posten.push(p); });
    });
    const brutto = basis + posten.reduce((a, p) => a + p.betrag, 0);
    const eigen = brutto - Math.min(brutto, n.versicherung ? n.versicherung.betrag : 0);
    min = Math.min(min, eigen); max = Math.max(max, eigen);
    if (probleme.length) fehler.push(`Kombination ${mask + 1}: ${probleme.join(', ')}`);
    w(`| ${mask + 1} | ${wahl.map(o => o.id).join(' | ')} | ${zus.join(', ') || '–'} | ${karten.join(', ') || '–'} | ${posten.map(p => eur(p.betrag)).join(' + ') || '–'} | ${eur(brutto)} | ${eur(eigen)} | ${Math.round(brutto / jg * 100)} % | ${probleme.join('; ') || 'ok'} |`);
  }
  w('', `* = ersetzt die Krisen-Info dieser Lage. Grundschaden ${eur(basis)}; ${n.versicherung ? `modellierte Erstattung ${eur(n.versicherung.betrag)} (Modellannahme)` : 'keine Erstattung'}; Jahresgewinn ${eur(jg)}. Spanne beim Unternehmen: ${eur(min)} bis ${eur(max)}.`, '');
  w('### Entscheidungen im Überblick', '');
  W.forEach(wc => { w(`**${wc.id} – ${wc.frage}** (bei ${wc.lagekarten.join(' bzw. ')}, ${lk(wc.lagekarten[0]).simZeit})  `);
    if (wc.hinweis) w(`*Moderation:* ${wc.hinweis}  `);
    wc.optionen.forEach(o => w(`- *${o.label}* → ${o.wirkung}${(o.posten || []).length ? ' · Posten: ' + o.posten.map(pid => { const p = n.optionalePosten.find(x => x.id === pid); return p ? `${p.posten} (${eur(p.betrag)})` : pid; }).join('; ') : ''}`));
    w(''); });
}
w('## Gesamtergebnis', '', fehler.length ? '**Befunde:**\n\n' + fehler.map(f => '- ' + f).join('\n') : '**Keine Befunde in den automatisch geprüften Regeln** (Reihenfolge, Abhängigkeiten, Zeitbindung, Dauer, Pflichtkarten, Einsetzbarkeit der Überraschungen, Folgen nach ihrer Entscheidung, Folgekarten, Posten, Rechnung). **Nicht automatisch geprüft:** inhaltliche Widersprüche zwischen Texten (z. B. Zusätze verschiedener Entscheidungen in derselben Lage) – dafür die fachliche Prüfung und die Hinweisabschnitte oben.', '');
fs.writeFileSync(outFile, out.join('\n'));
// maschinenlesbare Fassung (optional, 3. Argument): Befunde mit Kennung
if (process.argv[4]) fs.writeFileSync(process.argv[4], JSON.stringify({ datei: path.basename(file), werkzeug: 'tools/varianten.js', befunde: fehler.map((f, i) => ({ id: `V${String(i + 1).padStart(3, '0')}`, text: f })), pruefhinweiseZweiTage: Object.fromEntries(Object.entries(zuSpaet).map(([id, v]) => [id, v.length])), ergebnis: fehler.length ? 'Befunde' : 'keine Befunde in den automatisch geprüften Regeln' }, null, 2));
console.log(path.basename(file), fehler.length ? 'BEFUNDE: ' + fehler.length : 'ok');
process.exitCode = fehler.length ? 1 : 0;
