// Prüft ein Drehbuch über alle Varianten und schreibt einen Markdown-Bericht.
// Aufruf: node tools/varianten.js data/scenario.<name>.json <bericht.md>
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
const detail = [];
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
  detail.push({ m, sp, lks, skipped: s.lagekarten.filter(l => !lks.includes(l.id)).map(l => l.id), ids, sks: sks.map(x => `${x.id}→${e.resolveRecipient(s.sonderlagekarten.find(k => k.id === x.id), set) || '–'}`), weichen });
}));
w('', `**Ergebnis:** ${fehler.length ? 'Befunde: ' + fehler.join(' · ') : 'In allen ' + DAUERN.length * SP.length + ' Kombinationen: keine doppelte Karte, keine verletzte Abhängigkeit, keine zu früh einsortierte vertrauliche Karte, Zieldauer eingehalten, Pflichtkarten enthalten; ab 60 Min. mindestens die Hälfte der Überraschungen einsetzbar (Voraussetzung gespielt, Mindestdauer erfüllt).'}`, '');

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
w('## Gesamtergebnis', '', fehler.length ? '**Befunde:**\n\n' + fehler.map(f => '- ' + f).join('\n') : '**Keine Befunde.** Alle Regelprüfungen bestanden.', '');
fs.writeFileSync(outFile, out.join('\n'));
console.log(path.basename(file), fehler.length ? 'BEFUNDE: ' + fehler.length : 'ok');
process.exitCode = fehler.length ? 1 : 0;
