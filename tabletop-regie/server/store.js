// Einfache dateibasierte Persistenz. Kein Datenbankserver nötig — dieses
// Tool läuft lokal auf dem Rechner des Moderators.
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SETTINGS_PATH = path.join(DATA_DIR, 'settings.json');
const RUN_STATE_PATH = path.join(DATA_DIR, 'run-state.json');

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function listScenarioFiles() {
  return fs.readdirSync(DATA_DIR)
    .filter(f => f.startsWith('scenario.') && f.endsWith('.json'))
    .sort();
}

function loadScenario(filename) {
  // Reihenfolge: expliziter Parameter -> Umgebungsvariable SCENARIO_FILE
  // (für mehrere Kundenszenarien nebeneinander) -> erste gefundene Datei.
  const file = filename || process.env.SCENARIO_FILE || listScenarioFiles()[0];
  if (!file) throw new Error('Kein Szenario in data/ gefunden (scenario.*.json).');
  return { file, scenario: readJson(path.join(DATA_DIR, file), null) };
}

const DEFAULT_SETTINGS = {
  smtp: { host: '', port: 587, secure: false, user: '', pass: '', fromAddress: '', fromName: 'BCM Tabletop-Regie', allowInsecureTLS: false },
  branding: { organisationName: 'EXCON', logo: null }
};

function loadSettings() {
  return Object.assign({}, DEFAULT_SETTINGS, readJson(SETTINGS_PATH, {}));
}

function saveSettings(settings) {
  writeJson(SETTINGS_PATH, settings);
}

function loadRunState() {
  return readJson(RUN_STATE_PATH, null);
}

function saveRunState(state) {
  writeJson(RUN_STATE_PATH, state);
}

module.exports = {
  DATA_DIR,
  listScenarioFiles,
  loadScenario,
  loadSettings,
  saveSettings,
  loadRunState,
  saveRunState
};
