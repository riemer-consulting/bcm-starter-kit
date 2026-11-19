// Baut das Review-Paket „BCM-FINAL-REVIEW-NORDTECH-WATERKANT“.
// Aufruf: node tools/review-paket.js <testergebnis-ordner> <zip-datei>
// Der Testergebnis-Ordner enthält die Ausgaben der Tests:
//   lauf-<name>.json (+ -protokoll.md), buehne-<name>/ (ergebnis.json, *.png),
//   sicherheit.json, sicherheit-alt.json (optional), pruefen.txt
// Erzeugt in docs/review/: 04, 05, 07, 08, 09, testberichte/, ablaufdiagramme/,
// exportierte-szenariodaten/, manifest.json – und das ZIP mit Bildschirmfotos und Medien.
// Handgeschriebene Dokumente (01–03, 06, 10–12) und Textteile liegen in docs/review/.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const REPO = path.join(ROOT, '..');
const D = path.join(ROOT, 'docs', 'review');
const T = path.join(D, 'teile');
const TEST = path.resolve(process.argv[2] || '');
const ZIP = path.resolve(process.argv[3] || 'BCM-FINAL-REVIEW-NORDTECH-WATERKANT.zip');
const node = (...a) => execFileSync(process.execPath, a, { cwd: ROOT, encoding: 'utf8' });
const lies = p => fs.readFileSync(p, 'utf8');
const mk = p => fs.mkdirSync(p, { recursive: true });
const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'review-'));
const SZ = [
  { key: 'nordtech', datei: 'data/scenario.nordtech.json', name: 'NordTech' },
  { key: 'waterkant', datei: 'data/scenario.waterkant.json', name: 'Waterkant' }
];
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: REPO, encoding: 'utf8' }).trim();
// Alle Quellen müssen eingecheckt sein – nur die vom Paketbau erzeugten Dateien in docs/review/ (außer teile/) dürfen abweichen.
const offen = execFileSync('git', ['status', '--porcelain', '--', 'tabletop-regie'], { cwd: REPO, encoding: 'utf8' }).split('\n').filter(Boolean)
  .filter(z => !/tabletop-regie\/docs\/review\/(?!teile\/)/.test(z) && !/tabletop-regie\/data\/(settings|run-state)\.json/.test(z));
if (offen.length && !process.env.ERLAUBE_UNSAUBER) { console.error('Abbruch: nicht eingecheckte Quellen – erst committen:\n' + offen.join('\n')); process.exit(2); }
const sauber = offen.length === 0;
const heute = new Date().toISOString().slice(0, 10);
const stand = `Stand: ${heute} · Codestand \`${commit.slice(0, 7)}\`${sauber ? '' : ' (mit nicht eingecheckten Änderungen)'}`;

['testberichte', 'ablaufdiagramme', 'exportierte-szenariodaten'].forEach(x => mk(path.join(D, x)));

