// Kernlogik des Übungslaufs: Timer, Kartenfortschritt, Zeitberechnung nach
// Gruppengröße/Schwierigkeit. Hält den gesamten Lauf-Zustand in einem
// einzigen Objekt, das vom Server regelmäßig persistiert wird.

const DIFFICULTY_DECISION_MINUTES = { leicht: 2, mittel: 4, hoch: 6 };

function newRunState(scenario) {
  return {
    status: 'idle', // idle | briefing | countdown | running | paused | ended
    crisisStartsAt: null, // waehrend 'countdown': Timestamp, ab dem der Timer wirklich laeuft
    scenarioFile: null,
    durationMode: 'authored', // 'authored' (feste, erprobte Zeiten) | 'computed' (nach Rollenzahl/Schwierigkeit) | 'target' (Zieldauer vorgeben)
    difficulty: 'mittel',
    targetMinutes: null,
    plannedSchedule: null, // bei durationMode 'target' einmalig bei Start berechnet und eingefroren: [{type,id,minute}]
    plannedTotalMinutes: null,
    skippedEvents: [], // bei durationMode 'target': [{type,id,reason}]
    scheduleWarning: null,
    promotedEvents: [], // vom Moderator trotz Zeitbudget nachtraeglich hinzugefuegte Ereignisse
    startedAt: null,
    pausedAt: null,
    totalPausedMs: 0,
    participants: [], // { id, name, email, roleIds }
    activeRoleIds: scenario.roles.map(r => r.id), // welche Rollen fuer diesen Lauf ueberhaupt zur Auswahl stehen
    firedLagekarten: [], // ids
    firedSonderlagekarten: [], // { id, emailStatus }
    finale: { step: 0, optionen: {} }, // Abschluss (Nacharbeiten + Rechnung), 0 = nicht aktiv
    finaleMinutes: 0,
    manualFires: [], // ids, die der Moderator vorzeitig/zusätzlich ausgelöst hat
    bewertung: {}, // { [roleId]: { [kriterium]: 1-5 } }
    log: []
  };
}

function elapsedMinutes(state) {
  if (!state.startedAt) return 0;
  const now = state.status === 'paused' && state.pausedAt ? state.pausedAt
    : (state.status === 'ended' && state.endedAt ? state.endedAt : Date.now());
  const raw = now - state.startedAt - state.totalPausedMs;
  return Math.max(0, raw / 60000);
}

/** Baut die zeitlich sortierte Liste aller planbaren Ereignisse (Lagekarten + terminierte Sonderlagekarten). */
function buildTimeline(scenario) {
  const events = [];
  scenario.lagekarten.forEach(lk => events.push({ type: 'lagekarte', id: lk.id, authoredMinute: lk.minuteOffset, ref: lk }));
  scenario.sonderlagekarten.filter(sk => sk.minuteOffset !== null && sk.minuteOffset !== undefined)
    .forEach(sk => events.push({ type: 'sonderlagekarte', id: sk.id, authoredMinute: sk.minuteOffset, ref: sk }));
  events.sort((a, b) => a.authoredMinute - b.authoredMinute);
  return events;
}

/** Liefert die Anzahl aktuell besetzter Rollengruppen (Funktionsbereiche mit mind. 1 zugewiesenem Teilnehmer). */
function activeRoleGroupCount(scenario, state) {
  const assignedRoleIds = new Set(state.participants.flatMap(p => p.roleIds || []).filter(Boolean));
  const roleToGroup = {};
  scenario.roles.forEach(r => { roleToGroup[r.id] = r.group; });
  const activeGroups = new Set();
  assignedRoleIds.forEach(roleId => { if (roleToGroup[roleId]) activeGroups.add(roleToGroup[roleId]); });
  // speakingOrder-Gruppen zaehlen fuer die Zeitformel; krisenstab-support hat keine feste Sprechzeit.
  return Array.from(activeGroups).filter(g => scenario.standardablauf.speakingOrder.includes(g)).length;
}

