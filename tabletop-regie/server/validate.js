// Automatische Drehbuch-Pruefung: Struktur, Verweise und -- per Simulation
// vieler Rollen-/Dauer-Kombinationen -- dass jede besetzte Rolle eine eigene
// Karte bekommt und keine vertrauliche Karte ins Leere laeuft.
// Aufruf: npm run pruefen  (prueft alle data/scenario.*.json)
const engine = require('./runEngine');

function validateScenario(scenario, { simulations = 400 } = {}) {
  const errors = [];
  const warnings = [];
  const roleIds = new Set(scenario.roles.map(r => r.id));
  const realRoles = scenario.roles.filter(r => r.id !== 'teilnehmer');

  const dupes = (list, label) => {
    const seen = new Set();
    list.forEach(x => { if (seen.has(x.id)) errors.push(`${label} ${x.id} ist doppelt vergeben.`); seen.add(x.id); });
  };
  dupes(scenario.roles, 'Rolle');
  const EBENEN = ['eingang', 'krisenstab', 'verteilung'];
  scenario.roles.forEach(r => {
    if (r.ebene !== undefined && !EBENEN.includes(r.ebene)) errors.push(`Rolle ${r.id} hat eine unbekannte Ebene "${r.ebene}" (erlaubt: ${EBENEN.join(', ')}).`);
  });
  dupes(scenario.lagekarten, 'Lagekarte');
  dupes(scenario.sonderlagekarten, 'Sonderlagekarte');
  dupes(scenario.bonuskarten || [], 'Bonuskarte');

  const checkRole = (rid, where) => { if (!roleIds.has(rid)) errors.push(`${where} verweist auf unbekannte Rolle "${rid}".`); };
  scenario.roleGroups.forEach(g => g.members.forEach(rid => checkRole(rid, `Rollengruppe ${g.key}`)));
  [...scenario.sonderlagekarten, ...(scenario.bonuskarten || [])].forEach(c => {
    checkRole(c.empfaenger, `Karte ${c.id}`);
    (c.fallbackEmpfaenger || []).forEach(rid => checkRole(rid, `Karte ${c.id} (Ersatz)`));
    if (!Array.isArray(c.fallbackEmpfaenger)) warnings.push(`Karte ${c.id} hat keine Ersatz-Empfänger – bei unbesetzter Rolle entfällt sie.`);
  });
  scenario.lagekarten.forEach(lk => {
    (lk.zustaendig || []).forEach(rid => checkRole(rid, `Lagekarte ${lk.id} (zuständig)`));
    if (!(lk.zustaendig || []).length) warnings.push(`Lagekarte ${lk.id} hat keine zuständigen Rollen hinterlegt.`);
  });
  // Inhaltliche Abhaengigkeiten: Verweise gueltig, Reihenfolge im Drehbuch stimmig
  const lkById = id => scenario.lagekarten.find(l => l.id === id);
  [...scenario.lagekarten, ...scenario.sonderlagekarten].forEach(c => {
    (c.voraussetzung || []).forEach(id => {
      const pre = lkById(id);
      if (!pre) errors.push(`${c.id}: Voraussetzung ${id} ist keine Lagekarte.`);
      else if (c.minuteOffset != null && pre.minuteOffset >= c.minuteOffset) errors.push(`${c.id} kommt im Drehbuch vor seiner Voraussetzung ${id}.`);
    });
    if (c.vorLagekarte) {
      const ziel = lkById(c.vorLagekarte);
      if (!ziel) errors.push(`${c.id}: vorLagekarte ${c.vorLagekarte} ist keine Lagekarte.`);
      else if (c.minuteOffset != null && c.minuteOffset > ziel.minuteOffset) errors.push(`${c.id} soll vor ${c.vorLagekarte} kommen, steht im Drehbuch aber danach.`);
    }
  });
  ((scenario.standardablauf || {}).rollenPrioritaet || []).forEach(rid => checkRole(rid, 'rollenPrioritaet'));
  // Weichen: Entscheidungen mit Folgen
  const postenIds = new Set(((scenario.nachspiel || {}).optionalePosten || []).map(o => o.id));
  const genutzteFolgekarten = new Set();
  (scenario.weichen || []).forEach(w => {
    const lks = (w.lagekarten || []).map(lkById);
    if (!lks.length || lks.some(l => !l)) { errors.push(`Weiche ${w.id}: unbekannte oder fehlende Lagekarte.`); return; }
    if (!lks.some(l => l.prioritaet === 1)) warnings.push(`Weiche ${w.id}: keine ihrer Lagekarten hat Priorität 1 – bei kurzen Übungen entfällt sie.`);
    const frueheste = Math.min(...lks.map(l => l.minuteOffset));
    if (!w.frage || (w.optionen || []).length < 2) errors.push(`Weiche ${w.id} braucht eine Frage und mindestens zwei Optionen.`);
    (w.optionen || []).forEach(o => {
      if (!o.id || !o.label) errors.push(`Weiche ${w.id}: Option ohne id/label.`);
      (o.folgen || []).forEach(f => {
        const ziel = lkById(f.lagekarte);
        if (!ziel) errors.push(`Weiche ${w.id}/${o.id}: Folge auf unbekannte Lagekarte ${f.lagekarte}.`);
        else {
          if (ziel.minuteOffset <= Math.max(...lks.map(l => l.minuteOffset))) errors.push(`Weiche ${w.id}/${o.id}: ${f.lagekarte} kommt nicht nach der Entscheidung.`);
          if (ziel.prioritaet !== 1) warnings.push(`Weiche ${w.id}/${o.id}: Folge-Lagekarte ${f.lagekarte} hat nicht Priorität 1 – die Folge kann entfallen.`);
        }
      });
      if (o.karte) {
        const k = scenario.sonderlagekarten.find(x => x.id === o.karte.sonderlagekarte);
        const bei = lkById(o.karte.beiLagekarte);
        if (!k) errors.push(`Weiche ${w.id}/${o.id}: unbekannte Folgekarte ${o.karte.sonderlagekarte}.`);
        else { genutzteFolgekarten.add(k.id); if (!k.nurNachWeiche) warnings.push(`Folgekarte ${k.id} sollte "nurNachWeiche": true haben.`); }
        if (!bei) errors.push(`Weiche ${w.id}/${o.id}: unbekannte Lagekarte ${o.karte.beiLagekarte} für die Folgekarte.`);
        else if (bei.minuteOffset <= frueheste) errors.push(`Weiche ${w.id}/${o.id}: Folgekarte käme vor der Entscheidung.`);
        else if (bei.prioritaet !== 1) warnings.push(`Weiche ${w.id}/${o.id}: ${o.karte.beiLagekarte} hat nicht Priorität 1 – die Folgekarte kann entfallen.`);
      }
      (o.posten || []).forEach(pid => { if (!postenIds.has(pid)) errors.push(`Weiche ${w.id}/${o.id}: unbekannter Abschluss-Posten ${pid}.`); });
    });
  });
  scenario.sonderlagekarten.filter(k => k.nurNachWeiche && !genutzteFolgekarten.has(k.id)).forEach(k => warnings.push(`Karte ${k.id} ist nur für Weichen gedacht, wird aber von keiner Weiche genutzt.`));
  const aliasSeen = new Set(scenario.roles.map(r => r.id));
  scenario.roles.forEach(r => (r.alteIds || []).forEach(a => { if (aliasSeen.has(a)) errors.push(`Alte Rollen-ID ${a} ist doppelt oder noch aktiv.`); aliasSeen.add(a); }));
  scenario.sonderlagekarten.forEach(sk => {
    if ((sk.minuteOffset === null || sk.minuteOffset === undefined) && !sk.nurNachWeiche) warnings.push(`Sonderlagekarte ${sk.id} hat keinen Zeitpunkt – kommt nur bei manueller Auslösung.`);
    if (![1, 2, 3].includes(sk.prioritaet)) errors.push(`Sonderlagekarte ${sk.id} hat keine gültige Priorität (1–3).`);
  });
  scenario.lagekarten.forEach(lk => { if (![1, 2, 3].includes(lk.prioritaet)) errors.push(`Lagekarte ${lk.id} hat keine gültige Priorität (1–3).`); });

  const ownScheduled = new Set(scenario.sonderlagekarten.filter(sk => sk.minuteOffset != null).map(sk => sk.empfaenger));
  realRoles.forEach(r => { if (!ownScheduled.has(r.id)) errors.push(`Rolle "${r.funktion}" hat keine eigene terminierte Sonderlagekarte.`); });

  // Spannungsbogen: jede Lagekarte gehoert zu einem Akt, jeder Akt existiert.
  const aktKeys = engine.AKTE.map(a => a.key);
  scenario.lagekarten.forEach(lk => {
    if (!aktKeys.includes(lk.akt)) errors.push(`Lagekarte ${lk.id} hat keinen gültigen Akt (${aktKeys.join(', ')}).`);
  });
  engine.AKTE.forEach(a => {
    if (!scenario.lagekarten.some(lk => lk.akt === a.key)) errors.push(`Der Spannungsbogen hat keine Lagekarte im Akt "${a.label}".`);
  });

  // Abschluss: Nacharbeiten und Rechnung
  const n = scenario.nachspiel;
  if (!n) {
    warnings.push('Kein Abschluss (nachspiel) hinterlegt – die Übung endet ohne Nacharbeiten und Rechnung.');
  } else {
    if (!(n.nacharbeiten || []).length) errors.push('Abschluss: keine Nacharbeiten hinterlegt.');
    (n.nacharbeiten || []).forEach((x, i) => { if (!x.zahl || !x.text) errors.push(`Abschluss: Nacharbeit ${i + 1} braucht "zahl" und "text".`); });
    if (!(n.rechnung || []).length) errors.push('Abschluss: keine Rechnung hinterlegt.');
    [...(n.rechnung || []), ...(n.optionalePosten || [])].forEach(p => {
      if (!p.posten || typeof p.betrag !== 'number' || p.betrag <= 0) errors.push(`Abschluss: Posten "${p.posten || '?'}" braucht Text und positiven Betrag.`);
      if (!p.bcmHebel) warnings.push(`Abschluss: Posten "${p.posten}" hat keinen BCM-Hebel ("was vorher geholfen hätte").`);
    });
    (n.optionalePosten || []).forEach(p => { if (!p.id || !p.frage) errors.push(`Abschluss: optionaler Posten "${p.posten}" braucht "id" und "frage".`); });
    const summe = (n.rechnung || []).reduce((a, p) => a + (p.betrag || 0), 0);
    if (n.versicherung && n.versicherung.betrag > summe) errors.push('Abschluss: Versicherungsleistung ist höher als der Schaden.');
    if (!n.fazit) errors.push('Abschluss: kein Fazit hinterlegt.');
    if (!n.hinweis) warnings.push('Abschluss: kein Hinweis, dass es sich um eine fiktive Beispielrechnung handelt.');
    if (n.umsatzrendite && (n.umsatzrendite <= 0 || n.umsatzrendite >= 1)) errors.push('Abschluss: Umsatzrendite muss als Anteil angegeben werden (z. B. 0.05).');
  }

  // Texte, die bei geaenderter Dauer/Besetzung falsch werden
  const timeRef = /(minuteOffset|Minute \d+|Sonderkarte \d+|innerhalb der nächsten Stunde|in einer Stunde\.)/;
  const mf = scenario.moderationsleitfaden || {};
  [['Begrüßung', mf.begruessung], ['Eröffnung', mf.eroeffnungstext]].forEach(([label, t]) => {
    if (t && timeRef.test(t)) warnings.push(`${label} enthält eine feste Zeitangabe, die bei anderer Zieldauer nicht stimmt.`);
  });
  scenario.lagekarten.forEach(lk => {
    if (lk.moderatorHinweis && /(minuteOffset|Übungsende bei)/.test(lk.moderatorHinweis)) warnings.push(`Moderatorhinweis zu ${lk.id} nennt eine feste Minute.`);
  });
  scenario.roles.forEach(r => { if (/(leiterin|führerin|\bLeiter\b|führer\b)/.test(r.funktion)) warnings.push(`Rollenname "${r.funktion}" ist nicht geschlechtsneutral.`); });

  // Simulation: zufaellige Besetzungen x Zieldauer x Schwierigkeit
  let seed = 42;
  const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const problems = new Map();
  const note = (key, msg) => { if (!problems.has(key)) problems.set(key, msg); };
  for (let i = 0; i < simulations; i++) {
    const n = 1 + Math.floor(rand() * realRoles.length);
    const staffed = realRoles.slice().sort(() => rand() - 0.5).slice(0, n).map(r => r.id);
    const staffedSet = new Set(staffed);
    const targetMinutes = [25, 40, 45, 60, 90, 120, 180][Math.floor(rand() * 7)];
    const difficulty = ['leicht', 'mittel', 'hoch'][Math.floor(rand() * 3)];

    const plan = engine.buildAdaptiveSchedule(scenario, { targetMinutes, difficulty, roleCount: Math.min(n, 8), activeRoleIds: staffed });
    const lks = plan.schedule.filter(e => e.type === 'lagekarte').map(e => scenario.lagekarten.find(x => x.id === e.id));
    const fehlt = plan.akte.filter(a => !a.enthalten).map(a => a.label);
    if (fehlt.length) note('akt:' + fehlt.join(','), `Bei ${targetMinutes} Min. fehlt im Spannungsbogen: ${fehlt.join(', ')}.`);
    const ersterAkt = engine.AKTE[0];
    if (lks.length && lks[0].akt !== ersterAkt.key) note('start', `Bei ${targetMinutes} Min. beginnt die Übung nicht mit ${ersterAkt.label} (${lks[0].id}).`);
    // Der Bogen darf nicht zurueckspringen (z. B. Wiederanlauf vor Hoehepunkt).
    const idx = lks.map(l => aktKeys.indexOf(l.akt));
    const rueck = idx.findIndex((x, i) => i > 0 && x < idx[i - 1]);
    if (rueck > 0) note('ordnung:' + lks[rueck].id, `Bei ${targetMinutes} Min. springt der Spannungsbogen zurück: ${lks[rueck - 1].id} (${lks[rueck - 1].akt}) vor ${lks[rueck].id} (${lks[rueck].akt}).`);
    if (lks.length && lks[lks.length - 1].akt !== 'wiederanlauf') note('ende', `Bei ${targetMinutes} Min. endet die Übung nicht mit dem Wiederanlauf (${lks[lks.length - 1].id}).`);
    // Abhaengigkeiten im erzeugten Plan: Voraussetzung gespielt und vorher
    const at = {};
    plan.schedule.forEach(e => { at[e.id] = e.minute; });
    plan.schedule.forEach(e => {
      const c = e.type === 'lagekarte' ? scenario.lagekarten.find(x => x.id === e.id) : scenario.sonderlagekarten.find(x => x.id === e.id);
      (c.voraussetzung || []).forEach(id => {
        if (at[id] === undefined) note('dep:' + c.id, `Bei ${targetMinutes} Min. wird ${c.id} gespielt, ohne die Voraussetzung ${id}.`);
        else if (at[id] > e.minute) note('deporder:' + c.id, `Bei ${targetMinutes} Min. kommt ${c.id} vor seiner Voraussetzung ${id}.`);
      });
      if (c.vorLagekarte) {
        if (at[c.vorLagekarte] === undefined) note('vor:' + c.id, `Bei ${targetMinutes} Min. wird ${c.id} gespielt, ${c.vorLagekarte} aber nicht.`);
        else if (at[c.vorLagekarte] < e.minute) note('vororder:' + c.id, `Bei ${targetMinutes} Min. kommt ${c.id} erst nach ${c.vorLagekarte}.`);
      }
    });
    const recipients = new Set();
    plan.schedule.filter(e => e.type === 'sonderlagekarte').forEach(e => {
      const sk = scenario.sonderlagekarten.find(x => x.id === e.id);
      const rid = engine.resolveRecipient(sk, staffedSet);
      if (!rid) note('void:' + sk.id, `Sonderlagekarte ${sk.id} wird eingeplant, obwohl sie niemanden erreicht.`);
      else recipients.add(rid);
    });
    staffed.forEach(rid => {
      if (!recipients.has(rid)) note('cov:' + rid, `Rolle "${(scenario.roles.find(r => r.id === rid) || {}).funktion}" bekam bei ${targetMinutes} Min. keine eigene Karte (Besetzung: ${n} Rollen).`);
    });

    ['authored', 'computed'].forEach(mode => {
      const state = engine.newRunState(scenario);
      state.durationMode = mode; state.difficulty = difficulty;
      state.participants = staffed.map(rid => ({ roleIds: [rid] }));
      const sched = engine.computeEffectiveSchedule(scenario, state);
      const got = new Set(sched.filter(e => e.type === 'sonderlagekarte').map(e => engine.resolveRecipient(e.ref, staffedSet)));
      if (got.has(null)) note('void-' + mode, `Im Modus ${mode} wird eine Karte eingeplant, die niemanden erreicht.`);
      staffed.forEach(rid => { if (!got.has(rid)) note(mode + ':' + rid, `Im Modus ${mode} bekommt Rolle ${rid} keine Karte.`); });
    });
  }
  problems.forEach(msg => errors.push(msg));
  return { errors, warnings };
}

module.exports = { validateScenario };

if (require.main === module) {
  const store = require('./store');
  let failed = false;
  store.listScenarioFiles().forEach(file => {
    const { scenario } = store.loadScenario(file);
    const { errors, warnings } = validateScenario(scenario, { simulations: 2000 });
    console.log(`\n${file}: ${errors.length} Fehler, ${warnings.length} Hinweise`);
    errors.forEach(e => console.log('  FEHLER  ' + e));
    warnings.forEach(w => console.log('  Hinweis ' + w));
    if (errors.length) failed = true;
  });
  console.log(failed ? '\nPrüfung fehlgeschlagen.' : '\nAlle Drehbücher in Ordnung.');
  process.exit(failed ? 1 : 0);
}
