const escHtml = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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

function rolesUsedByNamedParticipants() {
  const used = new Set();
  collectParticipantsFromDom().forEach(p => {
    if (p.name.trim() || p.email.trim()) (p.roleIds || []).forEach(rid => used.add(rid));
  });
  return used;
}

async function saveActiveRoles() {
  // Egal wodurch activeRoleIds gerade neu berechnet wurde (Checkbox,
  // "Alle"/"Keine", "Passende Rollen vorschlagen" mit geaenderter
  // Teilnehmerzahl): eine Rolle, die bereits einer benannten Person
  // zugeordnet ist, darf dabei nie herausfallen -- sonst verliert diese
  // Person beim naechsten Speichern unbemerkt ihre Rollenzuweisung.
  const used = rolesUsedByNamedParticipants();
  const missing = Array.from(used).filter(rid => !activeRoleIds.includes(rid));
  if (missing.length) {
    activeRoleIds = Array.from(new Set([...activeRoleIds, ...missing]));
    const namen = missing.map(rid => { const r = meta.roles.find(x => x.id === rid); return r ? r.funktion : rid; });
    document.getElementById('role-select-status').textContent =
      `Bleibt aktiv, weil bereits zugeordnet: ${namen.join(', ')}.`;
  }
  await fetch('/api/active-roles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activeRoleIds) });
  // Erst den aktuellen DOM-Stand uebernehmen (sonst gehen bereits getippte
  // Namen verloren), dann verwaiste, nie ausgefuellte Platzhalter-Zeilen
  // entfernen, deren Rolle gerade deaktiviert wurde -- verhindert, dass sich
  // leere Zeilen unbemerkt ansammeln und die Teilnehmerzahl verfaelschen.
  participants = collectParticipantsFromDom().filter(p =>
    p.name.trim() || p.email.trim() || p.roleIds.some(rid => activeRoleIds.includes(rid))
  );
  renderRoleCheckboxes();
  renderParticipants();
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
document.getElementById('btn-suggest-roles').addEventListener('click', async () => {
  const minutes = Number(document.getElementById('role-duration').value) || 90;
  const difficulty = document.getElementById('difficulty').value;
  const r = await (await fetch(`/api/recommend-roles?minutes=${minutes}&difficulty=${encodeURIComponent(difficulty)}`)).json();
  // Sind schon Personen anderen Rollen zugeordnet (z. B. nach einem Import),
  // wuerde der Schutz "zugeordnete Rollen bleiben aktiv" den Vorschlag
  // aushebeln. Deshalb nachfragen: alle Personen als Teams auf die
  // vorgeschlagenen Rollen verteilen? Niemand wird dabei geloescht.
  const people = collectParticipantsFromDom().filter(p => p.name.trim() || p.email.trim());
  const outside = people.filter(p => (p.roleIds || []).some(rid => !r.roleIds.includes(rid)));
  let distributed = false;
  if (outside.length && confirm(`Für ${minutes} Min. passen ${r.roleIds.length} Rollen: ${r.rollen.join(', ')}.\n\n` +
      `${outside.length} eingetragene Personen sind anderen Rollen zugeordnet. Alle ${people.length} Personen jetzt als Teams auf diese ${r.roleIds.length} Rollen verteilen? (Niemand wird gelöscht.)\n\n` +
      `„Abbrechen“ lässt die bisherigen Zuordnungen stehen – die Rollen bleiben dann zusätzlich aktiv.`)) {
    activeRoleIds = r.roleIds.slice();
    participants = distributeIntoTeams(r.roleIds, people);
    renderParticipants();
    await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) })
      .then(res => res.json()).then(saved => { participants = saved; });
    distributed = true;
  } else {
    // "Teilnehmer" (ohne feste Funktion) bleibt aktiv, falls schon genutzt.
    activeRoleIds = r.roleIds.concat(activeRoleIds.includes('teilnehmer') ? ['teilnehmer'] : []);
  }
  document.getElementById('role-select-status').textContent =
    `${r.roleIds.length} Rollen für ${minutes} Min. vorgeschlagen (in den Lagekarten dieser Dauer am meisten gefordert).` +
    (distributed ? ` ${people.length} Personen als Teams verteilt und gespeichert.` : '');
  // Zieldauer im Ablauf gleich mitziehen, damit Vorschau und Vorschlag zusammenpassen.
  document.getElementById('duration-mode').value = 'target';
  const preset = document.getElementById('target-preset');
  if (Array.from(preset.options).some(o => o.value === String(minutes))) { preset.value = String(minutes); document.getElementById('target-custom-wrap').style.display = 'none'; }
  else { preset.value = 'custom'; document.getElementById('target-custom').value = minutes; document.getElementById('target-custom-wrap').style.display = 'block'; }
  saveActiveRoles();
});

// Reihum verteilen: Rollen in der Reihenfolge des Vorschlags, damit die
// wichtigsten Rollen bei ungerader Verteilung die zusaetzliche Person bekommen.
function distributeIntoTeams(roleIds, people) {
  return people.map((p, i) => Object.assign({}, p, { roleIds: [roleIds[i % roleIds.length]] }));
}