function assignedRoleIds(state) {
  return Array.from(new Set((state.participants || []).flatMap(p => p.roleIds || []).filter(Boolean)));
}

// Wer bekommt eine vertrauliche Karte tatsaechlich? Die eigentliche Rolle,
// sonst die erste besetzte Ersatzrolle aus "fallbackEmpfaenger" (z. B.
// Personalthema -> Geschaeftsfuehrung, wenn Personal nicht besetzt ist).
// null = niemand Passendes besetzt -> Karte entfaellt. Ohne bekannte
// Besetzung (leere Menge) gilt die eigentliche Rolle.
function resolveRecipient(card, staffedRoleIds) {
  const staffed = staffedRoleIds instanceof Set ? staffedRoleIds : new Set(staffedRoleIds || []);
  if (staffed.size === 0) return card.empfaenger;
  return [card.empfaenger, ...(card.fallbackEmpfaenger || [])].find(rid => staffed.has(rid)) || null;
}

/** Berechnet effektive Trigger-Minuten je Ereignis, abhaengig vom gewaehlten Modus. */
function computeEffectiveSchedule(scenario, state) {
  // Sonderlagekarten, die niemanden erreichen (weder Rolle noch Ersatzrolle
  // besetzt), sollen weder im Ablauf auftauchen noch Zeit belegen.
  const assigned = new Set(assignedRoleIds(state));
  const timeline = buildTimeline(scenario).filter(ev =>
    ev.type !== 'sonderlagekarte' || resolveRecipient(ev.ref, assigned) !== null);
  if (state.durationMode === 'authored') {
    return timeline.map(ev => Object.assign({}, ev, { minute: ev.authoredMinute }));
  }
  // computed: pro Lagekarte Lesezeit + (aktive Rollen * Sprechzeit) + Entscheidungszeit
  // nach Schwierigkeit; Sonderlagekarten laufen ohne eigene Zeit in der Diskussion mit.
  const { placed } = placeEvents(timeline, computedLagekarteSlot(scenario, state));
  return placed.map(({ ev, minute }) => Object.assign({}, ev, { minute }));
}

function computedLagekarteSlot(scenario, state) {
  const roleCount = Math.max(1, activeRoleGroupCount(scenario, state));
  return scenario.standardablauf.readingMinutes
    + (roleCount * scenario.standardablauf.perRoleSeconds / 60)
    + (DIFFICULTY_DECISION_MINUTES[state.difficulty] || DIFFICULTY_DECISION_MINUTES.mittel);
}

function eventRef(scenario, type, id) {
  return type === 'lagekarte'
    ? scenario.lagekarten.find(lk => lk.id === id)
    : scenario.sonderlagekarten.find(sk => sk.id === id);
}

// Dramaturgischer Bogen: jede Lagekarte gehoert zu einem Akt. Im Zieldauer-
// Modus ist jeder Akt mindestens einmal vertreten -- auch bei 45 Minuten
// fuehrt die Übung vom Ausbruch ueber Eskalation und Hoehepunkt bis zum
// Wiederanlauf, statt vom Angriff direkt zum Wiederanlauf zu springen.
const AKTE = [
  { key: 'ausbruch', label: 'Ausbruch' },
  { key: 'eskalation', label: 'Eskalation' },
  { key: 'hoehepunkt', label: 'Höhepunkt' },
  { key: 'folgen', label: 'Folgen' },
  { key: 'wiederanlauf', label: 'Wiederanlauf' }
];

// Zeit, die am Ende fuer den Abschluss (Nacharbeiten + Rechnung) bleibt.
function finaleMinutesFor(scenario, targetMinutes) {
  if (!scenario.nachspiel) return 0;
  return Math.round(Math.min(15, Math.max(4, targetMinutes * 0.1)));
}

