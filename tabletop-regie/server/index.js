const express = require('express');
const path = require('path');
const crypto = require('crypto');

const store = require('./store');
const engine = require('./runEngine');
const mailer = require('./mailer');
const { renderCertificate } = require('./certificate');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/media', express.static(path.join(__dirname, '..', 'media')));

const { file: scenarioFile, scenario } = store.loadScenario();
if (!scenario) {
  console.error('Konnte Szenario nicht laden:', scenarioFile);
  process.exit(1);
}

let state = store.loadRunState() || engine.newRunState(scenario);
state.scenarioFile = scenarioFile;

function persist() { store.saveRunState(state); }

function roleById(id) { return scenario.roles.find(r => r.id === id); }
function groupByKey(key) { return scenario.roleGroups.find(g => g.key === key); }

function participantsForRole(roleId) {
  return state.participants.filter(p => (p.roleIds || []).includes(roleId));
}

function log(type, message) {
  state.log.unshift({ ts: Date.now(), type, message });
  state.log = state.log.slice(0, 200);
}

async function fireSonderlagekarte(sk, { manual } = {}) {
  if (state.firedSonderlagekarten.find(f => f.id === sk.id)) return;
  const role = roleById(sk.empfaenger);
  const recipients = participantsForRole(sk.empfaenger);
  const entry = { id: sk.id, at: Date.now(), manual: !!manual, emailResults: [] };
  if (recipients.length === 0) {
    log('warn', `Sonderlagekarte ${sk.id} (${role ? role.funktion : sk.empfaenger}) fällig, aber niemand ist dieser Rolle zugeordnet.`);
  } else {
    const settings = store.loadSettings();
    for (const p of recipients) {
      const subject = `Vertrauliche Information – ${scenario.company.name} Krisenstab`;
      const text = `Vertraulich – nur für dich, ${p.name} (${role.funktion})\n\n${sk.text}`;
      const result = await mailer.sendMail(settings.smtp, { to: p.email, subject, text });
      entry.emailResults.push({ participantId: p.id, email: p.email, ok: result.ok, error: result.error });
      log(result.ok ? 'mail' : 'error',
        result.ok
          ? `Sonderlagekarte ${sk.id} per E-Mail an ${p.name} (${role.funktion}) gesendet.`
          : `E-Mail-Versand für Sonderlagekarte ${sk.id} an ${p.name} fehlgeschlagen: ${result.error}`);
    }
  }
  state.firedSonderlagekarten.push(entry);
  persist();
}

function tick() {
  if (state.status !== 'running') return;
  const due = engine.dueEvents(scenario, state);
  const lk = due.filter(e => e.type === 'lagekarte');
  lk.forEach(ev => { if (!state.firedLagekarten.includes(ev.id)) { state.firedLagekarten.push(ev.id); log('lagekarte', `Lagekarte ${ev.id} (${ev.ref.titel}) ist jetzt aktiv.`); } });
  const dueSk = due.filter(e => e.type === 'sonderlagekarte');
  dueSk.forEach(ev => { fireSonderlagekarte(ev.ref, { manual: false }); });
  const total = engine.totalPlannedMinutes(scenario, state);
  if (state.status === 'running' && engine.elapsedMinutes(state) >= total && state.status !== 'ended') {
    state.status = 'ended';
    log('info', 'Geplante Übungszeit erreicht – Übung automatisch beendet. Debriefing kann beginnen.');
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
    bonuskartenCount: scenario.bonuskarten.length, moderationsleitfaden: scenario.moderationsleitfaden
  });
});

