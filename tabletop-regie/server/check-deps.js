// Prueft vor dem Start, ob die installierten Pakete zur package-lock.json
// passen. Exit 1 = fehlend/veraltet -> der Aufrufer fuehrt "npm install" aus.
// Wichtig, wenn eine neue Version ueber einen alten Ordner entpackt wurde:
// node_modules existiert dann, enthaelt aber alte oder fehlende Pakete.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
  for (const dep of Object.keys(pkg.dependencies || {})) {
    const wanted = (lock.packages && lock.packages['node_modules/' + dep] || {}).version;
    const installedFile = path.join(root, 'node_modules', dep, 'package.json');
    const installed = fs.existsSync(installedFile) ? JSON.parse(fs.readFileSync(installedFile, 'utf8')).version : null;
    if (!installed || (wanted && installed !== wanted)) {
      console.log(`Paket ${dep}: installiert ${installed || 'nichts'}, benötigt ${wanted || '?'} – installiere Abhängigkeiten …`);
      process.exit(1);
    }
  }
  process.exit(0);
} catch (e) {
  process.exit(1);
}