// Vertrauliche Karten kosten -- wie im erprobten Ablauf -- keine eigene
// Spielzeit: sie landen in der Diskussionsphase der vorangehenden Lagekarte,
// mehrere Karten im selben Fenster gleichmaessig verteilt.
function placeEvents(sortedEvents, lkSlot) {
  let windowIdx = -1;
  const windowOf = sortedEvents.map(ev => (ev.type === 'lagekarte' ? ++windowIdx : windowIdx));
  const perWindow = {};
  sortedEvents.forEach((ev, i) => { if (ev.type !== 'lagekarte') perWindow[windowOf[i]] = (perWindow[windowOf[i]] || 0) + 1; });
  const seen = {};
  let cumulative = 0;
  let windowStart = 0;
  const placed = sortedEvents.map((ev, i) => {
    if (ev.type === 'lagekarte') {
      windowStart = cumulative;
      cumulative += lkSlot;
      return { ev, minute: windowStart };
    }
    if (windowOf[i] < 0) return { ev, minute: 0 };
    const k = seen[windowOf[i]] = (seen[windowOf[i]] || 0) + 1;
    return { ev, minute: windowStart + lkSlot * (0.3 + 0.55 * k / (perWindow[windowOf[i]] + 1)) };
  });
  return { placed, total: cumulative };
}

/**
 * Baut einen auf eine Zielgesamtdauer zugeschnittenen Ablaufplan. Immer
 * enthalten: Kernszenen (Prioritaet 1), je eine Lagekarte pro Akt des
 * Spannungsbogens und je eine eigene Sonderlagekarte pro besetzter Rolle.
 * Danach werden wichtige (2) und optionale (3) Karten ergaenzt, solange die
 * Zeit reicht. Am Ende bleibt Zeit fuer den Abschluss (Nacharbeiten und
 * Rechnung). Reicht die Zeit nicht, werden Entscheidungsphasen komprimiert
 * (mit Untergrenze); bleibt Zeit uebrig, werden sie gestreckt.
 */
