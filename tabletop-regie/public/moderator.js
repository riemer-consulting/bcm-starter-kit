function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

let lastState = null;

async function api(path, opts) {
  const res = await fetch(path, opts);
  return res.json();
}

function participantFor(roleId, participants) {
  return participants.find(p => (p.roleIds || []).includes(roleId));
}

// Prozessablauf-Zeitleiste + freier Zeit-Schieberegler: zeigt alle geplanten
// Ereignisse auf einen Blick (erledigt/aktuell/kommend) und erlaubt, direkt
// auf jede beliebige Minute zu springen — nicht nur auf die naechsten paar
// vordefinierten Ereignisse. Waehrend der Nutzer zieht, ueberschreibt das
// 2-Sekunden-Polling den Regler nicht (timelineDragging-Flag).
let timelineDragging = false;
const timelineSlider = document.getElementById('timeline-slider');
timelineSlider.addEventListener('pointerdown', () => { timelineDragging = true; });
timelineSlider.addEventListener('input', () => {
  document.getElementById('timeline-drag-label').textContent = `Springe zu: ${Number(timelineSlider.value).toFixed(1)} Min. …`;
});
timelineSlider.addEventListener('change', () => {
  api('/api/run/jump-to-minute', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ minute: Number(timelineSlider.value) }) })
    .then(() => { timelineDragging = false; document.getElementById('timeline-drag-label').textContent = ''; refresh(); });
});
document.addEventListener('pointerup', () => { timelineDragging = false; });

function renderTimeline(s) {
  const total = s.totalPlannedMinutes || 1;
  document.getElementById('timeline-label').textContent = `${s.elapsedMinutes} / ${s.totalPlannedMinutes} Min.`;
  const track = document.getElementById('timeline-track');
  const markersHtml = (s.fullTimeline || []).map(ev => {
    const pct = Math.min(100, Math.max(0, (ev.minute / total) * 100));
    const cls = ['marker', ev.type, ev.fired ? 'fired' : '', ev.isCurrent ? 'current' : ''].filter(Boolean).join(' ');
    return `<div class="${cls}" style="left:${pct}%" title="${escapeHtml(ev.minute + ' Min.: ' + ev.titel)}"></div>`;
  }).join('');
  const nowPct = Math.min(100, Math.max(0, (s.elapsedMinutes / total) * 100));
  track.innerHTML = markersHtml + `<div class="timeline-now" style="left:${nowPct}%"></div>`;
  if (!timelineDragging) {
    timelineSlider.max = total;
    timelineSlider.value = s.elapsedMinutes;
  }
  const canJump = s.status === 'running' || s.status === 'paused';
  timelineSlider.disabled = !canJump;
}

