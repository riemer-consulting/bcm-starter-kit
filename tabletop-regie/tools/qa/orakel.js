// Testorakel: Soll-Erwartungen direkt aus der Drehbuch-Spezifikation, mit EIGENER Logik.
// Verwendet bewusst weder server/runEngine.js noch server/finale.js noch den Server.
// Was das Orakel nicht unabhängig bestimmen kann (z. B. welche optionalen Karten das
// Zeitbudget auswählt), prüft es nur als Regel (Bedingung), nicht als exakten Sollwert –
// das ist im Bericht als „Regelprüfung“ gekennzeichnet.
function empfaenger(karte, besetzt) {
  for (const r of [karte.empfaenger, ...(karte.fallbackEmpfaenger || [])]) if (besetzt.has(r)) return r;
  return null;
}
function rechnung(s, wahl) {
  const n = s.nachspiel;
  let grund = 0; for (const p of n.rechnung) grund += p.betrag;
  const postenIds = new Set();
  for (const w of s.weichen || []) { const o = w.optionen.find(x => x.id === wahl[w.id]); if (o) (o.posten || []).forEach(id => postenIds.add(id)); }
  let extra = 0; for (const id of postenIds) extra += n.optionalePosten.find(p => p.id === id).betrag;
  const brutto = grund + extra;
  const erstattung = n.versicherung ? Math.min(brutto, n.versicherung.betrag) : 0;
  return { grund, extra, brutto, erstattung, beimUnternehmen: brutto - erstattung, posten: [...postenIds].sort() };
}
// Erwartete Wirkungen der Entscheidungen auf gespielte Lagen und vertrauliche Karten
function wirkungen(s, wahl, gespielteLks) {
  const zusaetze = {}, kriseninfo = {}, folgekarten = [], ersetzteTexte = {};
  for (const w of s.weichen || []) {
    const o = w.optionen.find(x => x.id === wahl[w.id]); if (!o) continue;
    for (const f of o.folgen || []) {
      if (f.lagekarte && gespielteLks.includes(f.lagekarte)) { if (f.zusatz) (zusaetze[f.lagekarte] = zusaetze[f.lagekarte] || []).push(f.zusatz); if (f.kriseninfo) kriseninfo[f.lagekarte] = f.kriseninfo; }
      if (f.sonderlagekarte && f.text) ersetzteTexte[f.sonderlagekarte] = f.text;
    }
    if (o.karte) folgekarten.push({ id: o.karte.sonderlagekarte, bei: o.karte.beiLagekarte, erwartet: gespielteLks.includes(o.karte.beiLagekarte) });
  }
  return { zusaetze, kriseninfo, folgekarten, ersetzteTexte };
}
function bonusEinsetzbar(b, gespielteLks, minuten, besetzt) {
  return (b.voraussetzung || []).every(v => gespielteLks.includes(v)) && (!b.minDauer || minuten >= b.minDauer) && (!b.erfordertBesetzt || besetzt.has(b.erfordertBesetzt));
}
// Regeln für einen Ablaufplan (Liste {typ:'LK'|'SK', id} in Reihenfolge)
function planRegeln(s, ablauf, { minuten, besetzt, schwerpunkt }) {
  const verstoesse = [];
  const lk = id => s.lagekarten.find(l => l.id === id);
  const lks = ablauf.filter(e => e.typ === 'LK').map(e => e.id);
  // 1 Pflichtlagen: jede Lage mit Priorität 1 ist in jeder Dauer enthalten (Drehbuchregel)
  s.lagekarten.filter(l => l.prioritaet === 1).forEach(l => { if (!lks.includes(l.id)) verstoesse.push(`Pflichtlage ${l.id} fehlt`); });
  // 2 Chronologie: Lagen in aufsteigender Drehbuchminute
  for (let i = 1; i < lks.length; i++) if (lk(lks[i]).minuteOffset < lk(lks[i - 1]).minuteOffset) verstoesse.push(`${lks[i]} vor ${lks[i - 1]}`);
  // 3 keine Duplikate
  const seen = new Set(); ablauf.forEach(e => { const k = e.typ + e.id; if (seen.has(k)) verstoesse.push('doppelt ' + e.id); seen.add(k); });
  // 4 vertrauliche Karten: erreichbar, nach ihren Voraussetzungen und ihrer Lage, nie vor ihrer Heimatlage
  ablauf.forEach((e, i) => {
    if (e.typ !== 'SK') return;
    const k = s.sonderlagekarten.find(x => x.id === e.id);
    if (!empfaenger(k, besetzt)) verstoesse.push(`${e.id} ohne erreichbaren Empfänger eingeplant`);
    const davor = ablauf.slice(0, i).filter(x => x.typ === 'LK').map(x => x.id);
    (k.voraussetzung || []).forEach(v => { if (!davor.includes(v)) verstoesse.push(`${e.id} vor/ohne ${v}`); });
    if (k.zuBeginnVon && !davor.includes(k.zuBeginnVon)) verstoesse.push(`${e.id} vor ${k.zuBeginnVon}`);
    if (typeof k.minuteOffset === 'number') {
      const spaeter = davor.map(id => lk(id)).filter(l => l.minuteOffset > k.minuteOffset + 0.01);
      const heim = s.lagekarten.filter(l => l.minuteOffset <= k.minuteOffset).sort((a, b) => b.minuteOffset - a.minuteOffset)[0];
      if (heim && lks.includes(heim.id) && !davor.includes(heim.id)) verstoesse.push(`${e.id} vor seiner Heimatlage ${heim.id}`);
      void spaeter;
    }
  });
  // 5 Pflichtkarte des Schwerpunkts, sofern erreichbar und Voraussetzungen im Plan
  const sp = (s.schwerpunkte || []).find(x => x.key === schwerpunkt);
  (sp && sp.pflicht || []).forEach(id => {
    const k = s.sonderlagekarten.find(x => x.id === id);
    const moeglich = empfaenger(k, besetzt) && (k.voraussetzung || []).every(v => lks.includes(v)) && (!k.zuBeginnVon || lks.includes(k.zuBeginnVon));
    if (moeglich && !ablauf.some(e => e.typ === 'SK' && e.id === id)) verstoesse.push(`Pflichtkarte ${id} fehlt`);
  });
  // 6 Spannungsbogen: erste Lage Vorboten, letzte Wiederanlauf
  if (lks.length && lk(lks[0]).akt !== 'vorboten') verstoesse.push('erste Lage ist kein Vorbote');
  if (lks.length && lk(lks[lks.length - 1]).akt !== 'wiederanlauf') verstoesse.push('letzte Lage ist nicht Wiederanlauf');
  return verstoesse;
}
module.exports = { empfaenger, rechnung, wirkungen, bonusEinsetzbar, planRegeln };