// Viele Personen, wenige Rollen: alle benannten Personen gleichmaessig auf
// die aktiven Rollen verteilen -- jede Rolle wird zum Team. Sonderlagekarten
// gehen an alle Mitglieder eines Teams.
document.getElementById('btn-distribute-teams').addEventListener('click', () => {
  const roles = meta.roles.filter(r => activeRoleIds.includes(r.id) && r.id !== 'teilnehmer');
  const statusEl = document.getElementById('team-status');
  const current = collectParticipantsFromDom();
  const people = current.filter(p => p.name.trim() || p.email.trim());
  if (!roles.length) { statusEl.textContent = 'Zuerst oben Rollen auswählen (z. B. „Passende Rollen vorschlagen“).'; return; }
  if (!people.length) { statusEl.textContent = 'Noch keine Personen eingetragen – zuerst importieren oder Namen eintragen.'; return; }
  if (!confirm(`${people.length} Personen gleichmäßig auf ${roles.length} Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt.`)) return;
  participants = distributeIntoTeams(roles.map(r => r.id), people);
  renderParticipants();
  const min = Math.floor(people.length / roles.length);
  const max = Math.ceil(people.length / roles.length);
  statusEl.textContent = `${people.length} Personen auf ${roles.length} Rollen verteilt: Teams mit ${min === max ? min : min + '–' + max} Personen. Leere Zeilen entfernt. Bitte noch „Teilnehmerliste speichern“.`;
});

function renderParticipants() {
  const body = document.getElementById('participants-body');
  body.innerHTML = participants.map((p, i) => `
    <tr data-idx="${i}">
      <td><input class="p-name" value="${p.name || ''}"></td>
      <td><input class="p-email" value="${p.email || ''}" placeholder="name@firma.de"></td>
      <td class="p-roles" data-roles="${escHtml((p.roleIds || []).join(','))}" style="min-width:240px;">${roleCellHtml(p.roleIds || [])}</td>
      <td><button class="secondary p-remove" type="button">✕</button></td>
    </tr>`).join('');
  updateDurationPreview();
}

// Rollen je Person: sichtbare Felder mit "x" plus eine Auswahl, die immer
// nur EINE Rolle hinzufuegt. Die fruehere Mehrfachauswahl-Liste zeigte nur
// zwei Zeilen -- dort waren durch Ziehen oder Strg+A unbemerkt alle Rollen
// markiert, und jede Person bekam die Karten aller Rollen.
function roleCellHtml(roleIds) {
  const funktion = rid => (meta.roles.find(r => r.id === rid) || {}).funktion || rid;
  const chips = roleIds.map(rid => `<span class="role-chip" style="display:inline-flex;align-items:center;gap:4px;background:var(--panel-2);border:1px solid var(--border);border-radius:12px;padding:2px 4px 2px 10px;margin:0 4px 4px 0;font-size:12px;">${escHtml(funktion(rid))}<button type="button" class="role-chip-x" data-rid="${escHtml(rid)}" title="Rolle entfernen" style="border:none;background:transparent;color:var(--muted);cursor:pointer;padding:0 4px;font-size:13px;">×</button></span>`).join('');
  const options = roleOptionsHtml([]).replace(/<option value="([^"]+)"/g, (m, rid) => roleIds.includes(rid) ? `<option value="${rid}" disabled` : m);
  return `<div>${chips || '<span class="mini" style="color:var(--warn);">keine Rolle</span>'}</div>
    <select class="p-role-add" style="width:auto;font-size:12px;padding:3px 6px;"><option value="">+ Rolle hinzufügen …</option>${options}</select>`;
}
function setRowRoles(cell, roleIds) {
  cell.dataset.roles = roleIds.join(',');
  cell.innerHTML = roleCellHtml(roleIds);
  updateDurationPreview();
}
document.getElementById('participants-body').addEventListener('change', e => {
  if (!e.target.classList.contains('p-role-add') || !e.target.value) return;
  const cell = e.target.closest('.p-roles');
  const roles = (cell.dataset.roles ? cell.dataset.roles.split(',') : []).filter(Boolean);
  if (!roles.includes(e.target.value)) roles.push(e.target.value);
  setRowRoles(cell, roles);
});
document.getElementById('participants-body').addEventListener('click', e => {
  if (!e.target.classList.contains('role-chip-x')) return;
  const cell = e.target.closest('.p-roles');
  setRowRoles(cell, (cell.dataset.roles || '').split(',').filter(r => r && r !== e.target.dataset.rid));
});

function collectParticipantsFromDom() {
  const rows = Array.from(document.querySelectorAll('#participants-body tr'));
  return rows.map((row, i) => ({
    id: participants[i] && participants[i].id,
    name: row.querySelector('.p-name').value,
    email: row.querySelector('.p-email').value,
    roleIds: (row.querySelector('.p-roles').dataset.roles || '').split(',').filter(Boolean)
  }));
}

function currentTargetMinutes() {
  const preset = document.getElementById('target-preset').value;
  if (preset === 'custom') return Number(document.getElementById('target-custom').value) || 90;
  return Number(preset);
}

