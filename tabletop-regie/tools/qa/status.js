// Fasst die Nachweise eines Abnahmelaufs zusammen:
// - zaehlung.json im Nachweisordner: jede Einzelprüfung mit Kennung, Szenario, Ergebnis
// - docs/final-qa/qa-status.json für die Prüfstand-Seite (public/qa.html)
// Gates und offene Befunde werden NICHT berechnet, sondern aus den von Hand gepflegten
// Dateien docs/final-qa/gates.json und docs/final-qa/befunde.json übernommen – ein grünes
// Testergebnis setzt kein Gate auf „bestanden“.
// Aufruf: node tools/qa/status.js <nachweisordner>
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const N = path.resolve(process.argv[2]);
const lies = p => { try { return JSON.parse(fs.readFileSync(path.join(N, p), 'utf8')); } catch (e) { return null; } };
const um = lies('umgebung.json') || {}; const gl = lies('gesamtlauf.json') || {};
const pruef = []; // { quelle, id, szenario, ok }
const add = (quelle, szenario, liste, okFn, idFn) => (liste || []).forEach((x, i) => pruef.push({ quelle, szenario, id: idFn ? idFn(x, i) : (x.id || x.name || String(i + 1)), ok: !!okFn(x) }));
for (const k of ['nordtech', 'waterkant']) {
  add('integration', k, (lies(`integration/${k}.json`) || {}).ergebnisse, x => x.ok);
  add('lauf', k, (lies(`lauf/${k}.json`) || {}).ergebnisse, x => x.ok);
  add('buehne', k, (lies(`buehne/${k}/ergebnis.json`) || {}).ergebnisse, x => x.ok, (x, i) => `${x.id || ''}-${i + 1}`);
  add('protokoll', k, (lies(`protokoll/${k}.json`) || {}).ergebnisse, x => x.ok, (x, i) => `${x.id}-${i + 1}`);
  const v = lies(`varianten/${k}.json`); if (v) pruef.push({ quelle: 'varianten', szenario: k, id: 'Variantenregeln', ok: !v.befunde.length });
  const m = (lies('medien/medien.json') || { szenarien: [] }).szenarien.find(s => s.datei.includes(k));
  if (m) add('medien', k, m.dateien, x => x.ok, x => `${x.karte}:${path.basename(x.datei)}`);
}
const e2eDir = path.join(N, 'e2e');
if (fs.existsSync(e2eDir)) fs.readdirSync(e2eDir).forEach(id => { const r = lies(`e2e/${id}/ergebnis.json`); const k = id.startsWith('NT') ? 'nordtech' : 'waterkant';
  if (r) add('e2e ' + id, k, r.pruefungen, x => x.ok, (x, i) => `${id}:${x.id}-${i + 1}`); else pruef.push({ quelle: 'e2e ' + id, szenario: k, id: id + ':Ergebnis', ok: false }); });
const dl = lies('delta/waterkant.json'); if (dl) add('delta', 'waterkant', dl.befunde, x => x.ergebnis === 'Regeln erfüllt');
const reg = lies('regression/nordtech.json'); if (reg) add('regression', 'nordtech', reg.vergleiche, x => x.identisch);
fs.readdirSync(N).length && ['NT-90-ausgewogen', 'WK-90-ausgewogen'].forEach(id => { const r = lies(`replay/${id}.json`); if (r) pruef.push({ quelle: 'replay', szenario: id.startsWith('NT') ? 'nordtech' : 'waterkant', id: 'Replay ' + id, ok: !!r.identisch }); });
const sk36 = lies('sk36/sk36.json'); if (sk36) add('sk36-manuell', 'waterkant', sk36.pruefungen, x => x.ok);
const neg = lies('negativ/negativ.json'); if (neg) add('negativ', 'plattform', neg.faelle, x => x.ergebnis === 'bestanden');
const ref = lies('referenz/referenz.json'); if (ref) add('referenz', 'plattform', ref.faelle, x => x.ok);
const sich = lies('sicherheit/sicherheit.json'); if (sich) add('sicherheit', 'plattform', sich, x => x.ok, (x, i) => `S${i + 1}`);
const zaehl = { commit: um.commit, sauber: um.sauber, pruefungen: pruef, summe: { gesamt: pruef.length, bestanden: pruef.filter(x => x.ok).length } };
fs.writeFileSync(path.join(N, 'zaehlung.json'), JSON.stringify(zaehl, null, 2));
const gates = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'final-qa', 'gates.json'), 'utf8')); } catch (e) { return []; } })();
const befunde = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'final-qa', 'befunde.json'), 'utf8')); } catch (e) { return []; } })();
const offen = sz => befunde.filter(b => b.status !== 'geschlossen' && (b.szenario === sz || b.szenario === 'beide')).length;
const sha = name => ((um.drehbuecher || []).find(d => d.datei.includes(name)) || {}).sha256;
const zeile = (name, sz) => { const p = pruef.filter(x => x.szenario === sz); return { name, sha256: sha(sz) || '', bestanden: p.filter(x => x.ok).length, fehlgeschlagen: p.filter(x => !x.ok).length, nichtAusgefuehrt: 0, offeneBefunde: offen(sz) }; };
const status = {
  commit: um.commit, zeitpunkt: gl.ende || um.start, sauber: um.sauber,
  version: { node: um.node, chromium: um.chromium, playwright: um.playwright, ffmpeg: um.ffmpeg },
  schritte: (gl.schritte || []).map(s => ({ name: s.name, ergebnis: s.exitCode === 0 ? 'ohne Fehler' : 'mit Fehlern', sekunden: s.sekunden })),
  szenarien: [zeile('NordTech – Ransomware', 'nordtech'), zeile('Waterkant – Brand im Rechenzentrum', 'waterkant'), Object.assign(zeile('Plattform (Negativ-, Sicherheits-, Referenztests)', 'plattform'), { sha256: '' })],
  gates
};
fs.writeFileSync(path.join(ROOT, 'docs', 'final-qa', 'qa-status.json'), JSON.stringify(status, null, 2));
console.log(`Einzelprüfungen: ${zaehl.summe.bestanden}/${zaehl.summe.gesamt} bestanden; qa-status.json geschrieben.`);
status.szenarien.forEach(z => console.log(`  ${z.name}: ${z.bestanden} bestanden, ${z.fehlgeschlagen} fehlgeschlagen, ${z.offeneBefunde} offene Befunde`));