function buildAdaptiveSchedule(scenario, { targetMinutes, difficulty, roleCount, activeRoleIds }) {
  const timeline = buildTimeline(scenario);
  const nominalDecision = DIFFICULTY_DECISION_MINUTES[difficulty] || DIFFICULTY_DECISION_MINUTES.mittel;
  const effectiveRoleCount = Math.max(1, roleCount || 1);
  const speakingMinutes = effectiveRoleCount * scenario.standardablauf.perRoleSeconds / 60;
  const finaleMinutes = finaleMinutesFor(scenario, targetMinutes);
  const budget = targetMinutes - finaleMinutes;
  const lkSlotFor = d => scenario.standardablauf.readingMinutes + speakingMinutes + d;
  const costOf = (ev, d) => (ev.type === 'lagekarte' ? lkSlotFor(d) : 0);
  const keyOf = ev => ev.type + ':' + ev.id;

  // Sonderlagekarten, die niemanden erreichen (weder Rolle noch Ersatzrolle
  // besetzt), werden nicht eingeplant. Lagekarten sind oeffentlich.
  const roleFilterActive = Array.isArray(activeRoleIds) && activeRoleIds.length > 0;
  const activeRoleSet = new Set(activeRoleIds || []);
  const recipientOf = ev => resolveRecipient(ev.ref, activeRoleSet);
  const isRoleRelevant = ev => ev.type !== 'sonderlagekarte' || recipientOf(ev) !== null;

  // Lagekarten, fuer die keine der zustaendigen Rollen besetzt ist, werden
  // beim Auswaehlen hintangestellt -- dort bringt niemand die Fachsicht ein.
  const lkOwned = ev => ev.type !== 'lagekarte' || !roleFilterActive
    || !(ev.ref.zustaendig || []).length || ev.ref.zustaendig.some(rid => activeRoleSet.has(rid));

  const byPrio = p => timeline.filter(ev => (ev.ref.prioritaet || 2) === p);
  const prio1 = byPrio(1).filter(isRoleRelevant);
  const prio2 = byPrio(2).filter(isRoleRelevant);
  const prio3 = byPrio(3).filter(isRoleRelevant);

  // Spannungsbogen: fehlt einem Akt eine Kernszene, kommt die beste Lagekarte
  // dieses Akts fest dazu (besetzte Zustaendigkeit vor Prioritaet vor Zeit).
  const actPicks = [];
  AKTE.forEach(a => {
    const inAct = ev => ev.type === 'lagekarte' && ev.ref.akt === a.key;
    if (prio1.some(inAct)) return;
    const candidates = [...prio2, ...prio3].filter(inAct)
      .sort((x, y) => ((lkOwned(x) ? 0 : 1) - (lkOwned(y) ? 0 : 1))
        || ((x.ref.prioritaet || 2) - (y.ref.prioritaet || 2))
        || (x.authoredMinute - y.authoredMinute));
    if (candidates.length) actPicks.push(candidates[0]);
  });

  // Rollenabdeckung: jede besetzte Rolle bekommt mindestens eine eigene
  // Sonderlagekarte (eigene Karten vor Ersatz-Karten).
  const coverage = [];
  if (roleFilterActive) {
    const alreadyCovered = new Set(prio1.filter(ev => ev.type === 'sonderlagekarte').map(recipientOf));
    activeRoleSet.forEach(roleId => {
      if (alreadyCovered.has(roleId)) return;
      const candidates = [...prio2, ...prio3]
        .filter(ev => ev.type === 'sonderlagekarte' && recipientOf(ev) === roleId)
        .sort((a, b) => ((a.ref.empfaenger === roleId ? 0 : 1) - (b.ref.empfaenger === roleId ? 0 : 1))
          || ((a.ref.prioritaet || 2) - (b.ref.prioritaet || 2))
          || (a.authoredMinute - b.authoredMinute));
      if (candidates.length) coverage.push(candidates[0]);
    });
  }

  const baseline = [];
  const baseIds = new Set();
  [...prio1, ...actPicks, ...coverage].forEach(ev => { if (!baseIds.has(keyOf(ev))) { baseIds.add(keyOf(ev)); baseline.push(ev); } });
  const remainingPool = [...prio2, ...prio3].filter(ev => !baseIds.has(keyOf(ev)));
  // Erst Lagekarten nach Zeitbudget, danach vertrauliche Karten nach Menge.
  const lkPool = remainingPool.filter(ev => ev.type === 'lagekarte');
  const fillPool = lkPool.filter(lkOwned).concat(lkPool.filter(ev => !lkOwned(ev)));
  const skPool = remainingPool.filter(ev => ev.type !== 'lagekarte');

  let decisionMinutes = nominalDecision;
  const baseCost = baseline.reduce((sum, ev) => sum + costOf(ev, decisionMinutes), 0);
  let compression = null;
  let warning = null;
  const selected = baseline.slice();
  let skipped = [];

  if (baseCost > budget) {
    // Selbst der komplette Spannungsbogen passt nicht: Entscheidungszeiten
    // komprimieren (Untergrenze 1 Min.), statt Akte zu streichen.
    const floor = 1;
    const compressibleNominal = Math.max(0.01, nominalDecision - floor);
    const lkCount = baseline.filter(ev => ev.type === 'lagekarte').length;
    const fixedCost = lkCount * (scenario.standardablauf.readingMinutes + speakingMinutes + floor);
    const factor = lkCount > 0 ? Math.max(0, Math.min(1, (budget - fixedCost) / (lkCount * compressibleNominal))) : 1;
    decisionMinutes = Math.max(floor, floor + compressibleNominal * factor);
    compression = Math.round(factor * 100) / 100;
    warning = `Zieldauer (${targetMinutes} Min.) reicht für den kompletten Spannungsbogen nur knapp. ` +
      `Entscheidungszeiten wurden auf ca. ${Math.round(decisionMinutes * 10) / 10} Min. je Lagekarte komprimiert. ` +
      `Mehr Zeit oder weniger Funktionsbereiche einplanen, wenn möglich.`;
    skipped = fillPool.map(ev => ({ type: ev.type, id: ev.id, reason: 'Zeitbudget reicht nur für den Spannungsbogen – zusätzliche Karten entfallen.' }));
  } else {
    let remaining = budget - baseCost;
    fillPool.forEach(ev => {
      const cost = costOf(ev, decisionMinutes);
      if (cost <= remaining) {
        selected.push(ev);
        remaining -= cost;
      } else {
        const tier = (ev.ref.prioritaet || 2) === 2 ? 'wichtige' : 'optionale';
        skipped.push({ type: ev.type, id: ev.id, reason: `Für die gewählte Zieldauer nicht enthalten (${tier} Karte, Zeitbudget ausgeschöpft).` });
      }
    });
    // Alles passt und es bleibt Zeit -> Entscheidungsphasen strecken (max. Verdopplung).
    if (!skipped.some(s => s.type === 'lagekarte') && remaining > 0.5) {
      const lkInSelected = selected.filter(ev => ev.type === 'lagekarte').length;
      if (lkInSelected > 0) {
        const extraPerLk = Math.min(nominalDecision, remaining / lkInSelected);
        decisionMinutes = nominalDecision + extraPerLk;
        const stillUnused = remaining - extraPerLk * lkInSelected;
        warning = `Alle Lagekarten sind enthalten. Die Entscheidungsphasen wurden von ${nominalDecision} auf ca. ${Math.round(decisionMinutes * 10) / 10} Min. verlängert.` +
          (stillUnused > 1
            ? ` Es bleiben bewusst noch ca. ${Math.round(stillUnused)} Minuten frei – gut für Bonuskarten oder ein ausführlicheres Debriefing.`
            : '');
      }
    }
  }

  // Vertrauliche Karten kosten keine Spielzeit, duerfen aber nicht ueberfluten:
  // insgesamt so viele wie im erprobten Ablauf (ca. 1,6 je Lagekarte), eigene
  // Karten einer Rolle vor umgeleiteten, und keine Person bekommt deutlich
  // mehr als die anderen.
  const lkCount = selected.filter(ev => ev.type === 'lagekarte').length;
  const skSelected = selected.filter(ev => ev.type !== 'lagekarte');
  const skBudget = Math.max(skSelected.length, Math.round(lkCount * 1.6));
  const recipients = Math.max(1, roleFilterActive ? activeRoleSet.size : 1);
  const perRecipientCap = Math.max(2, Math.ceil(skBudget / recipients) + 1);
  const load = {};
  skSelected.forEach(ev => { const r = recipientOf(ev) || ev.ref.empfaenger; load[r] = (load[r] || 0) + 1; });
  skPool
    .slice()
    .sort((a, b) => ((recipientOf(a) === a.ref.empfaenger ? 0 : 1) - (recipientOf(b) === b.ref.empfaenger ? 0 : 1))
      || ((a.ref.prioritaet || 2) - (b.ref.prioritaet || 2))
      || (a.authoredMinute - b.authoredMinute))
    .forEach(ev => {
      const r = recipientOf(ev) || ev.ref.empfaenger;
      if (skSelected.length < skBudget && (load[r] || 0) < perRecipientCap) {
        selected.push(ev); skSelected.push(ev); load[r] = (load[r] || 0) + 1;
      } else {
        skipped.push({ type: ev.type, id: ev.id, reason: 'Für diese Dauer nicht enthalten – sonst kämen zu viele vertrauliche Karten auf einmal.' });
      }
    });

  selected.sort((a, b) => a.authoredMinute - b.authoredMinute);
  const { placed, total } = placeEvents(selected, lkSlotFor(decisionMinutes));
  const schedule = placed.map(({ ev, minute }) => ({ type: ev.type, id: ev.id, minute: Math.round(minute * 100) / 100 }));

  if (total > budget + 0.05) {
    warning = `Zieldauer (${targetMinutes} Min.) ist mit ${effectiveRoleCount} aktiven Funktionsbereichen nicht erreichbar, ` +
      `selbst mit auf 1 Min. komprimierten Entscheidungsphasen: Lese- und Sprechzeit für den Spannungsbogen brauchen bereits ` +
      `${Math.round(total * 10) / 10} Min. (plus ${finaleMinutes} Min. Abschluss). Weniger Funktionsbereiche besetzen – ` +
      `größere Teams statt mehr Rollen – oder mehr Zeit einplanen.`;
  }

  return {
    schedule,
    skipped,
    totalMinutes: Math.round(total * 100) / 100,
    finaleMinutes,
    decisionMinutesUsed: Math.round(decisionMinutes * 100) / 100,
    compression,
    warning,
    akte: AKTE.map(a => ({ key: a.key, label: a.label, enthalten: selected.some(ev => ev.type === 'lagekarte' && ev.ref.akt === a.key) }))
  };
}

