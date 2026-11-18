const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const QRCode = require('qrcode');

const store = require('./store');
const engine = require('./runEngine');
const mailer = require('./mailer');
const { renderCertificate } = require('./certificate');
const { validateScenario } = require('./validate');
const finale = require('./finale');

const app = express();
app.use(express.json({ limit: '20mb' }));
// Endet der 30-Sekunden-Countdown zwischen zwei Ticks, sollen Zeitsprung,
// Pause usw. trotzdem sofort den laufenden Zustand sehen.
app.use('/api/run', (req, res, next) => { maybeStartCrisisFromCountdown(); next(); });
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/media', express.static(path.join(__dirname, '..', 'media')));

// Logo-Upload fuer das Branding (Urkunden): landet direkt unter media/branding,
// damit der Moderator keinen Dateipfad im System heraussuchen muss.
const brandingMediaDir = path.join(__dirname, '..', 'media', 'branding');
fs.mkdirSync(brandingMediaDir, { recursive: true });
const logoUpload = multer({
  storage: multer.diskStorage({
    destination: brandingMediaDir,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.png';
      cb(null, `custom-logo-${Date.now()}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype))
});

// Generische, szenario-unabhaengige Rolle "Teilnehmer": fuer Personen ohne
// feste Funktion im Krisenstab (reine Beobachter/Zuhoerer), beliebig oft
// vergebbar, bekommt keine Sonderlagekarten/Bewertung, aber eine Urkunde.
// Wird dem geladenen Szenario zur Laufzeit angehaengt, nicht in der JSON-
// Datei gespeichert.
// Eigene Toene je Lagekarte (z. B. ein selbst eingesprochener Nachrichten-
// bericht). Liegen nur lokal unter media/custom und in data/settings.json --
// nicht im Repository, nicht im Drehbuch.
function applyMediaOverrides(sc, file) {
  const ov = ((store.loadSettings().mediaOverrides || {})[file]) || {};
  sc.lagekarten.forEach(lk => {
    const o = ov[lk.id];
    if (o && o.sound) { lk.sound = o.sound; lk.eigenerTon = true; }
  });
  return sc;
}

function augmentWithGenericRole(scenario) {
  if (!scenario.roles.find(r => r.id === 'teilnehmer')) {
    scenario.roles.push({
      id: 'teilnehmer', funktion: 'Teilnehmer', group: 'allgemein',
      beschreibung: 'Du nimmst an der Übung teil, ohne eine feste Funktion im Krisenstab zu übernehmen. Du bekommst die öffentlichen Lagekarten mit und am Ende eine Teilnahme-Urkunde.'
    });
  }
  if (!scenario.roleGroups.find(g => g.key === 'allgemein')) {
    scenario.roleGroups.push({ key: 'allgemein', label: 'Teilnehmer (ohne feste Rolle)', members: ['teilnehmer'] });
  }
  return scenario;
}

// Reihenfolge: SCENARIO_FILE (Umgebungsvariable, explizite Vorgabe) ->
// zuletzt im Setup gewähltes Szenario (data/settings.json) -> erste
// gefundene Datei. So merkt sich die App die Auswahl auch nach einem
// Neustart, ohne dass SCENARIO_FILE jedes Mal manuell gesetzt werden muss.
const startupSettings = store.loadSettings();
let { file: scenarioFile, scenario } = store.loadScenario(process.env.SCENARIO_FILE || startupSettings.activeScenarioFile || undefined);
if (!scenario) {
  ({ file: scenarioFile, scenario } = store.loadScenario());
}
if (!scenario) {
  console.error('Konnte Szenario nicht laden:', scenarioFile);
  process.exit(1);
}
scenario = applyMediaOverrides(augmentWithGenericRole(scenario), scenarioFile);

// Drehbuch-Pruefung bei jedem Laden: Fehler (z. B. Rolle ohne eigene Karte,
// Verweis auf unbekannte Rolle) sollen auffallen, bevor eine Übung laeuft.
let scenarioCheck = { errors: [], warnings: [] };
function checkScenario() {
  scenarioCheck = validateScenario(scenario, { simulations: 200 });
  if (scenarioCheck.errors.length || scenarioCheck.warnings.length) {
    console.log(`Drehbuch-Prüfung ${scenarioFile}: ${scenarioCheck.errors.length} Fehler, ${scenarioCheck.warnings.length} Hinweise (Details: npm run pruefen)`);
  }
}
checkScenario();

let state = store.loadRunState() || engine.newRunState(scenario);
state.scenarioFile = scenarioFile;
// Abwaertskompatibel: ein vor diesem Feature gespeicherter run-state.json
// hat noch kein activeRoleIds -> alle Rollen als aktiv annehmen.
if (!Array.isArray(state.activeRoleIds)) state.activeRoleIds = scenario.roles.map(r => r.id);

// Umbenannte Rollen: Ein Drehbuch kann bei einer Rolle "alteIds" angeben.
// Gespeicherte Teilnehmerlisten und Vorlagen mit alten IDs werden so
// automatisch auf die neue Rolle uebertragen.
function aliasRoleIds(ids) {
  const map = {};
  scenario.roles.forEach(r => (r.alteIds || []).forEach(a => { map[a] = r.id; }));
  return Array.from(new Set((ids || []).map(id => map[id] || id)));
}
function applyRoleAliases() {
  state.participants = (state.participants || []).map(p => Object.assign({}, p, { roleIds: aliasRoleIds(p.roleIds) }));
  state.activeRoleIds = aliasRoleIds(state.activeRoleIds);
}
applyRoleAliases();

function persist() { store.saveRunState(state); }

function roleById(id) { return scenario.roles.find(r => r.id === id); }
function groupByKey(key) { return scenario.roleGroups.find(g => g.key === key); }

function participantsForRole(roleId) {
  return state.participants.filter(p => (p.roleIds || []).includes(roleId));
}

function participantById(id) {
  return state.participants.find(p => p.id === id);
}

function log(type, message) {
  state.log.unshift({ ts: Date.now(), type, message });
  state.log = state.log.slice(0, 200);
}

// Tatsaechlicher Empfaenger einer vertraulichen Karte bei der aktuellen
// Besetzung: eigentliche Rolle oder erste besetzte Ersatzrolle.
function recipientRoleFor(card) {
  return engine.resolveRecipient(card, new Set(engine.assignedRoleIds(state)));
}
// Oeffentliche Ueberraschung (Bonuskarte mit "oeffentlich"): steht auf der
// Buehne ueber der aktuellen Lage, bis die Moderation sie ausblendet oder die
// naechste Lage kommt. B7-artige Karten unterbrechen eine Rolle fuer einige
// Minuten (Countdown in Echtzeit).
function buehnenEreignis(fuerModeration) {
  const e = state.buehnenEreignis;
  if (!e || !['running', 'paused'].includes(state.status)) return null;
  const lk = engine.currentLagekarte(scenario, state);
  if (!lk || lk.id !== e.lkId) return null;
  const b = scenario.bonuskarten.find(x => x.id === e.id);
  if (!b) return null;
  const u = b.unterbrechung;
  const v = {
    id: b.id, key: e.id + ':' + e.at + ':' + (e.replay || 0), minimiert: !!e.minimiert, titel: b.titel, text: b.buehnentext || b.text,
    kriseninfo: b.kriseninfo || null, media: b.media || null, sound: b.sound || null,
    unterbrechung: u ? { rolle: (roleById(u.rolle) || {}).funktion || u.rolle, text: u.text || '', restSekunden: Math.max(0, Math.round((e.endsAt - Date.now()) / 1000)) } : null
  };
  if (fuerModeration) Object.assign(v, { sprechertext: b.sprechertext || null, moderatorHinweis: b.moderatorHinweis || null, regie: b.regie || null, beobachtung: b.beobachtung || null, rueckkehr: b.unterbrechung ? (b.unterbrechung.rueckkehr || null) : null });
  return v;
}
function rolleBesetzt(roleId) { return participantsForRole(roleId).length > 0; }

function recipientLabel(card) {
  const rid = recipientRoleFor(card);
  const primary = roleById(card.empfaenger);
  if (!rid) return `${primary ? primary.funktion : card.empfaenger} (niemand besetzt)`;
  if (rid === card.empfaenger) return primary ? primary.funktion : rid;
  return `${(roleById(rid) || {}).funktion || rid} (statt ${primary ? primary.funktion : card.empfaenger})`;
}
function fallbackNote(card, recipientRoleId) {
  if (recipientRoleId === card.empfaenger) return '';
  const primary = roleById(card.empfaenger);
  return `\n\n(Diese Information wäre eigentlich bei der Funktion „${primary ? primary.funktion : card.empfaenger}“ gelandet. Die ist heute nicht besetzt, deshalb landet sie bei dir.)`;
}

function testModeActive() {
  const tm = store.loadSettings().testMode || {};
  return !!(tm.enabled && tm.dummyEmail);
}
async function sendTestModeCard(card, role, recipients, recipientRoleId, art) {
  const settings = store.loadSettings();
  const namen = recipients.map(p => p.name || p.email).join(', ');
  const adressen = recipients.map(p => p.email).filter(Boolean).join(', ');
  const subject = `Vertraulich für ${namen} (${role.funktion}) – ${art} ${card.id}`;
  const text = `Vertraulich – nur für ${namen} (${role.funktion})\n\n${card.text}${fallbackNote(card, recipientRoleId)}`;
  const result = await mailer.sendMail(settings.smtp, { to: adressen || settings.testMode.dummyEmail, subject, text }, settings.testMode);
  log(result.ok ? 'mail' : 'error', result.ok
    ? `${art} ${card.id} [TESTLAUF] als eine Mail an ${settings.testMode.dummyEmail} – eigentlich an ${namen} (${role.funktion}).`
    : `${art} ${card.id} [TESTLAUF] Versand fehlgeschlagen: ${result.error}`);
  return result;
}

async function fireSonderlagekarte(skOriginal, { manual } = {}) {
  if (state.firedSonderlagekarten.find(f => f.id === skOriginal.id)) return;
  const sk = skMitWeichen(skOriginal);
  const recipientRoleId = recipientRoleFor(sk);
  const role = roleById(recipientRoleId || sk.empfaenger);
  const recipients = recipientRoleId ? participantsForRole(recipientRoleId) : [];
  const entry = { id: sk.id, at: Date.now(), atMinute: engine.elapsedMinutes(state), manual: !!manual, recipientRoleId, text: sk.text, emailResults: [] };
  if (recipients.length === 0) {
    log('warn', `Sonderlagekarte ${sk.id} (${recipientLabel(sk)}) fällig, aber weder diese Rolle noch eine Ersatzrolle ist besetzt.`);
  } else if (testModeActive()) {
    // Trockenlauf: pro Karte genau EINE Mail an die Dummy-Adresse, mit allen
    // eigentlichen Empfaengern -- nicht eine Kopie je Teammitglied.
    const result = await sendTestModeCard(sk, role, recipients, recipientRoleId, 'Lageinformation');
    recipients.forEach(p => entry.emailResults.push({ participantId: p.id, email: p.email, ok: result.ok, error: result.error }));
  } else {
    const settings = store.loadSettings();
    for (const p of recipients) {
      // Betreff nennt Empfaenger und Karte -- im Trockenlauf landen alle Mails in
      // einem Postfach, dort muss man sie auseinanderhalten koennen.
      const subject = `Vertraulich für ${p.name || role.funktion} (${role.funktion}) – Lageinformation ${sk.id}`;
      const text = `Vertraulich – nur für dich, ${p.name} (${role.funktion})\n\n${sk.text}${fallbackNote(sk, recipientRoleId)}`;
      const result = await mailer.sendMail(settings.smtp, { to: p.email, subject, text }, settings.testMode);
      entry.emailResults.push({ participantId: p.id, email: p.email, ok: result.ok, error: result.error });
      log(result.ok ? 'mail' : 'error',
        result.ok
          ? `Sonderlagekarte ${sk.id} per E-Mail an ${p.name} (${role.funktion}) gesendet.${result.testModeRedirectedFrom ? ` [TESTLAUF, eigentlich: ${result.testModeRedirectedFrom}]` : ''}`
          : `E-Mail-Versand für Sonderlagekarte ${sk.id} an ${p.name} fehlgeschlagen: ${result.error}`);
    }
  }
  state.firedSonderlagekarten.push(entry);
  persist();
}

// Nach "Jetzt beginnt die Krise" laeuft der Timer nicht sofort los, sondern
// erst nach 30 Sekunden Verzoegerung (Status 'countdown') -- der Moderator
// hat so noch kurz Zeit zu Ende zu sprechen, bevor sichtbar/hoerbar etwas
// passiert. Wird sowohl vom 3-Sekunden-Tick als auch bei jedem Status-Abruf
// geprueft, damit der Uebergang fuer Buehne/Moderation nicht erst mit bis zu
// 3 Sekunden Verzug ankommt.
function maybeStartCrisisFromCountdown() {
  if (state.status === 'countdown' && state.crisisStartsAt && Date.now() >= state.crisisStartsAt) {
    state.status = 'running';
    state.startedAt = state.crisisStartsAt;
    state.pausedAt = null;
    state.totalPausedMs = 0;
    state.crisisStartsAt = null;
    log('info', 'Krisentimer gestartet.');
    persist();
  }
}

// Abschluss: "Alles läuft wieder?" -- Nacharbeiten und Rechnung. Startet
// automatisch, sobald die Übung endet (falls das Szenario einen Abschluss hat).
function ensureFinaleState() {
  if (!state.finale) state.finale = { step: 0, optionen: {} };
  if (!state.finale.optionen) state.finale.optionen = {};
  return state.finale;
}
function enterFinale() {
  const f = ensureFinaleState();
  if (scenario.nachspiel && !f.step) {
    f.step = 1;
    log('info', 'Abschluss gestartet: Nacharbeiten und Rechnung auf der Bühne.');
  }
}
function finaleStepCount() {
  return finale.steps(scenario.nachspiel, ensureFinaleState().optionen).length;
}
// "Lagekarte 3 von 6": bezieht sich auf den tatsaechlichen Ablaufplan dieses
// Laufs, nicht auf alle Karten im Drehbuch.
function lagekartenProgress() {
  const schedule = engine.getActiveSchedule(scenario, state).filter(ev => ev.type === 'lagekarte');
  return {
    total: schedule.length,
    gezeigt: schedule.filter(ev => state.firedLagekarten.includes(ev.id)).length
  };
}
function aktLabel(lk) {
  const a = lk && engine.AKTE.find(x => x.key === lk.akt);
  return a ? a.label : null;
}

// ---- Weichen: Entscheidungen, die den weiteren Verlauf (maßvoll) verändern ----
// Eine Weiche haengt an der ersten ihrer Lagekarten, die im Plan ist. Die
// Moderation haelt die Entscheidung des Tisches fest; die gewaehlte Option
// ergaenzt spaetere Lagekarten um einen Satz (oder ersetzt die Krisen-Info),
// kann eine vertrauliche Folgekarte ausloesen und Posten im Abschluss setzen.
// Ohne Eintrag bleibt die Geschichte unveraendert.
function weichenListe() { return scenario.weichen || []; }
function chosenOption(w) {
  const oid = (state.weichen || {})[w.id];
  return oid ? (w.optionen || []).find(o => o.id === oid) || null : null;
}
function weichenImPlan() {
  const lkOrder = engine.getActiveSchedule(scenario, state).filter(e => e.type === 'lagekarte').map(e => e.id);
  return weichenListe().map(w => {
    const lkId = lkOrder.find(id => (w.lagekarten || []).includes(id));
    return lkId ? { w, lkId } : null;
  }).filter(Boolean);
}
// Uebungsschwerpunkt: zusaetzliche Frage an den Tisch zu dieser Lage
function aktiverSchwerpunkt() { return (scenario.schwerpunkte || []).find(x => x.key === state.schwerpunkt) || null; }
function schwerpunktFrage(lk) {
  const sp = aktiverSchwerpunkt();
  return sp && sp.zusatzfragen && lk ? sp.zusatzfragen[lk.id] || null : null;
}
function lageMitWeichen(lkIn) {
  if (!lkIn) return lkIn;
  const frage = schwerpunktFrage(lkIn);
  const lk = frage ? Object.assign({}, lkIn, { aufgabe: [...(lkIn.aufgabe || []), frage], schwerpunktFrage: frage }) : lkIn;
  const zusatz = [];
  let kriseninfo = lk.kriseninfo;
  weichenListe().forEach(w => {
    const o = chosenOption(w);
    (o && o.folgen || []).filter(f => f.lagekarte === lk.id).forEach(f => {
      if (f.zusatz) zusatz.push(f.zusatz);
      if (f.kriseninfo) kriseninfo = f.kriseninfo;
    });
  });
  if (!zusatz.length && kriseninfo === lk.kriseninfo) return lk;
  return Object.assign({}, lk, { text: [lk.text, ...zusatz].join(' '), kriseninfo, weichenZusatz: zusatz });
}
// Vertrauliche Karte mit Textvariante aus einer Entscheidung (z. B. nach
// gezahltem Loesegeld meldet sich der Erpresser anders).
function skMitWeichen(sk) {
  let text = null;
  // Zustandsfassung: ist eine bestimmte Lage schon gezeigt, gilt der andere Text
  (sk.textVarianten || []).forEach(v => { if (v.nachLagekarte && state.firedLagekarten.includes(v.nachLagekarte)) text = v.text; });
  weichenListe().forEach(w => {
    const o = chosenOption(w);
    (o && o.folgen || []).filter(f => f.sonderlagekarte === sk.id && f.text).forEach(f => { text = f.text; });
  });
  return text ? Object.assign({}, sk, { text }) : sk;
}
async function fireWeichenKarten() {
  for (const w of weichenListe()) {
    const o = chosenOption(w);
    if (!o || !o.karte) continue;
    if (!state.firedLagekarten.includes(o.karte.beiLagekarte)) continue;
    const sk = scenario.sonderlagekarten.find(x => x.id === o.karte.sonderlagekarte);
    if (sk && !state.firedSonderlagekarten.find(f => f.id === sk.id)) {
      log('info', `Folge der Entscheidung „${o.label}“: vertrauliche Karte ${sk.id} wird verschickt.`);
      await fireSonderlagekarte(sk, { manual: false });
    }
  }
}
function weichenView() {
  const currentLk = engine.currentLagekarte(scenario, state);
  return weichenImPlan().map(({ w, lkId }) => {
    const lk = scenario.lagekarten.find(l => l.id === lkId) || {};
    return {
      id: w.id, frage: w.frage, hinweis: w.hinweis || '', lagekarte: lkId, lageTitel: lk.titel, simZeit: lk.simZeit,
      aktuell: !!(currentLk && currentLk.id === lkId),
      erreicht: state.firedLagekarten.includes(lkId),
      gewaehlt: (state.weichen || {})[w.id] || null,
      optionen: (w.optionen || []).map(o => ({ id: o.id, label: o.label, wirkung: o.wirkung || '' }))
    };
  });
}

// Spielbrett: Wer sitzt am Tisch, wer ist bei der aktuellen Lage gefordert,
// wer hat seit Beginn dieser Lage eine neue vertrauliche Information bekommen?
// Inhalte vertraulicher Karten werden hier NICHT verraten -- nur, dass es
// etwas Neues gibt. Ebenen bilden den Meldeweg ab: Eingang (Anwender, Kunden,
// Standorte) -> Krisenstab -> Weitergabe nach innen und außen.
const EBENEN = ['eingang', 'krisenstab', 'verteilung'];
// Geplante Dauer der Uebung (Krise + Abschluss) -- fuer Karten, die erst ab
// einer Mindestdauer sinnvoll sind.
function uebungsDauer() {
  return Math.round(engine.totalPlannedMinutes(scenario, state) + (state.finaleMinutes || 0));
}
function kurzRolle(funktion) {
  let k = String(funktion || '').split(',')[0].trim();
  // Lange Klammerzusaetze weglassen ("IT-Leitung (Kassensysteme & ...)"),
  // kurze behalten ("Geschäftsführung (CEO)").
  if (k.length > 26) k = k.replace(/\s*\([^)]*\)\s*$/, '');
  return k;
}
function spielbrett() {
  const currentLk = engine.currentLagekarte(scenario, state);
  const schedule = engine.getActiveSchedule(scenario, state);
  let seit = null;
  if (currentLk) {
    const ev = schedule.find(e => e.type === 'lagekarte' && e.id === currentLk.id);
    seit = ev ? ev.minute : currentLk.minuteOffset;
  }
  // Zeitpunkt einer Karte: geplante Minute im Ablauf (ein Zeitsprung loest
  // fruehere Karten nachtraeglich aus -- die zaehlen nicht als "neu" fuer die
  // aktuelle Lage); manuell ausgeloeste Karten zaehlen ab Ausloesung.
  const geplant = {};
  schedule.forEach(e => { if (e.type === 'sonderlagekarte') geplant[e.id] = e.minute; });
  const neu = {};
  if (seit !== null) {
    (state.firedSonderlagekarten || []).forEach(f => {
      const m = !f.manual && geplant[f.id] !== undefined ? geplant[f.id] : f.atMinute;
      if (f.recipientRoleId && typeof m === 'number' && m >= seit - 0.01) neu[f.recipientRoleId] = (neu[f.recipientRoleId] || 0) + 1;
    });
    (state.firedBonusInfo || []).forEach(f => {
      if (f.recipientRoleId && typeof f.atMinute === 'number' && f.atMinute >= seit - 0.01) neu[f.recipientRoleId] = (neu[f.recipientRoleId] || 0) + 1;
    });
  }
  const zust = new Set(currentLk ? (currentLk.zustaendig || []) : []);
  // Laufende Unterbrechung (z. B. Krisenstabsleitung abgerufen): Rolle ist abwesend
  const be = state.buehnenEreignis;
  const ub = be && be.endsAt > Date.now() && (scenario.bonuskarten.find(x => x.id === be.id) || {}).unterbrechung;
  const abwesend = ub && currentLk && be.lkId === currentLk.id ? ub.rolle : null;
  const rollen = scenario.roles.filter(r => r.id !== 'teilnehmer').map(r => {
    const team = participantsForRole(r.id);
    if (!team.length) return null;
    return {
      id: r.id, rolle: kurzRolle(r.funktion), ebene: EBENEN.includes(r.ebene) ? r.ebene : 'krisenstab',
      namen: team.map(p => p.name).filter(Boolean), anzahl: team.length,
      gefordert: zust.has(r.id) && r.id !== abwesend, neueInfo: neu[r.id] || 0, abwesend: r.id === abwesend
    };
  }).filter(Boolean);
  const unbesetzt = [...zust].filter(rid => rid !== 'teilnehmer' && !participantsForRole(rid).length)
    .map(rid => kurzRolle((roleById(rid) || {}).funktion || rid));
  return { lageAktiv: !!currentLk, rollen, unbesetztGefordert: unbesetzt };
}

function tick() {
  maybeStartCrisisFromCountdown();
  if (state.status !== 'running') return;
  const due = engine.dueEvents(scenario, state);
  const lk = due.filter(e => e.type === 'lagekarte');
  lk.forEach(ev => { if (!state.firedLagekarten.includes(ev.id)) { state.firedLagekarten.push(ev.id); log('lagekarte', `Lagekarte ${ev.id} (${ev.ref.titel}) ist jetzt aktiv.`); } });
  const dueSk = due.filter(e => e.type === 'sonderlagekarte');
  dueSk.forEach(ev => { fireSonderlagekarte(ev.ref, { manual: false }); });
  fireWeichenKarten();
  const total = engine.totalPlannedMinutes(scenario, state);
  if (state.status === 'running' && engine.elapsedMinutes(state) >= total && state.status !== 'ended') {
    state.status = 'ended';
    state.endedAt = Date.now();
    log('info', 'Geplante Übungszeit erreicht – Übung automatisch beendet.');
    enterFinale();
  }
  persist();
}
setInterval(tick, 3000);

// ---- Szenario / Metadaten ----
app.get('/api/scenario-meta', (req, res) => {
  res.json({
    title: scenario.title, subtitle: scenario.subtitle, company: scenario.company,
    difficulty: scenario.difficulty, recommendedParticipants: scenario.recommendedParticipants,
    roles: scenario.roles, roleGroups: scenario.roleGroups,
    bewertungskriterien: scenario.bewertungskriterien,
    lagekartenCount: scenario.lagekarten.length, sonderlagekartenCount: scenario.sonderlagekarten.length,
    bonuskartenCount: scenario.bonuskarten.length, moderationsleitfaden: scenario.moderationsleitfaden,
    schwerpunkte: (scenario.schwerpunkte || []).map(x => ({ key: x.key, label: x.label, beschreibung: x.beschreibung })),
    pruefung: scenarioCheck
  });
});

// Erlaubt den Wechsel zwischen mehreren im data/-Ordner liegenden
// Szenarien (z. B. NordTech <-> Waterkant) direkt aus dem Setup, ohne
// Terminal/Umgebungsvariable. Setzt Lauf und Teilnehmer zurueck, da Rollen
// zwischen Szenarien nicht uebertragbar sind.
app.get('/api/scenarios', (req, res) => {
  const files = store.listScenarioFiles();
  const list = files.map(f => {
    const loaded = store.loadScenario(f);
    return {
      file: f,
      title: loaded.scenario ? loaded.scenario.title : f,
      companyName: loaded.scenario && loaded.scenario.company ? loaded.scenario.company.name : null
    };
  });
  res.json({ active: scenarioFile, scenarios: list });
});
function switchScenario(file) {
  if (!store.listScenarioFiles().includes(file)) return { ok: false, error: 'Unbekannte Szenario-Datei.' };
  const loaded = store.loadScenario(file);
  if (!loaded.scenario) return { ok: false, error: 'Szenario konnte nicht geladen werden.' };
  // Personen (Name/E-Mail) bleiben beim Wechsel erhalten. Rollen, die es im
  // neuen Szenario unter derselben ID ebenfalls gibt, bleiben zugewiesen,
  // alle anderen muessen neu gewaehlt werden.
  const previousParticipants = state.participants || [];
  const previousActive = state.activeRoleIds || [];
  scenarioFile = loaded.file;
  scenario = applyMediaOverrides(augmentWithGenericRole(loaded.scenario), scenarioFile);
  checkScenario();
  const validIds = new Set(scenario.roles.map(r => r.id));
  state = engine.newRunState(scenario);
  state.scenarioFile = scenarioFile;
  state.participants = previousParticipants.map(p => Object.assign({}, p, { roleIds: aliasRoleIds(p.roleIds).filter(rid => validIds.has(rid)) }));
  const keptActive = aliasRoleIds(previousActive).filter(rid => validIds.has(rid));
  if (keptActive.length) {
    const used = state.participants.flatMap(p => p.roleIds);
    state.activeRoleIds = Array.from(new Set([...keptActive, ...used]));
  }
  const settings = store.loadSettings();
  settings.activeScenarioFile = scenarioFile;
  store.saveSettings(settings);
  log('info', `Szenario gewechselt zu: ${scenario.title} (${scenario.company.name}).`);
  persist();
  return { ok: true, title: scenario.title, companyName: scenario.company.name };
}

app.post('/api/scenarios/select', (req, res) => {
  const result = switchScenario((req.body || {}).file);
  res.status(result.ok ? 200 : 400).json(result);
});

app.get('/api/recommend-roles', (req, res) => {
  const r = engine.recommendRoles(scenario, { targetMinutes: Number(req.query.minutes) || 90, difficulty: req.query.difficulty });
  res.json(Object.assign(r, { rollen: r.roleIds.map(rid => (roleById(rid) || {}).funktion || rid) }));
});

// Vorschau fuer den Zieldauer-Modus im Setup: nutzt die im Formular gerade
// zugewiesenen Rollen (noch nicht gespeichert), ohne den Lauf zu starten.
app.post('/api/preview-schedule', (req, res) => {
  const { targetMinutes, difficulty, roleIds, schwerpunkt } = req.body || {};
  const minutes = Math.max(10, Number(targetMinutes) || 90);
  const roleToGroup = {};
  scenario.roles.forEach(r => { roleToGroup[r.id] = r.group; });
  const activeGroups = new Set((roleIds || []).map(id => roleToGroup[id]).filter(Boolean));
  const roleCount = Array.from(activeGroups).filter(g => scenario.standardablauf.speakingOrder.includes(g)).length;
  const plan = engine.buildAdaptiveSchedule(scenario, { targetMinutes: minutes, difficulty: ['leicht', 'mittel', 'hoch'].includes(difficulty) ? difficulty : 'mittel', roleCount, activeRoleIds: roleIds, schwerpunkt });
  const assigned = Array.from(new Set((roleIds || []).filter(Boolean)));
  const recipientsInPlan = new Set(plan.schedule.filter(e => e.type === 'sonderlagekarte')
    .map(e => engine.resolveRecipient(scenario.sonderlagekarten.find(sk => sk.id === e.id) || {}, new Set(assigned))));
  const uncoveredRoles = assigned.filter(rid => rid !== 'teilnehmer' && !recipientsInPlan.has(rid))
    .map(rid => (roleById(rid) || {}).funktion || rid);
  // Welche Karten landen bei einer Ersatzrolle, weil die eigentliche Rolle
  // unbesetzt ist -- und bei wem haeuft sich das?
  const rerouted = {};
  plan.schedule.filter(e => e.type === 'sonderlagekarte').forEach(e => {
    const sk = scenario.sonderlagekarten.find(x => x.id === e.id);
    const rid = sk && engine.resolveRecipient(sk, new Set(assigned));
    if (rid && rid !== sk.empfaenger) rerouted[rid] = (rerouted[rid] || 0) + 1;
  });
  const reroutedSummary = Object.entries(rerouted).map(([rid, n]) => `${n}× an ${(roleById(rid) || {}).funktion || rid}`);
  const empfehlung = engine.recommendRoles(scenario, { targetMinutes: minutes, difficulty });
  res.json({
    finaleMinutes: plan.finaleMinutes,
    akte: plan.akte,
    decisionMinutes: plan.decisionMinutesUsed,
    empfehlung: {
      maxRoles: empfehlung.maxRoles, maxGroups: empfehlung.maxGroups, roleIds: empfehlung.roleIds,
      rollen: empfehlung.roleIds.map(rid => (roleById(rid) || {}).funktion || rid)
    },
    personen: (state.participants || []).length,
    activeRoleGroups: roleCount,
    rolesAssigned: assigned.filter(rid => rid !== 'teilnehmer').length,
    uncoveredRoles,
    reroutedSummary,
    lagekartenCount: plan.schedule.filter(e => e.type === 'lagekarte').length,
    sonderlagekartenCount: plan.schedule.filter(e => e.type === 'sonderlagekarte').length,
    skippedCount: plan.skipped.length,
    totalMinutes: plan.totalMinutes,
    compression: plan.compression,
    warning: plan.warning
  });
});

// ---- Teilnehmer ----
app.get('/api/participants', (req, res) => res.json(state.participants));
function normalizeParticipants(list) {
  return (Array.isArray(list) ? list : []).map(p => ({
    id: p.id || crypto.randomUUID(),
    name: String(p.name || '').trim(),
    email: String(p.email || '').trim(),
    roleIds: Array.isArray(p.roleIds) ? aliasRoleIds(p.roleIds) : []
  }));
}

app.post('/api/participants', (req, res) => {
  state.participants = normalizeParticipants(req.body);
  persist();
  res.json(state.participants);
});

// Schickt jeder/jedem Teilnehmenden einmalig eine E-Mail mit Funktion und
// Rollenbeschreibung ihrer/seiner zugewiesenen Rolle(n) — unabhaengig davon,
// ob diese Rolle ueberhaupt Sonderlagekarten bekommt.
app.post('/api/participants/send-briefings', async (req, res) => {
  const settings = store.loadSettings();
  const results = [];
  for (const p of state.participants) {
    if (!p.email || !(p.roleIds || []).length) continue;
    const roles = p.roleIds.map(rid => roleById(rid)).filter(Boolean);
    if (!roles.length) continue;
    const rollenText = roles.map(r => `${r.funktion}${r.beschreibung ? '\n' + r.beschreibung : ''}`).join('\n\n');
    const text = `Hallo ${p.name || ''},\n\ndeine Rolle${roles.length > 1 ? 'n' : ''} in der Übung "${scenario.title}":\n\n${rollenText}\n\nViel Erfolg!`;
    const result = await mailer.sendMail(settings.smtp, {
      to: p.email, subject: `Deine Rolle in der Übung: ${roles.map(r => r.funktion).join(', ')}`, text
    }, settings.testMode);
    log(result.ok ? 'mail' : 'error',
      result.ok ? `Rollenbeschreibung an ${p.name} (${p.email}) gesendet.${result.testModeRedirectedFrom ? ' [TESTLAUF]' : ''}` : `Rollenbeschreibung an ${p.name} fehlgeschlagen: ${result.error}`);
    results.push({ participantId: p.id, ok: result.ok, error: result.error });
  }
  persist();
  res.json({ ok: results.every(r => r.ok), results });
});

// Begruessung + Spielregeln an ALLE Teilnehmer (unabhaengig von der Rolle) —
// damit jeder vorab weiss, wie die Übung grundsaetzlich ablaeuft, nicht nur,
// welche Rolle er/sie spielt (das kommt separat per Rollenbeschreibung).
app.post('/api/participants/send-welcome', async (req, res) => {
  const mf = scenario.moderationsleitfaden || {};
  const regelnText = (mf.spielregeln || []).map((r, i) => `${i + 1}. ${r}`).join('\n');
  const settings = store.loadSettings();
  const results = [];
  for (const p of state.participants) {
    if (!p.email) continue;
    const text = `Hallo ${p.name || ''},\n\n`
      + `du nimmst bald an der Übung "${scenario.title}" teil.\n\n`
      + `Worum es geht:\n${mf.begruessung || ''}\n\n`
      + (regelnText ? `Spielregeln:\n${regelnText}\n\n` : '')
      + `Deine konkrete Rolle bekommst du separat per E-Mail zugeschickt.\n\nBis bald!`;
    const result = await mailer.sendMail(settings.smtp, {
      to: p.email, subject: `Willkommen zur Übung: ${scenario.title}`, text
    }, settings.testMode);
    log(result.ok ? 'mail' : 'error',
      result.ok ? `Begrüßung an ${p.name} (${p.email}) gesendet.${result.testModeRedirectedFrom ? ' [TESTLAUF]' : ''}` : `Begrüßung an ${p.name} fehlgeschlagen: ${result.error}`);
    results.push({ participantId: p.id, ok: result.ok, error: result.error });
  }
  persist();
  res.json({ ok: results.every(r => r.ok), results });
});

// Welche Rollen fuer diesen Lauf ueberhaupt zur Auswahl stehen sollen (z. B.
// nur 10 von 20 Rollen bei einer kleineren Gruppe) — reduziert die sonst
// sehr lange Rollenliste bei der Teilnehmerzuweisung im Setup.
app.get('/api/active-roles', (req, res) => res.json(state.activeRoleIds));
app.post('/api/active-roles', (req, res) => {
  const validIds = new Set(scenario.roles.map(r => r.id));
  const incoming = Array.isArray(req.body) ? req.body : [];
  state.activeRoleIds = aliasRoleIds(incoming).filter(id => validIds.has(id));
  persist();
  res.json(state.activeRoleIds);
});

// ---- Einstellungen ----
app.get('/api/settings', (req, res) => {
  const s = store.loadSettings();
  res.json(Object.assign({}, s, { smtp: Object.assign({}, s.smtp, { pass: s.smtp.pass ? '••••••••' : '' }) }));
});
function mergeSettings(incoming) {
  const current = store.loadSettings();
  incoming = incoming || {};
  // Platzhalter-Passwort nicht ueberschreiben, wenn Nutzer das Feld unveraendert liess.
  if (incoming.smtp && incoming.smtp.pass === '••••••••') incoming.smtp.pass = current.smtp.pass;
  const merged = {
    smtp: Object.assign({}, current.smtp, incoming.smtp || {}),
    branding: Object.assign({}, current.branding, incoming.branding || {}),
    runDefaults: Object.assign({}, current.runDefaults, incoming.runDefaults || {}),
    testMode: Object.assign({}, current.testMode, incoming.testMode || {}),
    activeScenarioFile: current.activeScenarioFile,
    mediaOverrides: current.mediaOverrides || {}
  };
  store.saveSettings(merged);
  return merged;
}

app.post('/api/settings', (req, res) => {
  mergeSettings(req.body);
  res.json({ ok: true });
});
app.post('/api/settings/upload-logo', (req, res) => {
  logoUpload.single('logo')(req, res, (err) => {
    if (err) return res.status(400).json({ ok: false, error: err.message });
    if (!req.file) return res.status(400).json({ ok: false, error: 'Keine Bilddatei empfangen (erlaubt: PNG/JPG/SVG/...).' });
    const url = '/media/branding/' + req.file.filename;
    const current = store.loadSettings();
    store.saveSettings({ ...current, branding: { ...current.branding, logo: url } });
    res.json({ ok: true, url });
  });
});
// ---- Eigene Toene fuer Lagekarten ----
const customMediaDir = path.join(__dirname, '..', 'media', 'custom');
fs.mkdirSync(customMediaDir, { recursive: true });
const AUDIO_EXT = { 'audio/webm': '.webm', 'video/webm': '.webm', 'audio/ogg': '.ogg', 'audio/mp4': '.m4a', 'audio/x-m4a': '.m4a', 'audio/aac': '.aac', 'audio/mpeg': '.mp3', 'audio/mp3': '.mp3', 'audio/wav': '.wav', 'audio/x-wav': '.wav', 'audio/wave': '.wav' };
const audioUpload = multer({
  storage: multer.diskStorage({
    destination: customMediaDir,
    filename: (req, file, cb) => {
      const base = (file.mimetype || '').split(';')[0];
      const ext = AUDIO_EXT[base] || path.extname(file.originalname || '').toLowerCase() || '.webm';
      const key = path.basename(scenarioFile, '.json').replace(/^scenario\./, '');
      cb(null, `${key}-${String(req.params.id).replace(/[^A-Za-z0-9_-]/g, '')}-${Date.now()}${ext}`);
    }
  }),
  limits: { fileSize: 40 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^(audio\/|video\/webm)/.test(file.mimetype || ''))
});
function reloadScenarioKeepState() {
  const loaded = store.loadScenario(scenarioFile);
  if (loaded.scenario) scenario = applyMediaOverrides(augmentWithGenericRole(loaded.scenario), scenarioFile);
}
function removeCustomFile(src) {
  if (!src || !src.startsWith('/media/custom/')) return;
  const f = path.join(customMediaDir, path.basename(src));
  try { fs.unlinkSync(f); } catch (e) { /* schon weg */ }
}
app.get('/api/lagekarten-toene', (req, res) => {
  const list = scenario.lagekarten.slice().sort((a, b) => a.minuteOffset - b.minuteOffset).map(lk => ({
    id: lk.id, simZeit: lk.simZeit, titel: lk.titel, akt: lk.akt || null,
    sprechertext: lk.sprechertext || null, sound: lk.sound ? lk.sound.src : null, eigenerTon: !!lk.eigenerTon
  }));
  res.json({ scenarioTitle: scenario.title, lagekarten: list });
});
app.post('/api/lagekarten/:id/ton', (req, res) => {
  if (!scenario.lagekarten.find(l => l.id === req.params.id)) return res.status(404).json({ ok: false, error: 'Unbekannte Lagekarte.' });
  audioUpload.single('ton')(req, res, (err) => {
    if (err) return res.status(400).json({ ok: false, error: err.message });
    if (!req.file) return res.status(400).json({ ok: false, error: 'Keine Audiodatei empfangen (erlaubt: MP3, M4A, WAV, OGG, WebM).' });
    const settings = store.loadSettings();
    const all = settings.mediaOverrides || {};
    const mine = all[scenarioFile] || {};
    if (mine[req.params.id] && mine[req.params.id].sound) removeCustomFile(mine[req.params.id].sound.src);
    mine[req.params.id] = { sound: { src: '/media/custom/' + req.file.filename, loop: false, volume: 1 } };
    all[scenarioFile] = mine;
    store.saveSettings(Object.assign({}, settings, { mediaOverrides: all }));
    reloadScenarioKeepState();
    log('info', `Eigener Ton für Lagekarte ${req.params.id} gespeichert.`);
    persist();
    res.json({ ok: true, src: '/media/custom/' + req.file.filename });
  });
});
app.delete('/api/lagekarten/:id/ton', (req, res) => {
  const settings = store.loadSettings();
  const all = settings.mediaOverrides || {};
  const mine = all[scenarioFile] || {};
  if (mine[req.params.id]) {
    if (mine[req.params.id].sound) removeCustomFile(mine[req.params.id].sound.src);
    delete mine[req.params.id];
    all[scenarioFile] = mine;
    store.saveSettings(Object.assign({}, settings, { mediaOverrides: all }));
    reloadScenarioKeepState();
    log('info', `Eigener Ton für Lagekarte ${req.params.id} entfernt.`);
    persist();
  }
  res.json({ ok: true });
});
// Nur EIN Buehnenfenster spielt Ton. Sind zwei offen (Beamer + Laptop),
// hoert man sonst alles doppelt und leicht versetzt.
let soundOwner = null;
app.post('/api/stage/sound-claim', (req, res) => {
  const id = String((req.body || {}).id || '').slice(0, 64);
  if (!id) return res.status(400).json({ ok: false });
  soundOwner = id;
  res.json({ ok: true, soundOwner });
});

// Ton der aktuellen Lagekarte auf der Buehne erneut abspielen (z. B. wenn es
// im Raum zu laut war).
// Stumm-Schalter der Moderation: Ton auf der Buehne sofort aus/an -- auch
// mitten in einer Lage. Bleibt beim Zuruecksetzen erhalten (Raumentscheidung).
let soundMuted = false;
app.post('/api/run/ton', (req, res) => {
  soundMuted = !!(req.body || {}).stumm;
  log('info', soundMuted ? 'Ton auf der Bühne stummgeschaltet.' : 'Ton auf der Bühne wieder eingeschaltet.');
  res.json({ ok: true, soundMuted });
});
app.post('/api/run/replay-sound', (req, res) => {
  state.soundReplay = (state.soundReplay || 0) + 1;
  persist();
  res.json({ ok: true });
});

app.post('/api/settings/test-email', async (req, res) => {
  const settings = store.loadSettings();
  const to = req.body && req.body.to;
  if (!to) return res.status(400).json({ ok: false, error: 'Zieladresse fehlt.' });
  const result = await mailer.sendMail(settings.smtp, {
    to, subject: 'Test – BCM Tabletop-Regie',
    text: 'Dies ist eine Testnachricht Ihrer BCM-Tabletop-Regie-App. Wenn Sie diese E-Mail erhalten, ist der SMTP-Versand korrekt konfiguriert.'
  });
  res.json(result);
});

// ---- Vorlagen (Setup wiederverwendbar machen) ----
// Ein Moderator, der dieselbe Art Übung öfter vorbereitet, soll nicht jedes
// Mal Teilnehmer, Rollen, SMTP-Zugangsdaten und Zeitmodus neu eintippen
// müssen: Export schreibt alles in eine JSON-Datei, Import spielt sie wieder
// ein. Absichtlich inkl. des echten SMTP-Passworts (nicht maskiert wie bei
// GET /api/settings) -- ohne Passwort waere die Vorlage beim Wiedereinspielen
// nutzlos. Die Datei bleibt lokal beim Moderator, wie alle anderen
// Konfigurationsdaten dieser App auch.
app.get('/api/template/export', (req, res) => {
  const settings = store.loadSettings();
  // Ein selbst hochgeladenes Logo liegt nur lokal -- deshalb das Bild selbst
  // mitnehmen, nicht nur den Pfad. Sonst fehlt es auf einem anderen Rechner.
  let brandingLogoFile = null;
  const logoUrl = settings.branding && settings.branding.logo;
  const logoPath = mediaUrlToFile(logoUrl);
  if (logoUrl && logoUrl.startsWith('/media/branding/custom-logo-') && logoPath && fs.existsSync(logoPath)) {
    brandingLogoFile = { name: path.basename(logoPath), data: fs.readFileSync(logoPath).toString('base64') };
  }
  res.json({
    exportedAt: new Date().toISOString(),
    scenarioFile,
    activeRoleIds: state.activeRoleIds,
    participants: state.participants,
    settings,
    brandingLogoFile
  });
});

app.post('/api/template/import', (req, res) => {
  const tpl = req.body || {};
  if (tpl.scenarioFile && tpl.scenarioFile !== scenarioFile) {
    const switchResult = switchScenario(tpl.scenarioFile);
    if (!switchResult.ok) return res.status(400).json(switchResult);
  }
  if (tpl.settings) mergeSettings(tpl.settings);
  let logoHinweis = '';
  const f = tpl.brandingLogoFile;
  if (f && typeof f.data === 'string' && f.data.length) {
    const ext = (path.extname(f.name || '').toLowerCase().match(/^\.(png|jpe?g|gif|svg|webp)$/) || ['.png'])[0];
    const name = `custom-logo-${Date.now()}${ext}`;
    fs.writeFileSync(path.join(brandingMediaDir, name), Buffer.from(f.data, 'base64'));
    const cur = store.loadSettings();
    store.saveSettings(Object.assign({}, cur, { branding: Object.assign({}, cur.branding, { logo: '/media/branding/' + name }) }));
    logoHinweis = ' Logo übernommen.';
  } else {
    const cur = store.loadSettings();
    if (effectiveBrandingLogo(cur) !== cur.branding.logo) {
      store.saveSettings(Object.assign({}, cur, { branding: Object.assign({}, cur.branding, { logo: DEFAULT_BRANDING_LOGO }) }));
      logoHinweis = ' Das Logo aus der Vorlage fehlt auf diesem Rechner (ältere Vorlage) – Standard-Logo gesetzt, bitte eigenes Logo neu hochladen.';
    }
  }
  if (Array.isArray(tpl.activeRoleIds)) {
    const validIds = new Set(scenario.roles.map(r => r.id));
    state.activeRoleIds = aliasRoleIds(tpl.activeRoleIds).filter(id => validIds.has(id));
  }
  if (Array.isArray(tpl.participants)) {
    state.participants = normalizeParticipants(tpl.participants);
  }
  log('info', 'Vorlage eingespielt: Teilnehmer, Rollen und Einstellungen übernommen.');
  persist();
  res.json({ ok: true, title: scenario.title, companyName: scenario.company.name, hinweis: logoHinweis.trim() });
});

// ---- Lauf-Steuerung ----
app.get('/api/run/moderator-state', (req, res) => {
  maybeStartCrisisFromCountdown();
  const schedule = engine.getActiveSchedule(scenario, state);
  const currentLk = engine.currentLagekarte(scenario, state);
  const upcoming = schedule.filter(ev => !(
    (ev.type === 'lagekarte' && state.firedLagekarten.includes(ev.id)) ||
    (ev.type === 'sonderlagekarte' && state.firedSonderlagekarten.find(f => f.id === ev.id))
  )).slice(0, 6).map(ev => ({
    type: ev.type, id: ev.id, minute: Math.round(ev.minute * 10) / 10,
    titel: ev.type === 'lagekarte' ? ev.ref.titel : `Sonderlagekarte für ${recipientLabel(ev.ref)}`
  }));
  // Kompletter Ablaufplan fuer die Prozessuebersicht/den Zeit-Schieberegler
  // in der Moderation (nicht nur die naechsten paar Ereignisse).
  const fullTimeline = schedule.map(ev => ({
    type: ev.type, id: ev.id, minute: Math.round(ev.minute * 10) / 10,
    titel: ev.type === 'lagekarte' ? ev.ref.titel : `Sonderlagekarte für ${recipientLabel(ev.ref)}`,
    akt: ev.type === 'lagekarte' ? aktLabel(ev.ref) : null,
    fired: ev.type === 'lagekarte' ? state.firedLagekarten.includes(ev.id) : !!state.firedSonderlagekarten.find(f => f.id === ev.id),
    isCurrent: !!(currentLk && ev.type === 'lagekarte' && ev.id === currentLk.id)
  }));
  // Uebersprungene Karten mit Inhalt und Zuordnung zur Lage. "vorbei" = die
  // Geschichte ist schon ueber den Moment dieser Karte hinaus (gehoert zu
  // einer frueheren Lagekarte als der aktuellen) -- die blendet die
  // Moderation standardmaessig aus.
  const lkByTime = scenario.lagekarten.slice().sort((a, b) => a.minuteOffset - b.minuteOffset);
  const gehoertZu = minute => { let l = lkByTime[0]; lkByTime.forEach(x => { if (x.minuteOffset <= minute) l = x; }); return l; };
  const skippedDetailed = (state.skippedEvents || []).map(sk => {
    const ref = sk.type === 'lagekarte' ? scenario.lagekarten.find(lk => lk.id === sk.id) : scenario.sonderlagekarten.find(s2 => s2.id === sk.id);
    if (!ref) return null;
    const lage = sk.type === 'lagekarte' ? ref : gehoertZu(ref.minuteOffset == null ? Infinity : ref.minuteOffset);
    return {
      type: sk.type, id: sk.id, reason: sk.reason,
      titel: sk.type === 'lagekarte' ? ref.titel : `Vertrauliche Karte für ${recipientLabel(ref)}`,
      text: ref.text,
      lage: lage ? { titel: lage.titel, simZeit: lage.simZeit } : null,
      lageMinute: lage ? lage.minuteOffset : 9999,
      jetzt: !!(currentLk && lage && lage.id === currentLk.id),
      vorbei: !!(currentLk && lage && lage.minuteOffset < currentLk.minuteOffset)
    };
  }).filter(Boolean).sort((a, b) => (a.vorbei - b.vorbei) || (b.jetzt - a.jetzt) || (a.lageMinute - b.lageMinute));
  res.json({
    status: state.status,
    crisisCountdownSeconds: state.status === 'countdown' ? Math.max(0, Math.ceil((state.crisisStartsAt - Date.now()) / 1000)) : null,
    soundMuted,
    testMode: (() => { const tm = store.loadSettings().testMode || {}; return { enabled: !!(tm.enabled && tm.dummyEmail), dummyEmail: tm.dummyEmail || '' }; })(),
    durationMode: state.durationMode,
    difficulty: state.difficulty,
    targetMinutes: state.targetMinutes,
    schwerpunkt: (() => { const x = aktiverSchwerpunkt(); return x ? { key: x.key, label: x.label, karten: x.karten, leitfrage: x.leitfrage || '', debriefing: x.debriefing || [] } : null; })(),
    scheduleWarning: state.scheduleWarning,
    elapsedMinutes: Math.round(engine.elapsedMinutes(state) * 10) / 10,
    totalPlannedMinutes: Math.round(engine.totalPlannedMinutes(scenario, state) * 10) / 10,
    finaleMinutes: state.finaleMinutes || 0,
    activeRoleGroups: engine.activeRoleGroupCount(scenario, state),
    currentLagekarte: currentLk ? Object.assign({}, lageMitWeichen(currentLk), { aktLabel: aktLabel(currentLk) }) : null,
    weichen: weichenView(),
    lagekarten: lagekartenProgress(),
    finale: scenario.nachspiel ? {
      verfuegbar: true,
      view: finale.view(scenario.nachspiel, ensureFinaleState()),
      step: ensureFinaleState().step,
      steps: finaleStepCount(),
      naechster: finale.stepLabel(scenario.nachspiel, ensureFinaleState(), ensureFinaleState().step ? 1 : 0),
      optionen: (scenario.nachspiel.optionalePosten || []).map(o => ({ id: o.id, frage: o.frage, posten: o.posten, betrag: o.betrag, aktiv: !!ensureFinaleState().optionen[o.id] })),
      rechnung: finale.bill(scenario.nachspiel, ensureFinaleState().optionen)
    } : { verfuegbar: false },
    upcoming,
    fullTimeline,
    spielbrett: spielbrett(),
    skipped: skippedDetailed,
    firedSonderlagekarten: state.firedSonderlagekarten,
    unscheduledSonderlagekarten: scenario.sonderlagekarten.filter(sk => !sk.nurNachWeiche && (sk.minuteOffset === null || sk.minuteOffset === undefined) && !state.firedSonderlagekarten.find(f => f.id === sk.id))
      .map(sk => Object.assign({}, sk, { recipientRoleId: recipientRoleFor(sk), recipientLabel: recipientLabel(sk) })),
    bonuskarten: scenario.bonuskarten.map(b => Object.assign({}, b, {
      fired: state.firedLagekarten.includes('BONUS_' + b.id), recipientRoleId: recipientRoleFor(b), recipientLabel: b.oeffentlich ? 'alle (Bühne)' : recipientLabel(b),
      // Ueberraschungskarten mit Voraussetzung erst nach der genannten Lage
      wartetAuf: [
        ...(b.minDauer && uebungsDauer() < b.minDauer ? [`nur in Übungen ab ${b.minDauer} Minuten`] : []),
        ...(b.erfordertBesetzt && !rolleBesetzt(b.erfordertBesetzt) ? [`nur wenn ${(roleById(b.erfordertBesetzt) || {}).funktion || b.erfordertBesetzt} besetzt ist`] : []),
        ...(b.voraussetzung || []).filter(id => !state.firedLagekarten.includes(id)).map(id => (scenario.lagekarten.find(l => l.id === id) || {}).titel || id)
      ],
      // Voraussetzung, die in diesem Ablauf gar nicht vorkommt (z. B. LK14 nur bei 180 Min.)
      nichtImAblauf: (b.voraussetzung || []).filter(id => !state.firedLagekarten.includes(id) && !engine.getActiveSchedule(scenario, state).some(e => e.type === 'lagekarte' && e.id === id))
        .map(id => (scenario.lagekarten.find(l => l.id === id) || {}).titel || id)
    })),
    buehnenEreignis: buehnenEreignis(true),
    participants: state.participants,
    activeRoleIds: state.activeRoleIds,
    bewertung: state.bewertung,
    log: state.log.slice(0, 40),
    scenario: scenario
  });
});

app.get('/api/run/stage-state', (req, res) => {
  maybeStartCrisisFromCountdown();
  const currentLk = lageMitWeichen(engine.currentLagekarte(scenario, state));
  res.json({
    status: state.status,
    crisisCountdownSeconds: state.status === 'countdown' ? Math.max(0, Math.ceil((state.crisisStartsAt - Date.now()) / 1000)) : null,
    companyName: scenario.company.name,
    companyLogo: scenario.company.logo || null,
    companyLogoLight: scenario.company.stageLogo || scenario.company.logo || null,
    companyFacts: scenario.company.facts,
    title: scenario.title,
    eroeffnungstext: scenario.moderationsleitfaden.eroeffnungstext,
    idleMedia: scenario.moderationsleitfaden.idleMedia || null,
    idleSound: (scenario.sounds && scenario.sounds.idle) || null,
    elapsedMinutes: Math.round(engine.elapsedMinutes(state) * 10) / 10,
    totalPlannedMinutes: Math.round(engine.totalPlannedMinutes(scenario, state) * 10) / 10,
    currentLagekarte: currentLk ? {
      id: currentLk.id, nr: currentLk.nr, simZeit: currentLk.simZeit, titel: currentLk.titel, akt: currentLk.akt || null,
      text: currentLk.text, kriseninfo: currentLk.kriseninfo, aufgabe: currentLk.aufgabe,
      media: currentLk.media || null, sound: currentLk.sound || null,
      laufendeNr: (() => { const sched = engine.getActiveSchedule(scenario, state).filter(ev => ev.type === 'lagekarte'); const i = sched.findIndex(ev => ev.id === currentLk.id); return i >= 0 ? i + 1 : null; })()
    } : null,
    lagekartenTotal: lagekartenProgress().total,
    lagekartenGezeigt: lagekartenProgress().gezeigt,
    finaleMinutes: state.finaleMinutes || 0,
    soundReplay: state.soundReplay || 0,
    soundMuted,
    soundOwner,
    buehnenEreignis: buehnenEreignis(false),
    finale: scenario.nachspiel ? finale.view(scenario.nachspiel, ensureFinaleState()) : null,
    spielbrett: spielbrett()
  });
});

// Oeffentliche, spoilerfreie Ablauf-Ansicht fuer Teilnehmer: Begruessung,
// Spielregeln und nur die BEREITS GEZEIGTEN Lagekarten zum Nachlesen — keine
// Sonderlagekarten (vertraulich/rollenbezogen) und keine kuenftigen Karten.
// Uebungsprotokoll fuer Debriefing und Nachbereitung (Erfolgsmessung):
// Ablauf, Entscheidungen, verschickte Karten, Rechnung, Debriefing-Fragen und
// ein leerer Massnahmenplan. Namen der Teilnehmenden stehen bewusst nicht drin.
app.get('/api/run/protokoll', (req, res) => {
  const L = [];
  const w = (...x) => L.push(...x);
  const eur = n => new Intl.NumberFormat('de-DE').format(Math.round(n)) + ' €';
  const sp = aktiverSchwerpunkt();
  const datum = new Date().toLocaleDateString('de-DE');
  w(`# Übungsprotokoll – ${scenario.title}`, '',
    `**Datum:** ${datum} · **Unternehmen (fiktiv):** ${scenario.company.name}  `,
    `**Modus:** ${state.durationMode === 'target' ? `Zieldauer ${state.targetMinutes} Min.` : state.durationMode === 'computed' ? 'berechnet' : 'erprobte Zeiten'} · **Schwierigkeit:** ${state.difficulty}${sp ? ` · **Schwerpunkt:** ${sp.label}` : ''}`, '');
  w('## Besetzung', '', '*Namen der Teilnehmenden sind bewusst nicht im Protokoll.*', '');
  scenario.roles.filter(r => r.id !== 'teilnehmer').forEach(r => { const n = participantsForRole(r.id).length; if (n) w(`- ${r.funktion}${n > 1 ? ` (Team, ${n} Personen)` : ''}`); });
  const beob = state.participants.filter(p => (p.roleIds || []).includes('teilnehmer') || !(p.roleIds || []).length).length;
  if (beob) w(`- Beobachtende ohne feste Rolle: ${beob}`);
  w('', '## Gespielte Lagen', '');
  engine.getActiveSchedule(scenario, state).filter(e => e.type === 'lagekarte' && state.firedLagekarten.includes(e.id))
    .forEach(e => w(`- ${e.ref.simZeit}: ${e.ref.titel}`));
  if (!state.firedLagekarten.length) w('- (noch keine)');
  w('', '## Entscheidungen mit Folgen', '');
  weichenImPlan().forEach(({ w: wc }) => {
    const o = chosenOption(wc);
    w(`### ${wc.frage}`, '', `Entscheidung: ${o ? o.label + ` (Folge: ${o.wirkung})` : 'nicht festgehalten – Verlauf wie im Drehbuch'}`, '',
      'Im Debriefing gemeinsam einschätzen – bewertet wird die Entscheidung des Teams, nicht einzelne Personen:', '',
      '| Kriterium | erfüllt / teilweise / nicht | Notiz |', '|---|---|---|',
      '| Rechtzeitig eskaliert | | |', '| Begründung nachvollziehbar | | |', '| Verantwortlichkeit klar | | |', '| Kommuniziert (wer erfährt es wie) | | |', '| Dokumentiert | | |', '');
  });
  if (!weichenImPlan().length) w('- (keine im Plan)');
  w('', '## Verschickte vertrauliche Karten', '', '| Karte | an | Inhalt (gekürzt) | Gute Reaktion wäre |', '|---|---|---|---|');
  state.firedSonderlagekarten.forEach(f => {
    const k = scenario.sonderlagekarten.find(x => x.id === f.id) || {};
    const t = String(f.text || k.text || '').replace(/\|/g, '/');
    w(`| ${f.id} | ${f.recipientRoleId ? kurzRolle((roleById(f.recipientRoleId) || {}).funktion) : 'niemand besetzt'} | ${t.length > 140 ? t.slice(0, 137) + '…' : t} | ${String(k.moderatorGut || '').replace(/\|/g, '/')} |`);
  });
  if ((state.firedBonusInfo || []).length) {
    w('', '## Überraschungen', '', '| Karte | wie | bei Lage | Gute Reaktion wäre (Moderatorhinweis) |', '|---|---|---|---|');
    state.firedBonusInfo.forEach(f => {
      const b = scenario.bonuskarten.find(x => x.id === f.id) || {};
      const lk = scenario.lagekarten.find(x => x.id === f.beiLage);
      w(`| ${f.id}${b.titel ? ' ' + b.titel : ''} | ${f.oeffentlich ? 'auf der Bühne' : 'vertraulich an ' + (f.recipientRoleId ? kurzRolle((roleById(f.recipientRoleId) || {}).funktion) : 'niemand besetzt')} | ${lk ? lk.titel : '–'} | ${String(b.moderatorHinweis || '').replace(/\|/g, '/').slice(0, 200)} |`);
    });
    // Beobachtungsbogen je ausgeloester Ueberraschung (Team, nicht Personen)
    state.firedBonusInfo.forEach(f => {
      const b = scenario.bonuskarten.find(x => x.id === f.id) || {};
      if (!(b.beobachtung || []).length) return;
      w('', `### Beobachtung ${f.id}: ${b.titel || ''}`, '', '| Beobachtungspunkt | ja / teilweise / nein | Notiz |', '|---|---|---|', ...b.beobachtung.map(x => `| ${x.replace(/\|/g, '/')} | | |`));
    });
  }
  if (scenario.nachspiel) {
    const r = finale.bill(scenario.nachspiel, ensureFinaleState().optionen);
    w('', '## Rechnung (fiktive Modellrechnung)', '', `Gesamtschaden ${eur(r.summe)}, modellierte Erstattung ${eur(r.versicherung)}, beim Unternehmen bleiben **${eur(r.eigenanteil)}**${r.anteilJahresgewinn ? ` (${Math.round(r.anteilJahresgewinn * 100)} % des Jahresgewinns)` : ''}.`);
  }
  w('', '## Debriefing', '');
  [...(scenario.moderationsleitfaden.debriefingFragen || []), ...((sp && sp.debriefing) || [])].forEach(q => w(`**${q}**`, '', '_Notizen:_', '', ''));
  w('## Gesamteinschätzung der Übung (Team)', '', 'Nach dem Moderationshandbuch: 0 = fehlt/riskant, 1 = teilweise, 2 = tragfähig. Bewertet wird die Arbeit des Krisenstabs, nicht einzelne Personen. Beobachtungen mit Karten-ID belegen.', '',
    '| Kriterium | 0 / 1 / 2 | Beobachtung (Karte) |', '|---|---|---|',
    ...['Aktivierung / Lagebild', 'Entscheidung / Verantwortung', 'Kommunikation', 'IT-/OT-Sicherheit', 'Geschäftsfortführung', 'Qualität / Datenintegrität', 'Fachliche Prüfpflichten', 'Wiederanlauf / Nachsorge'].map(k => `| ${k} | | |`),
    '| **Summe (max. 16, kein Grenzwert)** | | |', '');
  w('## Maßnahmenplan', '', '| Nr. | Maßnahme | Verantwortlich | Priorität | Bis wann |', '|---:|---|---|---|---|', '| 1 | | | | |', '| 2 | | | | |', '| 3 | | | | |', '');
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="uebungsprotokoll-${new Date().toISOString().slice(0, 10)}.md"`);
  res.send(L.join('\n'));
});

app.get('/api/run/ablauf-state', (req, res) => {
  const mf = scenario.moderationsleitfaden || {};
  const gezeigt = scenario.lagekarten
    .filter(lk => state.firedLagekarten.includes(lk.id))
    .sort((a, b) => a.minuteOffset - b.minuteOffset)
    .map(lageMitWeichen)
    .map(lk => ({
      id: lk.id, simZeit: lk.simZeit, titel: lk.titel, text: lk.text,
      kriseninfo: lk.kriseninfo || null, media: lk.media || null
    }));
  res.json({
    status: state.status,
    title: scenario.title,
    companyName: scenario.company.name,
    begruessung: mf.begruessung || '',
    spielregeln: mf.spielregeln || [],
    lagekartenGezeigt: gezeigt,
    lagekartenTotal: scenario.lagekarten.length
  });
});

app.post('/api/run/start', (req, res) => {
  const { durationMode, difficulty, targetMinutes, schwerpunkt } = req.body || {};
  // Immer ein frischer Lauf -- auch wenn vorher schon vorbereitet oder
  // gespielt wurde. Sonst blieben ausgeloeste Karten des alten Laufs haengen.
  {
    const participants = state.participants;
    const activeRoleIds = state.activeRoleIds;
    state = engine.newRunState(scenario);
    state.scenarioFile = scenarioFile;
    state.participants = participants;
    state.activeRoleIds = activeRoleIds;
  }
  state.durationMode = ['computed', 'target'].includes(durationMode) ? durationMode : 'authored';
  state.difficulty = ['leicht', 'mittel', 'hoch'].includes(difficulty) ? difficulty : 'mittel';
  state.schwerpunkt = (scenario.schwerpunkte || []).some(x => x.key === schwerpunkt) ? schwerpunkt : null;

  if (state.durationMode === 'target') {
    const minutes = Math.max(10, Number(targetMinutes) || 90);
    const roleCount = engine.activeRoleGroupCount(scenario, state);
    const plan = engine.buildAdaptiveSchedule(scenario, { targetMinutes: minutes, difficulty: state.difficulty, roleCount, activeRoleIds: engine.assignedRoleIds(state), schwerpunkt: state.schwerpunkt });
    state.targetMinutes = minutes;
    state.plannedSchedule = plan.schedule;
    state.plannedTotalMinutes = plan.totalMinutes;
    state.skippedEvents = plan.skipped;
    state.scheduleWarning = plan.warning;
    state.finaleMinutes = plan.finaleMinutes;
    state.promotedEvents = [];
    log('info', `Zieldauer-Plan erstellt: ${minutes} Min. gewünscht, ${plan.schedule.length} Ereignisse ausgewählt (${plan.skipped.length} übersprungen), geplante Gesamtzeit ${plan.totalMinutes} Min.${plan.warning ? ' Hinweis: ' + plan.warning : ''}`);
  }

  if (state.durationMode !== 'target') {
    state.finaleMinutes = engine.finaleMinutesFor(scenario, engine.totalPlannedMinutes(scenario, state));
  }
  state.finale = { step: 0, optionen: {} };

  // Bewusst noch kein Timer-Start: die Buehne zeigt jetzt die "Ruhe vor dem
  // Sturm" (Eroeffnungstext/-bild), der Moderator liest Begruessung und
  // Eroeffnung ungehetzt vor. Der Krisentimer startet erst explizit per
  // /api/run/begin-crisis, sobald alle bereit sind.
  state.status = 'briefing';
  state.startedAt = null;
  state.pausedAt = null;
  state.totalPausedMs = 0;
  log('info', `Übung vorbereitet (Modus: ${state.durationMode}, Schwierigkeit: ${state.difficulty}). Krisentimer noch nicht gestartet.`);
  persist();
  res.json({ ok: true });
});
app.post('/api/run/begin-crisis', (req, res) => {
  if (state.status !== 'briefing') {
    return res.status(400).json({ ok: false, error: 'Übung ist nicht in der Vorbereitungsphase.' });
  }
  state.status = 'countdown';
  state.crisisStartsAt = Date.now() + 30000;
  log('info', 'Krise wird in 30 Sekunden eingeläutet.');
  persist();
  res.json({ ok: true });
});
app.post('/api/run/promote/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const idx = state.skippedEvents.findIndex(e => e.type === type && e.id === id);
  if (idx === -1) return res.status(404).json({ ok: false, error: 'Ereignis ist nicht (mehr) in der Übersprungen-Liste.' });
  state.skippedEvents.splice(idx, 1);
  state.promotedEvents.push({ type, id, minute: Math.round(engine.elapsedMinutes(state) * 100) / 100 });
  log('info', `${type === 'lagekarte' ? 'Lagekarte' : 'Sonderlagekarte'} ${id} manuell nachträglich aufgenommen (war aus Zeitgründen übersprungen).`);
  persist();
  res.json({ ok: true });
});
// Zeitsprung: Moderator kann Leerlauf überspringen oder gezielt zu einer
// bestimmten Karte vorspulen, wenn eine Diskussion kürzer/länger lief als
// geplant. Danach läuft die Uhr normal (echtzeit-basiert) weiter.
app.post('/api/run/jump-to-event/:type/:id', (req, res) => {
  if (state.status !== 'running' && state.status !== 'paused') {
    return res.status(400).json({ ok: false, error: 'Kein aktiver Lauf.' });
  }
  const schedule = engine.getActiveSchedule(scenario, state);
  const ev = schedule.find(e => e.type === req.params.type && e.id === req.params.id);
  if (!ev) return res.status(404).json({ ok: false, error: 'Ereignis ist aktuell nicht im Ablaufplan.' });
  engine.setElapsedMinutes(state, ev.minute);
  log('info', `Zeitsprung: Übungszeit manuell auf Minute ${Math.round(ev.minute * 10) / 10} gesetzt (${ev.type === 'lagekarte' ? 'Lagekarte' : 'Sonderlagekarte'} ${ev.id}).`);
  tick();
  persist();
  res.json({ ok: true });
});
// Freier Zeit-Schieberegler: springt auf jede beliebige Minute (nicht nur
// auf vordefinierte Ereignisse), fuer den Fall, dass ein Thema schon vorher
// durch ist oder noch mehr Zeit gebraucht wird.
app.post('/api/run/jump-to-minute', (req, res) => {
  if (state.status !== 'running' && state.status !== 'paused') {
    return res.status(400).json({ ok: false, error: 'Kein aktiver Lauf.' });
  }
  const minute = Math.max(0, Number((req.body || {}).minute) || 0);
  engine.setElapsedMinutes(state, minute);
  log('info', `Zeitsprung: Übungszeit manuell auf Minute ${Math.round(minute * 10) / 10} gesetzt.`);
  tick();
  persist();
  res.json({ ok: true });
});
// ---- Abschluss (Nacharbeiten + Rechnung) ----
app.post('/api/run/finale/start', (req, res) => {
  if (!scenario.nachspiel) return res.status(400).json({ ok: false, error: 'Dieses Szenario hat keinen Abschluss.' });
  if (state.status === 'idle') return res.status(400).json({ ok: false, error: 'Es läuft keine Übung.' });
  if (state.status !== 'ended') {
    if (state.status === 'paused' && state.pausedAt) { state.totalPausedMs += Date.now() - state.pausedAt; state.pausedAt = null; }
    state.status = 'ended';
    state.endedAt = Date.now();
    log('info', 'Krisenphase vom Moderator beendet.');
  }
  ensureFinaleState().step = 0;
  enterFinale();
  persist();
  res.json({ ok: true });
});
app.post('/api/run/finale/next', (req, res) => {
  const f = ensureFinaleState();
  if (!f.step) return res.status(400).json({ ok: false, error: 'Der Abschluss läuft noch nicht.' });
  f.step = Math.min(finaleStepCount(), f.step + 1);
  persist();
  res.json({ ok: true, step: f.step });
});
app.post('/api/run/finale/prev', (req, res) => {
  const f = ensureFinaleState();
  if (!f.step) return res.status(400).json({ ok: false, error: 'Der Abschluss läuft noch nicht.' });
  f.step = Math.max(1, f.step - 1);
  persist();
  res.json({ ok: true, step: f.step });
});
app.post('/api/run/finale/close', (req, res) => {
  ensureFinaleState().step = 0;
  log('info', 'Abschluss ausgeblendet – Bühne zeigt "Übung beendet".');
  persist();
  res.json({ ok: true });
});
// Optionale Posten (z. B. Lösegeld gezahlt?) je nach Entscheidung in der Übung.
app.post('/api/run/weiche', async (req, res) => {
  const { id, option } = req.body || {};
  const w = weichenListe().find(x => x.id === id);
  if (!w) return res.status(404).json({ ok: false, error: 'Unbekannte Weiche.' });
  const o = option ? (w.optionen || []).find(x => x.id === option) : null;
  if (option && !o) return res.status(400).json({ ok: false, error: 'Unbekannte Option.' });
  state.weichen = state.weichen || {};
  if (o) state.weichen[w.id] = o.id; else delete state.weichen[w.id];
  // Posten im Abschluss, die an dieser Weiche haengen, folgen der Entscheidung.
  const f = ensureFinaleState();
  const gesteuert = new Set((w.optionen || []).flatMap(x => x.posten || []));
  gesteuert.forEach(pid => { f.optionen[pid] = !!(o && (o.posten || []).includes(pid)); });
  if (f.step) f.step = Math.min(f.step, finaleStepCount());
  log('info', o ? `Entscheidung festgehalten: ${w.frage} → ${o.label}` : `Entscheidung zurückgenommen: ${w.frage}`);
  await fireWeichenKarten();
  persist();
  res.json({ ok: true });
});
app.post('/api/run/finale/option', (req, res) => {
  const { id, aktiv } = req.body || {};
  const opt = scenario.nachspiel && (scenario.nachspiel.optionalePosten || []).find(o => o.id === id);
  if (!opt) return res.status(404).json({ ok: false, error: 'Unbekannter Posten.' });
  const f = ensureFinaleState();
  f.optionen[id] = !!aktiv;
  // Schrittzaehler bleibt innerhalb der (jetzt evtl. kuerzeren) Liste.
  if (f.step) f.step = Math.min(f.step, finaleStepCount());
  log('info', `Abschluss: Posten "${opt.posten}" ${aktiv ? 'eingerechnet' : 'nicht eingerechnet'}.`);
  persist();
  res.json({ ok: true });
});

app.post('/api/run/pause', (req, res) => {
  if (state.status === 'running') { state.status = 'paused'; state.pausedAt = Date.now(); log('info', 'Übung pausiert.'); persist(); }
  res.json({ ok: true });
});
app.post('/api/run/resume', (req, res) => {
  if (state.status === 'paused') { state.totalPausedMs += Date.now() - state.pausedAt; state.pausedAt = null; state.status = 'running'; log('info', 'Übung fortgesetzt.'); persist(); }
  res.json({ ok: true });
});
app.post('/api/run/reset', (req, res) => {
  const participants = state.participants;
  const activeRoleIds = state.activeRoleIds;
  state = engine.newRunState(scenario);
  state.scenarioFile = scenarioFile;
  state.participants = participants;
  state.activeRoleIds = activeRoleIds;
  log('info', 'Lauf zurückgesetzt (Teilnehmerliste bleibt erhalten).');
  persist();
  res.json({ ok: true });
});
app.post('/api/run/fire-sonderkarte/:id', async (req, res) => {
  const sk = scenario.sonderlagekarten.find(s => s.id === req.params.id);
  if (!sk) return res.status(404).json({ ok: false, error: 'Unbekannte Sonderlagekarte.' });
  await fireSonderlagekarte(sk, { manual: true });
  res.json({ ok: true });
});
app.post('/api/run/fire-bonuskarte/:id', async (req, res) => {
  const b = scenario.bonuskarten.find(x => x.id === req.params.id);
  if (!b) return res.status(404).json({ ok: false, error: 'Unbekannte Bonuskarte.' });
  const offen = (b.voraussetzung || []).filter(id => !state.firedLagekarten.includes(id));
  if (offen.length) return res.status(400).json({ ok: false, error: `Diese Karte passt erst nach ${offen.join(', ')}.` });
  if (b.minDauer && uebungsDauer() < b.minDauer) return res.status(400).json({ ok: false, error: `Diese Karte ist nur für Übungen ab ${b.minDauer} Minuten gedacht.` });
  if (b.erfordertBesetzt && !rolleBesetzt(b.erfordertBesetzt)) return res.status(400).json({ ok: false, error: `Diese Karte setzt voraus, dass ${(roleById(b.erfordertBesetzt) || {}).funktion || b.erfordertBesetzt} besetzt ist.` });
  if (state.firedLagekarten.includes('BONUS_' + b.id)) return res.status(400).json({ ok: false, error: 'Diese Karte wurde schon ausgelöst.' });
  if (b.oeffentlich) {
    const lk = engine.currentLagekarte(scenario, state);
    if (!lk || !['running', 'paused'].includes(state.status)) return res.status(400).json({ ok: false, error: 'Öffentliche Überraschungen gehen nur während einer laufenden Lage.' });
    state.firedLagekarten.push('BONUS_' + b.id);
    state.firedBonusInfo = state.firedBonusInfo || [];
    state.firedBonusInfo.push({ id: b.id, atMinute: engine.elapsedMinutes(state), oeffentlich: true, beiLage: lk.id });
    state.buehnenEreignis = { id: b.id, at: Date.now(), lkId: lk.id, replay: 0, endsAt: b.unterbrechung ? Date.now() + b.unterbrechung.minuten * 60000 : null };
    log('info', `Überraschung ${b.id} auf der Bühne: ${b.titel || ''}`);
    persist();
    return res.json({ ok: true, oeffentlich: true });
  }
  const recipientRoleId = recipientRoleFor(b);
  const role = roleById(recipientRoleId || b.empfaenger);
  const recipients = recipientRoleId ? participantsForRole(recipientRoleId) : [];
  state.firedLagekarten.push('BONUS_' + b.id);
  state.firedBonusInfo = state.firedBonusInfo || [];
  state.firedBonusInfo.push({ id: b.id, atMinute: engine.elapsedMinutes(state), recipientRoleId, beiLage: (engine.currentLagekarte(scenario, state) || {}).id || null });
  if (recipients.length === 0) {
    log('warn', `Bonuskarte ${b.id} ausgelöst, aber weder ${recipientLabel(b)} noch eine Ersatzrolle ist besetzt.`);
  } else if (testModeActive()) {
    await sendTestModeCard(b, role, recipients, recipientRoleId, 'Bonusereignis');
  } else {
    const settings = store.loadSettings();
    for (const p of recipients) {
      const result = await mailer.sendMail(settings.smtp, {
        to: p.email, subject: `Vertraulich für ${p.name || role.funktion} (${role.funktion}) – Bonusereignis ${b.id}`,
        text: `Vertraulich – nur für dich, ${p.name} (${role.funktion})\n\n${b.text}${fallbackNote(b, recipientRoleId)}`
      }, settings.testMode);
      log(result.ok ? 'mail' : 'error', result.ok ? `Bonuskarte ${b.id} an ${p.name} gesendet.${result.testModeRedirectedFrom ? ' [TESTLAUF]' : ''}` : `Bonuskarte ${b.id} Versand an ${p.name} fehlgeschlagen: ${result.error}`);
    }
  }
  persist();
  res.json({ ok: true });
});

app.post('/api/run/buehnenereignis/ausblenden', (req, res) => {
  const e = state.buehnenEreignis;
  // Laufende Unterbrechung: erst nur verkleinern, damit der Countdown sichtbar bleibt
  if (e && e.endsAt && !e.minimiert && e.endsAt > Date.now()) { e.minimiert = true; persist(); return res.json({ ok: true, minimiert: true }); }
  if (e) log('info', `Überraschung ${e.id} von der Bühne genommen.`);
  state.buehnenEreignis = null; persist(); res.json({ ok: true });
});
app.post('/api/run/buehnenereignis/replay', (req, res) => {
  if (state.buehnenEreignis) state.buehnenEreignis.replay = (state.buehnenEreignis.replay || 0) + 1;
  persist(); res.json({ ok: true });
});

// ---- Bewertungsmatrix ----
app.post('/api/bewertung', (req, res) => {
  const { roleId, kriterium, value } = req.body || {};
  if (!roleId || !kriterium) return res.status(400).json({ ok: false, error: 'roleId und kriterium erforderlich.' });
  state.bewertung[roleId] = state.bewertung[roleId] || {};
  if (value === null || value === undefined || value === '') delete state.bewertung[roleId][kriterium];
  else state.bewertung[roleId][kriterium] = Number(value);
  persist();
  res.json({ ok: true, bewertung: state.bewertung });
});

function scoreForRole(roleId) {
  const scores = state.bewertung[roleId];
  if (!scores) return null;
  const values = Object.values(scores).filter(v => typeof v === 'number');
  if (values.length === 0) return null;
  const avg = values.reduce((a, b) => a + b, 0) / values.length; // 1-5 Skala
  return Math.round((avg / 5) * (scenario.urkunde.maxPunkte || 10) * 10) / 10;
}

// Eine Person kann mehrere (oder — als generische "Teilnehmer"-Rolle — gar
// keine bewertete) Rolle(n) haben: Durchschnitt über alle bewerteten Rollen.
function scoreForParticipant(participant) {
  const values = (participant.roleIds || []).map(scoreForRole).filter(v => v !== null && v !== undefined);
  if (values.length === 0) return null;
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

// Absoluter Dateipfad zu einem "/media/..."-Verweis — fuer E-Mail-Anhaenge,
// da ein relativer Browser-Pfad im Mail-Client des Empfaengers nicht
// aufgeloest werden kann (der zeigt sonst auf dessen eigenes "localhost").
// Logo der durchfuehrenden Organisation: fehlt die hinterlegte Datei (z. B.
// alte Vorlage auf einem anderen Rechner), lieber das Standard-Logo als ein
// kaputtes Bild auf der Urkunde.
const DEFAULT_BRANDING_LOGO = '/media/branding/excon-logo.png';
function effectiveBrandingLogo(settings) {
  const url = settings && settings.branding && settings.branding.logo;
  const file = mediaUrlToFile(url);
  if (url && (!file || fs.existsSync(file))) return url;
  return DEFAULT_BRANDING_LOGO;
}
function mediaUrlToFile(mediaUrl) {
  if (!mediaUrl || !mediaUrl.startsWith('/media/')) return null;
  return path.join(__dirname, '..', 'media', mediaUrl.slice('/media/'.length));
}

// Feste Breite/Format fuer den QR-Code auf der Urkunde (klein, aber noch gut
// scanbar auf einem Handy-Bildschirm).
async function renderStarterKitQrDataUrl(url) {
  if (!url) return null;
  try { return await QRCode.toDataURL(url, { width: 168, margin: 1 }); }
  catch (e) { return null; }
}
async function renderStarterKitQrBuffer(url) {
  if (!url) return null;
  try { return await QRCode.toBuffer(url, { width: 168, margin: 1 }); }
  catch (e) { return null; }
}

app.get('/api/certificate/participant/:id', async (req, res) => {
  const participant = participantById(req.params.id);
  if (!participant || !participant.name) {
    return res.status(400).send('Diese Person hat noch keinen Namen im Setup eingetragen.');
  }
  const roles = (participant.roleIds || []).map(roleById).filter(Boolean);
  const settings = store.loadSettings();
  const score = scoreForParticipant(participant);
  const starterKitUrl = settings.branding.starterKitUrl;
  res.send(renderCertificate({
    scenario, role: roles[0], roles, participant, score, branding: settings.branding,
    companyLogoSrc: scenario.company.logo, brandingLogoSrc: effectiveBrandingLogo(settings),
    ort: settings.branding.ort, datum: new Date().toLocaleDateString('de-DE'),
    starterKitUrl, starterKitLabel: settings.branding.starterKitLabel,
    starterKitScreenshotSrc: '/media/starterkit/dashboard-screenshot.png',
    starterKitQrSrc: settings.branding.starterKitQr === false ? null : await renderStarterKitQrDataUrl(starterKitUrl)
  }));
});

app.post('/api/certificate/participant/:id/send', async (req, res) => {
  const participant = participantById(req.params.id);
  if (!participant || !participant.name || !participant.email) {
    return res.status(400).json({ ok: false, error: 'Diese Person hat noch keinen Namen und keine E-Mail im Setup eingetragen.' });
  }
  const roles = (participant.roleIds || []).map(roleById).filter(Boolean);
  const settings = store.loadSettings();
  const score = scoreForParticipant(participant);
  const attachments = [];
  const companyLogoFile = mediaUrlToFile(scenario.company.logo);
  const brandingLogoFile = mediaUrlToFile(effectiveBrandingLogo(settings));
  const starterKitUrl = settings.branding.starterKitUrl;
  const screenshotFile = path.join(__dirname, '..', 'media', 'starterkit', 'dashboard-screenshot.png');
  const qrBuffer = settings.branding.starterKitQr === false ? null : await renderStarterKitQrBuffer(starterKitUrl);
  if (companyLogoFile) attachments.push({ filename: 'company-logo.png', path: companyLogoFile, cid: 'company-logo' });
  if (brandingLogoFile) attachments.push({ filename: 'branding-logo.png', path: brandingLogoFile, cid: 'branding-logo' });
  if (fs.existsSync(screenshotFile)) attachments.push({ filename: 'starter-kit-screenshot.png', path: screenshotFile, cid: 'starterkit-screenshot' });
  if (qrBuffer) attachments.push({ filename: 'starter-kit-qr.png', content: qrBuffer, cid: 'starterkit-qr' });
  const html = renderCertificate({
    scenario, role: roles[0], roles, participant, score, branding: settings.branding,
    companyLogoSrc: companyLogoFile ? 'cid:company-logo' : null,
    brandingLogoSrc: brandingLogoFile ? 'cid:branding-logo' : null,
    ort: settings.branding.ort, datum: new Date().toLocaleDateString('de-DE'),
    starterKitUrl, starterKitLabel: settings.branding.starterKitLabel,
    starterKitScreenshotSrc: fs.existsSync(screenshotFile) ? 'cid:starterkit-screenshot' : null,
    starterKitQrSrc: qrBuffer ? 'cid:starterkit-qr' : null
  });
  const veranstaltung = (scenario.urkunde && scenario.urkunde.veranstaltung) || scenario.title;
  const rollenText = roles.map(r => r.funktion).join(', ');
  // Zusaetzlich eine reine Textfassung: reine HTML-Mails mit Bildern werten
  // Spamfilter deutlich schlechter.
  const orgName = (settings.branding && settings.branding.organisationName) || '';
  const text = `Hallo ${participant.name},\n\nvielen Dank für deine Teilnahme an der Übung „${veranstaltung}“` +
    `${rollenText ? ` als ${rollenText}` : ''}. Deine Urkunde ist in dieser E-Mail enthalten` +
    ` (falls sie nicht angezeigt wird: Bilder bzw. HTML-Ansicht im Mailprogramm erlauben).` +
    `${starterKitUrl ? `\n\nWeiter geht es hier: ${settings.branding.starterKitLabel || starterKitUrl} – ${starterKitUrl}` : ''}` +
    `\n\nViele Grüße${orgName ? `\n${orgName}` : ''}`;
  const result = await mailer.sendMail(settings.smtp, {
    to: participant.email, subject: `Deine Urkunde – ${veranstaltung}`, text, html, attachments
  }, settings.testMode);
  log(result.ok ? 'mail' : 'error',
    result.ok
      ? `Urkunde für ${participant.name} (${rollenText}) per E-Mail versendet.${result.testModeRedirectedFrom ? ' [TESTLAUF]' : ''}`
      : `Urkunden-Versand an ${participant.name} fehlgeschlagen: ${result.error}`);
  persist();
  res.json(result);
});

const PORT = process.env.PORT || 4173;
app.listen(PORT, () => {
  console.log(`BCM Tabletop-Regie läuft auf http://localhost:${PORT}`);
  console.log(`  Setup:      http://localhost:${PORT}/setup.html`);
  console.log(`  Bühne:      http://localhost:${PORT}/stage.html`);
  console.log(`  Moderation: http://localhost:${PORT}/moderator.html`);
});
