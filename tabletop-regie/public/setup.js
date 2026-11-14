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
        `Gesamtzeit ca. ${r.totalMinutes} von ${targetMinutes} Min. ` +
        (r.rolesAssigned ? (r.uncoveredRoles.length
          ? `Achtung: ${r.uncoveredRoles.length} von ${r.rolesAssigned} Rollen bekommen keine eigene Karte.`
          : `Jede der ${r.rolesAssigned} besetzten Rollen bekommt mindestens eine eigene Karte.`) : '');
      const detail = [r.uncoveredRoles.length ? `Ohne eigene Karte: ${r.uncoveredRoles.join(', ')}.` : '', r.warning || ''].filter(Boolean).join(' ');
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
  participants = collectParticipantsFromDom();
  await fetch('/api/participants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(participants) });
  const durationMode = document.getElementById('duration-mode').value;
  const difficulty = document.getElementById('difficulty').value;
  const targetMinutes = durationMode === 'target' ? currentTargetMinutes() : undefined;
  await fetch('/api/run/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ durationMode, difficulty, targetMinutes }) });
  // Zeitmodus/Schwierigkeit/Zieldauer merken, damit das Setup sie beim
  // naechsten Mal (bzw. in einer exportierten Vorlage) wieder vorschlaegt.
  await saveSettingsPart({ runDefaults: {
    durationMode, difficulty,
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
  statusEl.textContent = `Übung gestartet. Begrüßung: ${welcomeOk}/${welcome.results.length} gesendet. `
    + `Rollenbeschreibungen: ${briefingsOk}/${briefings.results.length} gesendet.`
    + ((welcome.ok && briefings.ok) ? '' : ' Hinweis: nicht alle E-Mails gingen raus — SMTP-Einstellungen oben prüfen.');

  // Bewusst nur die Moderation oeffnen: die Buehne (und damit Ambience-Sound
  // fuers Publikum) oeffnet der Moderator von dort aus erst, wenn alle
  // bereit sind -- sonst laeuft die Vorbereitungszeit unbeaufsichtigt mit.
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
  document.getElementById('brand-starterkit-url').value = (s.branding && s.branding.starterKitUrl) || '';
  document.getElementById('brand-starterkit-label').value = (s.branding && s.branding.starterKitLabel) || '';
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
  document.getElementById('target-preset').value = rd.targetPreset || '90';
  document.getElementById('target-custom').value = rd.targetCustom || 90;
  document.getElementById('target-duration-row').style.display = document.getElementById('duration-mode').value === 'target' ? 'grid' : 'none';
  document.getElementById('target-custom-wrap').style.display = document.getElementById('target-preset').value === 'custom' ? 'block' : 'none';
  updateDurationPreview();
}
function updateBrandLogoPreview() {
  const url = document.getElementById('brand-logo').value;
  const img = document.getElementById('brand-logo-preview');
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
    starterKitLabel: document.getElementById('brand-starterkit-label').value
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
    statusEl.textContent = `Vorlage eingespielt (${r.title}).`;
    await init();
  } catch (err) {
    statusEl.textContent = 'Datei konnte nicht gelesen werden: ' + err.message;
  }
});

async function init() {
  meta = await (await fetch('/api/scenario-meta')).json();
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
}
init();