/** Liefert den fuer den aktuellen Lauf massgeblichen Ablaufplan (je nach Modus live berechnet oder beim Start eingefroren). */
function getActiveSchedule(scenario, state) {
  if (state.durationMode === 'target' && state.plannedSchedule) {
    const combined = state.plannedSchedule.concat(state.promotedEvents || []);
    // Nachtraeglich "promotete" Ereignisse werden einfach angehaengt — hier
    // chronologisch nach Minute einsortieren, damit "aktuelle Lagekarte"
    // (jeweils das Ereignis mit der groessten faelligen Minute) immer korrekt
    // ermittelt wird, unabhaengig von der Aufnahme-Reihenfolge.
    return combined
      .map(ev => Object.assign({}, ev, { ref: eventRef(scenario, ev.type, ev.id) }))
      .sort((a, b) => a.minute - b.minute);
  }
  return computeEffectiveSchedule(scenario, state);
}

/** Ermittelt, welche Ereignisse beim aktuellen Stand bereits "faellig" sind (fuer Auto-Fire). */
function dueEvents(scenario, state) {
  const nowMin = elapsedMinutes(state);
  const schedule = getActiveSchedule(scenario, state);
  return schedule.filter(ev => ev.minute <= nowMin);
}

function currentLagekarte(scenario, state) {
  const due = dueEvents(scenario, state).filter(e => e.type === 'lagekarte');
  if (due.length === 0) return null;
  // Groesste faellige Minute gewinnt — nicht einfach das letzte Array-Element,
  // falls die Quelle (z. B. nach einer Promotion) nicht laenger sortiert waere.
  return due.reduce((latest, ev) => (ev.minute > latest.minute ? ev : latest)).ref;
}

