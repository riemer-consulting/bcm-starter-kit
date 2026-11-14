function fmtMinutes(min) {
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

// Hell/Dunkel-Umschalter: je nach Raum/Beamer-Helligkeit per Klick wechselbar.
// Merkt sich die Wahl pro Browser/Geraet (localStorage), nicht serverseitig.
let currentTheme = 'dark';
try { currentTheme = localStorage.getItem('ttr-stage-theme') || 'dark'; } catch (e) {}
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('ttr-stage-theme', theme); } catch (e) {}
  updateLogoForTheme();
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});
let lastStageState = null;
function updateLogoForTheme() {
  if (!lastStageState) return;
  const logoEl = document.getElementById('company-logo');
  const src = currentTheme === 'light' ? lastStageState.companyLogo : lastStageState.companyLogoLight;
  if (src) { logoEl.src = src; logoEl.style.display = ''; } else { logoEl.style.display = 'none'; }
}
applyTheme(currentTheme);

// Sound-Unterstützung: Browser blockieren Audio mit Ton ohne vorherigen
// Klick, daher der "Ton aktivieren"-Button. Danach übernimmt refresh()
// automatisch: Ambient-Loop in der Vorlaufzeit, Ein-Mal-Sound pro Lagekarte.
let soundEnabled = false;
let lastLagekarteId = null;
let lastReplay = null; // Zaehler aus der Moderation: "Ton noch einmal abspielen"
const ambientAudio = document.getElementById('ambient-audio');
const eventAudio = document.getElementById('event-audio');
// Jedes Buehnenfenster hat eine eigene Kennung; Ton spielt nur das Fenster,
// das ihn zuletzt aktiviert hat.
const stageId = Math.random().toString(36).slice(2) + Date.now().toString(36);
let isSoundOwner = false;
function claimSound() {
  fetch('/api/stage/sound-claim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: stageId }) }).catch(() => {});
  isSoundOwner = true;
}
document.getElementById('sound-elsewhere').addEventListener('click', () => { claimSound(); lastLagekarteId = null; refresh(); });
document.getElementById('btn-enable-sound').addEventListener('click', () => {
  claimSound();
  soundEnabled = true;
  document.getElementById('sound-unlock').style.display = 'none';
  ambientAudio.play().catch(() => {});
  // Den Ereignis-Kanal NICHT per play()/pause() "freischalten": Ohne geladene
  // Datei bleibt dieses play() haengen und das pause() traefe spaeter genau
  // den ersten echten Krisenton. Der Klick selbst genuegt dem Browser.
  refresh();
});

function applySound(s) {
  if (!soundEnabled) return;
  // Hat ein anderes Fenster den Ton uebernommen: hier stumm schalten.
  if (!s.soundOwner) claimSound(); // z. B. nach Server-Neustart
  isSoundOwner = !s.soundOwner || s.soundOwner === stageId;
  document.getElementById('sound-elsewhere').style.display = isSoundOwner ? 'none' : '';
  if (!isSoundOwner) {
    if (!ambientAudio.paused) ambientAudio.pause();
    if (!eventAudio.paused) eventAudio.pause();
    lastLagekarteId = null;
    lastReplay = s.soundReplay || 0;
    return;
  }
  const replay = s.soundReplay || 0;
  const replayRequested = lastReplay !== null && replay !== lastReplay;
  lastReplay = replay;
  if (s.status === 'ended') {
    if (!ambientAudio.paused) ambientAudio.pause();
    if (!eventAudio.paused) eventAudio.pause();
    lastLagekarteId = null;
    return;
  }
  const idle = s.idleSound;
  const lk = s.currentLagekarte;
  if (!lk) {
    if (idle && ambientAudio.getAttribute('src') !== idle.src) {
      ambientAudio.src = idle.src;
      ambientAudio.volume = idle.volume != null ? idle.volume : 0.5;
      ambientAudio.play().catch(() => {});
    } else if (idle && ambientAudio.paused) {
      ambientAudio.play().catch(() => {});
    }
    lastLagekarteId = null;
    return;
  }
  // Vorboten ohne eigenen Ton: das ruhige "alles laeuft"-Geraeusch laeuft
  // weiter -- der Kontrast kommt erst mit dem Ausbruch.
  if (lk.akt === 'vorboten' && !lk.sound) {
    if (idle && ambientAudio.getAttribute('src') !== idle.src) {
      ambientAudio.src = idle.src;
      ambientAudio.volume = idle.volume != null ? idle.volume : 0.5;
    }
    if (idle && ambientAudio.paused) ambientAudio.play().catch(() => {});
    lastLagekarteId = lk.id;
    return;
  }
  if (!ambientAudio.paused) ambientAudio.pause();
  if (lk.sound && (lk.id !== lastLagekarteId || replayRequested)) {
    eventAudio.src = lk.sound.src;
    eventAudio.currentTime = 0;
    eventAudio.loop = !!lk.sound.loop;
    eventAudio.volume = lk.sound.volume != null ? lk.sound.volume : 0.7;
    eventAudio.play().catch(() => {});
  }
  lastLagekarteId = lk.id;
}

async function refresh() {
  let s;
  try { s = await (await fetch('/api/run/stage-state')).json(); }
  catch (e) { return; }

  applySound(s);

  document.getElementById('company-name').textContent = s.companyName || 'BCM Tabletop-Regie';
  lastStageState = s;
  updateLogoForTheme();
  document.getElementById('company-facts').textContent = s.companyFacts || '';
  document.getElementById('clock-time').textContent = fmtMinutes(s.elapsedMinutes);
  document.getElementById('elapsed-label').textContent = Math.round(s.elapsedMinutes) + ' / ' + Math.round(s.totalPlannedMinutes) + ' Min.';
  document.getElementById('progress-label').textContent = s.lagekartenGezeigt + ' / ' + s.lagekartenTotal + ' Lagekarten';
  const pct = s.totalPlannedMinutes ? Math.min(100, (s.elapsedMinutes / s.totalPlannedMinutes) * 100) : 0;
  document.getElementById('progress-fill').style.width = pct + '%';

  const content = document.getElementById('content');
  const statusLabel = document.getElementById('status-label');

  if (s.status === 'idle') {
    // Auch vor der Vorbereitung: das Unternehmen im Normalbetrieb zeigen,
    // nicht einen leeren "Bereit"-Bildschirm.
    statusLabel.textContent = 'Normalbetrieb';
    const idleMediaHtml = s.idleMedia ? renderMedia(s.idleMedia, true) : '';
    content.innerHTML = `<div class="idle"><h1>${escapeHtml(s.companyName || 'Ruhe vor dem Sturm')}</h1>${idleMediaHtml}<p style="color:var(--muted);font-size:14px;">Alles läuft. Die Übung wird gleich vorbereitet.</p></div>`;
    return;
  }
  if (s.status === 'paused') statusLabel.textContent = 'Pausiert';
  else if (s.status === 'ended') statusLabel.textContent = 'Beendet';
  else if (s.status === 'briefing') statusLabel.textContent = 'Vorbereitung';
  else if (s.status === 'countdown') statusLabel.textContent = 'Start in Kürze';
  else statusLabel.textContent = 'Krisenzeit';

  if (s.status === 'ended') {
    if (s.finale) {
      statusLabel.textContent = 'Abschluss';
      document.getElementById('progress-label').textContent = 'Abschluss ' + s.finale.step + ' / ' + s.finale.steps;
      document.getElementById('progress-fill').style.width = Math.round(s.finale.step / s.finale.steps * 100) + '%';
      renderFinale(s.finale);
      return;
    }
    lastFinaleKey = null;
    content.innerHTML = '<div class="ended"><h1>Übung beendet.</h1><p class="muted">Debriefing beginnt jetzt.</p></div>';
    return;
  }
  lastFinaleKey = null;

  const lk = s.currentLagekarte;
  if (!lk) {
    const idleMediaHtml = s.idleMedia ? renderMedia(s.idleMedia, true) : '';
    const introText = s.eroeffnungstext ? `<p class="text" style="max-width:820px;">${escapeHtml(s.eroeffnungstext)}</p>` : '';
    const heading = s.status === 'briefing' ? 'Ruhe vor dem Sturm'
      : s.status === 'countdown' ? `Die Krise beginnt in ${s.crisisCountdownSeconds}s …`
      : 'Die Krise beginnt gleich …';
    content.innerHTML = `<div class="idle"><h1>${heading}</h1>${introText}${idleMediaHtml}</div>`;
    return;
  }
  const vorbote = lk.akt === 'vorboten';
  const krisenHtml = lk.kriseninfo ? `<div class="krisen">${escapeHtml(lk.kriseninfo)}</div>` : '';
  const aufgabeHtml = (lk.aufgabe || []).map(a => `<li>${escapeHtml(a)}</li>`).join('');
  const mediaHtml = lk.media ? renderMedia(lk.media) : '';
  content.innerHTML = `
    <div class="simzeit">${escapeHtml(lk.simZeit)} · ${vorbote ? 'Meldung' : 'Lagekarte'} ${lk.laufendeNr || lk.nr}${s.lagekartenTotal ? ' von ' + s.lagekartenTotal : ''}</div>
    <div class="titel">${escapeHtml(lk.titel)}</div>
    <div class="text">${escapeHtml(lk.text)}</div>
    ${krisenHtml}
    ${mediaHtml}
    <ul class="aufgabe">${aufgabeHtml}</ul>
  `;
}

// ---- Abschluss: Nacharbeiten und Rechnung ----
// Nur neu zeichnen, wenn sich der Schritt aendert -- sonst startet die
// Einblend-Animation jede Sekunde neu.
let lastFinaleKey = null;
const euro = n => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const monate = m => m >= 12
  ? new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(m / 12) + (m < 18 ? ' Jahr' : ' Jahren')
  : new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(m) + (m < 1.5 ? ' Monat' : ' Monaten');
const prozent = n => new Intl.NumberFormat('de-DE', { style: 'percent', maximumFractionDigits: 0 }).format(n);
function renderFinale(f) {
  const key = JSON.stringify(f);
  if (key === lastFinaleKey) return;
  lastFinaleKey = key;
  const content = document.getElementById('content');
  const hinweis = f.hinweis ? `<div class="fin-hinweis">${escapeHtml(f.hinweis)}</div>` : '';
  let body = '';
  if (f.phase === 'intro') {
    body = `<div class="fin-center">
      <div class="fin-kicker">Und dann läuft alles wieder …</div>
      <div class="fin-titel">${escapeHtml(f.titel)}</div>
      <div class="fin-text">${escapeHtml(f.einleitung || '')}</div></div>`;
  } else if (f.phase === 'nacharbeiten') {
    body = `<div class="fin-kicker">Was jetzt noch vor uns liegt</div>
      <div class="fin-h">${escapeHtml(f.titel)}</div>
      <div class="fin-grid">${f.nacharbeiten.map((n, i) => `
        <div class="fin-item${i === f.nacharbeiten.length - 1 ? ' neu' : ''}">
          <div class="fin-zahl">${escapeHtml(n.zahl)}</div>
          <div class="fin-itemtext">${escapeHtml(n.text)}</div>
        </div>`).join('')}</div>`;
  } else if (f.phase === 'rechnung' || f.phase === 'bilanz' || f.phase === 'aha') {
    const letzter = f.phase === 'rechnung' ? f.posten[f.posten.length - 1] : null;
    const rows = f.posten.map((p, i) => `
      <tr class="${f.phase === 'rechnung' && i === f.posten.length - 1 ? 'neu' : ''}">
        <td>${escapeHtml(p.posten)}${p.optional ? ' <span class="fin-tag">Entscheidung in der Übung</span>' : ''}</td>
        <td class="num">${euro(p.betrag)}</td></tr>`).join('');
    let unten = '';
    if (f.phase === 'rechnung') {
      unten = `<div class="fin-stat"><div class="k">Zwischensumme</div><div class="v rot">${euro(f.laufendeSumme)}</div></div>` +
        (letzter && letzter.bcmHebel ? `<div class="fin-hebel"><b>Was vorher geholfen hätte:</b> ${escapeHtml(letzter.bcmHebel)}</div>` : '');
    } else {
      const b = f.bilanz;
      unten = `<div class="fin-stat"><div class="k">Gesamtschaden</div><div class="v">${euro(b.summe)}</div></div>
        <div class="fin-stat"><div class="k">${escapeHtml(b.versicherungText || 'Versicherung')}</div><div class="v">− ${euro(b.versicherung)}</div></div>
        <div class="fin-stat eigen"><div class="k">Bleibt beim Unternehmen</div><div class="v rot">${euro(b.eigenanteil)}</div></div>`;
    }
    const tabelle = `<table class="fin-tabelle">${rows}</table>`;
    if (f.phase === 'aha' && f.aha) {
      const a = f.aha;
      body = `<div class="fin-kicker">Was das wirklich bedeutet</div>
        <div class="fin-aha">
          <div class="fin-aha-zahl">${prozent(a.anteilJahresgewinn)}</div>
          <div class="fin-aha-text">des Jahresgewinns sind weg<br><span style="color:var(--muted);">(${euro(a.eigenanteil)} von ca. ${euro(a.jahresgewinn)})</span></div>
        </div>
        <div class="fin-aha">
          <div class="fin-aha-zahl">${euro(a.noetigerZusatzumsatz)}</div>
          <div class="fin-aha-text">zusätzlicher Umsatz ist nötig, um diesen Schaden bei ${prozent(a.umsatzrendite)} Umsatzrendite wieder zu verdienen – so viel, wie das ganze Unternehmen in ${monate(a.noetigerZusatzumsatz / a.jahresumsatz * 12)} umsetzt.</div>
        </div>`;
    } else {
      body = `<div class="fin-kicker">${f.phase === 'bilanz' ? 'Die Bilanz' : 'Die Rechnung – was der Ausfall wirklich kostet'}</div>
        <div class="fin-cols"><div>${tabelle}</div><div>${unten}</div></div>`;
    }
  } else if (f.phase === 'fazit') {
    body = `<div class="fin-center"><div class="fin-fazit">${escapeHtml(f.fazit || '')}</div></div>`;
  }
  content.innerHTML = `<div class="finale">${body}${hinweis}</div>`;
}

function renderMedia(media, gross) {
  if (gross && media.type !== 'video') {
    const src = escapeHtml(media.src || '');
    const cap = media.caption ? `<div style="color:var(--muted);font-size:15px;margin-top:8px;">${escapeHtml(media.caption)}</div>` : '';
    return `<div style="margin:8px 0 12px;width:100%;max-width:1100px;flex-shrink:0;"><img src="${src}" alt="${escapeHtml(media.caption || '')}" style="width:100%;max-height:46vh;object-fit:contain;border-radius:10px;display:block;">${cap}</div>`;
  }
  const src = escapeHtml(media.src || '');
  const caption = media.caption ? `<div style="color:var(--muted);font-size:14px;margin-top:6px;">${escapeHtml(media.caption)}</div>` : '';
  // max-height statt fixer Breite: verhindert, dass ein hohes Bild zusammen
  // mit Text/Aufgaben den verfügbaren Platz sprengt (siehe .content overflow-y).
  if (media.type === 'video') {
    return `<div style="margin:0 0 16px;max-width:960px;flex-shrink:0;"><video src="${src}" controls autoplay style="max-width:100%;max-height:40vh;border-radius:8px;"></video>${caption}</div>`;
  }
  // Hochformat (z. B. Social-Media-Beitrag) darf hoeher werden, sonst ist er kaum lesbar.
  const maxH = media.hochformat ? '58vh' : '40vh';
  return `<div style="margin:0 0 16px;max-width:960px;flex-shrink:0;"><img src="${src}" style="max-width:100%;max-height:${maxH};border-radius:8px;display:block;">${caption}</div>`;
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

refresh();
setInterval(refresh, 1000);