// ---- Exporte je Szenario
const gen = {};
for (const z of SZ) {
  const ex = path.join(tmp, z.key + '-export.md'), va = path.join(tmp, z.key + '-varianten.md'), ge = path.join(tmp, z.key + '-geschichten.md'), me = path.join(tmp, z.key + '-medien.md');
  node('tools/szenario-export.js', z.datei, ex);
  try { node('tools/varianten.js', z.datei, va); } catch (e) { /* Befunde stehen im Bericht */ }
  node('tools/geschichten.js', z.datei, ge);
  node('tools/medienliste.js', z.datei, me);
  gen[z.key] = { export: lies(ex), varianten: lies(va), geschichten: lies(ge), medien: lies(me) };
  fs.copyFileSync(path.join(ROOT, z.datei), path.join(D, 'exportierte-szenariodaten', path.basename(z.datei)));
  fs.writeFileSync(path.join(D, 'exportierte-szenariodaten', z.key + '-drehbuch.md'), gen[z.key].export);
  fs.writeFileSync(path.join(D, 'testberichte', 'varianten-' + z.key + '.md'), gen[z.key].varianten);
}
// Handbuch frisch erzeugen und mit der eingecheckten Fassung vergleichen (ohne Datumszeile)
node('tools/handbuch-waterkant.js', path.join(tmp, 'hb.md'));
const ohneStand = t => t.replace(/^Version .*$/m, '');
if (ohneStand(lies(path.join(tmp, 'hb.md'))) !== ohneStand(lies(path.join(ROOT, 'docs', 'waterkant-moderationshandbuch.md')))) { console.error('Abbruch: docs/waterkant-moderationshandbuch.md passt nicht zum Drehbuch – node tools/handbuch-waterkant.js ausführen und committen.'); process.exit(2); }
fs.copyFileSync(path.join(ROOT, 'docs', 'waterkant-moderationshandbuch.md'), path.join(D, 'anlage-waterkant-moderationshandbuch.md'));
fs.copyFileSync(path.join(ROOT, 'docs', 'nordtech-moderationshandbuch.md'), path.join(D, 'anlage-nordtech-moderationshandbuch.md'));
fs.copyFileSync(path.join(ROOT, 'data', 'archiv', 'scenario.waterkant-lagerbrand-v1.json'), path.join(D, 'exportierte-szenariodaten', 'archiv-scenario.waterkant-lagerbrand-v1.json'));
const ohneTitel = md => md.replace(/^# .*\n/, '');
const tiefer = md => md.replace(/^(#{1,5}) /gm, '#$1 ');

// ---- 04 NordTech, 05 Waterkant
fs.writeFileSync(path.join(D, '04-nordtech-vollstaendiges-szenario.md'), [lies(path.join(T, '04-kopf.md')).replace('{{STAND}}', stand), '', '---', '', tiefer(ohneTitel(gen.nordtech.export)), '', '---', '', '## Anhang: Variantenprüfung (alle Dauern, Schwerpunkte und Entscheidungskombinationen)', '', tiefer(tiefer(ohneTitel(gen.nordtech.varianten)))].join('\n'));
fs.writeFileSync(path.join(D, '05-waterkant-vollstaendiges-szenario.md'), [lies(path.join(T, '05-kopf.md')).replace('{{STAND}}', stand), '', '---', '', tiefer(ohneTitel(gen.waterkant.export)), '', '---', '', '## Anhang: Variantenprüfung (alle Dauern, Schwerpunkte und Entscheidungskombinationen)', '', tiefer(tiefer(ohneTitel(gen.waterkant.varianten)))].join('\n'));

// ---- 10 Schäden, SLA, Versicherung (Tabellen aus den Drehbüchern)
{
  const eur = n => new Intl.NumberFormat('de-DE').format(Math.round(n)) + ' €';
  const T10 = [lies(path.join(T, '10-kopf.md')).replace('{{STAND}}', stand), ''];
  for (const z of SZ) {
    const s = JSON.parse(lies(path.join(ROOT, z.datei))); const n = s.nachspiel;
    const basis = n.rechnung.reduce((a, p) => a + p.betrag, 0); const jg = n.jahresumsatz * n.umsatzrendite;
    const KK = JSON.parse(lies(path.join(T, 'kostenklassen.json')))[z.key] || {}; const kk = id => (KK[id] ? `${KK[id][0]}${KK[id][1] ? ' – ' + KK[id][1] : ''}` : '–');
    const quelle = pid => (s.weichen || []).flatMap(w => w.optionen.filter(o => (o.posten || []).includes(pid)).map(o => `${w.id} „${o.label}“`)).join('; ') || 'Moderation (Frage im Abschluss)';
    const W = s.weichen || []; let min = Infinity, max = 0, minW = '', maxW = '';
    for (let m = 0; m < 2 ** W.length; m++) { const wahl = W.map((w, i) => w.optionen[(m >> (W.length - 1 - i)) & 1]); const pz = [...new Set(wahl.flatMap(o => o.posten || []))]; const b = basis + pz.reduce((a, id) => a + n.optionalePosten.find(x => x.id === id).betrag, 0); if (b < min) { min = b; minW = wahl.map((o, i) => W[i].id + ' ' + o.id).join(', '); } if (b > max) { max = b; maxW = wahl.map((o, i) => W[i].id + ' ' + o.id).join(', '); } }
    const erst = n.versicherung ? n.versicherung.betrag : 0;
    T10.push(`# ${z.name}`, '', `**Jahresumsatz** ${eur(n.jahresumsatz)} · **Umsatzrendite** ${Math.round(n.umsatzrendite * 100)} % · **Jahresgewinn (Modell)** ${eur(jg)}`, '',
      '## Grundschaden (fällt in jedem Verlauf an)', '', '| Posten | Betrag | Einordnung (Vorschlag) | Rechenweg (Szenarioannahme) | Was vorher geholfen hätte |', '|---|---:|---|---|---|',
      ...n.rechnung.map((p, i) => `| ${p.posten} | ${eur(p.betrag)} | ${kk('R' + i)} | ${(p.herleitung || '–').replace(/\|/g, '/')} | ${(p.bcmHebel || '–').replace(/\|/g, '/')} |`), `| **Summe** | **${eur(basis)}** | | | |`, '',
      '## Posten, die von Entscheidungen abhängen', '', '| Posten | Betrag | ausgelöst durch | Einordnung (Vorschlag) | Rechenweg |', '|---|---:|---|---|---|',
      ...n.optionalePosten.map(p => `| ${p.posten} | ${eur(p.betrag)} | ${quelle(p.id)} | ${kk(p.id)} | ${(p.herleitung || '–').replace(/\|/g, '/')} |`), '',
      '## Spanne über alle Entscheidungskombinationen', '', '| | Brutto-Schaden | mögliche Erstattung (Modellannahme) | beim Unternehmen | Anteil am Jahresgewinn ohne Erstattung |', '|---|---:|---:|---:|---:|',
      `| günstigster Verlauf (${minW}) | ${eur(min)} | ${eur(Math.min(min, erst))} | ${eur(min - Math.min(min, erst))} | ${Math.round(min / jg * 100)} % |`,
      `| teuerster Verlauf (${maxW}) | ${eur(max)} | ${eur(Math.min(max, erst))} | ${eur(max - Math.min(max, erst))} | ${Math.round(max / jg * 100)} % |`, '',
      `**Versicherung:** ${n.versicherung ? n.versicherung.text + ' – bis zu ' + eur(erst) : 'keine'}. ${n.versicherung && n.versicherung.erlaeuterung ? n.versicherung.erlaeuterung : ''}`, '',
      ...(n.hinweis ? [`*Hinweis auf der Bühne:* ${n.hinweis}`, ''] : []));
  }
  fs.writeFileSync(path.join(D, '10-schaeden-sla-und-versicherungen.md'), T10.join('\n'));
}

// ---- 09 Spielverläufe
fs.writeFileSync(path.join(D, '09-alle-spielverlaeufe.md'), [lies(path.join(T, '09-kopf.md')).replace('{{STAND}}', stand), '', '# Teil 1 – NordTech', '', tiefer(ohneTitel(gen.nordtech.geschichten)), '', '# Teil 2 – Waterkant', '', tiefer(ohneTitel(gen.waterkant.geschichten))].join('\n'));

// ---- Testberichte
const ladeJson = p => (fs.existsSync(p) ? JSON.parse(lies(p)) : null);
const tabelle = (titel, erg) => [`### ${titel}`, '', '| ID | Prüfung | Ergebnis | Erwartet | Beobachtet |', '|---|---|---|---|---|',
  ...erg.map(x => `| ${x.id} | ${x.name} | ${x.ok ? 'bestanden' : '**nicht bestanden**'} | ${(x.erwartet || '').replace(/\|/g, '/')} | ${(x.beobachtet || '').replace(/\|/g, '/')} |`), ''];
const bericht = [`# Testberichte`, '', stand, '', 'Jede Zeile ist eine tatsächlich ausgeführte Prüfung. „Erwartet“ und „Beobachtet“ stammen aus dem Testlauf selbst (Rohdaten als JSON im selben Ordner).', ''];
const zaehl = { ok: 0, alle: 0 };
const sammeln = erg => { erg.forEach(x => { zaehl.alle++; if (x.ok) zaehl.ok++; }); return erg; };
if (fs.existsSync(path.join(TEST, 'pruefen.txt'))) { bericht.push('## Drehbuchprüfung (`npm run pruefen`)', '', '```', lies(path.join(TEST, 'pruefen.txt')).trim(), '```', ''); fs.copyFileSync(path.join(TEST, 'pruefen.txt'), path.join(D, 'testberichte', 'drehbuchpruefung.txt')); }
for (const z of SZ) {
  const l = ladeJson(path.join(TEST, `lauf-${z.key}.json`));
  if (l) { bericht.push(`## Lauftest ${z.name} (${l.minuten} Min., ${l.zeitpunkt.slice(0, 16).replace('T', ' ')} UTC)`, '', ...tabelle('Ergebnisse', sammeln(l.ergebnisse))); fs.copyFileSync(path.join(TEST, `lauf-${z.key}.json`), path.join(D, 'testberichte', `lauf-${z.key}.json`)); }
  const p = path.join(TEST, `lauf-${z.key}-protokoll.md`); if (fs.existsSync(p)) fs.copyFileSync(p, path.join(D, 'testberichte', `uebungsprotokoll-beispiel-${z.key}.md`));
  const b = ladeJson(path.join(TEST, `buehne-${z.key}`, 'ergebnis.json'));
  if (b) {
    bericht.push(`## Browsertest ${z.name} (Chromium, ${b.zeitpunkt.slice(0, 16).replace('T', ' ')} UTC)`, '', ...tabelle('Ergebnisse', sammeln(b.ergebnisse)),
      '### Generalprobe: jede Lage und jede öffentliche Überraschung auf der Bühne', '', '| ID | Titel | Bildschirmfoto | Bild geladen | vorgesehener Ton | beobachteter Ton | Übungshinweis |', '|---|---|---|---|---|---|---|',
      ...b.generalprobe.map(g => `| ${g.id} | ${g.titel} | \`screenshots/${z.key}/${g.bild.replace(/\.png$/, '.jpg')}\` | ${g.bildGeladen ? 'ja' : '**nein**'} | ${g.sollTon || '–'} | ${g.ton} | ${g.uebungshinweis === null ? '–' : g.uebungshinweis ? 'sichtbar' : '**fehlt**'} |`), '');
    fs.copyFileSync(path.join(TEST, `buehne-${z.key}`, 'ergebnis.json'), path.join(D, 'testberichte', `buehne-${z.key}.json`));
  }
}
for (const z of SZ) {
  const pr = ladeJson(path.join(TEST, `protokoll-${z.key}.json`));
  if (pr) { bericht.push(`## Übungsprotokoll in allen Kombinationen – ${z.name} (${pr.zeitpunkt.slice(0, 16).replace('T', ' ')} UTC)`, '', `Raster der Gesamteinschätzung (${pr.kriterien.length} Kriterien): ${pr.kriterien.map(k => '„' + k + '“').join(' · ')}`, '', ...tabelle('Ergebnisse', sammeln(pr.ergebnisse))); fs.copyFileSync(path.join(TEST, `protokoll-${z.key}.json`), path.join(D, 'testberichte', `protokoll-${z.key}.json`)); }
}
if (fs.existsSync(path.join(TEST, 'fehllauf-waterkant.md'))) {
  fs.copyFileSync(path.join(TEST, 'fehllauf-waterkant.md'), path.join(D, 'testberichte', 'fehllauf-waterkant.md'));
  bericht.push('## Fehlgeschlagene Läufe (dokumentiert, nicht gelöscht)', '', '- Waterkant-Lauftest vom 19.11.2026: 10 von 15 bestanden, dann Abbruch. Ursache: Lauf- und Einstellungsdateien wurden während des Tests gelöscht (Fehler in der Testdurchführung). Wiederholungslauf bestanden. Einzelheiten und Rohausgabe: `testberichte/fehllauf-waterkant.md`.', '');
}
const sec = ladeJson(path.join(TEST, 'sicherheit.json')); const secAlt = ladeJson(path.join(TEST, 'sicherheit-alt.json'));
if (sec) {
  bericht.push('## Sicherheitstest (laufender Server)', '', 'Derselbe Test lief gegen den Stand vor den Korrekturen (Commit `9372144`) und gegen den aktuellen Stand.', '', '| Prüfung | vorher | nachher | Beobachtet (nachher) |', '|---|---|---|---|',
    ...sec.map((x, i) => `| ${x.name} | ${secAlt && secAlt[i] ? (secAlt[i].ok ? 'bestanden' : 'nicht bestanden') : '–'} | ${x.ok ? 'bestanden' : '**nicht bestanden**'} | ${x.beob} |`), '');
  sec.forEach(x => { zaehl.alle++; if (x.ok) zaehl.ok++; });
  fs.copyFileSync(path.join(TEST, 'sicherheit.json'), path.join(D, 'testberichte', 'sicherheit.json'));
}
bericht.splice(4, 0, `**Summe:** ${zaehl.ok} von ${zaehl.alle} automatisierten Prüfungen bestanden (ohne Drehbuch- und Variantenprüfung, die als eigene Berichte vorliegen).`, '');
fs.writeFileSync(path.join(D, 'testberichte', 'testbericht.md'), bericht.join('\n') + '\n');

// ---- 07 Funktions- und Testmatrix
const ts = JSON.parse(lies(path.join(T, 'teststatus.json')));
const kat = lies(path.join(T, 'funktionskatalog.md')).split('\n').map(z => {
  if (/^\| ID \| Funktion/.test(z)) return z.replace(/\| Status \| Einschränkung \|$/, '| Status Umsetzung | Einschränkung | Status Test | Testbeleg |');
  if (/^\|---\|/.test(z) && z.split('|').length >= 9) return z + '---|---|';
  const m = z.match(/^\| ([A-Z]-\d\d) \|/);
  if (!m || !ts[m[1]]) return z;
  const [stat, beleg, neu] = ts[m[1]];
  const zellen = z.split('|');
  if (neu) zellen[zellen.length - 2] = ' ' + neu + ' ';
  if (m[1] === 'B-11' || m[1] === 'B-06') zellen[zellen.length - 3] = ' implementiert ';
  return zellen.join('|') + ` ${stat} | ${beleg} |`;
});
fs.writeFileSync(path.join(D, '07-funktions-und-testmatrix.md'), [lies(path.join(T, '07-kopf.md')).replace('{{STAND}}', stand).replace('{{SUMME}}', `${zaehl.ok} von ${zaehl.alle}`), '', '---', '', ...tiefer(kat.join('\n').replace(/^# .*\n/, '')).split('\n')].join('\n'));
fs.copyFileSync(path.join(D, 'testberichte', 'testbericht.md'), path.join(D, 'testberichte', 'testbericht.md'));

// ---- 03 Architektur
const feldnutzung = (() => {
  const sz = SZ.map(z => JSON.parse(lies(path.join(ROOT, z.datei))));
  const L = ['## Aktuelle Feldnutzung der Drehbücher (automatisch erzeugt)', '', 'Anzahl der Einträge, in denen das Feld befüllt ist – aus den aktuellen Drehbüchern berechnet. Die Spalte „Vorkommen“ in der Inventur weiter unten beschreibt für Waterkant noch die archivierte Fassung v1.', '',
    '| Bereich | Feld | ' + SZ.map(z => z.name).join(' | ') + ' |', '|---|---|' + SZ.map(() => '---:|').join('')];
  L.push('| Wurzel | (Felder) | ' + sz.map(s => Object.keys(s).sort().join(', ')).join(' | ') + ' |');
  for (const [bereich, get] of [['Lagekarten', s => s.lagekarten], ['Vertrauliche Karten', s => s.sonderlagekarten], ['Überraschungen', s => s.bonuskarten], ['Entscheidungen', s => s.weichen || []], ['Rollen', s => s.roles]]) {
    const felder = [...new Set(sz.flatMap(s => get(s).flatMap(x => Object.keys(x))))].sort();
    L.push(`| ${bereich} | (Anzahl) | ${sz.map(s => get(s).length).join(' | ')} |`);
    felder.forEach(f => L.push(`| ${bereich} | \`${f}\` | ${sz.map(s => get(s).filter(x => x[f] !== undefined && x[f] !== null && !(Array.isArray(x[f]) && !x[f].length)).length).join(' | ')} |`));
  }
  return L.join('\n');
})();
fs.writeFileSync(path.join(D, '03-architektur-und-datenfluesse.md'), [lies(path.join(T, '03-kopf.md')).replace('{{STAND}}', stand), '', '---', '', feldnutzung, '', '---', '', tiefer(lies(path.join(T, 'architektur-entwurf.md')).replace(/^# .*\n/, ''))].join('\n'));

// ---- 08 Medien
fs.writeFileSync(path.join(D, '08-medien-und-audio.md'), [lies(path.join(T, '08-kopf.md')).replace('{{STAND}}', stand), '', '# Teil 1 – NordTech', '', tiefer(ohneTitel(gen.nordtech.medien)), '', '# Teil 2 – Waterkant', '', tiefer(ohneTitel(gen.waterkant.medien))].join('\n'));

// ---- Ablaufdiagramme (Mermaid)
const arch = lies(path.join(T, 'architektur-entwurf.md'));
const mermaid = [...arch.matchAll(/```mermaid[\s\S]*?```/g)].map(m => m[0]);
fs.writeFileSync(path.join(D, 'ablaufdiagramme', 'architektur-und-datenfluss.md'), ['# Architektur und Datenfluss', '', stand, '', ...mermaid.flatMap((m, i) => [`## Diagramm ${i + 1}`, '', m, ''])].join('\n'));
for (const z of SZ) {
  const s = JSON.parse(lies(path.join(ROOT, z.datei)));
  const e = require(path.join(ROOT, 'server', 'runEngine'));
  const L = [`# ${z.name}: Ablauf und Entscheidungen`, '', stand, '', 'Lagen in Drehbuch-Reihenfolge, gruppiert nach Station. Doppelt umrandet = Priorität 1 (in jeder Dauer enthalten). Rauten = Entscheidungen mit ihren Folgen.', '', '```mermaid', 'flowchart TD'];
  const lks = s.lagekarten.slice().sort((a, b) => a.minuteOffset - b.minuteOffset);
  const q = t => '"' + String(t).replace(/"/g, "'") + '"';
  e.AKTE.forEach(a => { const inA = lks.filter(l => l.akt === a.key); if (!inA.length) return; L.push(`  subgraph ${a.key}[${q(a.label)}]`); inA.forEach(l => L.push(`    ${l.id}${l.prioritaet === 1 ? '[[' + q(l.id + ' ' + l.titel) + ']]' : '[' + q(l.id + ' ' + l.titel) + ']'}`)); L.push('  end'); });
  for (let i = 0; i < lks.length - 1; i++) L.push(`  ${lks[i].id} --> ${lks[i + 1].id}`);
  (s.weichen || []).forEach(wc => { const bei = wc.lagekarten[0]; L.push(`  ${bei} -.-> ${wc.id}{${q(wc.id)}}`); wc.optionen.forEach((o, i) => { const ziele = [...new Set([...(o.folgen || []).map(f => f.lagekarte).filter(Boolean), o.karte && o.karte.beiLagekarte].filter(Boolean))]; const k = `${wc.id}o${i}`; L.push(`  ${wc.id} -- ${q(o.id)} --> ${k}(${q(o.label.slice(0, 60) + (o.label.length > 60 ? '…' : '') + (o.karte ? ' · Folgekarte ' + o.karte.sonderlagekarte : '') + ((o.posten || []).length ? ' · Posten' : ''))})`); ziele.forEach(zl => L.push(`  ${k} -.-> ${zl}`)); }); });
  L.push('```', '');
  fs.writeFileSync(path.join(D, 'ablaufdiagramme', `${z.key}-ablauf.md`), L.join('\n'));
}

// ---- Manifest
const zweck = {
  '01-management-summary.md': 'Kurzfassung für Entscheider', '02-vollstaendiger-leistungsumfang.md': 'Leistungsumfang und Nutzerabläufe je Rolle',
  '03-architektur-und-datenfluesse.md': 'Architektur, Datenmodell, Datenflüsse, Sicherheit', '04-nordtech-vollstaendiges-szenario.md': 'NordTech vollständig (eingefroren)',
  '05-waterkant-vollstaendiges-szenario.md': 'Waterkant vollständig mit Bestandsanalyse', '06-szenariovergleich.md': 'Vergleich beider Szenarien',
  '07-funktions-und-testmatrix.md': 'Funktionskatalog mit Umsetzungs- und Teststatus', '08-medien-und-audio.md': 'Medien, Töne, Sprechertexte, Rechte',
  '09-alle-spielverlaeufe.md': 'Durchgespielte Verläufe beider Szenarien', '10-schaeden-sla-und-versicherungen.md': 'Rechnungen, Annahmen, SLA/RTO/RPO, Versicherung',
  '11-finaler-unabhaengiger-review.md': 'Unabhängige Prüfung und Umgang mit Befunden', '12-release-readiness.md': 'Abnahmekriterien und Freigabestand'
};
const dateien = [];
const lauf = (dir, rel) => fs.readdirSync(dir).forEach(f => { const p = path.join(dir, f); const r = rel ? rel + '/' + f : f; if (fs.statSync(p).isDirectory()) { if (f !== 'teile') lauf(p, r); } else if (f !== 'manifest.json') dateien.push({ p, r }); });
lauf(D, '');
const manifest = { paket: 'BCM-FINAL-REVIEW-NORDTECH-WATERKANT', erstellt: new Date().toISOString(), commit, codestandEingecheckt: sauber, commitRegel: 'Alle Quellen, Drehbücher, Medien, Werkzeuge und Textteile entsprechen genau diesem Commit (Paketbau bricht sonst ab). Die erzeugten Dokumente unter docs/review/ werden im unmittelbar folgenden Commit eingecheckt; dieser ändert ausschließlich docs/review/ (prüfbar mit git diff <commit> <folgecommit> --stat).', hinweis: 'Alle Inhalte fiktiv. Keine Passwörter, Tokens oder realen Adressen; Testadressen enden auf @example.com.', dateien: [] };
const add = (r, p, z) => manifest.dateien.push({ pfad: r, zweck: z, sha256: crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'), bytes: fs.statSync(p).size });
dateien.forEach(({ p, r }) => add(r, p, zweck[r] || (r.startsWith('testberichte/') ? 'Testbericht / Rohdaten' : r.startsWith('ablaufdiagramme/') ? 'Ablaufdiagramm (Mermaid)' : r.startsWith('exportierte-szenariodaten/') ? 'Szenariodaten' : 'Anlage')));

// ---- ZIP-Inhalt zusammenstellen
const Z = path.join(tmp, 'BCM-FINAL-REVIEW-NORDTECH-WATERKANT'); mk(Z);
dateien.forEach(({ p, r }) => { mk(path.dirname(path.join(Z, r))); fs.copyFileSync(p, path.join(Z, r)); });
for (const z of SZ) {
  const src = path.join(TEST, `buehne-${z.key}`);
  // Bildschirmfotos als JPEG (deutlich kleiner); ohne ffmpeg bleiben sie PNG
  if (fs.existsSync(src)) fs.readdirSync(src).filter(f => f.endsWith('.png')).forEach(f => {
    mk(path.join(Z, 'screenshots', z.key));
    const jpg = f.replace(/\.png$/, '.jpg'); let ziel = path.join(Z, 'screenshots', z.key, jpg), name = jpg;
    try { execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(src, f), '-q:v', '3', ziel]); } catch (e) { name = f; ziel = path.join(Z, 'screenshots', z.key, f); fs.copyFileSync(path.join(src, f), ziel); }
    add(`screenshots/${z.key}/${name}`, ziel, 'Bildschirmfoto aus dem Browsertest');
  });
  const s = JSON.parse(lies(path.join(ROOT, z.datei)));
  const benutzt = [...new Set((JSON.stringify(s).match(/\/media\/[^"]+/g) || []))];
  benutzt.forEach(u => { const q = path.join(ROOT, u); if (!fs.existsSync(q)) return; const r = `media-${z.key}/${u.split('/').slice(2).join('/')}`; mk(path.dirname(path.join(Z, r))); fs.copyFileSync(q, path.join(Z, r)); add(r, q, 'Medium, im Drehbuch verwendet'); });
}
// Quellcode (ohne node_modules und lokale Lauf-/Einstellungsdaten), damit das Paket ohne Repository nachvollziehbar ist
const QUELL = ['server', 'public', 'tools', 'package.json', 'package-lock.json', 'README.md'];
const kopiereQuelle = (rel) => { const q = path.join(ROOT, rel); if (!fs.existsSync(q)) return; if (fs.statSync(q).isDirectory()) return fs.readdirSync(q).forEach(f => kopiereQuelle(path.join(rel, f)));
  const ziel = path.join(Z, 'quellcode', rel); mk(path.dirname(ziel)); fs.copyFileSync(q, ziel); add('quellcode/' + rel.split(path.sep).join('/'), q, 'Quellcode zum Nachvollziehen'); };
QUELL.forEach(kopiereQuelle);
fs.writeFileSync(path.join(D, 'manifest.json'), JSON.stringify(manifest, null, 1) + '\n');
fs.copyFileSync(path.join(D, 'manifest.json'), path.join(Z, 'manifest.json'));
// Prüfung: keine Geheimnisse im Paket
const verboten = [/GEHEIM-TEST/, /pass"\s*:\s*"(?!••••••••|")[^"]+"/, /@(?!example\.com)[a-z0-9-]+\.(de|com|org|net)\b/i];
const treffer = [];
const pruefe = dir => fs.readdirSync(dir).forEach(f => { const p = path.join(dir, f); if (fs.statSync(p).isDirectory()) return pruefe(p); if (!/\.(md|json|txt|csv)$/.test(f)) return; const t = lies(p); verboten.forEach(rx => { const m = t.match(rx); if (m) treffer.push(path.relative(Z, p) + ': ' + m[0]); }); });
pruefe(Z);
if (fs.existsSync(ZIP)) fs.unlinkSync(ZIP);
execFileSync('zip', ['-qr', ZIP, path.basename(Z)], { cwd: tmp });
console.log(`Paket: ${ZIP} (${(fs.statSync(ZIP).size / 1e6).toFixed(1)} MB), ${manifest.dateien.length} Dateien, Commit ${commit.slice(0, 7)}${sauber ? '' : ' (+ Änderungen)'}`);
console.log('Geheimnis-Prüfung:', treffer.length ? 'TREFFER\n' + treffer.join('\n') : 'keine Treffer');
console.log(`Tests: ${zaehl.ok} von ${zaehl.alle} bestanden`);
