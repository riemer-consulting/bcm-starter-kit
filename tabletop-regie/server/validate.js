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
  dupes(scenario.lagekarten, 'Lagekarte');
  dupes(scenario.sonderlagekarten, 'Sonderlagekarte');
  dupes(scenario.bonuskarten || [], 'Bonuskarte');

  const checkRole = (rid, where) => { if (!roleIds.has(rid)) errors.push(`${where} verweist auf unbekannte Rolle "${rid}".`); };
  scenario.roleGroups.forEach(g => g.members.forEach(rid => checkRole(rid, `Rollengruppe ${g.key}`)));
  [...scenario.sonderlagekarten, ...(scenario.bonuskarten || [])].forEach(c => {
    checkRole(c.empfaenger, `Karte ${c.id}`);
    (c.fallbackEmpfaenger || []).forEach(rid => checkRole(rid, `Karte ${c.id} (Ersatz)`));
    if (!(c.fallbackEmpfaenger || []).length) warnings.push(`Karte ${c.id} hat keine Ersatz-Empfänger – bei unbesetzter Rolle entfällt sie.`);
  });
  scenario.lagekarten.forEach(lk => {
    (lk.zustaendig || []).forEach(rid => checkRole(rid, `Lagekarte ${lk.id} (zuständig)`));
    if (!(lk.zustaendig || []).length) warnings.push(`Lagekarte ${lk.id} hat keine zuständigen Rollen hinterlegt.`);
  });
  scenario.sonderlagekarten.forEach(sk => {
    if (sk.minuteOffset === null || sk.minuteOffset === undefined) warnings.push(`Sonderlagekarte ${sk.id} hat keinen Zeitpunkt – kommt nur bei manueller Auslösung.`);
    if (![1, 2, 3].includes(sk.prioritaet)) errors.push(`Sonderlagekarte ${sk.id} hat keine gültige Priorität (1–3).`);
  });
  scenario.lagekarten.forEach(lk => { if (![1, 2, 3].includes(lk.prioritaet)) errors.push(`Lagekarte ${lk.id} hat keine gültige Priorität (1–3).`); });

  const ownScheduled = new Set(scenario.sonderlagekarten.filter(sk => sk.minuteOffset != null).map(sk => sk.empfaenger));
  realRoles.forEach(r => { if (!ownScheduled.has(r.id)) errors.push(`Rolle "${r.funktion}" hat keine eigene terminierte Sonderlagekarte.`); });

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
    const targetMinutes = [25, 40, 60, 90, 120][Math.floor(rand() * 5)];
    const difficulty = ['leicht', 'mittel', 'hoch'][Math.floor(rand() * 3)];

    const plan = engine.buildAdaptiveSchedule(scenario, { targetMinutes, difficulty, roleCount: Math.min(n, 8), activeRoleIds: staffed });
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
