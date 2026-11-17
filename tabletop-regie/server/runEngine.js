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
    firedSonderlagekarten: [], // { id, at, atMinute, manual, recipientRoleId, emailResults }
    firedBonusInfo: [], // { id, atMinute, recipientRoleId } -- fuer das Spielbrett
    finale: { step: 0, optionen: {} }, // Abschluss (Nacharbeiten + Rechnung), 0 = nicht aktiv
    weichen: {}, // { [weichenId]: optionId } -- Entscheidungen mit Folgen fuer spaetere Karten
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
  const slot = computedLagekarteSlot(scenario, state);
  const { placed } = placeEvents(timeline, ev => (isVorbote(ev) ? vorbotenMinutes(scenario) : slot));
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
// Vorboten: Die Krise baut sich auf, bevor sie da ist -- kurze, harmlos
// wirkende Meldungen (Anmeldung hakt, Geruch in der Halle). Sie kosten nur
// Lesezeit, ohne Sprechrunde und Entscheidungsphase.
const AKTE = [
  { key: 'vorboten', label: 'Vorboten' },
  { key: 'ausbruch', label: 'Ausbruch' },
  { key: 'eskalation', label: 'Eskalation' },
  { key: 'hoehepunkt', label: 'Höhepunkt' },
  { key: 'folgen', label: 'Folgen' },
  { key: 'wiederanlauf', label: 'Wiederanlauf' }
];

function isVorbote(ev) {
  return ev.type === 'lagekarte' && !!ev.ref && ev.ref.akt === 'vorboten';
}
function vorbotenMinutes(scenario) {
  return (scenario.standardablauf && scenario.standardablauf.vorbotenMinuten) || 2;
}

// Zeit, die am Ende fuer den Abschluss (Nacharbeiten + Rechnung) bleibt.
function finaleMinutesFor(scenario, targetMinutes) {
  if (!scenario.nachspiel) return 0;
  return Math.round(Math.min(15, Math.max(4, targetMinutes * 0.1)));
}

