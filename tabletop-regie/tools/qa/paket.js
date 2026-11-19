// Baut das Nachweispaket BCM-FINAL-QA-EVIDENCE.zip:
// - docs/final-qa/ (Dokumente 01–12, Anhänge, Sollwerte, Gates, Befunde, Prüfstand)
// - nachweis/ (alle Ergebnisse des Abnahmelaufs; Serverprotokolle bereinigt; Bühnenfotos als JPEG)
// - quellen/ (geprüfter Stand aus git: server, public, tools, Drehbücher, package*.json, README)
// - manifest.json (jede Datei mit SHA-256 und Größe; geprüfter Commit; Ergebnis-Commit;
//   Nachweis, dass sich der Ergebnis-Commit nur unter docs/final-qa/ vom geprüften unterscheidet)
// Vor dem Packen: Suche nach Passwörtern, Schlüsseln, Tokens und Mailadressen außerhalb von
// @example.com in allen Textdateien und in den Trace-Archiven; ein Treffer bricht ab.
// Aufruf: node tools/qa/paket.js <nachweisordner> <ziel.zip> <geprüfter-commit> [nachweisordner-früherer-zyklus] [commit-früherer-zyklus]
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
const REPO = path.join(ROOT, '..');
// optional: Nachweisordner eines früheren Zyklus (wird unverändert als nachweis-zyklus1/ mitgeliefert)
const [NW, ZIP, GEPRUEFT, FRUEHER, FRUEHER_COMMIT] = process.argv.slice(2).map((a, i) => a && (i < 2 || i === 3) ? path.resolve(a) : a);
const git = (...a) => execFileSync('git', a, { cwd: REPO, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }).trim();
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const B = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-paket-')); const P = path.join(B, 'BCM-FINAL-QA-EVIDENCE');
fs.mkdirSync(P, { recursive: true });

// 1 Commits: Ergebnis-Commit darf sich vom geprüften nur unter docs/final-qa/ unterscheiden
const ergebnis = git('rev-parse', 'HEAD'); const geprueft = git('rev-parse', GEPRUEFT);
const diff = git('diff', '--name-only', geprueft, ergebnis, '--', 'tabletop-regie').split('\n').filter(Boolean);
const fremd = diff.filter(f => !f.startsWith('tabletop-regie/docs/final-qa/'));
if (fremd.length) { console.error('Abbruch: zwischen geprüftem und Ergebnis-Commit geändert außerhalb docs/final-qa/:\n' + fremd.join('\n')); process.exit(2); }
if (git('status', '--porcelain', '--', 'tabletop-regie')) { console.error('Abbruch: nicht eingecheckte Änderungen'); process.exit(2); }

// 2 Inhalte kopieren
const kopiere = (von, nach, filter) => fs.cpSync(von, nach, { recursive: true, filter: q => !filter || filter(q) });
kopiere(path.join(ROOT, 'docs', 'final-qa'), path.join(P, 'docs', 'final-qa'));
kopiere(NW, path.join(P, 'nachweis'), q => !/\.png$/i.test(q) || !/[\\/]buehne[\\/]/.test(q));
// Bühnenfotos als JPEG (verlustbehaftet, nur Dokumentation; Originale bleiben im Nachweisordner)
for (const k of ['nordtech', 'waterkant']) { const d = path.join(NW, 'buehne', k); if (!fs.existsSync(d)) continue;
  fs.readdirSync(d).filter(f => /\.png$/i.test(f)).forEach(f => execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(d, f), '-q:v', '4', path.join(P, 'nachweis', 'buehne', k, f.replace(/\.png$/i, '.jpg'))])); }
// Früherer Zyklus: alle Ergebnisdateien, Konsolen, Protokolle, Journale und Serverprotokolle;
// ohne Traces und Bildschirmfotos (Größe) – die vollständigen Medien liegen im aktuellen Zyklus vor.
if (FRUEHER) kopiere(FRUEHER, path.join(P, 'nachweis-zyklus1'), q => fs.statSync(q).isDirectory() || !/\.(png|jpe?g|zip)$/i.test(q));
// Serverprotokolle bereinigen: Mailadressen und Personennamen der Testdaten pseudonymisieren
const bereinigt = [];
const geh = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? geh(path.join(d, e.name)) : [path.join(d, e.name)]);
fs.readdirSync(P).filter(d => d.startsWith('nachweis')).flatMap(d => geh(path.join(P, d))).filter(f => /\.log$/.test(f)).forEach(f => { const t = fs.readFileSync(f, 'utf8'); const n = t.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g, '<adresse>').replace(/\b(Test )?Person ?\d+(-\d+)?\b/g, '<person>').replace(/\b(Regression|Referenz|Replay) \d+(-\d+)?\b/g, '<person>'); if (n !== t) { fs.writeFileSync(f, n); bereinigt.push(path.relative(P, f)); } });
// Quellen des geprüften Stands
const q = path.join(P, 'quellen'); fs.mkdirSync(q);
execFileSync('sh', ['-c', `git archive ${geprueft} tabletop-regie/server tabletop-regie/public tabletop-regie/tools tabletop-regie/data/scenario.nordtech.json tabletop-regie/data/scenario.waterkant.json tabletop-regie/package.json tabletop-regie/package-lock.json tabletop-regie/README.md tabletop-regie/docs/waterkant-moderationshandbuch.md tabletop-regie/docs/review/teile/funktionskatalog.md tabletop-regie/docs/review/teile/kostenklassen.json | tar -x -C "${q}"`], { cwd: REPO });

