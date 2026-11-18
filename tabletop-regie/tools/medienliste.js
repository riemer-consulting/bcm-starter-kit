// Listet alle Medien eines Drehbuchs: wo sie verwendet werden, ob die Datei da ist,
// Pixelmaß (PNG/JPEG), Dauer (MP3, über ffprobe, falls installiert), Prüfsumme,
// sowie Dateien im Medienordner, die kein Drehbuch-Eintrag verwendet.
// Aufruf: node tools/medienliste.js data/scenario.<name>.json <ausgabe.md>
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const s = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'));
const out = []; const w = (...l) => out.push(...l);
const datei = src => path.join(ROOT, src);
const pixel = f => { try { const b = fs.readFileSync(f); if (b.toString('ascii', 1, 4) === 'PNG') return b.readUInt32BE(16) + '×' + b.readUInt32BE(20);
  if (b[0] === 0xff && b[1] === 0xd8) { let i = 2; while (i < b.length) { const m = b[i + 1]; const len = b.readUInt16BE(i + 2); if (m >= 0xc0 && m <= 0xc3) return b.readUInt16BE(i + 7) + '×' + b.readUInt16BE(i + 5); i += 2 + len; } } } catch (e) {} return '–'; };
const dauer = f => { try { return Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' })).toFixed(1).replace('.', ',') + ' s'; } catch (e) { return '–'; } };
const sha = f => { try { return crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0, 12); } catch (e) { return '–'; } };
const zeilen = [];
const add = (wo, art, src, extra) => { if (!src) return; const f = datei(src); const da = fs.existsSync(f); zeilen.push({ wo, art, datei: src.replace(/^\/media\//, ''), da, mass: art === 'Ton' ? (da ? dauer(f) : '–') : (da ? pixel(f) : '–'), sha: da ? sha(f) : '–', extra: extra || '' }); };
const mf = s.moderationsleitfaden || {};
if (mf.idleMedia) add('Bühne vor Start', 'Bild', mf.idleMedia.src);
if (s.sounds && s.sounds.idle) add('Bühne vor Start / Vorboten', 'Ton', s.sounds.idle.src, 'Schleife');
const tonInfo = x => [x.loop ? 'Schleife' : 'endet selbst', x.signal ? 'Signal, danach live' : '', x.uebungshinweis ? 'Übungshinweis auf der Bühne' : ''].filter(Boolean).join(', ');
s.lagekarten.slice().sort((a, b) => a.minuteOffset - b.minuteOffset).forEach(l => { if (l.media) add(`${l.id} ${l.titel}`, 'Bild', l.media.src); if (l.sound) add(`${l.id} ${l.titel}`, 'Ton', l.sound.src, tonInfo(l.sound)); });
s.bonuskarten.forEach(b => { if (b.media) add(`${b.id} ${b.titel || ''}`, 'Bild', b.media.src); if (b.sound) add(`${b.id} ${b.titel || ''}`, 'Ton', b.sound.src, tonInfo(b.sound)); });
if (s.company.logo) add('Firmenzeichen', 'Bild', s.company.logo);
if (s.company.stageLogo) add('Firmenzeichen Bühne', 'Bild', s.company.stageLogo);
w(`# Medienliste: ${s.title}`, '', `Stand: ${new Date().toISOString().slice(0, 10)} · erzeugt mit \`tools/medienliste.js\` aus \`${path.basename(process.argv[2])}\`. „vorhanden“, Maße, Dauer und Prüfsumme (SHA-256, gekürzt) sind aus den Dateien gelesen.`, '',
  '| Verwendet bei | Art | Datei | vorhanden | Pixel / Dauer | Abspielart | SHA-256 (12) |', '|---|---|---|---|---|---|---|',
  ...zeilen.map(z => `| ${z.wo} | ${z.art} | \`${z.datei}\` | ${z.da ? 'ja' : '**NEIN**'} | ${z.mass} | ${z.extra || '–'} | ${z.sha} |`), '');
const ordner = [...new Set(zeilen.map(z => z.datei.split('/')[0]))].filter(o => fs.existsSync(path.join(ROOT, 'media', o)) && fs.statSync(path.join(ROOT, 'media', o)).isDirectory());
const benutzt = new Set(zeilen.map(z => z.datei));
const unbenutzt = ordner.flatMap(o => fs.readdirSync(path.join(ROOT, 'media', o)).map(f => o + '/' + f)).filter(f => !benutzt.has(f) && !/\.(md|txt)$/i.test(f));
const sprech = [...s.lagekarten, ...s.bonuskarten].filter(k => k.sprechertext);
w(`**Ergebnis:** ${zeilen.filter(z => z.da).length} von ${zeilen.length} Verweisen zeigen auf vorhandene Dateien. Ungenutzte Dateien in ${ordner.map(o => '`media/' + o + '/`').join(', ')}: ${unbenutzt.length ? unbenutzt.map(f => '`' + f + '`').join(', ') : 'keine'}.`, '',
  `## Sprechertexte und Einspielungen (${sprech.length})`, '', 'Wortlaut, wie er vorgelesen oder eingespielt wird. „Einspielung“ = als Ton hinterlegt; „vorlesen“ = Moderation spricht live (ggf. nach einem Signalton).', '');
sprech.forEach(k => w(`- **${k.id} ${k.titel || ''}** (${k.sound && !k.sound.signal ? 'Einspielung' : 'vorlesen'}): ${k.sprechertext}`));
w('');
fs.writeFileSync(process.argv[3], out.join('\n') + '\n');
console.log(path.basename(process.argv[2]), zeilen.length, 'Verweise,', zeilen.filter(z => !z.da).length, 'fehlen,', unbenutzt.length, 'ungenutzt');