// Wer bekommt welche vertraulichen Karten? Jede Karte geht an ALLE Personen
// einer Rolle. Geteilte Rollen (Teams) und Personen mit mehreren Rollen
// deshalb deutlich zeigen -- sonst wundert man sich im Trockenlauf ueber
// scheinbar doppelte Karten.
function updateRoleShareInfo(current) {
  const el = document.getElementById('role-share-info');
  const named = current.filter(p => p.name.trim() || p.email.trim());
  const perRole = {};
  named.forEach(p => (p.roleIds || []).filter(r => r !== 'teilnehmer').forEach(r => { (perRole[r] = perRole[r] || []).push(p.name.trim() || p.email.trim()); }));
  const funktion = rid => (meta.roles.find(r => r.id === rid) || {}).funktion || rid;
  const geteilt = Object.entries(perRole).filter(([, ps]) => ps.length > 1);
  const mehrfach = named.filter(p => (p.roleIds || []).filter(r => r !== 'teilnehmer').length > 1);
  if (!named.length) { el.textContent = ''; return; }
  if (!geteilt.length && !mehrfach.length) {
    el.style.color = 'var(--ok)';
    el.textContent = 'Jede Person hat genau eine eigene Rolle – jede vertrauliche Karte geht an genau eine Person.';
    return;
  }
  el.style.color = 'var(--warn)';
  el.innerHTML = 'Vertrauliche Karten gehen an <b>alle</b> Personen einer Rolle. ' +
    (geteilt.length ? `Geteilte Rollen (Teams, alle bekommen dieselben Karten): ${geteilt.map(([r, ps]) => `${escHtml(funktion(r))} – ${ps.length} Personen`).join('; ')}. ` : '') +
    (mehrfach.length ? `Personen mit mehreren Rollen (bekommen die Karten aller ihrer Rollen): ${mehrfach.slice(0, 8).map(p => `${escHtml(p.name || p.email)} (${p.roleIds.filter(r => r !== 'teilnehmer').length})`).join(', ')}${mehrfach.length > 8 ? ' …' : ''}.` : '');
}

async function updateDurationPreview() {
  const current = collectParticipantsFromDom();
  updateRoleShareInfo(current);
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
  document.getElementById('schwerpunkt-row').style.display = mode === 'target' && (meta.schwerpunkte || []).length ? '' : 'none';

  if (mode === 'target') {
    const targetMinutes = currentTargetMinutes();
    try {
      const r = await fetch('/api/preview-schedule', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetMinutes, difficulty, roleIds: allRoleIds, schwerpunkt: document.getElementById('schwerpunkt').value || null })
      }).then(res => res.json());
      document.getElementById('duration-preview').textContent =
        `${current.length} Teilnehmer, ${r.activeRoleGroups} aktive Funktionsbereiche. ` +
        `Geplant: ${r.lagekartenCount} Lagekarten + ${r.sonderlagekartenCount} Sonderlagekarten (${r.skippedCount} entfallen), ` +
        `Gesamtzeit ca. ${r.totalMinutes} von ${targetMinutes} Min. ` +
        (r.rolesAssigned ? (r.uncoveredRoles.length
          ? `Achtung: ${r.uncoveredRoles.length} von ${r.rolesAssigned} Rollen bekommen keine eigene Karte.`
          : `Jede der ${r.rolesAssigned} besetzten Rollen bekommt mindestens eine eigene Karte.`) : '');
      const bogen = (r.akte || []).map(a => a.enthalten ? a.label : `(${a.label} fehlt)`).join(' → ');
      document.getElementById('duration-preview').textContent +=
        (bogen ? ` Spannungsbogen: ${bogen}` : '') +
        (r.finaleMinutes ? `, danach ca. ${r.finaleMinutes} Min. Abschluss (Nacharbeiten und Rechnung).` : '.');
      const zuViele = r.empfehlung && r.rolesAssigned > r.empfehlung.maxRoles
        ? `Für ${targetMinutes} Min. sind höchstens ${r.empfehlung.maxRoles} Rollen sinnvoll, besetzt sind ${r.rolesAssigned}. ` +
          `Mehr Rollen heißt weniger Diskussionszeit je Lagekarte (${r.decisionMinutes} Min.) und mehr vertrauliche Karten. ` +
          `Besser: oben „Passende Rollen vorschlagen“, dann „Auf Teams verteilen“.`
        : '';
      const detail = [zuViele, r.uncoveredRoles.length ? `Ohne eigene Karte: ${r.uncoveredRoles.join(', ')}.` : '', r.warning || ''].filter(Boolean).join(' ');
      const reroute = (r.reroutedSummary || []).length
        ? ` Weil nicht alle Rollen besetzt sind, gehen Karten an Ersatzrollen: ${r.reroutedSummary.join(', ')}.` : '';
      document.getElementById('duration-preview-detail').textContent = detail + reroute;
      document.getElementById('duration-preview-detail').style.color = detail ? 'var(--warn)' : '';
    } catch (e) {
      document.getElementById('duration-preview').textContent = 'Vorschau konnte nicht geladen werden.';
    }
    return;
  }

  document.getElementById('duration-preview-detail').textContent = '';
  document.getElementById('duration-preview').textContent = mode === 'computed'
    ? `${current.length} Teilnehmer, ${speakingGroups.length} aktive Funktionsbereiche mit fester Sprechzeit. ` +
      `Vollständiges Drehbuch, je Lagekarte ca. ${(1 + speakingGroups.length * 0.5).toFixed(1)}–${(1 + speakingGroups.length * 0.5 + 6).toFixed(1)} Minuten, je nach Schwierigkeit.`
    : `${current.length} Teilnehmer, ${speakingGroups.length} aktive Funktionsbereiche. Feste, erprobte Zeiten (ca. 90 Min. Übungszeit plus Abschluss für die Referenzgruppe).`;
}

