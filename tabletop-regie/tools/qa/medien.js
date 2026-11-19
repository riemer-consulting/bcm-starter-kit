// Technische Medienabnahme beider Szenarien (ohne Browser):
// - jede im Drehbuch verwiesene Datei existiert, liegt unter media/ und ist eindeutig zugeordnet
// - Bilder: dekodierbar, Abmessungen
// - Töne: vollständig dekodierbar (ffmpeg), Dauer, integrierte Lautheit (EBU R128) und
//   Spitzenpegel (True Peak); Dauer passt in die Diskussionszeit der Lage
// - Alarm-Einspielungen (Waterkant): Übungskennzeichnung im Drehbuch (Bühnenhinweis und
//   Abschrift beginnt mit „Übung“) und hörbarer Beginn (kein stiller Anfang)
// Grenzwerte (vor der Messung festgelegt): Lautheit −30 … −14 LUFS, True Peak ≤ −0,5 dBTP,
// Ereignistöne höchstens 120 s, Dauer ≤ Diskussionszeit der Lage.
// Ob ein Ton inhaltlich und akustisch passt, kann dieses Werkzeug NICHT feststellen:
// jede Datei trägt deshalb den Status „akustisch nicht abgenommen“, bis ein Mensch sie im
// Raum gehört und das in docs/final-qa/hoerprotokoll.json eingetragen hat.
// Aufruf: node tools/qa/medien.js <ausgabe.json>
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync, spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
const OUT = process.argv[2] || '/dev/stdout';
const GRENZEN = { lufsMin: -30, lufsMax: -14, truePeakMax: -0.5, ereignisMaxSek: 120 };
const hoer = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'final-qa', 'hoerprotokoll.json'), 'utf8')); } catch (e) { return {}; } })();
// ffmpeg schreibt Messwerte und Fehler auf stderr – unabhängig vom Exit-Code auslesen
const ffErr = args => { const r = spawnSync('ffmpeg', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); return String(r.stderr || '') + (r.status ? '\nEXIT ' + r.status : ''); };
const probe = f => JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_name,width,height,sample_rate,channels', '-of', 'json', f], { encoding: 'utf8' }));
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

function messeTon(datei) {
  const p = probe(datei); const dauer = Number(p.format.duration);
  // vollständige Dekodierung: jede Fehlermeldung ist ein Befund
  const dekod = ffErr(['-v', 'error', '-i', datei, '-f', 'null', '-']);
  const r = ffErr(['-nostats', '-i', datei, '-filter_complex', 'ebur128=peak=true', '-f', 'null', '-']);
  const lufs = Number(((r.match(/I:\s+(-?[\d.]+) LUFS/g) || []).pop() || '').replace(/[^-\d.]/g, ''));
  const tp = Number(((r.match(/Peak:\s+(-?[\d.]+) dBFS/g) || []).pop() || '').replace(/[^-\d.]/g, ''));
  // Beginn hörbar? mittlerer Pegel der ersten 3 s
  const anf = ffErr(['-t', '3', '-i', datei, '-af', 'volumedetect', '-f', 'null', '-']);
  const anfangDb = Number(((anf.match(/mean_volume:\s+(-?[\d.]+) dB/) || [])[1]));
  return { dauer: Math.round(dauer * 10) / 10, codec: (p.streams[0] || {}).codec_name, abtastrate: Number((p.streams[0] || {}).sample_rate), kanaele: (p.streams[0] || {}).channels, dekodierung: dekod.trim() ? dekod.trim().slice(0, 200) : 'ohne Fehler', lufs, truePeak: tp, anfangDb };
}
function messeBild(datei) {
  const p = probe(datei); const s = p.streams[0] || {};
  const dekod = ffErr(['-v', 'error', '-i', datei, '-f', 'null', '-']);
  return { breite: s.width, hoehe: s.height, codec: s.codec_name, dekodierung: dekod.trim() ? dekod.trim().slice(0, 200) : 'ohne Fehler' };
}