function render(s) {
  lastState = s;
  const scenario = s.scenario;

  document.getElementById('m-title').textContent = scenario.title;
  const statusBadge = document.getElementById('m-status');
  statusBadge.textContent = s.status === 'briefing' ? 'Vorbereitung' : s.status;
  statusBadge.className = 'badge ' + (s.status === 'running' ? 'ok' : s.status === 'ended' ? 'bad' : 'warn');
  document.getElementById('btn-begin-crisis').style.display = s.status === 'briefing' ? '' : 'none';
  document.getElementById('btn-pause').style.display = s.status === 'running' ? '' : 'none';
  document.getElementById('btn-resume').style.display = s.status === 'paused' ? '' : 'none';
  document.getElementById('m-elapsed').textContent = `${s.elapsedMinutes} / ${s.totalPlannedMinutes} Min.`;
  const modeLabel = s.durationMode === 'target' ? `Zieldauer ${s.targetMinutes} Min. (${s.difficulty})`
    : s.durationMode === 'computed' ? `Berechnet (${s.difficulty})` : 'Erprobte feste Zeiten';
  document.getElementById('m-mode').textContent = `Modus: ${modeLabel}`;
  document.getElementById('m-roles').textContent = `${s.activeRoleGroups} aktive Funktionsbereiche`;

  renderTimeline(s);

  const warnCard = document.getElementById('m-schedule-warning-card');
  if (s.scheduleWarning) {
    warnCard.style.display = '';
    document.getElementById('m-schedule-warning').textContent = s.scheduleWarning;
  } else {
    warnCard.style.display = 'none';
  }

  const skippedCard = document.getElementById('m-skipped-card');
  if (s.skipped && s.skipped.length > 0) {
    skippedCard.style.display = '';
    document.getElementById('m-skipped').innerHTML = s.skipped.map(ev => `
      <div class="row" style="justify-content:space-between;margin-bottom:6px;">
        <span class="mini">${escapeHtml(ev.titel)} <span class="muted">— ${escapeHtml(ev.reason)}</span></span>
        <button class="secondary promote-event" data-type="${ev.type}" data-id="${ev.id}" title="Nimmt diese aus Zeitgründen übersprungene Karte doch noch mit auf — wird sofort angezeigt/versendet.">Trotzdem aufnehmen</button>
      </div>`).join('');
  } else {
    skippedCard.style.display = 'none';
  }

  // Aktuelle Lagekarte
  const lkBox = document.getElementById('m-current-lk');
  if (s.currentLagekarte) {
    const lk = s.currentLagekarte;
    lkBox.innerHTML = `<b>${escapeHtml(lk.simZeit)} · ${escapeHtml(lk.titel)}</b><p>${escapeHtml(lk.text)}</p>` +
      (lk.moderatorHinweis ? `<p class="mini" style="color:var(--warn);">Moderatorhinweis: ${escapeHtml(lk.moderatorHinweis)}</p>` : '');
  } else if (s.status === 'running' || s.status === 'briefing') {
    const mf = scenario.moderationsleitfaden;
    const next = s.upcoming[0];
    const minsToNext = next ? Math.max(0, Math.round((next.minute - s.elapsedMinutes) * 10) / 10) : null;
    const timingNote = s.status === 'briefing'
      ? '<p class="mini" style="color:var(--ok);">Der Krisentimer läuft noch nicht. Lies Begrüßung und Eröffnung in Ruhe vor, klicke erst danach oben auf "Jetzt beginnt die Krise".</p>'
      : (next ? `<p class="mini muted">Erste Lagekarte in ca. ${minsToNext} Min.: ${escapeHtml(next.titel)}</p>` : '');
    lkBox.innerHTML = `
      <p class="mini" style="color:var(--warn);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Jetzt vorlesen — die Krise hat noch nicht begonnen</p>
      <p><b>Begrüßung:</b> ${escapeHtml(mf.begruessung)}</p>
      ${mf.eroeffnungstext ? `<p><b>Eröffnung (auch auf der Bühne sichtbar):</b> ${escapeHtml(mf.eroeffnungstext)}</p>` : ''}
      ${timingNote}
    `;
  } else {
    lkBox.textContent = s.status === 'idle' ? 'Noch nicht gestartet.' : s.status === 'paused' ? 'Pausiert.' : 'Übung beendet.';
  }

  // Naechste Ereignisse — "Zeitsprung hierhin" ueberspringt Leerlauf oder
  // springt gezielt zu einer bestimmten Karte, wenn eine Diskussion kuerzer
  // oder laenger lief als geplant.
  document.getElementById('m-upcoming').innerHTML = s.upcoming.map(ev => `
    <tr><td>${ev.minute}</td><td>${ev.type === 'lagekarte' ? 'Lagekarte' : 'Sonderlagekarte'}</td><td>${escapeHtml(ev.titel)}</td>
      <td><button class="secondary jump-to-event" data-type="${ev.type}" data-id="${ev.id}" title="Springt direkt auf diese Karte — fällig werdende Sonderlagekarten dazwischen werden dabei mit ausgelöst/verschickt.">Zeitsprung hierhin</button></td></tr>
  `).join('') || '<tr><td colspan="4" class="muted">Keine weiteren geplanten Ereignisse.</td></tr>';

  // Manuell ausloesbare Sonderlagekarten — zeigt den echten, zugeordneten
  // Teilnehmernamen, wenn vorhanden, sonst die Funktionsbezeichnung der Rolle.
  // Rollen, die fuer diesen Lauf nicht aktiv sind, werden hier ausgeblendet.
  const activeRoleIds = s.activeRoleIds || scenario.roles.map(r => r.id);
  function roleLabel(role, participants) {
    const p = participantFor(role.id, participants);
    return p && p.name ? `${escapeHtml(p.name)} (${escapeHtml(role.funktion)})` : escapeHtml(role.funktion);
  }
  document.getElementById('m-unscheduled-sk').innerHTML = s.unscheduledSonderlagekarten.filter(sk => activeRoleIds.includes(sk.empfaenger)).map(sk => {
    const role = scenario.roles.find(r => r.id === sk.empfaenger);
    return `<div class="row" style="justify-content:space-between;margin-bottom:6px;">
      <span class="mini">${sk.id} — für ${roleLabel(role, s.participants)}</span>
      <button class="secondary fire-sk" data-id="${sk.id}" title="Verschickt diese vertrauliche Sonderlagekarte sofort per E-Mail an die zugeordnete Person.">Jetzt auslösen</button>
    </div>`;
  }).join('') || '<p class="muted mini">Keine offenen Karten.</p>';

  document.getElementById('m-bonus').innerHTML = scenario.bonuskarten.filter(b => activeRoleIds.includes(b.empfaenger)).map(b => {
    const role = scenario.roles.find(r => r.id === b.empfaenger);
    const fired = b.fired;
    return `<div class="row" style="justify-content:space-between;margin-bottom:6px;">
      <span class="mini">${b.id} — für ${roleLabel(role, s.participants)}: ${escapeHtml(b.text)}</span>
      <button class="secondary fire-bonus" data-id="${b.id}" ${fired ? 'disabled' : ''} title="Löst dieses optionale Zusatzereignis manuell aus — nur bei Bedarf für mehr Dynamik einsetzen.">${fired ? 'Ausgelöst' : 'Auslösen'}</button>
    </div>`;
  }).join('');

  // Versand-Log
  document.getElementById('m-log').innerHTML = s.log.map(l =>
    `<div class="log-entry ${l.type}">${new Date(l.ts).toLocaleTimeString('de-DE')} — ${escapeHtml(l.message)}</div>`
  ).join('') || '<p class="muted mini">Noch keine Ereignisse.</p>';

  // Moderationsleitfaden
  const leitfaden = scenario.moderationsleitfaden;
  document.getElementById('m-leitfaden').innerHTML = `
    <p><b>Begrüßung:</b> ${escapeHtml(leitfaden.begruessung)}</p>
    <p><b>Moderationsregel:</b> ${escapeHtml(leitfaden.moderationsregel)}</p>
    <p><b>Debriefing-Fragen:</b></p>
    <ul>${leitfaden.debriefingFragen.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
    <p class="mini" style="color:var(--warn);">${escapeHtml(leitfaden.highlightHinweis)}</p>
  `;

  // Bewertungsmatrix
  const kriterien = scenario.bewertungskriterien;
  document.getElementById('m-bewertung-head').innerHTML = `<tr><th>Rolle</th><th>Teilnehmer</th>${kriterien.map(k => `<th>${k.slice(0,4)}.</th>`).join('')}<th>Ø</th></tr>`;
  document.getElementById('m-bewertung-body').innerHTML = scenario.roles.filter(role => activeRoleIds.includes(role.id) && role.id !== 'teilnehmer').map(role => {
    const p = participantFor(role.id, s.participants);
    const scores = s.bewertung[role.id] || {};
    const cells = kriterien.map(k => `
      <td><select class="score-select" data-role="${role.id}" data-kriterium="${k}">
        <option value="">–</option>
        ${[1,2,3,4,5].map(v => `<option value="${v}" ${scores[k]==v?'selected':''}>${v}</option>`).join('')}
      </select></td>`).join('');
    const values = Object.values(scores);
    const avg = values.length ? (values.reduce((a,b)=>a+b,0)/values.length).toFixed(1) : '–';
    return `<tr><td class="mini">${escapeHtml(role.funktion)}</td><td class="mini">${p ? escapeHtml(p.name) : '<span class="muted">nicht zugeordnet</span>'}</td>${cells}<td>${avg}</td></tr>`;
  }).join('');

  // Urkunden — werden direkt per E-Mail verschickt (kein Ausdrucken mehr).
  // Pro Person (nicht pro Rolle), damit auch mehrere "Teilnehmer" ohne feste
  // Funktion jeweils ihre eigene Urkunde bekommen.
  document.getElementById('m-certs').innerHTML = (s.participants || []).filter(p => p.name).map(p => {
    const rollenText = (p.roleIds || []).map(rid => { const r = scenario.roles.find(x => x.id === rid); return r ? r.funktion : rid; }).join(', ');
    return `<div class="row" style="justify-content:space-between;align-items:center;" data-id="${p.id}">
      <span class="mini">${escapeHtml(p.name)}${rollenText ? ' (' + escapeHtml(rollenText) + ')' : ''}</span>
      <span class="row" style="width:auto;">
        <a href="/api/certificate/participant/${p.id}" target="_blank"><button class="secondary" title="Zeigt die Urkunde dieser Person im Browser an, ohne sie zu verschicken.">Vorschau</button></a>
        <button class="send-cert" data-id="${p.id}" title="Verschickt die Urkunde per E-Mail an diese Person.">Per E-Mail senden</button>
        <span class="mini muted cert-status"></span>
      </span>
    </div>`;
  }).join('') || '<p class="muted mini">Teilnehmer im Setup eintragen, um Urkunden zu erzeugen.</p>';
}