/**
 * Versetzt den Lauf manuell auf eine bestimmte Übungsminute ("Zeitsprung") —
 * z. B. um eine zu lange diskutierte Wartezeit zu überspringen oder gezielt
 * zu einer bestimmten Karte vorzuspulen. Die Uhr läuft danach normal
 * (echtzeit-basiert) ab diesem neuen Punkt weiter, inklusive Pause-Verhalten.
 */
function setElapsedMinutes(state, targetMinutes) {
  if (!state.startedAt) return;
  const now = state.status === 'paused' && state.pausedAt ? state.pausedAt : Date.now();
  state.totalPausedMs = (now - state.startedAt) - Math.max(0, targetMinutes) * 60000;
}

// Rollenempfehlung nach Dauer: Mehr Rollen bedeuten mehr Sprechzeit je
// Lagekarte und mehr vertrauliche Karten -- in 45 Minuten ersticken 20 Rollen
// jede Diskussion. Darum richtet sich die Rollenzahl nach der Zeit, nicht nach
// der Teilnehmerzahl; bei vielen Personen werden Teams pro Rolle gebildet.
const ROLE_RECOMMENDATION = [
  { maxMinutes: 45, groups: 5, roles: 5 },
  { maxMinutes: 60, groups: 6, roles: 6 },
  { maxMinutes: 90, groups: 7, roles: 9 },
  { maxMinutes: 120, groups: 8, roles: 12 },
  { maxMinutes: Infinity, groups: 99, roles: 99 }
];

