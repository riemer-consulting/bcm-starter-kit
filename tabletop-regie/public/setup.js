let meta = null;
let participants = [];
let activeRoleIds = [];

// Nur aktive Rollen anbieten — reduziert die sonst immer komplette
// Rollenliste (15-20 Eintraege) auf das, was fuer diesen Lauf wirklich
// gebraucht wird.
function roleOptionsHtml(selectedIds) {
  selectedIds = selectedIds || [];
  return meta.roleGroups.map(g => {
    const members = g.members.filter(rid => activeRoleIds.includes(rid));
    if (members.length === 0) return '';
    const opts = members.map(rid => {
      const role = meta.roles.find(r => r.id === rid);
      const sel = selectedIds.includes(rid) ? 'selected' : '';
      return `<option value="${rid}" ${sel}>${role.funktion}</option>`;
    }).join('');
    return `<optgroup label="${g.label}">${opts}</optgroup>`;
  }).join('');
}

function activeRoles() {
  return meta.roles.filter(r => activeRoleIds.includes(r.id));
}

function renderRoleCheckboxes() {
  document.getElementById('role-checkboxes').innerHTML = meta.roleGroups.map(g => `
    <div style="margin-bottom:14px;">
      <div class="mini muted" style="margin-bottom:6px;text-transform:uppercase;letter-spacing:1px;">${g.label}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px 20px;">
        ${g.members.map(rid => {
          const role = meta.roles.find(r => r.id === rid);
          const checked = activeRoleIds.includes(rid) ? 'checked' : '';
          return `<label style="display:block;width:auto;">
            <span style="display:flex;align-items:center;gap:6px;font-size:13px;">
              <input type="checkbox" class="role-check" value="${rid}" ${checked} style="width:auto;flex-shrink:0;"> ${role.funktion}
            </span>
            ${role.beschreibung ? `<span class="mini muted" style="display:block;margin-left:22px;line-height:1.3;">${role.beschreibung}</span>` : ''}
          </label>`;
        }).join('')}
      </div>
    </div>
  `).join('');
  document.getElementById('btn-fill-full').textContent = `Alle ${activeRoleIds.length} aktiven Rollen anlegen`;
  const compactGroups = meta.roleGroups.filter(g => g.key !== 'krisenstab-support' && g.members.some(rid => activeRoleIds.includes(rid)));
  document.getElementById('btn-fill-compact').textContent = `Kompakt: ${compactGroups.length} Funktionsbereiche anlegen`;
}

