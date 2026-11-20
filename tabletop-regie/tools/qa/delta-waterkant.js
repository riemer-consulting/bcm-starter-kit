// Delta-Abnahme Waterkant: prüft je Befund der Fremdprüfung (F01–F05, F07, F12, F13, F15) und O-11,
// ob die beschlossene Korrektur im Drehbuch bzw. in den Begleitdateien steht und die
// ursprünglich beanstandete Formulierung nicht mehr vorkommt.
// Stufe: Regelprüfung am Drehbuch (Text- und Strukturregeln), bei F07 zusätzlich anhand der
// über den Server gespielten Varianten (Integration). Die fachliche Richtigkeit (Brandschutz,
// Verträge, Netzwerk, Controlling) prüft dieses Werkzeug NICHT – das bleibt Gate D.
// Aufruf: node tools/qa/delta-waterkant.js <ausgabe.json> [nachweisordner]
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
const [OUT, NW] = process.argv.slice(2);
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scenario.waterkant.json'), 'utf8'));
const karte = id => s.lagekarten.find(x => x.id === id) || s.sonderlagekarten.find(x => x.id === id) || s.bonuskarten.find(x => x.id === id);
const lk = id => s.lagekarten.find(x => x.id === id);
const alleTexte = [...s.lagekarten, ...s.sonderlagekarten, ...s.bonuskarten].map(k => ({ id: k.id, t: [k.text, k.buehnentext, k.moderatorHinweis, k.kriseninfo].filter(Boolean).join(' ') }));
const befunde = [];
const F = (id, titel) => { const b = { id, titel, regeln: [] }; befunde.push(b); return b; };
const R = (b, name, ok, beleg) => b.regeln.push({ name, ok: !!ok, beleg });
const enthaelt = (id, ...woerter) => { const k = karte(id); const t = [k.text, k.moderatorHinweis].join(' '); const fehlt = woerter.filter(w => !t.includes(w)); return { ok: !fehlt.length, beleg: fehlt.length ? `${id}: fehlt „${fehlt.join('“, „')}“` : `${id} enthält „${woerter.join('“, „')}“` }; };
const nirgends = phrase => { const t = alleTexte.filter(x => x.t.includes(phrase)).map(x => x.id); return { ok: !t.length, beleg: t.length ? `„${phrase}“ in ${t.join(', ')}` : `„${phrase}“ in keiner Karte` }; };