document.addEventListener('input', e => { if (e.target.closest('#participants-body')) updateDurationPreview(); });
document.getElementById('duration-mode').addEventListener('change', updateDurationPreview);
document.getElementById('difficulty').addEventListener('change', updateDurationPreview);
document.getElementById('schwerpunkt').addEventListener('change', updateDurationPreview);
function fillSchwerpunkte() {
  const sel = document.getElementById('schwerpunkt');
  const keep = sel.value;
  sel.innerHTML = '<option value="">Ausgewogen (alle Themen)</option>' + (meta.schwerpunkte || []).map(x => `<option value="${escHtml(x.key)}" title="${escHtml(x.beschreibung || '')}">${escHtml(x.label)}</option>`).join('');
  if (Array.from(sel.options).some(o => o.value === keep)) sel.value = keep;
}
document.getElementById('target-preset').addEventListener('change', () => {
  const v = document.getElementById('target-preset').value;
  if (Array.from(document.getElementById('role-duration').options).some(o => o.value === v)) document.getElementById('role-duration').value = v;
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
  // Ersetzt gezielt nur die noch nicht ausgefuellten Teilnehmer-Platzhalter
  // (statt blind weitere anzuhaengen) -- so fuehrt mehrfaches Klicken nicht
  // zu immer mehr leeren Zeilen, die die Teilnehmerzahl unbemerkt aufblaehen.
  participants = collectParticipantsFromDom().filter(p =>
    p.name.trim() || p.email.trim() || p.roleIds.join(',') !== 'teilnehmer'
  );
  for (let i = 0; i < count; i++) participants.push({ name: '', email: '', roleIds: ['teilnehmer'] });
  renderParticipants();
});
// Teilnehmer-Import aus Excel (Tab-getrennt beim Kopieren) oder CSV (; oder ,).
// Mit Kopfzeile werden Spalten per Namen erkannt, ohne Kopfzeile gilt: die
// Spalte mit "@" ist die E-Mail, die beiden davor sind Vorname/Nachname
// (bzw. bei nur einer Spalte davor: der volle Name).
function parseParticipantImport(raw) {
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (!lines.length) return { people: [], invalid: 0 };
  const sep = lines[0].includes('\t') ? '\t' : (lines[0].includes(';') ? ';' : ',');
  const rows = lines.map(l => l.split(sep).map(c => c.trim().replace(/^"(.*)"$/, '$1')));
  const norm = s => s.toLowerCase().replace(/[^a-zäöüß]/g, '');
  const header = rows[0].map(norm);
  const idx = names => header.findIndex(h => names.includes(h));
  const hasHeader = !rows[0].some(c => c.includes('@'));
  const col = hasHeader ? {
    vorname: idx(['vorname', 'firstname']),
    nachname: idx(['nachname', 'name2', 'lastname', 'familienname']),
    name: idx(['name', 'teilnehmer', 'teilnehmerin']),
    email: idx(['email', 'mail', 'emailadresse', 'mailadresse'])
  } : null;
  const people = [];
  let invalid = 0;
  rows.slice(hasHeader ? 1 : 0).forEach(cells => {
    let email, name;
    if (col && col.email >= 0) {
      email = cells[col.email] || '';
      name = col.vorname >= 0 || col.nachname >= 0
        ? [cells[col.vorname] || '', cells[col.nachname] || ''].join(' ').trim()
        : (col.name >= 0 ? cells[col.name] || '' : '');
    } else {
      const e = cells.findIndex(c => c.includes('@'));
      email = e >= 0 ? cells[e] : '';
      name = e >= 2 ? `${cells[e - 2]} ${cells[e - 1]}`.trim() : (e === 1 ? cells[0] : '');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { invalid++; return; }
    people.push({ name, email });
  });
  return { people, invalid };
}

async function importParticipants(raw) {
  const statusEl = document.getElementById('import-status');
  const { people, invalid } = parseParticipantImport(raw);
  if (!people.length) { statusEl.textContent = 'Keine gültigen Zeilen mit E-Mail-Adresse gefunden.'; return; }
  participants = collectParticipantsFromDom();
  const known = new Set(participants.map(p => p.email.trim().toLowerCase()).filter(Boolean));
  let filled = 0, added = 0, dupes = 0;
  for (const person of people) {
    if (known.has(person.email.toLowerCase())) { dupes++; continue; }
    known.add(person.email.toLowerCase());
    const placeholder = participants.find(p => !p.name.trim() && !p.email.trim());
    if (placeholder) { placeholder.name = person.name; placeholder.email = person.email; filled++; }
    else { participants.push({ name: person.name, email: person.email, roleIds: ['teilnehmer'] }); added++; }
  }
  if (added && !activeRoleIds.includes('teilnehmer')) {
    activeRoleIds = activeRoleIds.concat(['teilnehmer']);
    await fetch('/api/active-roles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activeRoleIds) });
    renderRoleCheckboxes();
  }
  const res = await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) });
  participants = await res.json();
  renderParticipants();
  statusEl.textContent = `${filled + added} übernommen (${filled} auf vorhandene Rollen-Zeilen, ${added} als „Teilnehmer“)`
    + (dupes ? `, ${dupes} bereits vorhanden übersprungen` : '')
    + (invalid ? `, ${invalid} Zeilen ohne gültige E-Mail ignoriert` : '') + '. Gespeichert.';
}