async function saveActiveRoles() {
  await fetch('/api/active-roles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activeRoleIds) });
  renderRoleCheckboxes();
  renderParticipants();
}

// Rundenweise je ein Mitglied pro Funktionsbereich (Krisenstab-Unterstuetzung
// zuletzt) -- ergibt bei kleinen Teilnehmerzahlen eine breite fachliche
// Abdeckung statt z. B. nur lauter Vertriebsrollen.
function suggestRoleIds(count) {
  const groups = meta.roleGroups.filter(g => g.key !== 'krisenstab-support')
    .concat(meta.roleGroups.filter(g => g.key === 'krisenstab-support'));
  const picked = [];
  let round = 0;
  while (picked.length < count) {
    const before = picked.length;
    groups.forEach(g => {
      if (picked.length >= count) return;
      const member = g.members[round];
      if (member) picked.push(member);
    });
    if (picked.length === before) break; // alle Rollen ausgeschoepft
    round++;
  }
  return picked;
}

document.getElementById('role-checkboxes').addEventListener('change', e => {
  if (!e.target.classList.contains('role-check')) return;
  activeRoleIds = Array.from(document.querySelectorAll('.role-check:checked')).map(el => el.value);
  saveActiveRoles();
});
document.getElementById('btn-roles-all').addEventListener('click', () => {
  activeRoleIds = meta.roles.map(r => r.id);
  saveActiveRoles();
});
document.getElementById('btn-roles-none').addEventListener('click', () => {
  activeRoleIds = [];
  saveActiveRoles();
});
document.getElementById('btn-suggest-roles').addEventListener('click', () => {
  const count = Math.max(1, Number(document.getElementById('role-count-hint').value) || 1);
  activeRoleIds = suggestRoleIds(Math.min(count, meta.roles.length));
  document.getElementById('role-select-status').textContent = `${activeRoleIds.length} Rollen vorgeschlagen.`;
  saveActiveRoles();
});

function renderParticipants() {
  const body = document.getElementById('participants-body');
  body.innerHTML = participants.map((p, i) => `
    <tr data-idx="${i}">
      <td><input class="p-name" value="${p.name || ''}"></td>
      <td><input class="p-email" value="${p.email || ''}" placeholder="name@firma.de"></td>
      <td><select class="p-roles" multiple size="2" style="min-width:220px;">${roleOptionsHtml(p.roleIds)}</select></td>
      <td><button class="secondary p-remove" type="button">✕</button></td>
    </tr>`).join('');
  updateDurationPreview();
}

function collectParticipantsFromDom() {
  const rows = Array.from(document.querySelectorAll('#participants-body tr'));
  return rows.map((row, i) => ({
    id: participants[i] && participants[i].id,
    name: row.querySelector('.p-name').value,
    email: row.querySelector('.p-email').value,
    roleIds: Array.from(row.querySelector('.p-roles').selectedOptions).map(o => o.value)
  }));
}

function currentTargetMinutes() {
  const preset = document.getElementById('target-preset').value;
  if (preset === 'custom') return Number(document.getElementById('target-custom').value) || 90;
  return Number(preset);
}

async function updateDurationPreview() {
  const current = collectParticipantsFromDom();
  const allRoleIds = current.flatMap(p => p.roleIds);
  const assignedGroups = new Set();
  allRoleIds.forEach(rid => {
    const role = meta.roles.find(r => r.id === rid);
    if (role) assignedGroups.add(role.group);
  });
  const speakingGroups = meta.roleGroups.filter(g => assignedGroups.has(g.key) && g.key !== 'krisenstab-support');
  const mode = document.getElementById('duration-mode').value;
  const difficulty = document.getElementById('difficulty').value;

  document.getElementById('target-duration-row').style.display = mode === 'target' ? 'grid' : 'none';

  if (mode === 'target') {
    const targetMinutes = currentTargetMinutes();
    try {
      const r = await fetch('/api/preview-schedule', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetMinutes, difficulty, roleIds: allRoleIds })
      }).then(res => res.json());
      document.getElementById('duration-preview').textContent =
        `${current.length} Teilnehmer, ${r.activeRoleGroups} aktive Funktionsbereiche. ` +
        `Geplant: ${r.lagekartenCount} Lagekarten + ${r.sonderlagekartenCount} Sonderlagekarten (${r.skippedCount} entfallen), ` +
        `Gesamtzeit ca. ${r.totalMinutes} von ${targetMinutes} Min.`;
      document.getElementById('duration-preview-detail').textContent = r.warning || '';
      document.getElementById('duration-preview-detail').style.color = r.warning ? 'var(--warn)' : '';
    } catch (e) {
      document.getElementById('duration-preview').textContent = 'Vorschau konnte nicht geladen werden.';
    }
    return;
  }

  document.getElementById('duration-preview-detail').textContent = '';
  document.getElementById('duration-preview').textContent = mode === 'computed'
    ? `${current.length} Teilnehmer, ${speakingGroups.length} aktive Funktionsbereiche mit fester Sprechzeit. ` +
      `Vollständiges Drehbuch, je Lagekarte ca. ${(1 + speakingGroups.length * 0.5).toFixed(1)}–${(1 + speakingGroups.length * 0.5 + 6).toFixed(1)} Minuten, je nach Schwierigkeit.`
    : `${current.length} Teilnehmer, ${speakingGroups.length} aktive Funktionsbereiche. Feste, erprobte Zeiten (87 Min. Übungszeit für die Referenzgruppe).`;
}