{ const b = F('F01', 'Vertragslage Ausweich-Rack (LK13/SK22)');
  let r = enthaelt('LK13', 'vertraglich vereinbart', 'Produktivbetrieb'); R(b, 'LK13: Rack vertraglich für den Produktivbetrieb vereinbart', r.ok, r.beleg);
  r = enthaelt('SK22', 'regelt den Produktivbetrieb'); R(b, 'SK22 bestätigt den Produktivbetrieb (kein Widerspruch zu LK13)', r.ok, r.beleg);
  r = nirgends('nur die Lagerung von Sicherungskopien'); R(b, 'alte Gegenaussage „nur die Lagerung von Sicherungskopien“ entfernt', r.ok, r.beleg);
  r = enthaelt('SK22', 'fachlich zu prüfen'); R(b, 'offener Punkt (Verarbeitung von Partner- und Kundendaten) als Prüfauftrag, nicht als Tatsache', r.ok, r.beleg);
  const w4 = s.weichen.find(w => w.id === 'W4'); R(b, 'W4-Hinweis: Prüfung der Datenverarbeitung gehört zur Entscheidung', /Prüfung der Datenverarbeitung/.test(w4.hinweis), w4.hinweis.slice(-120)); }
{ const b = F('F02', 'Wiederanlaufabhängigkeiten (LK13, LK19)');
  let r = enthaelt('LK13', 'Netzanbindung', 'Anmeldedienste', 'Namensauflösung', 'Firewall', 'Katalog der Sicherungssoftware'); R(b, 'LK13 nennt die Basisdienste vor jedem Betrieb', r.ok, r.beleg);
  r = enthaelt('LK13', 'Physisch steht es sofort bereit'); R(b, 'LK13: „sofort“ nur physisch', r.ok, r.beleg);
  r = nirgends('sofort nutzbar'); R(b, '„sofort nutzbar“ in keiner Karte', r.ok, r.beleg);
  r = enthaelt('LK19', 'Basisdienste', 'gesicherten Administrationszugang', 'Firewall-Regeln'); R(b, 'LK19: Basisdienste inkl. gesichertem Administrationszugang vor der Rücksicherung', r.ok, r.beleg);
  r = enthaelt('LK19', 'Vier-Augen-Prinzip', 'fachliche Prüfung'); R(b, 'LK19 (Moderation): getrennte Freigaben technisch / Firewall / fachlich', r.ok, r.beleg);
  R(b, 'Reihenfolge LK13 < LK19 < LK20 (Rack → Rücksicherung → Umstellung der Märkte)', lk('LK13').minuteOffset < lk('LK19').minuteOffset && lk('LK19').minuteOffset < lk('LK20').minuteOffset, `${lk('LK13').minuteOffset} < ${lk('LK19').minuteOffset} < ${lk('LK20').minuteOffset}`); }
{ const b = F('F03', 'Meilensteine Serverraum (Zugang, Reinigung, Freigabe, Produktivbetrieb)');
  const fb = fs.readFileSync(path.join(ROOT, 'tools', 'faktenblatt.js'), 'utf8'); const zeile = (fb.match(/"Meilensteine Serverraum",\s*"([^"]+)"/) || [])[1] || '';
  R(b, 'Faktenblatt hat eine Meilenstein-Zeile', !!zeile, zeile.slice(0, 200));
  ['Reinigung', 'Freimessung', 'Raumfreigabe', 'produktiv'].forEach(w => R(b, `Meilenstein „${w}“ benannt`, zeile.includes(w), w));
  let r = enthaelt('LK14', 'frühestens in etwa zehn Tagen'); R(b, 'LK14: Betreten erst nach Reinigung und Freimessung (≈ 10 Tage)', r.ok, r.beleg);
  r = enthaelt('LK15', 'produktiv frühestens rund drei Wochen'); R(b, 'LK15: Produktivbetrieb eigenes RZ ≈ 3 Wochen', r.ok, r.beleg); }
{ const b = F('F04', 'Sichere Brandfreigabe nach Lithium-Ionen-Brand');
  let r = enthaelt('LK06', 'Brandwache', 'wieder entzünden', 'Fachfirma'); R(b, 'LK06: Brandwache, Wiederentzündung, Ausbau nur durch Fachfirma', r.ok, r.beleg);
  r = enthaelt('LK10', 'Freigabekette', '„Gelöscht“ ist keine Freigabe'); R(b, 'LK10 (Moderation): Freigabekette, „Gelöscht“ ist keine Freigabe', r.ok, r.beleg);
  r = enthaelt('LK14', 'Arbeitsfreigabe', 'keine Freigabe des Raums'); R(b, 'LK14: Bergung nur mit Arbeitsfreigabe, keine Raumfreigabe', r.ok, r.beleg);
  R(b, 'Reihenfolge LK06 < LK10 < LK14', lk('LK06').minuteOffset < lk('LK10').minuteOffset && lk('LK10').minuteOffset < lk('LK14').minuteOffset, `${lk('LK06').minuteOffset} < ${lk('LK10').minuteOffset} < ${lk('LK14').minuteOffset}`);
  r = nirgends('Freiwillige'); R(b, 'keine Bergung durch Freiwillige', r.ok, r.beleg); }
{ const b = F('F05', 'Zustimmungspfad bei zwölf Monaten Bindung (W4, SK46)');
  const w4 = s.weichen.find(w => w.id === 'W4'); const aus = w4.optionen.find(o => o.id === 'ausbauen');
  R(b, 'Option „ausbauen“ nennt die Zustimmung der Gesellschafter', /Zustimmung der Gesellschafter/.test(aus.label), aus.label);
  R(b, 'W4-Hinweis: Folge einer fehlenden Zustimmung ausdrücklich geregelt', /ohne Zustimmung unterschreiben/.test(w4.hinweis) && /nur das Nötigste/.test(w4.hinweis), w4.hinweis.slice(0, 220));
  const sk = karte('SK46'); const heim = s.lagekarten.filter(l => l.minuteOffset <= sk.minuteOffset).sort((a, b2) => b2.minuteOffset - a.minuteOffset)[0];
  R(b, 'SK46 kommt in der Lage der Entscheidung W4 (LK15) an', heim && w4.lagekarten.includes(heim.id), `SK46 Minute ${sk.minuteOffset}, Heimatlage ${heim && heim.id}; W4 bei ${w4.lagekarten.join(', ')}`);
  R(b, 'SK46 an die Geschäftsführung', sk.empfaenger === 'geschaeftsfuehrer-ceo', sk.empfaenger);
  R(b, 'SK46: „zwölf Monaten oder länger“', /zwölf Monaten oder länger/.test(sk.text), sk.text.slice(0, 160)); }
{ const b = F('F07', 'Brandursache und Rückkehrentscheidung in langen Formaten (LK24, LK26, LK28)');
  const integ = NW ? (() => { try { return JSON.parse(fs.readFileSync(path.join(NW, 'integration', 'waterkant.json'), 'utf8')); } catch (e) { return null; } })() : null;
  if (!integ) R(b, 'Integrationsergebnis vorhanden', false, 'integration/waterkant.json fehlt');
  else ['LK24', 'LK26', 'LK28'].forEach(id => { const in_ = integ.ergebnisse.filter(x => x.gruppe === 'Dauer × Schwerpunkt' && (x.ist.lagen || []).includes(id)).map(x => x.id); R(b, `${id} in mindestens einer der 25 Kombinationen gespielt (über den Server)`, in_.length > 0, in_.join(', ') || 'in keiner'); });
  R(b, 'Brandursache im Drehbuch (Einleitung/Abschluss) unabhängig von der Variante', /thermisch|Batteriemodul/.test(JSON.stringify(s.moderationsleitfaden) + JSON.stringify(s.nachspiel)), 'Einleitung oder Abschluss nennt die Ursache'); }
{ const b = F('F12', 'Szenariospezifisches Bewertungsraster');
  const k = s.protokollKriterien || []; R(b, '10 Kriterien im Drehbuch', k.length === 10, k.length + ' Kriterien');
  ['Personenschutz', 'Brand- und Raumfreigabe', 'Kunden- und Partnerpriorisierung', 'Wiederanlaufabhängigkeiten', 'Krisenkommunikation'].forEach(t => R(b, `Thema „${t}“ als eigenes Kriterium`, k.some(x => x.includes(t)), (k.find(x => x.includes(t)) || '–').slice(0, 90)));
  const refs = k.flatMap(x => (x.match(/\b(LK\d+|SK\d+|B\d+|W\d+)\b/g) || [])); const unbekannt = refs.filter(r => !/^W/.test(r) && !karte(r)).concat(refs.filter(r => /^W/.test(r) && !s.weichen.some(w => w.id === r)));
  R(b, 'jeder Kartenbezug im Raster existiert', !unbekannt.length, unbekannt.length ? 'unbekannt: ' + unbekannt.join(', ') : `${refs.length} Bezüge geprüft`);
  R(b, 'kein NordTech-Kriterium „IT-/OT-Sicherheit“', !k.some(x => /IT-\/OT/.test(x)), 'geprüft'); }
{ const b = F('F13', 'Kostenklassifizierung je Posten');
  const kk = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'review', 'teile', 'kostenklassen.json'), 'utf8')).waterkant;
  const ids = [...s.nachspiel.rechnung.map((p, i) => p.id || 'R' + i), ...s.nachspiel.optionalePosten.map(p => p.id)];
  const fehlt = ids.filter(id => !kk[id]); R(b, 'jeder Rechnungs- und Zusatzposten klassifiziert', !fehlt.length, fehlt.length ? 'fehlt: ' + fehlt.join(', ') : `${ids.length} Posten`);
  const ungueltig = Object.entries(kk).filter(([, v]) => !/^[AEIVRL](\/[AEIVRL])*$/.test(v[0])); R(b, 'nur zulässige Klassen (A, E, I, V, R, L)', !ungueltig.length, ungueltig.map(x => x[0]).join(', ') || 'alle zulässig');
  const ohneHerleitung = s.nachspiel.optionalePosten.filter(p => !p.herleitung).map(p => p.id); R(b, 'jeder Zusatzposten mit Rechenweg (herleitung)', !ohneHerleitung.length, ohneHerleitung.join(', ') || 'alle mit Rechenweg');
  R(b, 'Hinweis: Vorschlag, von Finanzen/Controlling zu bestätigen', /von Finanzen\/Controlling zu bestätigen/.test(JSON.stringify(require(path.join(ROOT, 'docs', 'review', 'teile', 'kostenklassen.json'))._hinweis)), 'im _hinweis der Datei'); }
{ const b = F('F15', 'Waterkant-Moderationshandbuch');
  const datei = path.join(ROOT, 'docs', 'waterkant-moderationshandbuch.md'); const da = fs.existsSync(datei); R(b, 'Handbuch vorhanden', da, 'docs/waterkant-moderationshandbuch.md');
  if (da) { const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'qa-hb-')), 'hb.md'); execFileSync(process.execPath, [path.join(ROOT, 'tools', 'handbuch-waterkant.js'), tmp], { cwd: ROOT, stdio: 'ignore' });
    const norm = t => t.replace(/Stand: [^\n]*/g, '').replace(/\d{4}-\d{2}-\d{2}/g, '');
    R(b, 'Handbuch entspricht dem aktuellen Drehbuch (neu erzeugt = eingecheckt)', norm(fs.readFileSync(tmp, 'utf8')) === norm(fs.readFileSync(datei, 'utf8')), 'Vergleich ohne Datumszeilen');
    const hb = fs.readFileSync(datei, 'utf8');
    s.weichen.forEach(w => R(b, `Entscheidung ${w.id} im Handbuch`, hb.includes(w.frage), w.frage.slice(0, 80)));
    ['B7', 'echter Alarm', 'Abbruch', 'Debriefing'].forEach(w => R(b, `Abschnitt/Begriff „${w}“`, hb.includes(w), w)); } }

