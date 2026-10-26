// Kernlogik des Übungslaufs: Timer, Kartenfortschritt, Zeitberechnung nach
// Gruppengröße/Schwierigkeit. Hält den gesamten Lauf-Zustand in einem
// einzigen Objekt, das vom Server regelmäßig persistiert wird.

const DIFFICULTY_DECISION_MINUTES = { leicht: 2, mittel: 4, hoch: 6 };

function newRunState(scenario) {
  return {
    status: 'idle', // idle | running | paused | ended
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
    participants: [], // { id, name, email, remote, roleId }
    firedLagekarten: [], // ids
    firedSonderlagekarten: [], // { id, emailStatus }
    manualFires: [], // ids, die der Moderator vorzeitig/zusätzlich ausgelöst hat
    bewertung: {}, // { [roleId]: { [kriterium]: 1-5 } }
    log: []
  };
}

function elapsedMinutes(state) {
  if (!state.startedAt) return 0;
  const now = state.status === 'paused' && state.pausedAt ? state.pausedAt : Date.now();
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

/** Berechnet effektive Trigger-Minuten je Ereignis, abhaengig vom gewaehlten Modus. */
function computeEffectiveSchedule(scenario, state) {
  const timeline = buildTimeline(scenario);
  if (state.durationMode === 'authored') {
    return timeline.map(ev => Object.assign({}, ev, { minute: ev.authoredMinute }));
  }
  // computed: pro Lagekarte Lesezeit + (aktive Rollen * Sprechzeit) + Entscheidungszeit nach Schwierigkeit;
  // Sonderlagekarten bekommen einen festen kurzen Slot, in der urspruenglich erprobten Reihenfolge.
  const roleCount = Math.max(1, activeRoleGroupCount(scenario, state));
  const decisionMinutes = DIFFICULTY_DECISION_MINUTES[state.difficulty] || DIFFICULTY_DECISION_MINUTES.mittel;
  const lagekarteSlot = scenario.standardablauf.readingMinutes
    + (roleCount * scenario.standardablauf.perRoleSeconds / 60)
    + decisionMinutes;
  const sonderSlot = 2;
  let cumulative = 0;
  return timeline.map(ev => {
    const minute = cumulative;
    cumulative += ev.type === 'lagekarte' ? lagekarteSlot : sonderSlot;
    return Object.assign({}, ev, { minute });
  });
}

function eventRef(scenario, type, id) {
  return type === 'lagekarte'
    ? scenario.lagekarten.find(lk => lk.id === id)
    : scenario.sonderlagekarten.find(sk => sk.id === id);
}

/**
 * Baut einen auf eine Zielgesamtdauer zugeschnittenen Ablaufplan: Priorität-1-
 * Ereignisse (Kernszenen, z. B. Start, Beirat-Highlight, Ende) sind immer
 * enthalten; Priorität 2 und danach 3 werden in chronologischer Reihenfolge
 * ergänzt, solange das Zeitbudget reicht. Reicht die Zeit nicht einmal für
 * die Kernszenen, werden deren Entscheidungszeiten komprimiert (mit Untergrenze)
 * statt weitere Karten zu entfernen. Ist nach allen Karten noch Zeit übrig,
 * wird die Entscheidungszeit der enthaltenen Lagekarten gestreckt.
 */
function buildAdaptiveSchedule(scenario, { targetMinutes, difficulty, roleCount }) {
  const timeline = buildTimeline(scenario);
  const nominalDecision = DIFFICULTY_DECISION_MINUTES[difficulty] || DIFFICULTY_DECISION_MINUTES.mittel;
  const effectiveRoleCount = Math.max(1, roleCount || 1);
  const speakingMinutes = effectiveRoleCount * scenario.standardablauf.perRoleSeconds / 60;

  function lagekarteCost(decisionMinutes) {
    return scenario.standardablauf.readingMinutes + speakingMinutes + decisionMinutes;
  }
  function costOf(ev, decisionMinutes, sonderSlot) {
    return ev.type === 'lagekarte' ? lagekarteCost(decisionMinutes) : sonderSlot;
  }

  const byPrio = p => timeline.filter(ev => (ev.ref.prioritaet || 2) === p);
  const prio1 = byPrio(1), prio2 = byPrio(2), prio3 = byPrio(3);

  let decisionMinutes = nominalDecision;
  let sonderSlot = 2;
  const baseCost = prio1.reduce((sum, ev) => sum + costOf(ev, decisionMinutes, sonderSlot), 0);

  let compression = null;
  let warning = null;
  let selected = prio1.slice();
  let skipped = [];

  if (baseCost > targetMinutes) {
    // Selbst die Kernszenen passen nicht hinein: Entscheidungszeiten so weit
    // komprimieren, dass sie passen, mit Untergrenze (sonst unbrauchbar kurz).
    // Sonderlagekarten gehen dabei sofort auf ihre Mindestdauer (1 Min.) runter
    // — dieselbe Zahl wird sowohl für die Budgetrechnung als auch am Ende
    // tatsächlich verwendet, damit das Ergebnis nie über dem Zielbudget liegt.
    const floor = 1;
    const sonderFloor = 1;
    const compressibleNominal = Math.max(0.01, nominalDecision - floor);
    const fixedCost = prio1.reduce((sum, ev) => sum + (ev.type === 'lagekarte' ? scenario.standardablauf.readingMinutes + speakingMinutes + floor : sonderFloor), 0);
    const availableForDecision = targetMinutes - fixedCost;
    const lkCountInPrio1 = prio1.filter(ev => ev.type === 'lagekarte').length;
    const factor = lkCountInPrio1 > 0 ? Math.max(0, Math.min(1, availableForDecision / (lkCountInPrio1 * compressibleNominal))) : 1;
    decisionMinutes = Math.max(floor, floor + compressibleNominal * factor);
    sonderSlot = sonderFloor;
    compression = Math.round(factor * 100) / 100;
    warning = `Zieldauer (${targetMinutes} Min.) reicht selbst für die Kernszenen nur sehr knapp. ` +
      `Entscheidungszeiten wurden auf ca. ${Math.round(decisionMinutes * 10) / 10} Min. je Lagekarte komprimiert. ` +
      `Mehr Zeit oder weniger aktive Funktionsbereiche einplanen, wenn möglich.`;
    skipped = prio2.concat(prio3).map(ev => ({ type: ev.type, id: ev.id, reason: 'Zeitbudget reicht nicht einmal für alle Kernszenen – alle optionalen Karten entfallen.' }));
  } else {
    let remaining = targetMinutes - baseCost;
    [...prio2, ...prio3].forEach(ev => {
      const cost = costOf(ev, decisionMinutes, sonderSlot);
      if (cost <= remaining) {
        selected.push(ev);
        remaining -= cost;
      } else {
        const tier = (ev.ref.prioritaet || 2) === 2 ? 'wichtige' : 'optionale';
        skipped.push({ type: ev.type, id: ev.id, reason: `Für die gewählte Zieldauer nicht enthalten (${tier} Karte, Zeitbudget ausgeschöpft).` });
      }
    });
    // Alles passte hinein und es bleibt nennenswert Zeit übrig -> Entscheidungszeit strecken statt Leerlauf.
    if (skipped.length === 0 && remaining > 0.5) {
      const lkInSelected = selected.filter(ev => ev.type === 'lagekarte').length;
      if (lkInSelected > 0) {
        const extraPerLk = Math.min(nominalDecision, remaining / lkInSelected); // Deckel: max. Verdopplung
        decisionMinutes = nominalDecision + extraPerLk;
        const stillUnused = remaining - extraPerLk * lkInSelected;
        warning = `Alle Lagekarten und terminierten Sonderlagekarten sind bereits enthalten. ` +
          `Die Entscheidungsphasen je Lagekarte wurden von ${nominalDecision} auf ca. ${Math.round(decisionMinutes * 10) / 10} Min. verlängert.` +
          (stillUnused > 1
            ? ` Es bleiben dabei bewusst noch ca. ${Math.round(stillUnused)} ungenutzte Minuten (Entscheidungszeit wird nicht beliebig weiter gestreckt) – diese Zeit eignet sich für ein ausführlicheres Debriefing oder Bonuskarten.`
            : '');
      }
    }
  }

  selected.sort((a, b) => a.authoredMinute - b.authoredMinute);
  let cumulative = 0;
  const schedule = selected.map(ev => {
    const minute = cumulative;
    cumulative += costOf(ev, decisionMinutes, sonderSlot);
    return { type: ev.type, id: ev.id, minute: Math.round(minute * 100) / 100 };
  });

  // Auch mit maximaler Kompression (Lesezeit/Sprechzeit sind nicht weiter
  // kürzbar) kann die Zieldauer bei vielen aktiven Rollen unerreichbar sein.
  // Das klar sagen, statt eine nicht eingehaltene Zieldauer zu verschweigen.
  if (cumulative > targetMinutes + 0.05) {
    warning = `Zieldauer (${targetMinutes} Min.) ist mit ${prio1.filter(e => e.type === 'lagekarte').length} ` +
      `Kernszenen und ${effectiveRoleCount} aktiven Funktionsbereichen nicht erreichbar, selbst mit auf das ` +
      `Minimum (1 Min.) komprimierten Entscheidungs- und Sonderlagekartenzeiten: Lesezeit und Sprechzeit allein ` +
      `benötigen bereits ${Math.round(cumulative * 10) / 10} Min. Weniger aktive Funktionsbereiche zuweisen oder ` +
      `mehr Zeit einplanen.`;
  }

  return {
    schedule,
    skipped,
    totalMinutes: Math.round(cumulative * 100) / 100,
    decisionMinutesUsed: Math.round(decisionMinutes * 100) / 100,
    compression,
    warning
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

function totalPlannedMinutes(scenario, state) {
  if (state.durationMode === 'target' && state.plannedTotalMinutes != null) {
    return state.plannedTotalMinutes;
  }
  const schedule = computeEffectiveSchedule(scenario, state);
  const last = schedule[schedule.length - 1];
  const lastLagekarte = scenario.lagekarten[scenario.lagekarten.length - 1];
  const tailDuration = state.durationMode === 'authored'
    ? (lastLagekarte.diskussionMinuten || 5)
    : (scenario.standardablauf.readingMinutes + (Math.max(1, activeRoleGroupCount(scenario, state)) * scenario.standardablauf.perRoleSeconds / 60) + (DIFFICULTY_DECISION_MINUTES[state.difficulty] || 4));
  return (last ? last.minute : 0) + tailDuration;
}

module.exports = {
  DIFFICULTY_DECISION_MINUTES,
  newRunState,
  elapsedMinutes,
  setElapsedMinutes,
  buildTimeline,
  activeRoleGroupCount,
  computeEffectiveSchedule,
  buildAdaptiveSchedule,
  getActiveSchedule,
  eventRef,
  dueEvents,
  currentLagekarte,
  totalPlannedMinutes
};