function recommendRoles(scenario, { targetMinutes, difficulty }) {
  const minutes = Math.max(10, Number(targetMinutes) || 90);
  const rule = ROLE_RECOMMENDATION.find(r => minutes <= r.maxMinutes);
  const speaking = scenario.standardablauf.speakingOrder;
  const groupOf = {};
  scenario.roles.forEach(r => { groupOf[r.id] = r.group; });
  const playable = scenario.roles.filter(r => r.id !== 'teilnehmer' && groupOf[r.id] && groupOf[r.id] !== 'krisenstab-support');
  const maxGroups = Math.min(rule.groups, speaking.length);
  const maxRoles = Math.min(rule.roles, playable.length);
  // Welche Rollen sind in den Lagekarten dieser Dauer am meisten gefordert?
  const plan = buildAdaptiveSchedule(scenario, { targetMinutes: minutes, difficulty: difficulty || 'mittel', roleCount: maxGroups });
  const weight = {};
  plan.schedule.filter(e => e.type === 'lagekarte').forEach(e => {
    const lk = scenario.lagekarten.find(x => x.id === e.id);
    (lk && lk.zustaendig || []).forEach(rid => { weight[rid] = (weight[rid] || 0) + 1; });
  });
  const ranked = playable.slice().sort((a, b) => ((weight[b.id] || 0) - (weight[a.id] || 0))
    || (speaking.indexOf(a.group) - speaking.indexOf(b.group)));
  const picked = [];
  const groups = new Set();
  // Erst je eine Rolle pro Funktionsbereich (breite Fachsicht), dann auffuellen.
  ranked.forEach(r => { if (picked.length < maxRoles && !groups.has(r.group) && groups.size < maxGroups) { picked.push(r.id); groups.add(r.group); } });
  ranked.forEach(r => { if (picked.length < maxRoles && !picked.includes(r.id) && groups.has(r.group)) picked.push(r.id); });
  return { targetMinutes: minutes, maxGroups, maxRoles, roleIds: picked, groups: Array.from(groups) };
}

function totalPlannedMinutes(scenario, state) {
  if (state.durationMode === 'target' && state.plannedTotalMinutes != null) {
    return state.plannedTotalMinutes;
  }
  const schedule = computeEffectiveSchedule(scenario, state);
  const lks = schedule.filter(ev => ev.type === 'lagekarte');
  const lastLk = lks[lks.length - 1];
  if (!lastLk) return 0;
  // Ende = Ende der letzten Lagekarte im Ablauf (nicht der letzten im Array).
  if (state.durationMode === 'authored') {
    return Math.max(lastLk.minute + (lastLk.ref.diskussionMinuten || 5), ...schedule.map(ev => ev.minute));
  }
  return lastLk.minute + computedLagekarteSlot(scenario, state);
}

module.exports = {
  DIFFICULTY_DECISION_MINUTES,
  newRunState,
  elapsedMinutes,
  setElapsedMinutes,
  buildTimeline,
  activeRoleGroupCount,
  assignedRoleIds,
  resolveRecipient,
  computeEffectiveSchedule,
  buildAdaptiveSchedule,
  finaleMinutesFor,
  recommendRoles,
  AKTE,
  getActiveSchedule,
  eventRef,
  dueEvents,
  currentLagekarte,
  totalPlannedMinutes
};