document.addEventListener('input', e => { if (e.target.closest('#participants-body')) updateDurationPreview(); });
document.getElementById('duration-mode').addEventListener('change', updateDurationPreview);
document.getElementById('difficulty').addEventListener('change', updateDurationPreview);
document.getElementById('target-preset').addEventListener('change', () => {
  document.getElementById('target-custom-wrap').style.display = document.getElementById('target-preset').value === 'custom' ? 'block' : 'none';
  updateDurationPreview();
});
document.getElementById('target-custom').addEventListener('input', updateDurationPreview);

document.getElementById('btn-add-row').addEventListener('click', () => {
  participants = collectParticipantsFromDom();
  participants.push({ name: '', email: '', roleIds: [] });
  renderParticipants();
});
document.getElementById('btn-add-teilnehmer').addEventListener('click', async () => {
  const count = Math.max(1, Number(document.getElementById('teilnehmer-count').value) || 1);
  if (!activeRoleIds.includes('teilnehmer')) {
    activeRoleIds = activeRoleIds.concat(['teilnehmer']);
    await fetch('/api/active-roles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activeRoleIds) });
    renderRoleCheckboxes();
  }
  participants = collectParticipantsFromDom();
  for (let i = 0; i < count; i++) participants.push({ name: '', email: '', roleIds: ['teilnehmer'] });
  renderParticipants();
});
document.getElementById('participants-body').addEventListener('click', e => {
  if (e.target.classList.contains('p-remove')) {
    participants = collectParticipantsFromDom();
    const idx = Number(e.target.closest('tr').dataset.idx);
    participants.splice(idx, 1);
    renderParticipants();
  }
});
async function loadScenarioList() {
  const data = await (await fetch('/api/scenarios')).json();
  const select = document.getElementById('scenario-select');
  select.innerHTML = data.scenarios.map(s =>
    `<option value="${s.file}" ${s.file === data.active ? 'selected' : ''}>${s.title}${s.companyName ? ' — ' + s.companyName : ''}</option>`
  ).join('');
}
document.getElementById('btn-switch-scenario').addEventListener('click', async () => {
  const file = document.getElementById('scenario-select').value;
  if (!confirm('Szenario wirklich wechseln? Der aktuelle Lauf und die Teilnehmerliste werden dabei zurückgesetzt.')) return;
  const res = await fetch('/api/scenarios/select', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file }) });
  const r = await res.json();
  if (r.ok) {
    document.getElementById('scenario-switch-status').textContent = `Gewechselt zu: ${r.title}.`;
    await init();
  } else {
    document.getElementById('scenario-switch-status').textContent = 'Fehler: ' + r.error;
  }
});
document.getElementById('btn-fill-full').addEventListener('click', () => {
  participants = activeRoles().map(r => ({ name: '', email: '', roleIds: [r.id] }));
  renderParticipants();
});
document.getElementById('btn-fill-compact').addEventListener('click', () => {
  participants = meta.roleGroups.filter(g => g.key !== 'krisenstab-support').map(g => ({ name: '', email: '', roleIds: g.members.filter(rid => activeRoleIds.includes(rid)) }))
    .filter(p => p.roleIds.length > 0);
  renderParticipants();
});
document.getElementById('btn-save-participants').addEventListener('click', async () => {
  participants = collectParticipantsFromDom();
  const res = await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) });
  participants = await res.json();
  document.getElementById('save-status').textContent = 'Gespeichert (' + new Date().toLocaleTimeString('de-DE') + ').';
  renderParticipants();
});

document.getElementById('btn-send-welcome').addEventListener('click', async () => {
  participants = collectParticipantsFromDom();
  await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) });
  document.getElementById('save-status').textContent = 'Sende Begrüßung …';
  const r = await (await fetch('/api/participants/send-welcome', { method: 'POST' })).json();
  const okCount = r.results.filter(x => x.ok).length;
  document.getElementById('save-status').textContent = `Begrüßung versendet: ${okCount}/${r.results.length} erfolgreich.`;
});

