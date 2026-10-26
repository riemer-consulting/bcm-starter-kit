function fmtMinutes(min) {
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

// Sound-Unterstützung: Browser blockieren Audio mit Ton ohne vorherigen
// Klick, daher der "Ton aktivieren"-Button. Danach übernimmt refresh()
// automatisch: Ambient-Loop in der Vorlaufzeit, Ein-Mal-Sound pro Lagekarte.
let soundEnabled = false;
let lastLagekarteId = null;
const ambientAudio = document.getElementById('ambient-audio');
const eventAudio = document.getElementById('event-audio');
document.getElementById('btn-enable-sound').addEventListener('click', () => {
  soundEnabled = true;
  document.getElementById('sound-unlock').style.display = 'none';
  ambientAudio.play().catch(() => {});
  eventAudio.play().then(() => eventAudio.pause()).catch(() => {});
});

function applySound(s) {
  if (!soundEnabled) return;
  if (s.status === 'idle' || s.status === 'ended') {
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
  if (!ambientAudio.paused) ambientAudio.pause();
  if (lk.sound && lk.id !== lastLagekarteId) {
    eventAudio.src = lk.sound.src;
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
  document.getElementById('company-facts').textContent = s.companyFacts || '';
  document.getElementById('clock-time').textContent = fmtMinutes(s.elapsedMinutes);
  document.getElementById('elapsed-label').textContent = Math.round(s.elapsedMinutes) + ' / ' + Math.round(s.totalPlannedMinutes) + ' Min.';
  document.getElementById('progress-label').textContent = s.lagekartenGezeigt + ' / ' + s.lagekartenTotal + ' Lagekarten';
  const pct = s.totalPlannedMinutes ? Math.min(100, (s.elapsedMinutes / s.totalPlannedMinutes) * 100) : 0;
  document.getElementById('progress-fill').style.width = pct + '%';

  const content = document.getElementById('content');
  const statusLabel = document.getElementById('status-label');

  if (s.status === 'idle') {
    statusLabel.textContent = 'Bereit';
    content.innerHTML = '<div class="idle"><h1>Bereit.</h1><p class="muted">Die Übung startet im Setup.</p></div>';
    return;
  }
  if (s.status === 'paused') statusLabel.textContent = 'Pausiert';
  else if (s.status === 'ended') statusLabel.textContent = 'Beendet';
  else if (s.status === 'briefing') statusLabel.textContent = 'Vorbereitung';
  else statusLabel.textContent = 'Krisenzeit';

  if (s.status === 'ended') {
    content.innerHTML = '<div class="ended"><h1>Übung beendet.</h1><p class="muted">Debriefing beginnt jetzt.</p></div>';
    return;
  }

  const lk = s.currentLagekarte;
  if (!lk) {
    const idleMediaHtml = s.idleMedia ? renderMedia(s.idleMedia) : '';
    const introText = s.eroeffnungstext ? `<p class="text" style="max-width:820px;">${escapeHtml(s.eroeffnungstext)}</p>` : '';
    const heading = s.status === 'briefing' ? 'Ruhe vor dem Sturm' : 'Die Krise beginnt gleich …';
    content.innerHTML = `<div class="idle"><h1>${heading}</h1>${introText}${idleMediaHtml}</div>`;
    return;
  }
  const krisenHtml = lk.kriseninfo ? `<div class="krisen">${escapeHtml(lk.kriseninfo)}</div>` : '';
  const aufgabeHtml = (lk.aufgabe || []).map(a => `<li>${escapeHtml(a)}</li>`).join('');
  const mediaHtml = lk.media ? renderMedia(lk.media) : '';
  content.innerHTML = `
    <div class="simzeit">${escapeHtml(lk.simZeit)} · Lagekarte ${lk.nr}</div>
    <div class="titel">${escapeHtml(lk.titel)}</div>
    <div class="text">${escapeHtml(lk.text)}</div>
    ${krisenHtml}
    ${mediaHtml}
    <ul class="aufgabe">${aufgabeHtml}</ul>
  `;
}

function renderMedia(media) {
  const src = escapeHtml(media.src || '');
  const caption = media.caption ? `<div class="muted" style="font-size:14px;margin-top:6px;">${escapeHtml(media.caption)}</div>` : '';
  // max-height statt fixer Breite: verhindert, dass ein hohes Bild zusammen
  // mit Text/Aufgaben den verfügbaren Platz sprengt (siehe .content overflow-y).
  if (media.type === 'video') {
    return `<div style="margin:0 0 16px;max-width:720px;flex-shrink:0;"><video src="${src}" controls autoplay style="max-width:100%;max-height:34vh;border-radius:8px;"></video>${caption}</div>`;
  }
  return `<div style="margin:0 0 16px;max-width:720px;flex-shrink:0;"><img src="${src}" style="max-width:100%;max-height:34vh;border-radius:8px;display:block;">${caption}</div>`;
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

refresh();
setInterval(refresh, 1000);