async function refresh() {
  try { render(await api('/api/run/moderator-state')); } catch (e) { /* Server evtl. kurz nicht erreichbar */ }
}

document.getElementById('btn-begin-crisis').addEventListener('click', () => api('/api/run/begin-crisis', { method: 'POST' }).then(refresh));
document.getElementById('btn-pause').addEventListener('click', () => api('/api/run/pause', { method: 'POST' }).then(refresh));
document.getElementById('btn-resume').addEventListener('click', () => api('/api/run/resume', { method: 'POST' }).then(refresh));
document.getElementById('btn-reset').addEventListener('click', () => {
  if (confirm('Lauf wirklich zurücksetzen? Timer und ausgelöste Karten werden gelöscht, die Teilnehmerliste bleibt erhalten.')) {
    api('/api/run/reset', { method: 'POST' }).then(refresh);
  }
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('fire-sk')) {
    api('/api/run/fire-sonderkarte/' + e.target.dataset.id, { method: 'POST' }).then(refresh);
  }
  if (e.target.classList.contains('fire-bonus')) {
    api('/api/run/fire-bonuskarte/' + e.target.dataset.id, { method: 'POST' }).then(refresh);
  }
  if (e.target.classList.contains('promote-event')) {
    api('/api/run/promote/' + e.target.dataset.type + '/' + e.target.dataset.id, { method: 'POST' }).then(refresh);
  }
  if (e.target.classList.contains('jump-to-event')) {
    api('/api/run/jump-to-event/' + e.target.dataset.type + '/' + e.target.dataset.id, { method: 'POST' }).then(refresh);
  }
  if (e.target.classList.contains('send-cert')) {
    const statusEl = e.target.closest('[data-id]').querySelector('.cert-status');
    statusEl.textContent = 'Sende …';
    api('/api/certificate/participant/' + e.target.dataset.id + '/send', { method: 'POST' }).then(r => {
      statusEl.textContent = r.ok ? 'Gesendet ✓' : 'Fehler: ' + r.error;
    });
  }
});
document.addEventListener('change', e => {
  if (e.target.classList.contains('score-select')) {
    api('/api/bewertung', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roleId: e.target.dataset.role, kriterium: e.target.dataset.kriterium, value: e.target.value || null })
    });
  }
});

refresh();
setInterval(refresh, 2000);
