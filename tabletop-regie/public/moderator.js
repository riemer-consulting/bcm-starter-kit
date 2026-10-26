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

function render(s) {
  lastState = s;
  const scenario = s.scenario;

  document.getElementById('m-title').textContent = scenario.title;
  const statusBadge = document.getElementById('m-status');
  statusBadge.textContent = s.status;
  statusBadge.className = 'badge ' + (s.status === 'running' ? 'ok' : s.status === 'ended' ? 'bad' : 'warn');
  document.getElementById('m-elapsed').textContent = `${s.elapsedMinutes} / ${s.totalPlannedMinutes} Min.`;
  const modeLabel = s.durationMode === 'target' ? `Zieldauer ${s.targetMinutes} Min. (${s.difficulty})`
    : s.durationMode === 'computed' ? `Berechnet (${s.difficulty})` : 'Erprobte feste Zeiten';
  document.getElementById('m-mode').textContent = `Modus: ${modeLabel}`;
  document.getElementById('m-roles').textContent = `${s.activeRoleGroups} aktive Funktionsbereiche`;

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
        <button class="secondary promote-event" data-type="${ev.type}" data-id="${ev.id}">Trotzdem aufnehmen</button>
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
  } else {
    lkBox.textContent = s.status === 'idle' ? 'Noch nicht gestartet.' : s.status === 'ended' ? 'Übung beendet.' : 'Noch keine Lagekarte fällig.';
  }

  // Naechste Ereignisse
  document.getElementById('m-upcoming').innerHTML = s.upcoming.map(ev => `
    <tr><td>${ev.minute}</td><td>${ev.type === 'lagekarte' ? 'Lagekarte' : 'Sonderlagekarte'}</td><td>${escapeHtml(ev.titel)}</td></tr>
  `).join('') || '<tr><td colspan="3" class="muted">Keine weiteren geplanten Ereignisse.</td></tr>';

  // Manuell ausloesbare Sonderlagekarten — zeigt den echten, zugeordneten
  // Teilnehmernamen, wenn vorhanden, sonst die Funktionsbezeichnung der Rolle.
  function roleLabel(role, participants) {
    const p = participantFor(role.id, participants);
    return p && p.name ? `${escapeHtml(p.name)} (${escapeHtml(role.funktion)})` : escapeHtml(role.funktion);
  }
  document.getElementById('m-unscheduled-sk').innerHTML = s.unscheduledSonderlagekarten.map(sk => {
    const role = scenario.roles.find(r => r.id === sk.empfaenger);
    return `<div class="row" style="justify-content:space-between;margin-bottom:6px;">
      <span class="mini">${sk.id} — für ${roleLabel(role, s.participants)}</span>
      <button class="secondary fire-sk" data-id="${sk.id}">Jetzt auslösen</button>
    </div>`;
  }).join('') || '<p class="muted mini">Keine offenen Karten.</p>';

  document.getElementById('m-bonus').innerHTML = scenario.bonuskarten.map(b => {
    const role = scenario.roles.find(r => r.id === b.empfaenger);
    const fired = b.fired;
    return `<div class="row" style="justify-content:space-between;margin-bottom:6px;">
      <span class="mini">${b.id} — für ${roleLabel(role, s.participants)}: ${escapeHtml(b.text)}</span>
      <button class="secondary fire-bonus" data-id="${b.id}" ${fired ? 'disabled' : ''}>${fired ? 'Ausgelöst' : 'Auslösen'}</button>
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
  document.getElementById('m-bewertung-body').innerHTML = scenario.roles.map(role => {
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

  // Urkunden
  document.getElementById('m-certs').innerHTML = scenario.roles.map(role => {
    const p = participantFor(role.id, s.participants);
    if (!p || !p.name) return '';
    return `<div class="row" style="justify-content:space-between;"><span class="mini">${escapeHtml(p.name)} (${escapeHtml(role.funktion)})</span>
      <a href="/api/certificate/${role.id}" target="_blank"><button class="secondary">Urkunde öffnen</button></a></div>`;
  }).join('') || '<p class="muted mini">Teilnehmer im Setup eintragen, um Urkunden zu erzeugen.</p>';
}

async function refresh() {
  try { render(await api('/api/run/moderator-state')); } catch (e) { /* Server evtl. kurz nicht erreichbar */ }
}

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