document.getElementById('btn-import-participants').addEventListener('click', async () => {
  await importParticipants(document.getElementById('import-text').value);
  document.getElementById('import-text').value = '';
});
document.getElementById('import-file').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  // Excel speichert "CSV" oft als Windows-1252 statt UTF-8 -> sonst kaputte Umlaute.
  const buf = await file.arrayBuffer();
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(buf); }
  catch (err) { text = new TextDecoder('windows-1252').decode(buf); }
  await importParticipants(text.replace(/^﻿/, ''));
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
  if (!confirm('Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen.')) return;
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
  const statusEl = document.getElementById('start-status');
  // Laeuft schon eine Uebung, nicht stillschweigend neu vorbereiten (das
  // wuerde alle Mails erneut verschicken und den Lauf zuruecksetzen).
  const current = await (await fetch('/api/run/stage-state')).json();
  if (current.status !== 'idle' && current.status !== 'ended' &&
      !confirm('Es ist bereits eine Übung vorbereitet oder läuft gerade. Neu vorbereiten?\n\nDer aktuelle Lauf wird zurückgesetzt und alle Teilnehmer bekommen Begrüßung und Rollenbeschreibung noch einmal per E-Mail.')) return;
  // Ungewoehnlich viele Rollen bei einer Person? Dann bekommt sie die Karten
  // aller dieser Rollen -- lieber einmal nachfragen.
  const viele = collectParticipantsFromDom().filter(p => (p.name.trim() || p.email.trim()) && p.roleIds.filter(r => r !== 'teilnehmer').length > 3);
  if (viele.length && !confirm(`${viele.length} Person(en) haben mehr als 3 Rollen, z. B. ${viele[0].name || viele[0].email} mit ${viele[0].roleIds.length} Rollen. Sie bekommen dann die vertraulichen Karten ALLER dieser Rollen.\n\nTrotzdem so vorbereiten? („Abbrechen“, um die Rollen in der Teilnehmerliste zu korrigieren.)`)) return;
  // Moderation sofort beim Klick oeffnen -- nach den Wartezeiten fuer den
  // Mailversand blockieren viele Browser das neue Fenster als Pop-up.
  const modWin = window.open('moderator.html', '_blank');
  participants = collectParticipantsFromDom();
  await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) });
  const durationMode = document.getElementById('duration-mode').value;
  const difficulty = document.getElementById('difficulty').value;
  const targetMinutes = durationMode === 'target' ? currentTargetMinutes() : undefined;
  const schwerpunkt = durationMode === 'target' ? (document.getElementById('schwerpunkt').value || null) : null;
  await fetch('/api/run/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ durationMode, difficulty, targetMinutes, schwerpunkt }) });
  // Zeitmodus/Schwierigkeit/Zieldauer merken, damit das Setup sie beim
  // naechsten Mal (bzw. in einer exportierten Vorlage) wieder vorschlaegt.
  await saveSettingsPart({ runDefaults: {
    durationMode, difficulty, schwerpunkt,
    targetPreset: document.getElementById('target-preset').value,
    targetCustom: Number(document.getElementById('target-custom').value) || 90
  } });

  // Pflicht statt Kann: jede Person mit E-Mail bekommt beim Start automatisch
  // Begrüßung/Spielregeln und ihre Rollenbeschreibung(en) -- vorher musste
  // der Moderator das per Hand ueber zwei separate Buttons anstossen und
  // konnte es vergessen, wodurch Teilnehmer ohne jede Vorab-Information in
  // die Übung gingen.
  statusEl.textContent = 'Sende Begrüßung und Rollenbeschreibungen …';
  const [welcome, briefings] = await Promise.all([
    fetch('/api/participants/send-welcome', { method: 'POST' }).then(r => r.json()),
    fetch('/api/participants/send-briefings', { method: 'POST' }).then(r => r.json())
  ]);
  const welcomeOk = welcome.results.filter(r => r.ok).length;
  const briefingsOk = briefings.results.filter(r => r.ok).length;
  statusEl.textContent = `Übung vorbereitet (die Krise beginnt erst per Klick in der Moderation). Begrüßung: ${welcomeOk}/${welcome.results.length} gesendet. `
    + `Rollenbeschreibungen: ${briefingsOk}/${briefings.results.length} gesendet.`
    + ((welcome.ok && briefings.ok) ? '' : ' Hinweis: nicht alle E-Mails gingen raus — SMTP-Einstellungen oben prüfen.');

  // Bewusst nur die Moderation oeffnen: die Buehne (und damit Ambience-Sound
  // fuers Publikum) oeffnet der Moderator von dort aus erst, wenn alle
  // bereit sind -- sonst laeuft die Vorbereitungszeit unbeaufsichtigt mit.
  if (!modWin) {
    statusEl.innerHTML += ' <b>Der Browser hat das Moderationsfenster blockiert:</b> <a href="moderator.html" target="_blank">Moderation hier öffnen</a>.';
  }
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
  document.getElementById('brand-starterkit-url').value = (s.branding && s.branding.starterKitUrl) || '';
  document.getElementById('brand-starterkit-label').value = (s.branding && s.branding.starterKitLabel) || '';
  document.getElementById('brand-starterkit-qr').checked = !(s.branding && s.branding.starterKitQr === false);
  updateBrandLogoPreview();
  applyRunDefaults(s.runDefaults);
  const tm = s.testMode || {};
  document.getElementById('testmode-enabled').checked = !!tm.enabled;
  document.getElementById('testmode-dummy-email').value = tm.dummyEmail || '';
  updateTestModeBanner(tm);
}
function updateTestModeBanner(tm) {
  const banner = document.getElementById('testmode-banner');
  if (tm && tm.enabled && tm.dummyEmail) {
    banner.textContent = `TROCKENLAUF AKTIV — alle E-Mails gehen an ${tm.dummyEmail}, nicht an die Teilnehmer. Vor dem echten Lauf unten im Abschnitt „Trockenlauf“ ausschalten.`;
    banner.style.display = '';
  } else {
    banner.style.display = 'none';
  }
}
document.getElementById('btn-save-testmode').addEventListener('click', async () => {
  const enabled = document.getElementById('testmode-enabled').checked;
  const dummyEmail = document.getElementById('testmode-dummy-email').value.trim();
  const statusEl = document.getElementById('testmode-status');
  if (enabled && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dummyEmail)) {
    statusEl.textContent = 'Bitte eine gültige Dummy-Adresse eintragen.';
    return;
  }
  await saveSettingsPart({ testMode: { enabled, dummyEmail } });
  updateTestModeBanner({ enabled, dummyEmail });
  statusEl.textContent = enabled ? `Testmodus aktiv: alle Mails an ${dummyEmail}.` : 'Testmodus aus: Mails gehen an die echten Teilnehmer.';
});
function applyRunDefaults(rd) {
  if (!rd) return;
  document.getElementById('duration-mode').value = rd.durationMode || 'authored';
  document.getElementById('difficulty').value = rd.difficulty || 'mittel';
  const spSel = document.getElementById('schwerpunkt');
  if (Array.from(spSel.options).some(o => o.value === (rd.schwerpunkt || ''))) spSel.value = rd.schwerpunkt || '';
  document.getElementById('target-preset').value = rd.targetPreset || '90';
  document.getElementById('target-custom').value = rd.targetCustom || 90;
  document.getElementById('target-duration-row').style.display = document.getElementById('duration-mode').value === 'target' ? 'grid' : 'none';
  document.getElementById('target-custom-wrap').style.display = document.getElementById('target-preset').value === 'custom' ? 'block' : 'none';
  const rdMinutes = document.getElementById('target-preset').value === 'custom' ? String(rd.targetCustom || '') : document.getElementById('target-preset').value;
  if (Array.from(document.getElementById('role-duration').options).some(o => o.value === rdMinutes)) document.getElementById('role-duration').value = rdMinutes;
  updateDurationPreview();
}
function updateBrandLogoPreview() {
  const url = document.getElementById('brand-logo').value;
  const img = document.getElementById('brand-logo-preview');
  const hint = document.getElementById('brand-logo-hint');
  hint.textContent = '';
  // Fehlt die Datei (z. B. in einem neu entpackten Ordner), statt eines
  // kaputten Bildes klar sagen, was los ist und was auf der Urkunde landet.
  img.onerror = () => {
    img.src = '/media/branding/excon-logo.png';
    hint.textContent = 'Die Logo-Datei fehlt auf diesem Rechner (vermutlich in einem anderen Ordner hochgeladen). Bis Sie es neu hochladen, steht das Standard-Logo auf den Urkunden.';
  };
  if (url) { img.src = url; img.style.display = ''; } else { img.style.display = 'none'; }
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
  await saveSettingsPart({ branding: {
    organisationName: document.getElementById('brand-name').value,
    logo: document.getElementById('brand-logo').value,
    ort: document.getElementById('brand-ort').value,
    starterKitUrl: document.getElementById('brand-starterkit-url').value,
    starterKitLabel: document.getElementById('brand-starterkit-label').value,
    starterKitQr: document.getElementById('brand-starterkit-qr').checked
  } });
  document.getElementById('settings-status').textContent = 'Branding gespeichert.';
});
document.getElementById('brand-logo-upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById('brand-upload-status');
  statusEl.textContent = 'Lade Logo hoch …';
  const fd = new FormData();
  fd.append('logo', file);
  try {
    const res = await fetch('/api/settings/upload-logo', { method: 'POST', body: fd });
    const r = await res.json();
    if (r.ok) {
      document.getElementById('brand-logo').value = r.url;
      updateBrandLogoPreview();
      statusEl.textContent = 'Logo hochgeladen und gespeichert.';
    } else {
      statusEl.textContent = 'Fehler beim Hochladen: ' + r.error;
    }
  } catch (err) {
    statusEl.textContent = 'Fehler beim Hochladen: ' + err.message;
  }
  e.target.value = '';
});