// Vorschau fuer den Zieldauer-Modus im Setup: nutzt die im Formular gerade
// zugewiesenen Rollen (noch nicht gespeichert), ohne den Lauf zu starten.
app.post('/api/preview-schedule', (req, res) => {
  const { targetMinutes, difficulty, roleIds } = req.body || {};
  const minutes = Math.max(10, Number(targetMinutes) || 90);
  const roleToGroup = {};
  scenario.roles.forEach(r => { roleToGroup[r.id] = r.group; });
  const activeGroups = new Set((roleIds || []).map(id => roleToGroup[id]).filter(Boolean));
  const roleCount = Array.from(activeGroups).filter(g => scenario.standardablauf.speakingOrder.includes(g)).length;
  const plan = engine.buildAdaptiveSchedule(scenario, { targetMinutes: minutes, difficulty: ['leicht', 'mittel', 'hoch'].includes(difficulty) ? difficulty : 'mittel', roleCount });
  res.json({
    activeRoleGroups: roleCount,
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
app.post('/api/participants', (req, res) => {
  const list = Array.isArray(req.body) ? req.body : [];
  state.participants = list.map(p => ({
    id: p.id || crypto.randomUUID(),
    name: String(p.name || '').trim(),
    email: String(p.email || '').trim(),
    remote: !!p.remote,
    roleIds: Array.isArray(p.roleIds) ? p.roleIds : []
  }));
  persist();
  res.json(state.participants);
});

// ---- Einstellungen ----
app.get('/api/settings', (req, res) => {
  const s = store.loadSettings();
  res.json(Object.assign({}, s, { smtp: Object.assign({}, s.smtp, { pass: s.smtp.pass ? '••••••••' : '' }) }));
});
app.post('/api/settings', (req, res) => {
  const current = store.loadSettings();
  const incoming = req.body || {};
  // Platzhalter-Passwort nicht ueberschreiben, wenn Nutzer das Feld unveraendert liess.
  if (incoming.smtp && incoming.smtp.pass === '••••••••') incoming.smtp.pass = current.smtp.pass;
  const merged = {
    smtp: Object.assign({}, current.smtp, incoming.smtp || {}),
    branding: Object.assign({}, current.branding, incoming.branding || {})
  };
  store.saveSettings(merged);
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

// ---- Lauf-Steuerung ----
app.get('/api/run/moderator-state', (req, res) => {
  const schedule = engine.getActiveSchedule(scenario, state);
  const currentLk = engine.currentLagekarte(scenario, state);
  const upcoming = schedule.filter(ev => !(
    (ev.type === 'lagekarte' && state.firedLagekarten.includes(ev.id)) ||
    (ev.type === 'sonderlagekarte' && state.firedSonderlagekarten.find(f => f.id === ev.id))
  )).slice(0, 6).map(ev => ({
    type: ev.type, id: ev.id, minute: Math.round(ev.minute * 10) / 10,
    titel: ev.type === 'lagekarte' ? ev.ref.titel : `Sonderlagekarte für ${roleById(ev.ref.empfaenger).funktion}`
  }));
  const skippedDetailed = (state.skippedEvents || []).map(sk => ({
    type: sk.type, id: sk.id, reason: sk.reason,
    titel: sk.type === 'lagekarte' ? scenario.lagekarten.find(lk => lk.id === sk.id).titel : `Sonderlagekarte für ${roleById(scenario.sonderlagekarten.find(s => s.id === sk.id).empfaenger).funktion}`
  }));
  res.json({
    status: state.status,
    durationMode: state.durationMode,
    difficulty: state.difficulty,
    targetMinutes: state.targetMinutes,
    scheduleWarning: state.scheduleWarning,
    elapsedMinutes: Math.round(engine.elapsedMinutes(state) * 10) / 10,
    totalPlannedMinutes: Math.round(engine.totalPlannedMinutes(scenario, state) * 10) / 10,
    activeRoleGroups: engine.activeRoleGroupCount(scenario, state),
    currentLagekarte: currentLk,
    upcoming,
    skipped: skippedDetailed,
    firedSonderlagekarten: state.firedSonderlagekarten,
    unscheduledSonderlagekarten: scenario.sonderlagekarten.filter(sk => (sk.minuteOffset === null || sk.minuteOffset === undefined) && !state.firedSonderlagekarten.find(f => f.id === sk.id)),
    bonuskarten: scenario.bonuskarten.map(b => Object.assign({}, b, { fired: state.firedLagekarten.includes('BONUS_' + b.id) })),
    participants: state.participants,
    bewertung: state.bewertung,
    log: state.log.slice(0, 40),
    scenario: scenario
  });
});

app.get('/api/run/stage-state', (req, res) => {
  const currentLk = engine.currentLagekarte(scenario, state);
  res.json({
    status: state.status,
    companyName: scenario.company.name,
    companyFacts: scenario.company.facts,
    title: scenario.title,
    eroeffnungstext: scenario.moderationsleitfaden.eroeffnungstext,
    elapsedMinutes: Math.round(engine.elapsedMinutes(state) * 10) / 10,
    totalPlannedMinutes: Math.round(engine.totalPlannedMinutes(scenario, state) * 10) / 10,
    currentLagekarte: currentLk ? {
      nr: currentLk.nr, simZeit: currentLk.simZeit, titel: currentLk.titel,
      text: currentLk.text, kriseninfo: currentLk.kriseninfo, aufgabe: currentLk.aufgabe,
      media: currentLk.media || null
    } : null,
    lagekartenTotal: scenario.lagekarten.length,
    lagekartenGezeigt: state.firedLagekarten.filter(id => id.startsWith('LK')).length
  });
});

app.post('/api/run/start', (req, res) => {
  const { durationMode, difficulty, targetMinutes } = req.body || {};
  if (state.status === 'idle' || state.status === 'ended') {
    const participants = state.participants;
    state = engine.newRunState(scenario);
    state.scenarioFile = scenarioFile;
    state.participants = participants;
  }
  state.durationMode = ['computed', 'target'].includes(durationMode) ? durationMode : 'authored';
  state.difficulty = ['leicht', 'mittel', 'hoch'].includes(difficulty) ? difficulty : 'mittel';

  if (state.durationMode === 'target') {
    const minutes = Math.max(10, Number(targetMinutes) || 90);
    const roleCount = engine.activeRoleGroupCount(scenario, state);
    const plan = engine.buildAdaptiveSchedule(scenario, { targetMinutes: minutes, difficulty: state.difficulty, roleCount });
    state.targetMinutes = minutes;
    state.plannedSchedule = plan.schedule;
    state.plannedTotalMinutes = plan.totalMinutes;
    state.skippedEvents = plan.skipped;
    state.scheduleWarning = plan.warning;
    state.promotedEvents = [];
    log('info', `Zieldauer-Plan erstellt: ${minutes} Min. gewünscht, ${plan.schedule.length} Ereignisse ausgewählt (${plan.skipped.length} übersprungen), geplante Gesamtzeit ${plan.totalMinutes} Min.${plan.warning ? ' Hinweis: ' + plan.warning : ''}`);
  }

  state.status = 'running';
  state.startedAt = Date.now();
  state.pausedAt = null;
  state.totalPausedMs = 0;
  log('info', `Übung gestartet (Modus: ${state.durationMode}, Schwierigkeit: ${state.difficulty}).`);
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
  state = engine.newRunState(scenario);
  state.scenarioFile = scenarioFile;
  state.participants = participants;
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
  const role = roleById(b.empfaenger);
  const recipients = participantsForRole(b.empfaenger);
  state.firedLagekarten.push('BONUS_' + b.id);
  if (recipients.length === 0) {
    log('warn', `Bonuskarte ${b.id} ausgelöst, aber niemand ist ${role ? role.funktion : b.empfaenger} zugeordnet.`);
  } else {
    const settings = store.loadSettings();
    for (const p of recipients) {
      const result = await mailer.sendMail(settings.smtp, {
        to: p.email, subject: `Bonusereignis – ${scenario.company.name} Krisenstab`,
        text: `Vertraulich – nur für dich, ${p.name} (${role.funktion})\n\n${b.text}`
      });
      log(result.ok ? 'mail' : 'error', result.ok ? `Bonuskarte ${b.id} an ${p.name} gesendet.` : `Bonuskarte ${b.id} Versand an ${p.name} fehlgeschlagen: ${result.error}`);
    }
  }
  persist();
  res.json({ ok: true });
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

app.get('/api/certificate/:roleId', (req, res) => {
  const role = roleById(req.params.roleId);
  if (!role) return res.status(404).send('Unbekannte Rolle.');
  const participant = participantsForRole(role.id)[0] || null;
  if (!participant || !participant.name) {
    return res.status(400).send('Dieser Rolle ist noch kein Teilnehmer mit Namen zugeordnet. Bitte zuerst im Setup eintragen.');
  }
  const settings = store.loadSettings();
  const score = scoreForRole(role.id);
  res.send(renderCertificate({ scenario, role, participant, score, branding: settings.branding }));
});

const PORT = process.env.PORT || 4173;
app.listen(PORT, () => {
  console.log(`BCM Tabletop-Regie läuft auf http://localhost:${PORT}`);
  console.log(`  Setup:      http://localhost:${PORT}/setup.html`);
  console.log(`  Bühne:      http://localhost:${PORT}/stage.html`);
  console.log(`  Moderation: http://localhost:${PORT}/moderator.html`);
});
