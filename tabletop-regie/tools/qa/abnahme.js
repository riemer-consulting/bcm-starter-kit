// Gesamtlauf der Abnahme an einem festen Commit.
// 1. Prüft, dass der Arbeitsstand eingecheckt ist (sonst Abbruch; Ausnahme nur mit
//    ERLAUBE_UNSAUBER=1 für Vorläufe – das Ergebnis trägt dann „unsauber“).
// 2. Hält Commit, Werkzeugversionen und Prüfsummen der Drehbücher und Quellen fest.
// 3. Führt alle Prüfungen nacheinander in isolierten Umgebungen aus (Projektdaten in data/
//    werden nicht verändert); jede Prüfung schreibt ihr Ergebnis und ihre Konsole in den
//    Nachweisordner.
// Aufruf: node tools/qa/abnahme.js <nachweisordner> [baseline-commit]
// Voraussetzungen: Playwright (NODE_PATH), Chromium (CHROMIUM_PATH), ffmpeg/ffprobe.
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn, execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
const REPO = path.join(ROOT, '..');
const [OUTARG, BASELINE = '79c9b89'] = process.argv.slice(2);
const OUT = path.resolve(OUTARG);
fs.mkdirSync(OUT, { recursive: true });
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' }).trim();
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const version = (cmd, args, re) => { try { const t = execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); return (t.match(re) || [t.split('\n')[0]])[0].trim(); } catch (e) { return 'nicht verfügbar'; } };

function dateienUnter(dir, filter) {
  const erg = []; const geh = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const p = path.join(d, e.name); if (e.isDirectory()) { if (!/node_modules|\.git/.test(e.name)) geh(p); } else if (!filter || filter(p)) erg.push(p); });
  geh(dir); return erg.sort();
}