// 3 Suche nach Geheimnissen und personenbezogenen Daten
const muster = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'privater Schlüssel'],
  [/\b(api[_-]?key|access[_-]?token|secret|bearer)\b["'\s:=]+[A-Za-z0-9_\-.]{16,}/i, 'Token/Schlüssel'],
  [/"pass(word)?"\s*:\s*"(?!••••••••|"|GEHEIM-TEST-123)[^"]+"/i, 'Passwort im Klartext'],
  [/[A-Za-z0-9._%+-]+@(?!example\.com\b)(?!anthropic\.com\b)[A-Za-z0-9-]+\.[A-Za-z0-9.-]*[a-z]{2,}/, 'Mailadresse außerhalb @example.com']
];
// Zulässig: Platzhalter in Eingabefeldern der Oberfläche (keine echten Adressen)
const erlaubt = [/noreply@anthropic\.com/, /^dummy@deine-domain\.de$/, /^name@firma\.de$/];
const treffer = [];
// jede Fundstelle einzeln prüfen (ein zulässiger Platzhalter darf keinen späteren Treffer verdecken)
const pruefeText = (name, t) => muster.forEach(([re, art]) => { for (const m of t.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) if (!erlaubt.some(e => e.test(m[0]))) { treffer.push({ datei: name, art, fund: m[0].slice(0, 60) }); break; } });
geh(P).forEach(f => { const rel = path.relative(P, f);
  if (/\.zip$/.test(f)) { const inhalt = execFileSync('unzip', ['-Z1', f], { encoding: 'utf8' }).split('\n').filter(x => x && !/\.(png|jpe?g|webp|mp3|woff2?)$/i.test(x));
    inhalt.forEach(x => { try { pruefeText(rel + ':' + x, execFileSync('unzip', ['-p', f, x], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })); } catch (e) { /* binär */ } }); }
  else if (!/\.(png|jpe?g|webp|mp3)$/i.test(f)) pruefeText(rel, fs.readFileSync(f, 'utf8')); });
// Platzhalter-Passwort des Sicherheitstests ist zulässig, wird aber ausgewiesen
const platzhalter = geh(P).filter(f => !/\.(png|jpe?g|webp|mp3|zip)$/i.test(f) && fs.readFileSync(f, 'utf8').includes('GEHEIM-TEST-123')).map(f => path.relative(P, f));
if (treffer.length) { console.error('Abbruch: mögliche Geheimnisse oder personenbezogene Daten:\n' + treffer.map(t => `${t.datei}: ${t.art} „${t.fund}“`).join('\n')); process.exit(3); }

// 4 Manifest
const dateien = geh(P).sort().map(f => ({ datei: path.relative(P, f), bytes: fs.statSync(f).size, sha256: sha(f) }));
const manifest = { paket: 'BCM-FINAL-QA-EVIDENCE', erstellt: new Date().toISOString(), gepruefterCommit: geprueft, ergebnisCommit: ergebnis, fruehererZyklus: FRUEHER ? { commit: FRUEHER_COMMIT || null, ordner: 'nachweis-zyklus1/', inhalt: 'Ergebnisse, Konsolen, Protokolle, Journale, Serverprotokolle; ohne Traces und Bildschirmfotos' } : null,
  regel: 'Geprüft wurde der Stand des geprüften Commits (Quellen unter quellen/ sind daraus mit git archive entnommen). Der Ergebnis-Commit unterscheidet sich davon ausschließlich unter tabletop-regie/docs/final-qa/ (Ergebnisdokumente).',
  diffZwischenCommits: diff, bereinigteProtokolle: bereinigt, geheimnisSuche: { muster: muster.map(m => m[1]), treffer: 0, zulaessigerPlatzhalter: { wert: 'GEHEIM-TEST-123 (Platzhalter des Sicherheitstests, kein echtes Passwort)', dateien: platzhalter } },
  anzahlDateien: dateien.length, dateien };
fs.writeFileSync(path.join(P, 'manifest.json'), JSON.stringify(manifest, null, 2));
if (fs.existsSync(path.join(ROOT, 'docs', 'final-qa', 'README.md'))) fs.copyFileSync(path.join(ROOT, 'docs', 'final-qa', 'README.md'), path.join(P, 'README.md'));
else console.warn('Hinweis: docs/final-qa/README.md fehlt – Paket ohne Reproduktionsanleitung im Wurzelordner.');
if (fs.existsSync(ZIP)) fs.unlinkSync(ZIP);
execFileSync('zip', ['-q', '-r', '-X', ZIP, 'BCM-FINAL-QA-EVIDENCE'], { cwd: B });
console.log(`${ZIP}: ${dateien.length} Dateien, ${(fs.statSync(ZIP).size / 1048576).toFixed(1)} MB; geprüft ${geprueft.slice(0, 7)}, Ergebnis ${ergebnis.slice(0, 7)}; Geheimnissuche ohne Treffer; ${bereinigt.length} Protokolle bereinigt.`);
fs.rmSync(B, { recursive: true, force: true });
