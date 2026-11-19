// Startet einen Server in einer isolierten Testumgebung (eigener Datenordner, lokaler
// SMTP-Testempfänger) und führt einen Befehl dagegen aus. Die Projektkonfiguration in
// data/ bleibt unberührt. Der Befehl erhält BASE und SETTINGS (Pfad der isolierten
// Einstellungsdatei) als Umgebungsvariablen.
// Aufruf: node tools/qa/mit-server.js <port> <smtpPort> <name> <logOrdner> -- <befehl ...>
const { spawn } = require('child_process');
const path = require('path');
const { umgebung, ROOT } = require('./umgebung');
const args = process.argv.slice(2); const trenn = args.indexOf('--');
const [port, smtpPort, name, logDir] = args.slice(0, trenn); const befehl = args.slice(trenn + 1);
(async () => {
  const u = await umgebung({ port: Number(port), smtpPort: Number(smtpPort), name, logDir });
  const env = Object.assign({}, process.env, { BASE: u.B, SETTINGS: path.join(u.dataDir, 'settings.json') });
  const kind = spawn(befehl[0], befehl.slice(1).map(a => a.replace('{BASE}', u.B)), { cwd: ROOT, env, stdio: 'inherit' });
  const code = await new Promise(r => kind.on('exit', r));
  await u.ende(); process.exit(code);
})();