const ergebnis = { zeitpunkt: new Date().toISOString(), grenzen: GRENZEN, szenarien: [] };
for (const datei of ['scenario.nordtech.json', 'scenario.waterkant.json']) {
  const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', datei), 'utf8'));
  const verweise = [];
  const add = (karte, art, m, extra) => { if (m && m.src) verweise.push(Object.assign({ karte, art, src: m.src, m }, extra || {})); };
  s.lagekarten.forEach(l => { add(l.id, 'Bild', l.media); add(l.id, 'Ton', l.sound, { diskussion: l.diskussionMinuten, sprechertext: l.sprechertext }); });
  (s.bonuskarten || []).forEach(b => { add(b.id, 'Bild', b.media); add(b.id, 'Ton', b.sound, { sprechertext: b.sprechertext }); });
  (s.sonderlagekarten || []).forEach(k => add(k.id, 'Bild', k.media));
  if (s.sounds && s.sounds.idle) add('Hintergrund', 'Ton', s.sounds.idle, { hintergrund: true });
  if (s.moderationsleitfaden && s.moderationsleitfaden.idleMedia) add('Wartebild', 'Bild', s.moderationsleitfaden.idleMedia);
  if (s.company && s.company.logo) add('Logo', 'Bild', { src: s.company.logo });
  if (s.company && s.company.stageLogo) add('Logo Bühne', 'Bild', { src: s.company.stageLogo });
  const dateien = [];
  for (const v of verweise) {
    const pruef = []; const p = (name, ok, beob) => pruef.push({ name, ok: !!ok, beob });
    const voll = path.resolve(ROOT, '.' + v.src); const imMedia = voll.startsWith(path.join(ROOT, 'media') + path.sep);
    p('liegt unter media/', imMedia, v.src);
    const da = imMedia && fs.existsSync(voll); p('Datei vorhanden', da, da ? fs.statSync(voll).size + ' Byte' : 'fehlt');
    const eintrag = { szenario: s.id || datei, karte: v.karte, art: v.art, datei: v.src, pruefungen: pruef };
    if (da) {
      eintrag.sha256 = sha(voll);
      if (v.art === 'Bild') { const m = messeBild(voll); Object.assign(eintrag, m); p('vollständig dekodierbar', m.dekodierung === 'ohne Fehler', m.dekodierung); if (!/^Logo/.test(v.karte)) p('Mindestgröße 800 px Breite', m.breite >= 800, `${m.breite}×${m.hoehe}`); }
      else {
        const m = messeTon(voll); Object.assign(eintrag, m);
        p('vollständig dekodierbar', m.dekodierung === 'ohne Fehler', m.dekodierung);
        p(`Lautheit ${GRENZEN.lufsMin} … ${GRENZEN.lufsMax} LUFS`, m.lufs >= GRENZEN.lufsMin && m.lufs <= GRENZEN.lufsMax, m.lufs + ' LUFS');
        p(`True Peak ≤ ${GRENZEN.truePeakMax} dBTP`, m.truePeak <= GRENZEN.truePeakMax, m.truePeak + ' dBTP');
        if (!v.hintergrund && !v.m.loop) p(`Ereignis höchstens ${GRENZEN.ereignisMaxSek} s`, m.dauer <= GRENZEN.ereignisMaxSek, m.dauer + ' s');
        if (v.diskussion && !v.m.loop) p('kürzer als die Diskussionszeit der Lage', m.dauer <= v.diskussion * 60, `${m.dauer} s bei ${v.diskussion} Min.`);
        if (v.hintergrund) p('Hintergrund läuft in Schleife', !!v.m.loop, v.m.loop ? 'loop' : 'keine Schleife');
        // Alarm-Einspielungen: Übungskennzeichnung
        // Abspiellautstärke aus dem Drehbuch (volume) – nur zur Information, die Grenzwerte gelten für die Datei
        if (typeof v.m.volume === 'number' && v.m.volume > 0) eintrag.wirksameLautheit = Math.round((m.lufs + 20 * Math.log10(v.m.volume)) * 10) / 10;
        // Geltungsbereich laut Kopf: Alarm-Einspielungen im Szenario Waterkant
        const alarm = /waterkant/.test(datei) && /alarm|durchsage|loeschanlage/i.test(v.src) && !/klimaalarm/i.test(v.src);
        if (!alarm && /durchsage|alarm/i.test(v.src) && !/klimaalarm/i.test(v.src)) eintrag.hinweis = 'Durchsage außerhalb des Waterkant-Prüfumfangs: Übungskennzeichnung fachlich bewerten';
        if (alarm) {
          eintrag.alarm = true;
          p('Bühne zeigt „Übungseinspielung – kein echter Alarm“ (Drehbuchfeld)', !!v.m.uebungshinweis, v.m.uebungshinweis ? 'uebungshinweis gesetzt' : 'fehlt');
          p('Abschrift beginnt mit „Übung“', /„?Übung/.test((v.sprechertext || '').slice(0, 60)), (v.sprechertext || '–').slice(0, 80));
          p('Beginn hörbar (Kennzeichnung nicht stumm)', m.anfangDb > -45, `mittlerer Pegel erste 3 s: ${m.anfangDb} dB`);
        }
      }
    }
    const h = hoer[v.src];
    eintrag.akustisch = h ? `abgenommen ${h.datum} (${h.rolle}): ${h.urteil}` : 'akustisch nicht abgenommen';
    eintrag.ok = pruef.every(x => x.ok);
    dateien.push(eintrag);
  }
  // Zuordnung: dieselbe Datei an mehreren Karten ist zulässig (z. B. Telefonklingeln), wird aber ausgewiesen
  const mehrfach = {}; dateien.forEach(d => { (mehrfach[d.datei] = mehrfach[d.datei] || []).push(d.karte); });
  // Dateien im Szenario-Ordner ohne Verweis
  const ordner = path.join(ROOT, 'media', s.id === 'waterkant' || /waterkant/.test(datei) ? 'waterkant' : 'nordtech');
  const verwiesen = new Set(dateien.map(d => path.basename(d.datei)));
  const unbenutzt = fs.existsSync(ordner) ? fs.readdirSync(ordner).filter(f => !verwiesen.has(f)) : [];
  ergebnis.szenarien.push({ datei, dateien, mehrfachVerwendet: Object.fromEntries(Object.entries(mehrfach).filter(([, v]) => v.length > 1)), unbenutzteDateien: unbenutzt,
    bestanden: dateien.filter(d => d.ok).length, gesamt: dateien.length, akustischAbgenommen: dateien.filter(d => d.art === 'Ton' && !/nicht abgenommen/.test(d.akustisch)).length, toene: dateien.filter(d => d.art === 'Ton').length });
}
fs.writeFileSync(OUT, JSON.stringify(ergebnis, null, 2));
for (const sz of ergebnis.szenarien) {
  console.log(`${sz.datei}: ${sz.bestanden}/${sz.gesamt} Medienverweise technisch in Ordnung; Töne akustisch abgenommen: ${sz.akustischAbgenommen}/${sz.toene}`);
  sz.dateien.filter(d => !d.ok).forEach(d => console.log('  ✗ ' + d.karte + ' ' + d.datei + ': ' + d.pruefungen.filter(x => !x.ok).map(x => x.name + ' (' + x.beob + ')').join('; ')));
  if (sz.unbenutzteDateien.length) console.log('  unbenutzt: ' + sz.unbenutzteDateien.join(', '));
}
// Exit-Code 1, sobald eine technische Prüfung eine Datei beanstandet (Bewertung im Gate C)
process.exitCode = ergebnis.szenarien.every(sz => sz.bestanden === sz.gesamt) ? 0 : 1;
