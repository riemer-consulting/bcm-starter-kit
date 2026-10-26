function fmtMinutes(min) {
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

async function refresh() {
  let s;
  try { s = await (await fetch('/api/run/stage-state')).json(); }
  catch (e) { return; }

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
  else statusLabel.textContent = 'Krisenzeit';

  if (s.status === 'ended') {
    content.innerHTML = '<div class="ended"><h1>Übung beendet.</h1><p class="muted">Debriefing beginnt jetzt.</p></div>';
    return;
  }

  const lk = s.currentLagekarte;
  if (!lk) {
    content.innerHTML = s.eroeffnungstext
      ? `<div class="idle"><h1>Die Krise beginnt gleich …</h1><p class="text" style="max-width:820px;">${escapeHtml(s.eroeffnungstext)}</p></div>`
      : '<div class="idle"><h1>Die Krise beginnt gleich …</h1></div>';
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
  if (media.type === 'video') {
    return `<div style="margin:0 0 20px;max-width:720px;"><video src="${src}" controls autoplay style="width:100%;border-radius:8px;"></video>${caption}</div>`;
  }
  return `<div style="margin:0 0 20px;max-width:720px;"><img src="${src}" style="width:100%;border-radius:8px;">${caption}</div>`;
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

refresh();
setInterval(refresh, 1000);
