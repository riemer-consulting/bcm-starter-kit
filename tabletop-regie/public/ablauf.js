function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function refresh() {
  let s;
  try { s = await (await fetch('/api/run/ablauf-state')).json(); } catch (e) { return; }

  document.getElementById('a-title').textContent = s.title || 'Ablauf & Hilfe';
  document.getElementById('a-status').textContent = s.companyName ? `${s.companyName} — Status: ${s.status}` : '';
  document.getElementById('a-begruessung').textContent = s.begruessung || 'Noch keine Begrüßung hinterlegt.';
  document.getElementById('a-regeln').innerHTML = (s.spielregeln || []).map(r => `<li>${escapeHtml(r)}</li>`).join('')
    || '<li class="muted">Keine Spielregeln hinterlegt.</li>';

  document.getElementById('a-lagekarten').innerHTML = (s.lagekartenGezeigt || []).map(lk => `
    <div class="lk-entry">
      <div class="meta">${escapeHtml(lk.simZeit)}</div>
      <h3 style="margin:0 0 6px;">${escapeHtml(lk.titel)}</h3>
      <p>${escapeHtml(lk.text)}</p>
      ${lk.kriseninfo ? `<p class="muted mini" style="font-size:13px;">${escapeHtml(lk.kriseninfo)}</p>` : ''}
    </div>
  `).join('') || '<p class="muted">Noch keine Lagekarte gezeigt — hier erscheint nach und nach, was schon auf der Bühne war.</p>';
}

refresh();
setInterval(refresh, 3000);
