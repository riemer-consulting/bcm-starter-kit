// Browsertest Bühne und Moderation (Playwright/Chromium).
// Aufruf: node tools/tests/buehne.js scenario.<name>.json <ausgabeordner>
// Startet den Server selbst (Port 4181, nur 127.0.0.1). Keine Mails (kein SMTP konfiguriert).
//  G   Generalprobe: jede Lagekarte im Drehbuch-Ablauf und jede öffentliche Überraschung
//      auf der Bühne; Bildschirmfoto, Bild geladen?, welcher Ton läuft?
//  F   Abschluss: Nacharbeiten, Rechnung, Bilanz, Einordnung (Bildschirmfotos)
//  N3  Stummschalten mitten im Ton      N4  Zeitsprung mitten im Ton
//  N2  Bühne neu laden mitten im Lauf   B   Unterbrechungs-Überraschung mit Countdown
//  M   Moderationsansicht (Bildschirmfotos), Browserfehler beider Ansichten
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..', '..');
const FILE = process.argv[2] || 'scenario.nordtech.json';
const OUT = process.argv[3] || path.join(ROOT, 'tmp-buehne');
fs.mkdirSync(OUT, { recursive: true });
const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', FILE), 'utf8'));
const PORT = 4181; const B = `http://127.0.0.1:${PORT}`;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const post = (p, b) => fetch(B + p, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Regie': '1' }, body: JSON.stringify(b || {}) }).then(async r => ({ status: r.status, body: await r.json().catch(() => null) }));
const get = p => fetch(B + p).then(r => r.json());
const ergebnisse = []; const generalprobe = [];
const pruef = (id, name, ok, erwartet, beobachtet) => { ergebnisse.push({ id, name, ok: !!ok, erwartet, beobachtet }); console.log(`${ok ? 'BESTANDEN' : 'FEHLER   '} ${id} ${name} – ${beobachtet}`); };
const sicher = {};
['settings.json', 'run-state.json'].forEach(f => { const p = path.join(ROOT, 'data', f); sicher[f] = fs.existsSync(p) ? fs.readFileSync(p) : null; });
const zuruecklegen = () => ['settings.json', 'run-state.json'].forEach(f => { const p = path.join(ROOT, 'data', f); if (sicher[f]) fs.writeFileSync(p, sicher[f]); else if (fs.existsSync(p)) fs.unlinkSync(p); });

let srv;
(async () => {
  srv = spawn(process.execPath, ['server/index.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(PORT), HOST: '127.0.0.1' }), stdio: 'ignore' });
  for (let i = 0; i < 60; i++) { try { await fetch(B + '/api/scenario-meta'); break; } catch (e) { await sleep(250); } }
  const browser = await chromium.launch(Object.assign({ args: ['--autoplay-policy=no-user-gesture-required'] }, process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}));
  const fehlerSeite = [];
  try {
    await post('/api/settings', { smtp: { host: '', port: 587, user: '', pass: '' }, testMode: { enabled: false, dummyEmail: '' } });
    await post('/api/scenarios/select', { file: FILE }); await post('/api/run/reset'); await post('/api/run/ton', { stumm: false });
    // Besetzung: alle Rollen (Drehbuch-Ablauf zeigt jede Lage), Testadressen
    await post('/api/participants', s.roles.map((r, i) => ({ name: 'Person ' + (i + 1), email: `person${i + 1}@example.com`, roleIds: [r.id] })));
    await post('/api/run/start', { durationMode: 'authored' });
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
    const st = await ctx.newPage(); const mod = await ctx.newPage();
    [st, mod].forEach((p, i) => { p.on('pageerror', e => fehlerSeite.push(`${i ? 'Moderation' : 'Bühne'}: ${e.message}`)); p.on('console', m => { if (m.type() === 'error' && !/favicon|ERR_FILE_NOT_FOUND|404/.test(m.text())) fehlerSeite.push(`${i ? 'Moderation' : 'Bühne'} (Konsole): ${m.text()}`); }); });
    const played = []; st.on('request', r => { if (/\.mp3$/.test(r.url())) played.push(decodeURIComponent(r.url().split('/').pop())); });
    await st.goto(B + '/stage.html'); await st.click('#btn-enable-sound'); await sleep(1200);
    await st.screenshot({ path: path.join(OUT, '00-buehne-vor-start.png') });
    await mod.goto(B + '/moderator.html'); await sleep(1500);
    await mod.screenshot({ path: path.join(OUT, 'moderation-01-vor-start.png'), fullPage: true });
    await post('/api/run/begin-crisis'); await sleep(2000);
    await st.screenshot({ path: path.join(OUT, '01-buehne-countdown.png') });
    await sleep(30000);
    const audio = () => st.evaluate(() => { const x = document.getElementById('event-audio'); const a = document.getElementById('ambient-audio'); return { src: decodeURIComponent((x.getAttribute('src') || '').split('/').pop()), playing: !x.paused, t: x.currentTime, ambient: !a.paused }; });
    const bilderOk = () => st.evaluate(() => [...document.querySelectorAll('img')].filter(i => i.offsetParent !== null).every(i => i.complete && i.naturalWidth > 0));
    const badge = () => st.evaluate(() => /Übungseinspielung/.test(document.body.textContent));

    // ---- G Generalprobe
    const ms0 = await get('/api/run/moderator-state');
    const order = ms0.fullTimeline.filter(e => e.type === 'lagekarte').map(e => e.id);
    const oeffentlich = s.bonuskarten.filter(b => b.oeffentlich);
    const nachLk = {}; oeffentlich.forEach(b => { const v = (b.voraussetzung || [order[0]]); const last = v.map(id => order.indexOf(id)).sort((a, c) => c - a)[0]; const lk = order[Math.max(0, last)]; (nachLk[lk] = nachLk[lk] || []).push(b); });
    let nr = 2;
    for (const id of order) {
      played.length = 0;
      await post('/api/run/jump-to-event/lagekarte/' + id); await sleep(2600);
      const a = await audio(); const lk = s.lagekarten.find(l => l.id === id);
      const datei = `${String(nr++).padStart(2, '0')}-${id}.png`;
      await st.screenshot({ path: path.join(OUT, datei) });
      const sollTon = lk.sound ? lk.sound.src.split('/').pop() : null;
      generalprobe.push({ id, titel: lk.titel, bild: datei, bildGeladen: await bilderOk(), sollTon, ton: a.playing ? a.src : (sollTon && played.includes(sollTon) ? sollTon + ' (bereits zu Ende)' : '–'), uebungshinweis: lk.sound && lk.sound.uebungshinweis ? await badge() : null });
      for (const b of nachLk[id] || []) {
        if (b.minDauer || b.erfordertBesetzt) { /* Drehbuch-Ablauf: Dauer und Besetzung erfüllt */ }
        played.length = 0;
        const r = await post('/api/run/fire-bonuskarte/' + b.id); await sleep(2600);
        const a2 = await audio(); const d2 = `${String(nr++).padStart(2, '0')}-${b.id}.png`;
        await st.screenshot({ path: path.join(OUT, d2) });
        const sollTon2 = b.sound ? b.sound.src.split('/').pop() : null;
        generalprobe.push({ id: b.id, titel: b.titel, bild: d2, ausgeloest: r.status === 200, fehler: r.body && r.body.error, bildGeladen: await bilderOk(), sollTon: sollTon2, ton: a2.playing ? a2.src : (sollTon2 && played.includes(sollTon2) ? sollTon2 + ' (bereits zu Ende)' : '–'), uebungshinweis: b.sound && b.sound.uebungshinweis ? await badge() : null });
        if (b.unterbrechung) {
          const banner = await st.evaluate(() => document.body.innerText);
          const mtext = await mod.evaluate(() => document.body.innerText).catch(() => '');
          await mod.reload(); await sleep(1500);
          await mod.screenshot({ path: path.join(OUT, `moderation-${b.id}-unterbrechung.png`), fullPage: false });
          const rolle = (s.roles.find(x => x.id === b.unterbrechung.rolle) || {}).funktion || b.unterbrechung.rolle;
          pruef('B', `Unterbrechung ${b.id} (${rolle}, ${b.unterbrechung.minuten} Min.)`, /\d+:\d\d/.test(banner) || /Min/.test(banner), 'Bühne zeigt die Unterbrechung mit Restzeit; Moderation sieht Rolle und Rückkehr', `Bühne enthält Zeitangabe: ${/\d+:\d\d/.test(banner) ? 'ja' : 'nein'}; Moderation erwähnt ${b.id}: ${/B7|Unterbrech/.test(mtext + (await mod.evaluate(() => document.body.innerText))) ? 'ja' : 'nein'}`);
        }
        await post('/api/run/buehnenereignis/ausblenden'); await post('/api/run/buehnenereignis/ausblenden');
      }
    }
    const gpFehler = generalprobe.filter(g => !g.bildGeladen || (g.sollTon && g.ton === '–') || g.ausgeloest === false || g.uebungshinweis === false);
    pruef('G', `Generalprobe: ${order.length} Lagen und ${oeffentlich.length} öffentliche Überraschungen`, !gpFehler.length, 'jedes Bild geladen; jeder vorgesehene Ton gestartet; Übungshinweis sichtbar, wo vorgesehen', `${generalprobe.length} Bühnenzustände; Abweichungen: ${gpFehler.map(g => g.id).join(', ') || 'keine'}`);

    // ---- N3 Stummschalten mitten im Ton / N4 Zeitsprung mitten im Ton
    const langeTon = s.lagekarten.filter(l => l.sound && !l.sound.loop && order.includes(l.id));
    // längster Kartenton mit nachfolgender Lage (Dauer über ffprobe, sonst Dateigröße)
    const laenge = l => { const f = path.join(ROOT, l.sound.src); try { return Number(require('child_process').execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' })); } catch (e) { return fs.statSync(f).size / 16000; } };
    const mitNachfolger = langeTon.filter(l => order.indexOf(l.id) < order.length - 1).sort((a, b) => laenge(b) - laenge(a));
    const tonLk = mitNachfolger[0] || langeTon[0];
    if (tonLk) {
      await post('/api/run/jump-to-event/lagekarte/' + tonLk.id); await sleep(2600);
      const vor = await audio();
      await post('/api/run/ton', { stumm: true }); await sleep(2600);
      const still = await audio();
      await post('/api/run/ton', { stumm: false }); await sleep(2600);
      const wieder = await audio();
      pruef('N3', `Stummschalten mitten im Ton (${tonLk.id})`, vor.playing && !still.playing && !still.ambient, 'Kartenton stoppt sofort (≤ 3 s); nach Aufheben startet er nicht ungefragt neu, sondern über „Ton erneut abspielen“ (Hintergrundton gibt es nur vor der Krise und in den Vorboten)', `vorher: ${vor.playing ? 'läuft ' + vor.src : 'still'}; nach Stumm: Kartenton ${still.playing ? 'läuft' : 'aus'}, Hintergrund ${still.ambient ? 'läuft' : 'aus'}; nach Aufheben: Kartenton ${wieder.playing ? 'läuft' : 'aus'}, Hintergrund ${wieder.ambient ? 'läuft' : 'aus'}`);
      await post('/api/run/replay-sound'); await sleep(2600);
      const replay = await audio();
      pruef('N3', 'Ton erneut abspielen nach Stummschaltung', replay.playing, 'Kartenton startet von vorn', `Kartenton ${replay.playing ? 'läuft (' + replay.src + ', ' + replay.t.toFixed(1) + ' s)' : 'aus'}`);
      // N4: während der Ton läuft, zur nächsten Lage springen
      const idx = order.indexOf(tonLk.id); const naechste = order[idx + 1];
      if (naechste) {
        const nl = s.lagekarten.find(l => l.id === naechste);
        await post('/api/run/jump-to-event/lagekarte/' + naechste); await sleep(2600);
        const nachSprung = await audio();
        const soll = nl.sound ? nl.sound.src.split('/').pop() : null;
        pruef('N4', `Zeitsprung mitten im Ton (${tonLk.id} → ${naechste})`, soll ? nachSprung.src === soll : !(nachSprung.playing && nachSprung.src === tonLk.sound.src.split('/').pop()), soll ? 'alter Ton endet, Ton der neuen Lage läuft' : 'alter Ton endet; neue Lage ohne eigenen Ton bleibt still', `danach: ${nachSprung.playing ? 'läuft ' + nachSprung.src : 'Kartenton aus'}; Hintergrund ${nachSprung.ambient ? 'läuft' : 'aus'}`);
      }
    }

    // ---- N2 Bühne neu laden mitten im Lauf
    const vorReload = await get('/api/run/stage-state');
    await st.reload(); await sleep(2000);
    const overlay = await st.isVisible('#sound-unlock');
    const textNach = await st.evaluate(() => document.body.innerText);
    await st.screenshot({ path: path.join(OUT, 'n2-buehne-nach-neuladen.png') });
    await st.click('#btn-enable-sound'); await sleep(2600);
    const nachReload = await audio();
    pruef('N2', 'Bühne neu laden mitten im Lauf', overlay && vorReload.currentLagekarte && textNach.includes(vorReload.currentLagekarte.titel), 'Bühne zeigt sofort wieder die aktuelle Lage; Ton braucht einen Klick (Browserregel)', `Ton-Freigabe angezeigt: ${overlay ? 'ja' : 'nein'}; aktuelle Lage „${vorReload.currentLagekarte && vorReload.currentLagekarte.titel}“ sichtbar: ${textNach.includes(vorReload.currentLagekarte && vorReload.currentLagekarte.titel) ? 'ja' : 'nein'}; nach Klick Hintergrund ${nachReload.ambient ? 'läuft' : 'aus'}`);

    // ---- M Moderation während des Laufs
    await mod.reload(); await sleep(1800);
    await mod.screenshot({ path: path.join(OUT, 'moderation-02-im-lauf.png'), fullPage: true });

    // ---- F Abschluss
    await post('/api/run/finale/start'); await sleep(2000);
    let k = 0; let fv;
    for (let i = 0; i < 80; i++) {
      fv = (await get('/api/run/stage-state')).finale;
      if (!fv) break;
      if (['intro', 'bilanz', 'aha', 'fazit'].includes(fv.phase) || (fv.phase === 'rechnung' && fv.posten.length === fv.postenGesamt) || (fv.phase === 'nacharbeiten' && fv.nacharbeiten.length === fv.nacharbeitenGesamt)) {
        await sleep(1800); await st.screenshot({ path: path.join(OUT, `abschluss-${String(++k).padStart(2, '0')}-${fv.phase}.png`) });
      }
      if (fv.phase === 'fazit') break;
      await post('/api/run/finale/next'); await sleep(400);
    }
    pruef('F', 'Abschluss auf der Bühne bis zum Fazit', fv && fv.phase === 'fazit', 'Nacharbeiten, Rechnung, Bilanz, Einordnung und Fazit erscheinen nacheinander', `${k} Bildschirmfotos, letzte Phase: ${fv && fv.phase}`);
    await mod.reload(); await sleep(1500);
    await mod.screenshot({ path: path.join(OUT, 'moderation-03-abschluss.png'), fullPage: true });
    pruef('M', 'Keine Browserfehler in Bühne und Moderation', !fehlerSeite.length, 'keine JavaScript-Fehler', fehlerSeite.slice(0, 5).join(' | ') || 'keine');
    await post('/api/run/reset');
  } catch (e) {
    pruef('X', 'Testablauf', false, 'ohne Abbruch', 'Abbruch: ' + e.message);
  } finally {
    await browser.close(); srv.kill('SIGTERM'); await sleep(500); zuruecklegen();
    fs.writeFileSync(path.join(OUT, 'ergebnis.json'), JSON.stringify({ szenario: FILE, zeitpunkt: new Date().toISOString(), ergebnisse, generalprobe }, null, 2));
    const f = ergebnisse.filter(x => !x.ok).length;
    console.log(`\n${FILE}: ${ergebnisse.length - f} von ${ergebnisse.length} bestanden`);
    process.exitCode = f ? 1 : 0;
  }
})();