(async () => {
  const unsauber = git('status', '--porcelain', '--', '.');
  if (unsauber && process.env.ERLAUBE_UNSAUBER !== '1') { console.error('Abbruch: nicht eingecheckte Änderungen in tabletop-regie:\n' + unsauber); process.exit(2); }
  const umgebung = {
    commit: git('rev-parse', 'HEAD'), commitKurz: git('rev-parse', '--short', 'HEAD'), commitZeit: git('log', '-1', '--format=%cI'),
    sauber: !unsauber, unsauberDateien: unsauber ? unsauber.split('\n') : [], baselineNordTech: BASELINE,
    start: new Date().toISOString(), node: process.version, betriebssystem: `${os.type()} ${os.release()} ${os.arch()}`,
    chromium: process.env.CHROMIUM_PATH ? version(process.env.CHROMIUM_PATH, ['--version'], /[\d.]+/) : 'Playwright-Standard',
    playwright: (() => { try { return require('playwright/package.json').version; } catch (e) { return 'nicht verfügbar'; } })(),
    ffmpeg: version('ffmpeg', ['-version'], /ffmpeg version \S+/),
    zufall: 'Keine Zufallswerte in den Tests: feste Ports, feste Testadressen (@example.com), feste Entscheidungsfolgen. Die Stichprobensimulation der Drehbuchprüfung (server/validate.js) verwendet einen linearen Kongruenzgenerator mit festem Startwert 42 und ist damit reproduzierbar; sie liefert keine Sollwerte.',
    konfiguration: 'Jede Prüfung startet einen eigenen Server mit TABLETOP_DATA_DIR (Kopie der Drehbücher in einem temporären Ordner) und einem lokalen SMTP-Testempfänger auf 127.0.0.1. Countdown vor Krisenbeginn: 30 s in den Browser-Durchläufen (echter Ablauf), 0 s in Integrations-, Negativ- und Referenztests (TABLETOP_COUNTDOWN_SEKUNDEN=0).',
    drehbuecher: fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^scenario\..*\.json$/.test(f)).map(f => ({ datei: f, sha256: sha(path.join(ROOT, 'data', f)) })),
    quellen: ['server', 'public', 'tools'].flatMap(d => dateienUnter(path.join(ROOT, d))).concat(['package.json', 'package-lock.json'].map(f => path.join(ROOT, f))).map(f => ({ datei: path.relative(ROOT, f), sha256: sha(f) }))
  };
  fs.writeFileSync(path.join(OUT, 'umgebung.json'), JSON.stringify(umgebung, null, 2));
  console.log(`Abnahme an Commit ${umgebung.commitKurz}${umgebung.sauber ? '' : ' (UNSAUBER – nur Vorlauf)'}`);

  const schritte = [];
  const lauf = (name, args, { timeout = 900000, ordner } = {}) => new Promise(res => {
    const t0 = Date.now(); const logDatei = path.join(OUT, 'konsole', name + '.txt'); fs.mkdirSync(path.dirname(logDatei), { recursive: true });
    if (ordner) fs.mkdirSync(ordner, { recursive: true });
    const log = fs.openSync(logDatei, 'w');
    const p = spawn(args[0], args.slice(1), { cwd: ROOT, env: process.env, stdio: ['ignore', log, log] });
    const timer = setTimeout(() => p.kill('SIGKILL'), timeout);
    p.on('exit', (code, sig) => { clearTimeout(timer); const s = { name, befehl: args.map(a => a.replace(OUT, '<nachweis>').replace(ROOT, '.')).join(' '), exitCode: code, signal: sig, sekunden: Math.round((Date.now() - t0) / 1000), konsole: path.relative(OUT, logDatei) }; schritte.push(s); console.log(`${code === 0 ? 'ok    ' : 'FEHLER'} ${name} (${s.sekunden} s)`); res(s); });
  });
  const N = process.execPath; const E = p => path.join(OUT, p);
  const SZ = [['nordtech', 'scenario.nordtech.json'], ['waterkant', 'scenario.waterkant.json']];

  await lauf('drehbuchpruefung', [N, 'server/validate.js']);
  for (const [k, f] of SZ) await lauf('varianten-' + k, [N, 'tools/varianten.js', 'data/' + f, E(`varianten/${k}.md`), E(`varianten/${k}.json`)], { ordner: E('varianten') });
  for (const [k, f] of SZ) await lauf('integration-' + k, [N, 'tools/qa/integration.js', f, E(`integration/${k}.json`)], { ordner: E('integration'), timeout: 1800000 });
  await lauf('delta-waterkant', [N, 'tools/qa/delta-waterkant.js', E('delta/waterkant.json'), OUT], { ordner: E('delta') });
  for (const [k, f] of SZ) await lauf('lauf-' + k, [N, 'tools/tests/lauf.js', f, E(`lauf/${k}.json`)], { ordner: E('lauf') });
  for (const [k, f] of SZ) await lauf('buehne-' + k, [N, 'tools/tests/buehne.js', f, E(`buehne/${k}`)], { ordner: E('buehne'), timeout: 1800000 });
  for (const [k, f] of SZ) await lauf('protokoll-' + k, [N, 'tools/tests/protokoll.js', f, E(`protokoll/${k}.json`)], { ordner: E('protokoll'), timeout: 1800000 });
  fs.mkdirSync(E('sicherheit'), { recursive: true });
  process.env.ERGEBNIS = E('sicherheit/sicherheit.json');
  await lauf('sicherheit', [N, 'tools/qa/mit-server.js', '4270', '2670', 'sicherheit', E('sicherheit'), '--', N, 'tools/tests/sicherheit.js', '{BASE}']);
  delete process.env.ERGEBNIS;
  await lauf('negativ', [N, 'tools/qa/negativ.js', E('negativ')], { ordner: E('negativ') });
  await lauf('sk36-manuell', [N, 'tools/qa/sk36-manuell.js', E('sk36')], { ordner: E('sk36') });
  await lauf('referenz', [N, 'tools/qa/referenz.js', E('referenz/referenz.json')], { ordner: E('referenz') });
  await lauf('medien', [N, 'tools/qa/medien.js', E('medien/medien.json')], { ordner: E('medien') });
  // NordTech-Ausgangsstand aus dem Repository (git archive, keine Änderung am Arbeitsstand)
  const basis = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-baseline-'));
  execFileSync('sh', ['-c', `git archive ${BASELINE} tabletop-regie | tar -x -C "${basis}"`], { cwd: REPO });
  await lauf('regression-nordtech', [N, 'tools/qa/regression.js', path.join(basis, 'tabletop-regie'), E('regression/nordtech.json'), '3'], { ordner: E('regression'), timeout: 3600000 });
  fs.rmSync(basis, { recursive: true, force: true });
  // Browser-Durchläufe über die Oberfläche: zwei Spuren
  const faelle = require('./e2e-faelle.json').faelle.map(f => f.id);
  const spur = async (port, ids) => { for (const id of ids) await lauf('e2e-' + id, [N, 'tools/qa/e2e-browser.js', id, E('e2e'), String(port), String(port - 1600)], { ordner: E('e2e'), timeout: 1500000 }); };
  await Promise.all([spur(4310, faelle.filter((_, i) => i % 2 === 0)), spur(4320, faelle.filter((_, i) => i % 2 === 1))]);
  // Replay je Szenario aus dem Journal eines Browser-Durchlaufs
  for (const id of ['NT-90-ausgewogen', 'WK-90-ausgewogen']) {
    const j = E(`e2e/${id}/journal.jsonl`);
    if (fs.existsSync(j)) await lauf('replay-' + id, [N, 'tools/qa/replay.js', j, E(`replay/${id}.json`), '4195', '2595'], { ordner: E('replay'), timeout: 1800000 });
  }
  const gesamt = { commit: umgebung.commit, sauber: umgebung.sauber, start: umgebung.start, ende: new Date().toISOString(), schritte, bestanden: schritte.filter(s => s.exitCode === 0).length, gesamt: schritte.length };
  fs.writeFileSync(path.join(OUT, 'gesamtlauf.json'), JSON.stringify(gesamt, null, 2));
  console.log(`\n${gesamt.bestanden}/${gesamt.gesamt} Prüfschritte ohne Fehler beendet (Exit-Code 0). Inhaltliche Bewertung: siehe Einzelergebnisse.`);
})();