document.getElementById('btn-export-template').addEventListener('click', async () => {
  const tpl = await (await fetch('/api/template/export')).json();
  const blob = new Blob([JSON.stringify(tpl, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const datestamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `vorlage-${(tpl.scenarioFile || 'uebung').replace(/\.json$/, '')}-${datestamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  document.getElementById('template-status').textContent = 'Vorlage heruntergeladen.';
});

document.getElementById('input-import-template').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  if (!confirm('Vorlage wirklich einspielen? Teilnehmer, Rollenauswahl, SMTP- und Branding-Einstellungen des aktuellen Laufs werden dabei ersetzt.')) return;
  const statusEl = document.getElementById('template-status');
  try {
    const tpl = JSON.parse(await file.text());
    statusEl.textContent = 'Spiele Vorlage ein …';
    const res = await fetch('/api/template/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tpl) });
    const r = await res.json();
    if (!r.ok) { statusEl.textContent = 'Fehler: ' + r.error; return; }
    statusEl.textContent = `Vorlage eingespielt (${r.title}).` + (r.hinweis ? ' ' + r.hinweis : '');
    await init();
  } catch (err) {
    statusEl.textContent = 'Datei konnte nicht gelesen werden: ' + err.message;
  }
});

// ---- Eigene Toene fuer Lagekarten (Aufnahme per Mikrofon oder Datei) ----
let toeneRecorder = null;
async function loadToene() {
  const data = await (await fetch('/api/lagekarten-toene')).json();
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  document.getElementById('toene-hinweis').textContent = canRecord
    ? 'Tipp: ruhiger Raum, Headset oder Laptop-Mikrofon aus ca. 30 cm Abstand. Lautsprecher bzw. Box während der Aufnahme leise oder aus – sonst nimmt das Mikrofon die eigene Stimme ein zweites Mal auf. Vor dem Übernehmen einmal anhören.'
    : 'Aufnehmen ist hier nicht möglich: Der Browser erlaubt das Mikrofon nur, wenn die App unter http://localhost:4173 geöffnet ist. Eine fertige Audiodatei können Sie trotzdem wählen.';
  // Lagekarten mit Sprechertext oder eigener Aufnahme oben, alle weiteren eingeklappt
  const oben = data.lagekarten.filter(lk => lk.sprechertext || lk.eigenerTon);
  const rest = data.lagekarten.filter(lk => !(lk.sprechertext || lk.eigenerTon));
  const row = lk => `
    <div class="ton-row" data-id="${escHtml(lk.id)}" style="border-top:1px solid var(--border);padding:10px 0;">
      <div class="row" style="justify-content:space-between;align-items:center;gap:10px;">
        <span><b>${escHtml(lk.titel)}</b> <span class="muted mini">${escHtml(lk.simZeit)}</span>
          <span class="mini" style="margin-left:6px;color:${lk.eigenerTon ? 'var(--ok)' : 'var(--muted)'};">${lk.eigenerTon ? 'eigene Aufnahme' : (lk.sound ? 'Ton aus dem Drehbuch' : 'kein Ton')}</span></span>
        <span class="row" style="width:auto;gap:6px;">
          ${lk.sound ? `<button class="secondary ton-play" type="button" data-src="${escHtml(lk.sound)}" title="Den aktuell hinterlegten Ton hier anhören.">Anhören</button>` : ''}
          ${canRecord ? '<button class="secondary ton-rec" type="button" title="Startet die Aufnahme über das Mikrofon. Noch einmal klicken beendet sie.">Aufnehmen</button>' : ''}
          <label class="secondary" style="display:inline-flex;align-items:center;width:auto;padding:7px 12px;border:1px solid var(--border);border-radius:6px;cursor:pointer;font-size:13px;" title="Fertige Audiodatei für diese Lagekarte wählen.">Datei wählen<input type="file" class="ton-file" accept="audio/*" style="display:none;"></label>
          ${lk.eigenerTon ? '<button class="secondary ton-del" type="button" title="Eigene Aufnahme löschen. Danach gilt wieder der Ton aus dem Drehbuch (falls vorhanden).">Entfernen</button>' : ''}
        </span>
      </div>
      ${lk.sprechertext ? `<details class="mini" style="margin-top:6px;" ${lk.eigenerTon ? '' : 'open'}><summary>Sprechertext (ca. ${Math.round(lk.sprechertext.split(/\s+/).length / 2.3)} Sekunden)</summary><p style="font-size:15px;line-height:1.6;max-width:820px;">${escHtml(lk.sprechertext)}</p></details>` : ''}
      <div class="ton-preview mini" style="margin-top:6px;"></div>
    </div>`;
  const offen = document.querySelector('#toene-liste details.ton-rest');
  const warOffen = offen ? offen.open : false;
  document.getElementById('toene-liste').innerHTML = oben.map(row).join('') +
    (rest.length ? `<details class="ton-rest" ${warOffen ? 'open' : ''} style="border-top:1px solid var(--border);padding-top:10px;"><summary style="cursor:pointer;">Weitere Lagekarten (${rest.length})</summary>${rest.map(row).join('')}</details>` : '');
}
async function uploadTon(id, blob, filename) {
  const fd = new FormData();
  fd.append('ton', blob, filename);
  const r = await (await fetch('/api/lagekarten/' + encodeURIComponent(id) + '/ton', { method: 'POST', body: fd })).json();
  if (!r.ok) alert('Speichern fehlgeschlagen: ' + r.error);
  await loadToene();
}
document.getElementById('toene-liste').addEventListener('click', async e => {
  const row = e.target.closest('.ton-row');
  if (!row) return;
  const id = row.dataset.id;
  const preview = row.querySelector('.ton-preview');
  if (e.target.classList.contains('ton-play')) {
    preview.innerHTML = `<audio controls autoplay src="${escHtml(e.target.dataset.src)}"></audio>`;
  }
  if (e.target.classList.contains('ton-del')) {
    if (!confirm('Eigene Aufnahme für diese Lagekarte löschen?')) return;
    await fetch('/api/lagekarten/' + encodeURIComponent(id) + '/ton', { method: 'DELETE' });
    await loadToene();
  }
  if (e.target.classList.contains('ton-rec')) {
    const btn = e.target;
    if (toeneRecorder && toeneRecorder.state === 'recording') { toeneRecorder.stop(); return; }
    let stream;
    // Ohne Echo-Unterdrueckung/Rauschfilter/automatische Lautstaerke: diese
    // Filter lassen gesprochene Aufnahmen oft verzerrt oder "doppelt" klingen.
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 1 } }); }
    catch (err) { preview.textContent = 'Kein Zugriff auf das Mikrofon: ' + err.message; return; }
    const chunks = [];
    toeneRecorder = new MediaRecorder(stream);
    const started = Date.now();
    const timer = setInterval(() => { const s = Math.round((Date.now() - started) / 1000); btn.textContent = `Stopp (${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')})`; }, 250);
    btn.textContent = 'Stopp (0:00)';
    btn.style.borderColor = 'var(--bad)'; btn.style.color = 'var(--bad)';
    toeneRecorder.ondataavailable = ev => { if (ev.data.size) chunks.push(ev.data); };
    toeneRecorder.onstop = () => {
      clearInterval(timer);
      stream.getTracks().forEach(t => t.stop());
      const type = toeneRecorder.mimeType || 'audio/webm';
      const blob = new Blob(chunks, { type });
      const url = URL.createObjectURL(blob);
      btn.textContent = 'Neu aufnehmen'; btn.style.borderColor = ''; btn.style.color = '';
      preview.innerHTML = `<audio controls src="${url}"></audio>
        <button class="ton-ok" type="button" title="Diese Aufnahme für die Lagekarte verwenden.">Übernehmen</button>
        <button class="secondary ton-discard" type="button">Verwerfen</button>`;
      preview.querySelector('.ton-ok').onclick = () => {
        const ext = type.includes('mp4') ? 'm4a' : (type.includes('ogg') ? 'ogg' : 'webm');
        preview.textContent = 'Speichere …';
        uploadTon(id, blob, 'aufnahme.' + ext);
      };
      preview.querySelector('.ton-discard').onclick = () => { preview.innerHTML = ''; };
    };
    toeneRecorder.start();
  }
});
document.getElementById('toene-liste').addEventListener('change', async e => {
  if (!e.target.classList.contains('ton-file')) return;
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  const row = e.target.closest('.ton-row');
  row.querySelector('.ton-preview').textContent = 'Speichere …';
  await uploadTon(row.dataset.id, file, file.name);
});

async function init() {
  meta = await (await fetch('/api/scenario-meta')).json();
  fillSchwerpunkte();
  document.getElementById('scenario-title').textContent = meta.title;
  document.getElementById('scenario-subtitle').textContent = meta.subtitle;
  const check = meta.pruefung || { errors: [], warnings: [] };
  const checkEl = document.getElementById('scenario-check');
  if (check.errors.length) {
    checkEl.style.color = 'var(--bad)';
    checkEl.textContent = `Drehbuch-Prüfung: ${check.errors.length} Fehler – ${check.errors.slice(0, 3).join(' · ')}${check.errors.length > 3 ? ' …' : ''}`;
  } else {
    checkEl.style.color = 'var(--ok)';
    checkEl.textContent = 'Drehbuch-Prüfung bestanden: Jede Rolle hat eigene Aufgaben, alle Karten passen zur Besetzung und Zeitplanung.'
      + (check.warnings.length ? ` (${check.warnings.length} Hinweise, Details: npm run pruefen)` : '');
  }
  await loadScenarioList();
  activeRoleIds = await (await fetch('/api/active-roles')).json();
  renderRoleCheckboxes();
  participants = await (await fetch('/api/participants')).json();
  if (participants.length === 0) {
    participants = activeRoles().map(r => ({ name: '', email: '', roleIds: [r.id] }));
  }
  renderParticipants();
  await loadSettings();
  await loadToene();
}
init();