// Vertrauliche Karten kosten -- wie im erprobten Ablauf -- keine eigene
// Spielzeit: sie landen in der Diskussionsphase der vorangehenden Lagekarte,
// mehrere Karten im selben Fenster gleichmaessig verteilt.
function placeEvents(sortedEvents, slot) {
  const slotOf = typeof slot === 'function' ? slot : () => slot;
  let windowIdx = -1;
  const windowOf = sortedEvents.map(ev => (ev.type === 'lagekarte' ? ++windowIdx : windowIdx));
  const perWindow = {};
  sortedEvents.forEach((ev, i) => { if (ev.type !== 'lagekarte') perWindow[windowOf[i]] = (perWindow[windowOf[i]] || 0) + 1; });
  const seen = {};
  let cumulative = 0;
  let windowStart = 0;
  let windowLen = 0;
  const placed = sortedEvents.map((ev, i) => {
    if (ev.type === 'lagekarte') {
      windowStart = cumulative;
      windowLen = slotOf(ev);
      cumulative += windowLen;
      return { ev, minute: windowStart };
    }
    if (windowOf[i] < 0) return { ev, minute: 0 };
    const k = seen[windowOf[i]] = (seen[windowOf[i]] || 0) + 1;
    return { ev, minute: windowStart + windowLen * (0.3 + 0.55 * k / (perWindow[windowOf[i]] + 1)) };
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
  // Vorboten bekommen normalerweise ihre volle Zeit; wird es knapp, schrumpfen
  // sie zuerst (auf mind. 2 Min.), bevor Entscheidungszeit gekuerzt wird.
  let vm = vorbotenMinutes(scenario);
  const costOf = (ev, d) => (ev.type !== 'lagekarte' ? 0 : (isVorbote(ev) ? vm : lkSlotFor(d)));
  const fullLk = ev => ev.type === 'lagekarte' && !isVorbote(ev);
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

  // Inhaltliche Abhaengigkeiten:
  // - "voraussetzung": [Lagekarten-IDs]. Eine Lagekarte zieht ihre
  //   Voraussetzungen mit in den Plan; eine vertrauliche Karte kommt nur, wenn
  //   alle Voraussetzungen gespielt werden, und immer erst danach.
  // - "vorLagekarte": vertrauliche Karte kommt unmittelbar vor dieser
  //   Lagekarte (und nur, wenn sie gespielt wird).
  const lkEvById = {};
  timeline.forEach(ev => { if (ev.type === 'lagekarte') lkEvById[ev.id] = ev; });
  const prereqsOf = ev => (ev.ref.voraussetzung || []).map(id => lkEvById[id]).filter(Boolean);
  const closureOf = (ev, acc = []) => {
    prereqsOf(ev).forEach(p => { if (!acc.includes(p)) { closureOf(p, acc); acc.push(p); } });
    if (!acc.includes(ev)) acc.push(ev);
    return acc;
  };
  const sortKey = ev => {
    if (ev.type === 'lagekarte') return ev.authoredMinute;
    const vor = ev.ref.vorLagekarte && lkEvById[ev.ref.vorLagekarte];
    if (vor) return vor.authoredMinute - 0.01;
    const pre = prereqsOf(ev);
    return pre.length ? Math.max(ev.authoredMinute, ...pre.map(p => p.authoredMinute + 0.01)) : ev.authoredMinute;
  };

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

  const baseline = [];
  const baseIds = new Set();
  [...prio1, ...actPicks].filter(ev => ev.type === 'lagekarte').forEach(ev => closureOf(ev).forEach(x => {
    if (!baseIds.has(keyOf(x))) { baseIds.add(keyOf(x)); baseline.push(x); }
  }));
  prio1.filter(ev => ev.type !== 'lagekarte').forEach(ev => { if (!baseIds.has(keyOf(ev))) { baseIds.add(keyOf(ev)); baseline.push(ev); } });
  const remainingPool = [...prio2, ...prio3].filter(ev => !baseIds.has(keyOf(ev)));
  // Erst Lagekarten nach Zeitbudget, danach vertrauliche Karten nach Menge.
  const lkPool = remainingPool.filter(ev => ev.type === 'lagekarte');
  const fillPool = lkPool.filter(lkOwned).concat(lkPool.filter(ev => !lkOwned(ev)));
  const skPool = remainingPool.filter(ev => ev.type !== 'lagekarte');

  let decisionMinutes = nominalDecision;
  let baseCost = baseline.reduce((sum, ev) => sum + costOf(ev, decisionMinutes), 0);
  if (baseCost > budget && vm > 2) {
    vm = Math.max(2, vm - (baseCost - budget) / Math.max(1, baseline.filter(isVorbote).length));
    baseCost = baseline.reduce((sum, ev) => sum + costOf(ev, decisionMinutes), 0);
  }
  let compression = null;
  let warning = null;
  const selected = baseline.slice();
  let skipped = [];

  if (baseCost > budget) {
    // Selbst der komplette Spannungsbogen passt nicht: Entscheidungszeiten
    // komprimieren (Untergrenze 1 Min.), statt Akte zu streichen.
    const floor = 1;
    const compressibleNominal = Math.max(0.01, nominalDecision - floor);
    const lkCount = baseline.filter(fullLk).length;
    const fixedCost = lkCount * (scenario.standardablauf.readingMinutes + speakingMinutes + floor)
      + baseline.filter(isVorbote).length * vm;
    const factor = lkCount > 0 ? Math.max(0, Math.min(1, (budget - fixedCost) / (lkCount * compressibleNominal))) : 1;
    decisionMinutes = Math.max(floor, floor + compressibleNominal * factor);
    compression = Math.round(factor * 100) / 100;
    // Nur warnen, wenn die Kuerzung spuerbar ist (mehr als eine halbe Minute).
    warning = nominalDecision - decisionMinutes > 0.5
      ? `Zieldauer (${targetMinutes} Min.) reicht für den kompletten Spannungsbogen nur knapp. ` +
        `Entscheidungszeiten wurden auf ca. ${Math.round(decisionMinutes * 10) / 10} Min. je Lagekarte komprimiert. ` +
        `Mehr Zeit oder weniger Funktionsbereiche einplanen, wenn möglich.`
      : null;
    skipped = fillPool.map(ev => ({ type: ev.type, id: ev.id, reason: 'Zeitbudget reicht nur für den Spannungsbogen – zusätzliche Karten entfallen.' }));
  } else {
    // Mehr Geschichte statt nur laengerer Diskussionen: Zusatzkarten kommen
    // dazu, solange jede Lagekarte noch mindestens fillFloor Minuten
    // Entscheidungszeit behaelt. Die Restzeit wird danach gleichmaessig auf
    // die Entscheidungsphasen verteilt (hoechstens Verdopplung).
    const fillFloor = Math.min(nominalDecision, Math.max(1.5, nominalDecision * 0.6));
    const selKeys = new Set(selected.map(keyOf));
    let used = selected.reduce((sum, ev) => sum + costOf(ev, fillFloor), 0);
    // Reihenfolge: Prioritaet, dann Karten mit besetzter Zustaendigkeit, dann
    // die Station des Spannungsbogens, die bisher am duennsten besetzt ist --
    // so verteilen sich Zusatzkarten ueber den ganzen Bogen statt sich am
    // Anfang zu ballen.
    const actCount = {};
    const countAct = ev => { if (ev.type === 'lagekarte') actCount[ev.ref.akt] = (actCount[ev.ref.akt] || 0) + 1; };
    selected.forEach(countAct);
    const pool = fillPool.slice();
    while (pool.length) {
      pool.sort((a, b) => ((a.ref.prioritaet || 2) - (b.ref.prioritaet || 2))
        || ((lkOwned(a) ? 0 : 1) - (lkOwned(b) ? 0 : 1))
        || ((actCount[a.ref.akt] || 0) - (actCount[b.ref.akt] || 0))
        || (a.authoredMinute - b.authoredMinute));
      const ev = pool.shift();
      if (selKeys.has(keyOf(ev))) continue;
      const add = closureOf(ev).filter(x => !selKeys.has(keyOf(x)));
      const cost = add.reduce((sum, x) => sum + costOf(x, fillFloor), 0);
      if (used + cost <= budget) {
        add.forEach(x => { selected.push(x); selKeys.add(keyOf(x)); countAct(x); });
        used += cost;
      } else {
        const tier = (ev.ref.prioritaet || 2) === 2 ? 'wichtige' : 'optionale';
        skipped.push({ type: ev.type, id: ev.id, reason: `Für die gewählte Zieldauer nicht enthalten (${tier} Karte, Zeitbudget ausgeschöpft).` });
      }
    }
    // Karten, die als Voraussetzung nachgezogen wurden, nicht als uebersprungen fuehren.
    skipped = skipped.filter(x => !selKeys.has(x.type + ':' + x.id));
    const lkInSelected = selected.filter(fullLk).length;
    const remaining = budget - used;
    if (lkInSelected > 0) {
      decisionMinutes = Math.min(nominalDecision * 2, fillFloor + remaining / lkInSelected);
      const stillUnused = remaining - (decisionMinutes - fillFloor) * lkInSelected;
      if (!skipped.some(x => x.type === 'lagekarte') && decisionMinutes > nominalDecision + 0.5) {
        warning = `Alle Lagekarten sind enthalten. Die Entscheidungsphasen wurden von ${nominalDecision} auf ca. ${Math.round(decisionMinutes * 10) / 10} Min. verlängert.` +
          (stillUnused > 1
            ? ` Es bleiben bewusst noch ca. ${Math.round(stillUnused)} Minuten frei – gut für Bonuskarten oder ein ausführlicheres Debriefing.`
            : '');
      }
    }
  }

  // Vertrauliche Karten kosten keine Spielzeit, duerfen aber nicht ueberfluten:
  // insgesamt ca. 1,6 je Lagekarte, keine Person bekommt deutlich mehr als die
  // anderen -- und sie verteilen sich GLEICHMAESSIG ueber den Bogen, statt sich
  // am Anfang zu ballen: Jede Karte gehoert zum Abschnitt der Lagekarte, nach
  // der sie im Drehbuch kommt; ausgewaehlt wird immer zuerst fuer den
  // Abschnitt, der bisher die wenigsten vertraulichen Karten hat.
  const lkSel = selected.filter(ev => ev.type === 'lagekarte').sort((a, b) => a.authoredMinute - b.authoredMinute);
  const lkSelIds = new Set(lkSel.map(ev => ev.id));
  const prereqsMet = ev => (ev.ref.voraussetzung || []).every(id => lkSelIds.has(id))
    && (!ev.ref.vorLagekarte || lkSelIds.has(ev.ref.vorLagekarte));
  const fehlendeVoraussetzung = ev => [...(ev.ref.voraussetzung || []), ...(ev.ref.vorLagekarte ? [ev.ref.vorLagekarte] : [])].filter(id => !lkSelIds.has(id));
  // Vertrauliche Karten aus der Grundauswahl, deren Voraussetzung fehlt, fliegen raus.
  for (let i = selected.length - 1; i >= 0; i--) {
    const ev = selected[i];
    if (ev.type !== 'lagekarte' && !prereqsMet(ev)) {
      selected.splice(i, 1);
      skipped.push({ type: ev.type, id: ev.id, reason: `Baut auf ${fehlendeVoraussetzung(ev).join(', ')} auf – diese Lagekarte ist nicht im Plan.` });
    }
  }
  const windowOf = ev => { const k = sortKey(ev); let w = 0; lkSel.forEach((l, i) => { if (l.authoredMinute <= k) w = i; }); return w; };
  const winLoad = new Array(Math.max(1, lkSel.length)).fill(0);
  const recLoad = {};
  const skSelected = [];
  const taken = new Set();
  const recOf = ev => recipientOf(ev) || ev.ref.empfaenger;
  const own = ev => (recipientOf(ev) === ev.ref.empfaenger ? 0 : 1);
  const take = (ev, intoSelected) => {
    if (intoSelected) selected.push(ev);
    skSelected.push(ev); taken.add(keyOf(ev));
    winLoad[windowOf(ev)]++; recLoad[recOf(ev)] = (recLoad[recOf(ev)] || 0) + 1;
  };
  selected.filter(ev => ev.type !== 'lagekarte').forEach(ev => take(ev, false));
  const balanced = (a, b) => (winLoad[windowOf(a)] - winLoad[windowOf(b)])
    || (own(a) - own(b))
    || ((a.ref.prioritaet || 2) - (b.ref.prioritaet || 2))
    || (sortKey(a) - sortKey(b));
  // Rollenabdeckung: jede besetzte Rolle bekommt mindestens eine eigene Karte
  // (eigene Karte vor umgeleiteter, dann im am wenigsten belegten Abschnitt).
  if (roleFilterActive) {
    activeRoleSet.forEach(roleId => {
      if (skSelected.some(ev => recipientOf(ev) === roleId)) return;
      const candidates = skPool.filter(ev => !taken.has(keyOf(ev)) && prereqsMet(ev) && recipientOf(ev) === roleId)
        .sort((a, b) => (own(a) - own(b)) || balanced(a, b));
      if (candidates.length) take(candidates[0], true);
    });
  }
  const lkCount = selected.filter(fullLk).length;
  // Bei stark verkuerzten Entscheidungsphasen (kurze Uebungen) bleibt keine
  // Zeit, viele vertrauliche Informationen zu verarbeiten: dann weniger Karten,
  // aber jede besetzte Rolle bekommt weiterhin mindestens eine.
  const skFactor = decisionMinutes >= 2.5 ? 1.6 : Math.max(0.6, 1.6 * decisionMinutes / 2.5);
  const skBudget = Math.max(skSelected.length, Math.round(lkCount * skFactor));
  const recipients = Math.max(1, roleFilterActive ? activeRoleSet.size : 1);
  const perRecipientCap = Math.max(2, Math.ceil(skBudget / recipients) + 1);
  while (skSelected.length < skBudget) {
    const candidates = skPool.filter(ev => !taken.has(keyOf(ev)) && prereqsMet(ev) && (recLoad[recOf(ev)] || 0) < perRecipientCap).sort(balanced);
    if (!candidates.length) break;
    take(candidates[0], true);
  }
  skPool.filter(ev => !taken.has(keyOf(ev))).forEach(ev => {
    skipped.push({ type: ev.type, id: ev.id, reason: prereqsMet(ev)
      ? 'Nicht eingeplant, damit die vertraulichen Karten gleichmäßig über die Übung verteilt sind und niemand überflutet wird.'
      : `Baut auf ${fehlendeVoraussetzung(ev).join(', ')} auf – diese Lagekarte ist nicht im Plan.` });
  });

  selected.sort((a, b) => sortKey(a) - sortKey(b));
  const { placed, total } = placeEvents(selected, ev => (isVorbote(ev) ? vm : lkSlotFor(decisionMinutes)));
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
// Solange die Krise nicht wirklich laeuft (Vorbereitung, 30-Sekunden-
// Countdown, nicht gestartet), ist NICHTS faellig -- auch keine Karte, die
// fuer Minute 0 geplant ist. Sonst zeigt die Buehne schon in der "Ruhe vor
// dem Sturm" das erste Lagebild und spielt dessen Ton ab.
function crisisClockStarted(state) {
  return !!state.startedAt && ['running', 'paused', 'ended'].includes(state.status);
}

function dueEvents(scenario, state) {
  if (!crisisClockStarted(state)) return [];
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
  // Vom Drehbuch vorgegebene Reihenfolge ("rollenPrioritaet"): die fachlich
  // wichtigsten Rollen zuerst, unabhaengig davon, wie oft sie auf Karten stehen.
  const authored = (scenario.standardablauf.rollenPrioritaet || []).filter(id => scenario.roles.some(r => r.id === id && id !== 'teilnehmer'));
  if (authored.length) {
    const roleIds = authored.slice(0, maxRoles);
    ranked.forEach(r => { if (roleIds.length < maxRoles && !roleIds.includes(r.id)) roleIds.push(r.id); });
    const groupsA = Array.from(new Set(roleIds.map(id => groupOf[id])));
    return { targetMinutes: minutes, maxGroups: groupsA.length, maxRoles, roleIds, groups: groupsA };
  }
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
  return lastLk.minute + (isVorbote(lastLk) ? vorbotenMinutes(scenario) : computedLagekarteSlot(scenario, state));
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
  isVorbote,
  getActiveSchedule,
  eventRef,
  dueEvents,
  crisisClockStarted,
  currentLagekarte,
  totalPlannedMinutes
};