document.getElementById('btn-send-briefings').addEventListener('click', async () => {
  participants = collectParticipantsFromDom();
  await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) });
  document.getElementById('save-status').textContent = 'Sende Rollenbeschreibungen …';
  const r = await (await fetch('/api/participants/send-briefings', { method: 'POST' })).json();
  const okCount = r.results.filter(x => x.ok).length;
  document.getElementById('save-status').textContent = `Rollenbeschreibungen versendet: ${okCount}/${r.results.length} erfolgreich.`;
});

document.getElementById('btn-start').addEventListener('click', async () => {
  participants = collectParticipantsFromDom();
  await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) });
  const durationMode = document.getElementById('duration-mode').value;
  const difficulty = document.getElementById('difficulty').value;
  const targetMinutes = durationMode === 'target' ? currentTargetMinutes() : undefined;
  await fetch('/api/run/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ durationMode, difficulty, targetMinutes }) });
  window.open('stage.html', '_blank');
  window.open('moderator.html', '_blank');
});

// Einstellungen
async function loadSettings() {
  const s = await (await fetch('/api/settings')).json();
  document.getElementById('smtp-host').value = s.smtp.host || '';
  document.getElementById('smtp-port').value = s.smtp.port || 587;
  document.getElementById('smtp-user').value = s.smtp.user || '';
  document.getElementById('smtp-pass').value = s.smtp.pass || '';
  document.getElementById('smtp-secure').checked = !!s.smtp.secure;
  document.getElementById('smtp-insecure-tls').checked = !!s.smtp.allowInsecureTLS;
  document.getElementById('smtp-from').value = s.smtp.fromAddress || '';
  document.getElementById('smtp-fromname').value = s.smtp.fromName || '';
  document.getElementById('brand-name').value = (s.branding && s.branding.organisationName) || '';
  document.getElementById('brand-logo').value = (s.branding && s.branding.logo) || '';
  document.getElementById('brand-ort').value = (s.branding && s.branding.ort) || '';
}
async function saveSettingsPart(partial) {
  const res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(partial) });
  return res.json();
}
document.getElementById('btn-save-settings').addEventListener('click', async () => {
  await saveSettingsPart({
    smtp: {
      host: document.getElementById('smtp-host').value,
      port: Number(document.getElementById('smtp-port').value) || 587,
      secure: document.getElementById('smtp-secure').checked,
      allowInsecureTLS: document.getElementById('smtp-insecure-tls').checked,
      user: document.getElementById('smtp-user').value,
      pass: document.getElementById('smtp-pass').value,
      fromAddress: document.getElementById('smtp-from').value,
      fromName: document.getElementById('smtp-fromname').value
    }
  });
  document.getElementById('settings-status').textContent = 'SMTP-Einstellungen gespeichert.';
});
document.getElementById('btn-test-email').addEventListener('click', async () => {
  const to = document.getElementById('test-email-to').value;
  if (!to) { alert('Bitte eine Test-Empfängeradresse eintragen.'); return; }
  const res = await fetch('/api/settings/test-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to }) });
  const r = await res.json();
  document.getElementById('settings-status').textContent = r.ok ? 'Test-E-Mail gesendet.' : ('Fehler: ' + r.error);
});
document.getElementById('btn-save-branding').addEventListener('click', async () => {
  await saveSettingsPart({ branding: { organisationName: document.getElementById('brand-name').value, logo: document.getElementById('brand-logo').value, ort: document.getElementById('brand-ort').value } });
  document.getElementById('settings-status').textContent = 'Branding gespeichert.';
});

async function init() {
  meta = await (await fetch('/api/scenario-meta')).json();
  document.getElementById('scenario-title').textContent = meta.title;
  document.getElementById('scenario-subtitle').textContent = meta.subtitle;
  await loadScenarioList();
  activeRoleIds = await (await fetch('/api/active-roles')).json();
  renderRoleCheckboxes();
  participants = await (await fetch('/api/participants')).json();
  if (participants.length === 0) {
    participants = activeRoles().map(r => ({ name: '', email: '', roleIds: [r.id] }));
  }
  renderParticipants();
  await loadSettings();
}
init();