{ const b = F('O-11', 'Zeitliche Plausibilität vertraulicher Karten (SK31, SK28; Entscheidung der Spielleitung)');
  const engine = require(path.join(ROOT, 'server', 'runEngine.js'));
  const k31 = karte('SK31'), k28 = karte('SK28');
  R(b, 'SK31 nur zu Beginn von LK23 (Heimatlage Freitag 09:00)', k31.zuBeginnVon === 'LK23', `zuBeginnVon: ${k31.zuBeginnVon || '–'}`);
  const betrieb = (s.schwerpunkte || []).find(x => x.key === 'betrieb');
  R(b, 'SK28 Pflichtkarte im Schwerpunkt „Filialen, Lager und Saisonstart“', (betrieb.pflicht || []).includes('SK28'), (betrieb.pflicht || []).join(', '));
  const sk36 = (s.schwerpunkte || []).filter(x => (x.pflicht || []).includes('SK36')).map(x => x.key);
  R(b, 'SK36 unverändert (nicht als Pflichtkarte eingeplant; gesonderte Entscheidung)', !sk36.length, sk36.join(', ') || 'in keinem Schwerpunkt Pflicht');
  // Tagesindex entlang der Drehbuchreihenfolge (Montag der Folgewoche zählt als späterer Tag)
  const tag = {}; { let tz = 0, vor = null; s.lagekarten.slice().sort((a, c) => a.minuteOffset - c.minuteOffset).forEach(l => { const d = l.simZeit.split(' ')[0]; if (vor !== null && d !== vor) tz++; vor = d; tag[l.id] = tz; }); }
  const heimat = k => k.zuBeginnVon || (typeof k.minuteOffset === 'number' ? (s.lagekarten.filter(l => l.minuteOffset <= k.minuteOffset).sort((a, c) => c.minuteOffset - a.minuteOffset)[0] || {}).id : null);
  const alle = s.roles.filter(r => r.id !== 'teilnehmer').map(r => r.id); let n = 0; const spaet = [], sk31 = [], sk28 = [];
  for (const bes of ['empfohlen', 'alle']) for (const m of [45, 60, 90, 120, 180]) for (const sp of ['', ...(s.schwerpunkte || []).map(x => x.key)]) {
    const rr = engine.recommendRoles(s, { targetMinutes: m }); const ids = bes === 'alle' ? alle : rr.roleIds;
    const p = engine.buildAdaptiveSchedule(s, { targetMinutes: m, difficulty: 'mittel', roleCount: bes === 'alle' ? s.standardablauf.speakingOrder.length : rr.groups.length, schwerpunkt: sp || undefined, activeRoleIds: ids });
    n++; let maxTag = -1, letzte = null; const id = `${m}/${sp || 'ausgewogen'}/${bes}`;
    p.schedule.forEach(ev => { if (ev.type === 'lagekarte') { maxTag = Math.max(maxTag, tag[ev.id]); letzte = ev.id; return; }
      const k = karte(ev.id); const h = heimat(k); if (h && maxTag - tag[h] >= 2) spaet.push(`${id}: ${k.id}`);
      if (ev.id === 'SK31') sk31.push(`${id}@${letzte}`); if (ev.id === 'SK28') sk28.push(`${id}@${letzte}`); });
  }
  R(b, `keine Waterkant-Karte zwei oder mehr Tage nach ihrer Heimatlage (${n} Kombinationen)`, !spaet.length, spaet.slice(0, 5).join('; ') || '0 Fälle');
  R(b, 'SK31 nur unmittelbar nach LK23', sk31.every(x => x.endsWith('@LK23')), sk31.join(' ') || 'nicht gespielt');
  R(b, 'SK28 im Schwerpunkt „betrieb“ in jeder Kombination, jeweils mit LK22', sk28.filter(x => x.includes('/betrieb/')).length === 10 && sk28.every(x => x.endsWith('@LK22')), `${sk28.length} Kombinationen: ${sk28.filter(x => x.includes('/betrieb/')).length} davon „betrieb“`); }
befunde.forEach(b => { b.ergebnis = b.regeln.every(r => r.ok) ? 'Regeln erfüllt' : 'Regel verletzt'; });
fs.writeFileSync(OUT, JSON.stringify({ zeitpunkt: new Date().toISOString(), stufe: 'Regelprüfung am Drehbuch (Text/Struktur); F07 zusätzlich über die Integrationsläufe', befunde }, null, 2));
befunde.forEach(b => console.log(`${b.id} ${b.ergebnis}: ${b.titel}` + b.regeln.filter(r => !r.ok).map(r => `\n   ✗ ${r.name}: ${r.beleg}`).join('')));
process.exitCode = befunde.every(b => b.ergebnis === 'Regeln erfüllt') ? 0 : 1;
