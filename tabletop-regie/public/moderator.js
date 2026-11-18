function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

let lastState = null;
let skippedPastOpen = false;

async function api(path, opts) {
  const res = await fetch(path, opts);
  return res.json();
}

// Bei Teams (mehrere Personen pro Rolle) alle Namen zeigen -- vertrauliche
// Karten gehen ohnehin an jedes Teammitglied.
function participantFor(roleId, participants) {
  const team = (participants || []).filter(p => (p.roleIds || []).includes(roleId));
  if (!team.length) return undefined;
  const names = team.map(p => p.name).filter(Boolean);
  return { name: names.length > 3 ? `${names.slice(0, 3).join(', ')} +${names.length - 3}` : names.join(', ') };
}

// Prozessablauf-Zeitleiste + freier Zeit-Schieberegler: zeigt alle geplanten
// Ereignisse auf einen Blick (erledigt/aktuell/kommend) und erlaubt, direkt
// auf jede beliebige Minute zu springen — nicht nur auf die naechsten paar
// vordefinierten Ereignisse. Waehrend der Nutzer zieht, ueberschreibt das
// 2-Sekunden-Polling den Regler nicht (timelineDragging-Flag).
let timelineDragging = false;
const timelineSlider = document.getElementById('timeline-slider');
timelineSlider.addEventListener('pointerdown', () => { timelineDragging = true; });
// Vorschau: Was steht bei Minute m auf der Buehne, und welche vertraulichen
// Karten wuerden beim Sprung dorthin verschickt?
function previewAt(s, m) {
  const tl = (s && s.fullTimeline) || [];
  const lks = tl.filter(e => e.type === 'lagekarte' && e.minute <= m);
  const lk = lks[lks.length - 1];
  const next = tl.find(e => e.type === 'lagekarte' && e.minute > m);
  const sks = tl.filter(e => e.type === 'sonderlagekarte' && !e.fired && e.minute <= m && e.minute > s.elapsedMinutes);
  let html = `<b>Minute ${m.toFixed(1)}:</b> Bühne zeigt ${lk ? '„' + escapeHtml(lk.titel) + '“' : 'noch keine Lagekarte'}`;
  if (next) html += ` · nächste Lagekarte „${escapeHtml(next.titel)}“ bei Minute ${next.minute}`;
  if (sks.length) {
    const count = {};
    sks.forEach(e => { const r = e.titel.replace('Sonderlagekarte für ', '').replace(/ \(statt .*\)$/, ''); count[r] = (count[r] || 0) + 1; });
    const wer = Object.entries(count).map(([r, n]) => escapeHtml(r) + (n > 1 ? ` ×${n}` : '')).join(', ');
    html += `<br><span style="color:var(--warn);">Bis hierher werden noch ${sks.length} vertrauliche Karte(n) verschickt – an: ${wer}</span>`;
  }
  return html;
}
function showPreview(m) {
  if (!lastState) return;
  const total = lastState.totalPlannedMinutes || 1;
  const ghost = document.getElementById('timeline-ghost');
  ghost.style.display = 'block';
  ghost.style.left = Math.min(100, Math.max(0, m / total * 100)) + '%';
  document.getElementById('timeline-preview').innerHTML = previewAt(lastState, m);
}
function hidePreview() {
  document.getElementById('timeline-ghost').style.display = 'none';
  document.getElementById('timeline-preview').innerHTML = '';
}
timelineSlider.addEventListener('input', () => {
  document.getElementById('timeline-drag-label').textContent = `Springe zu: ${Number(timelineSlider.value).toFixed(1)} Min. …`;
  showPreview(Number(timelineSlider.value));
});
// Vorschau schon beim Darueberfahren, ohne zu klicken
timelineSlider.addEventListener('mousemove', e => {
  if (timelineDragging) return;
  const r = timelineSlider.getBoundingClientRect();
  const m = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * (lastState ? lastState.totalPlannedMinutes : 0);
  showPreview(m);
});
timelineSlider.addEventListener('mouseleave', () => { if (!timelineDragging) hidePreview(); });
timelineSlider.addEventListener('change', () => {
  api('/api/run/jump-to-minute', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ minute: Number(timelineSlider.value) }) })
    .then(() => { timelineDragging = false; document.getElementById('timeline-drag-label').textContent = ''; hidePreview(); refresh(); });
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

// ---- Hinweis: vertrauliche Karte wurde gerade verschickt ----
let seenFired = null;
const skAlerts = [];
function beep() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18].forEach(t => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.value = 880; g.gain.value = 0.08;
      o.connect(g); g.connect(ac.destination);
      o.start(ac.currentTime + t); o.stop(ac.currentTime + t + 0.12);
    });
  } catch (e) { /* ohne Ton weiter */ }
}
function updateSkAlerts(s) {
  const fired = s.firedSonderlagekarten || [];
  if (seenFired === null || fired.length < seenFired.size) seenFired = new Set(fired.map(f => f.id)); // erstes Laden / Lauf zurueckgesetzt
  let neu = false;
  fired.forEach(f => { if (!seenFired.has(f.id)) { seenFired.add(f.id); skAlerts.unshift(f); neu = true; } });
  if (neu) { beep(); document.title = '● Neue vertrauliche Karte – Moderation'; }
  const funktion = rid => (s.scenario.roles.find(r => r.id === rid) || {}).funktion || rid;
  const karte = (f, i) => {
    const sk = s.scenario.sonderlagekarten.find(x => x.id === f.id) || {};
    const results = f.emailResults || [];
    const fehler = results.filter(r => !r.ok);
    const namen = results.map(r => { const p = (s.participants || []).find(x => x.id === r.participantId); return p && p.name ? p.name : r.email; });
    const an = f.recipientRoleId
      ? `${escapeHtml(funktion(f.recipientRoleId))}${f.recipientRoleId !== sk.empfaenger ? ` (statt ${escapeHtml(funktion(sk.empfaenger))})` : ''}${namen.length ? ' – ' + escapeHtml(namen.join(', ')) : ''}`
      : 'niemand (Rolle nicht besetzt)';
    const status = !f.recipientRoleId ? '<span style="color:var(--warn);">Nicht verschickt – Rolle und Ersatzrolle unbesetzt.</span>'
      : fehler.length ? `<span style="color:var(--bad);font-weight:700;">E-Mail fehlgeschlagen (${fehler.length}/${results.length}): ${escapeHtml(fehler[0].error || '')} – Karte bitte mündlich oder auf Papier übergeben.</span>`
      : `<span style="color:var(--ok);">E-Mail zugestellt (${results.length}).</span>`;
    return `<div class="sk-alert ${fehler.length || !f.recipientRoleId ? 'fehler' : ''}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
        <div class="kopf" style="flex:1;">${f.manual ? 'Manuell ausgelöst' : 'Soeben verschickt'}: vertrauliche Karte ${escapeHtml(f.id)} an ${an}</div>
        <button class="secondary sk-alert-ok" data-idx="${i}" style="flex-shrink:0;" title="Hinweis schließen. Die Karte bleibt unten unter „Verschickte vertrauliche Karten“ einsehbar.">Gesehen</button>
      </div>
      <div class="txt" title="Mit der Maus darüberfahren, um den ganzen Text zu sehen.">${escapeHtml(f.text || sk.text || '')}</div>
      ${f.recipientRoleId && f.recipientRoleId !== sk.empfaenger ? '<div style="color:var(--warn);margin-top:4px;">Ersatzrolle: kurz prüfen, ob die Information für diese Rolle und den jetzigen Zeitpunkt so passt – sonst mündlich einordnen.</div>' : ''}
      ${sk.moderatorHinweis ? `<div style="color:var(--warn);margin-top:4px;">Hinweis: ${escapeHtml(sk.moderatorHinweis)}</div>` : ''}
      ${sk.moderatorGut ? `<div style="color:var(--ok);">Gut: ${escapeHtml(sk.moderatorGut)}</div>` : ''}
      ${sk.moderatorSchlecht ? `<div style="color:var(--bad);">Schlecht: ${escapeHtml(sk.moderatorSchlecht)}</div>` : ''}
      <div style="margin-top:4px;">${status}</div>
    </div>`;
  };
  // Die zwei neuesten voll, aeltere eingeklappt -- sonst verdeckt ein grosser
  // Zeitsprung die ganze Moderation.
  const voll = skAlerts.slice(0, 2).map(karte).join('');
  const rest = skAlerts.slice(2);
  const restHtml = rest.length ? `<div class="sk-alert" style="border-style:dashed;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <span><b>${rest.length} weitere</b> verschickt: ${rest.map(f => escapeHtml(f.id)).join(', ')} <span class="muted">(Details unten unter „Verschickte vertrauliche Karten“)</span></span>
        <button class="secondary sk-alert-all" style="flex-shrink:0;">Alle als gesehen markieren</button>
      </div></div>` : '';
  document.getElementById('m-alerts').innerHTML = voll + restHtml;
  if (!skAlerts.length) document.title = 'Moderation – BCM Tabletop-Regie';
}

function render(s) {
  lastState = s;
  const scenario = s.scenario;
  updateSkAlerts(s);

  document.getElementById('m-title').textContent = scenario.title;
  const tmBanner = document.getElementById('m-testmode-banner');
  if (s.testMode && s.testMode.enabled) {
    tmBanner.textContent = `TROCKENLAUF AKTIV — alle E-Mails gehen an ${s.testMode.dummyEmail}, nicht an die Teilnehmer.`;
    tmBanner.style.display = '';
  } else {
    tmBanner.style.display = 'none';
  }
  const statusBadge = document.getElementById('m-status');
  statusBadge.textContent = s.status === 'briefing' ? 'Vorbereitung'
    : s.status === 'countdown' ? `Start in ${s.crisisCountdownSeconds}s`
    : s.status === 'running' ? 'Krise läuft'
    : s.status === 'paused' ? 'Pausiert'
    : s.status === 'ended' ? (s.finale && s.finale.step ? 'Abschluss' : 'Beendet')
    : 'Bereit';
  statusBadge.className = 'badge ' + (s.status === 'running' ? 'ok' : s.status === 'ended' ? 'bad' : 'warn');
  document.getElementById('btn-begin-crisis').style.display = s.status === 'briefing' ? '' : 'none';
  document.getElementById('btn-pause').style.display = s.status === 'running' ? '' : 'none';
  document.getElementById('btn-resume').style.display = s.status === 'paused' ? '' : 'none';
  document.getElementById('m-elapsed').textContent = `${s.elapsedMinutes} / ${s.totalPlannedMinutes} Min.` +
    (s.finaleMinutes ? ` + ca. ${s.finaleMinutes} Min. Abschluss` : '') +
    (s.lagekarten && s.lagekarten.total ? ` · Lagekarte ${s.lagekarten.gezeigt} von ${s.lagekarten.total}` : '');
  const modeLabel = s.durationMode === 'target' ? `Zieldauer ${s.targetMinutes} Min. (${s.difficulty})`
    : s.durationMode === 'computed' ? `Berechnet (${s.difficulty})` : 'Erprobte feste Zeiten';
  document.getElementById('m-mode').textContent = `Modus: ${modeLabel}` + (s.schwerpunkt ? ` · Schwerpunkt: ${s.schwerpunkt.label}` : '');
  document.getElementById('m-roles').textContent = `${s.activeRoleGroups} aktive Funktionsbereiche`;

  renderTimeline(s);

  const warnCard = document.getElementById('m-schedule-warning-card');
  if (s.scheduleWarning) {
    warnCard.style.display = '';
    document.getElementById('m-schedule-warning').textContent = s.scheduleWarning;
  } else {
    warnCard.style.display = 'none';
  }

  // Nicht eingeplante Karten: nur die, die zur aktuellen oder einer
  // kommenden Lage passen. Vergangene sind ausgeblendet (per Klick sichtbar).
  const skippedCard = document.getElementById('m-skipped-card');
  const offen = (s.skipped || []).filter(ev => !ev.vorbei);
  const vergangen = (s.skipped || []).filter(ev => ev.vorbei);
  if (offen.length || vergangen.length) {
    skippedCard.style.display = '';
    const zeile = ev => `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:8px 0;border-top:1px solid var(--border);">
        <div class="mini" style="flex:1;">
          <b>${escapeHtml(ev.titel)}</b>
          ${ev.jetzt ? '<span class="badge ok" style="margin-left:6px;">passt jetzt</span>' : ''}
          ${ev.lage ? `<span class="muted"> · gehört zu „${escapeHtml(ev.lage.titel)}“ (${escapeHtml(ev.lage.simZeit)})</span>` : ''}
          <div style="margin-top:3px;">${escapeHtml(ev.text || '')}</div>
        </div>
        <button class="secondary promote-event" data-type="${ev.type}" data-id="${ev.id}" style="flex-shrink:0;" title="Nimmt diese Karte jetzt doch auf – sie wird sofort angezeigt bzw. verschickt.">Jetzt einsetzen</button>
      </div>`;
    document.getElementById('m-skipped').innerHTML =
      (offen.length ? offen.map(zeile).join('') : '<p class="muted mini">Für die aktuelle und die kommenden Lagen ist nichts mehr offen.</p>') +
      (vergangen.length ? `<details class="mini" style="margin-top:8px;" ${skippedPastOpen ? 'open' : ''}><summary class="muted" style="cursor:pointer;">${vergangen.length} Karten zu bereits vergangenen Lagen ausgeblendet</summary>${vergangen.map(zeile).join('')}</details>` : '');
    const det = document.querySelector('#m-skipped details');
    if (det) det.addEventListener('toggle', () => { skippedPastOpen = det.open; });
  } else {
    skippedCard.style.display = 'none';
  }

  // Aktuelle Lagekarte
  const lkBox = document.getElementById('m-current-lk');
  const staffed = new Set((s.participants || []).flatMap(p => p.roleIds || []));
  const funktion = rid => (scenario.roles.find(r => r.id === rid) || {}).funktion || rid;
  if (s.currentLagekarte) {
    const lk = s.currentLagekarte;
    // Wer ist bei dieser Lage fachlich gefordert -- und ist das ueberhaupt besetzt?
    const zust = lk.zustaendig || [];
    const zustHtml = zust.length
      ? (zust.some(rid => staffed.has(rid))
        ? `<p class="mini muted">Besonders gefordert: ${zust.map(rid => staffed.has(rid) ? `<b>${escapeHtml(funktion(rid))}</b>` : `<s>${escapeHtml(funktion(rid))}</s>`).join(', ')}</p>`
        : `<p class="mini" style="color:var(--warn);">Keine der hier geforderten Rollen ist besetzt (${zust.map(rid => escapeHtml(funktion(rid))).join(', ')}). Bring die Fachperspektive selbst ein oder gib die Frage an die Krisenstabsleitung.</p>`)
      : '';
    const aktHtml = lk.aktLabel ? `<span class="badge" style="margin-right:8px;" title="Station im Spannungsbogen: Vorboten – Ausbruch – Eskalation – Höhepunkt – Folgen – Wiederanlauf">${escapeHtml(lk.aktLabel)}</span>` : '';
    const tonHtml = lk.sound
      ? `<p class="mini"><button class="secondary replay-sound" title="Spielt den Ton dieser Lagekarte auf der Bühne noch einmal von vorn ab.">Ton noch einmal abspielen</button> <span class="muted">${lk.eigenerTon ? 'eigene Aufnahme' : 'Ton aus dem Drehbuch'}</span></p>`
      : (lk.sprechertext ? `<details class="mini" open><summary><b>Sprechertext zum Vorlesen</b> (keine Aufnahme hinterlegt – im Setup unter „Eigene Töne“ einsprechen)</summary><p style="white-space:pre-wrap;">${escapeHtml(lk.sprechertext)}</p></details>` : '');
    const weicheHtml = (s.weichen || []).filter(w => w.aktuell).map(aktWeiche => `<div style="border:2px solid var(--accent);border-radius:8px;padding:8px 12px;margin:8px 0;">
        <p class="mini" style="margin:0 0 4px;"><b>Entscheidung mit Folgen:</b> ${escapeHtml(aktWeiche.frage)}</p>
        ${weicheButtons(aktWeiche)}
        ${aktWeiche.hinweis ? `<p class="mini" style="color:var(--warn);margin:6px 0 0;">${escapeHtml(aktWeiche.hinweis)}</p>` : ''}
        <p class="mini muted" style="margin:6px 0 0;">Festhalten, was der Tisch entschieden hat – nicht vorab verraten, dass es Folgen hat.</p></div>`).join('');
    const zusatzHtml = (lk.weichenZusatz || []).length ? `<p class="mini" style="color:var(--accent);">Wegen einer früheren Entscheidung ergänzt: ${escapeHtml(lk.weichenZusatz.join(' '))}</p>` : '';
    const bewertungHtml = (lk.moderatorGut || lk.moderatorSchlecht)
      ? `<p class="mini" style="margin:4px 0;">${lk.moderatorGut ? `<span style="color:var(--ok);">Gut: ${escapeHtml(lk.moderatorGut)}</span>` : ''}${lk.moderatorSchlecht ? `<br><span style="color:var(--bad);">Schwach: ${escapeHtml(lk.moderatorSchlecht)}</span>` : ''}</p>` : '';
    const spHtml = s.schwerpunkt ? `<p class="mini" style="color:var(--accent);"><b>Schwerpunkt ${escapeHtml(s.schwerpunkt.label)}:</b> ${escapeHtml(lk.schwerpunktFrage || s.schwerpunkt.leitfrage || '')}${lk.schwerpunktFrage ? ' <span class="muted">(steht auch auf der Bühne)</span>' : ' <span class="muted">(Leitfrage, nicht auf der Bühne)</span>'}</p>` : '';
    lkBox.innerHTML = `${aktHtml}<b>${escapeHtml(lk.simZeit)} · ${escapeHtml(lk.titel)}</b><p>${escapeHtml(lk.text)}</p>` + spHtml + zusatzHtml + weicheHtml + tonHtml + zustHtml + bewertungHtml +
      (lk.moderatorHinweis ? `<p class="mini" style="color:var(--warn);">Moderatorhinweis: ${escapeHtml(lk.moderatorHinweis)}</p>` : '');
  } else if (s.status === 'running' || s.status === 'briefing' || s.status === 'countdown') {
    const mf = scenario.moderationsleitfaden;
    const next = s.upcoming[0];
    const minsToNext = next ? Math.max(0, Math.round((next.minute - s.elapsedMinutes) * 10) / 10) : null;
    const timingNote = s.status === 'briefing'
      ? '<p class="mini" style="color:var(--ok);">Der Krisentimer läuft noch nicht. Lies Begrüßung und Eröffnung in Ruhe vor, klicke erst danach oben auf "Jetzt beginnt die Krise".</p>'
      : s.status === 'countdown'
      ? `<p class="mini" style="color:var(--warn);font-weight:700;">Die Krise beginnt in ${s.crisisCountdownSeconds} Sekunden — Zeit für die letzten Worte.</p>`
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

  renderFinaleCard(s);
  renderBoard(s);
  renderWeichen(s);

  // Naechste Ereignisse — "Zeitsprung hierhin" ueberspringt Leerlauf oder
  // springt gezielt zu einer bestimmten Karte, wenn eine Diskussion kuerzer
  // oder laenger lief als geplant.
  document.getElementById('m-upcoming').innerHTML = s.upcoming.map(ev => `
    <tr><td>${ev.minute}</td><td>${ev.type === 'lagekarte' ? 'Lagekarte' + (ev.akt ? ` <span class="muted">(${escapeHtml(ev.akt)})</span>` : '') : 'Sonderlagekarte'}</td><td>${escapeHtml(ev.titel)}</td>
      <td><button class="secondary jump-to-event" data-type="${ev.type}" data-id="${ev.id}" title="Springt direkt auf diese Karte — fällig werdende Sonderlagekarten dazwischen werden dabei mit ausgelöst/verschickt.">Zeitsprung hierhin</button></td></tr>
  `).join('') || '<tr><td colspan="4" class="muted">Keine weiteren geplanten Ereignisse.</td></tr>';

  // Manuell ausloesbare Karten — Empfaenger ist die tatsaechlich besetzte
  // Rolle (ggf. Ersatzrolle); Karten, die niemanden erreichen, sind ausgeblendet.
  function recipientHtml(card) {
    const p = participantFor(card.recipientRoleId, s.participants);
    return (p && p.name ? `${escapeHtml(p.name)}, ` : '') + escapeHtml(card.recipientLabel);
  }
  document.getElementById('m-unscheduled-sk').innerHTML = s.unscheduledSonderlagekarten.filter(sk => sk.recipientRoleId).map(sk => `
    <div class="row" style="justify-content:space-between;margin-bottom:6px;">
      <span class="mini">${sk.id} — für ${recipientHtml(sk)}</span>
      <button class="secondary fire-sk" data-id="${sk.id}" title="Verschickt diese vertrauliche Sonderlagekarte sofort per E-Mail an die zugeordnete Person.">Jetzt auslösen</button>
    </div>`).join('') || '<p class="muted mini">Keine offenen Karten.</p>';

  const spKarten = new Set((s.schwerpunkt && s.schwerpunkt.karten) || []);
  document.getElementById('m-bonus').innerHTML = (s.bonuskarten || []).filter(b => b.recipientRoleId)
    .sort((x, y) => (spKarten.has(y.id) ? 1 : 0) - (spKarten.has(x.id) ? 1 : 0)).map(b => `
    <div class="row" style="justify-content:space-between;margin-bottom:6px;">
      <span class="mini">${b.titel ? `<b>${escapeHtml(b.titel)}</b> ` : ''}${spKarten.has(b.id) ? '<span class="badge ok">passt zum Schwerpunkt</span> ' : ''}${b.id} — für ${recipientHtml(b)}: ${escapeHtml(b.text)}${b.moderatorHinweis ? `<br><span style="color:var(--warn);">Hinweis: ${escapeHtml(b.moderatorHinweis)}</span>` : ''}</span>
      <button class="secondary fire-bonus" data-id="${b.id}" ${b.fired || (b.wartetAuf || []).length ? 'disabled' : ''} title="${(b.wartetAuf || []).length ? 'Passt erst nach: ' + escapeHtml(b.wartetAuf.join(', ')) : 'Löst dieses optionale Zusatzereignis manuell aus — nur bei Bedarf für mehr Dynamik einsetzen.'}">${b.fired ? 'Ausgelöst' : (b.wartetAuf || []).length ? 'Noch nicht' : 'Auslösen'}</button>
    </div>`).join('') || '<p class="muted mini">Für die aktuelle Besetzung keine Bonuskarten verfügbar.</p>';

  // Verschickte vertrauliche Karten: was kursiert gerade bei wem, und woran
  // erkennt die Moderation einen guten bzw. schlechten Umgang damit?
  document.getElementById('m-sent-sk').innerHTML = (s.firedSonderlagekarten || []).slice().reverse().map(f => {
    const sk = scenario.sonderlagekarten.find(x => x.id === f.id);
    if (!sk) return '';
    const p = participantFor(f.recipientRoleId || sk.empfaenger, s.participants);
    const empf = f.recipientRoleId
      ? `${p && p.name ? escapeHtml(p.name) + ', ' : ''}${escapeHtml(funktion(f.recipientRoleId))}${f.recipientRoleId !== sk.empfaenger ? ` (statt ${escapeHtml(funktion(sk.empfaenger))})` : ''}`
      : '<span style="color:var(--warn);">niemand besetzt</span>';
    return `<div class="log-entry" style="padding:8px 0;">
      <div><b>${sk.id}</b> · ${new Date(f.at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} · an ${empf}</div>
      <div class="muted">${escapeHtml(f.text || sk.text)}</div>
      ${sk.moderatorHinweis ? `<div style="color:var(--warn);">Hinweis: ${escapeHtml(sk.moderatorHinweis)}</div>` : ''}
      ${sk.moderatorGut ? `<div style="color:var(--ok);">Gut: ${escapeHtml(sk.moderatorGut)}</div>` : ''}
      ${sk.moderatorSchlecht ? `<div style="color:var(--bad);">Schlecht: ${escapeHtml(sk.moderatorSchlecht)}</div>` : ''}
    </div>`;
  }).join('') || '<p class="muted mini">Noch keine vertraulichen Karten verschickt.</p>';

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
    <ul>${leitfaden.debriefingFragen.map(f => `<li>${escapeHtml(f)}</li>`).join('')}${((s.schwerpunkt && s.schwerpunkt.debriefing) || []).map(f => `<li><b>Schwerpunkt:</b> ${escapeHtml(f)}</li>`).join('')}</ul>
    <p class="mini" style="color:var(--warn);">${escapeHtml(leitfaden.highlightHinweis)}</p>
  `;

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

const euro = n => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
// Spielbrett: Meldeweg von draußen -> Krisenstab -> Weitergabe, mit den
// besetzten Rollen. Gleiche Daten wie auf der Bühne.
const EBENEN_LABEL = { eingang: 'Meldungen von draußen', krisenstab: 'Krisenstab', verteilung: 'Weitergabe nach innen und außen' };
function renderBoard(s) {
  const card = document.getElementById('m-board-card');
  const b = s.spielbrett;
  if (!b || !b.rollen.length || s.status === 'idle') { card.style.display = 'none'; return; }
  card.style.display = '';
  const spalten = ['eingang', 'krisenstab', 'verteilung'].map(e => {
    const tiles = b.rollen.filter(r => r.ebene === e).map(r => `
      <div class="tile${r.gefordert ? ' gefordert' : ''}${r.neueInfo ? ' info' : ''}">
        <b>${escapeHtml(r.rolle)}</b>${r.gefordert ? '<span class="tag zug">am Zug</span>' : ''}${r.neueInfo ? `<span class="tag info">${r.neueInfo > 1 ? r.neueInfo + ' neue Infos' : 'neue Info'}</span>` : ''}
        <div class="n">${escapeHtml(r.namen.join(', '))}</div>
      </div>`).join('');
    return `<div><div class="lane-k">${EBENEN_LABEL[e]}</div>${tiles || '<div class="mini muted">niemand besetzt</div>'}</div>`;
  }).join('');
  const fehlt = b.unbesetztGefordert.length ? `<p class="mini" style="color:var(--warn);">Bei dieser Lage auch gefragt, aber nicht besetzt: ${escapeHtml(b.unbesetztGefordert.join(', '))}</p>` : '';
  document.getElementById('m-board').innerHTML = fehlt + `<div class="mboard${b.lageAktiv ? ' lage' : ''}">${spalten}</div>`;
}

// Weichen: Entscheidungen des Tisches, die spaetere Lagen veraendern.
function weicheButtons(w) {
  return w.optionen.map(o => `
    <div style="display:flex;gap:8px;align-items:flex-start;margin-top:4px;">
      <button class="${w.gewaehlt === o.id ? '' : 'secondary '}weiche-opt" data-weiche="${escapeHtml(w.id)}" data-option="${w.gewaehlt === o.id ? '' : escapeHtml(o.id)}" style="flex-shrink:0;min-width:34px;" title="${w.gewaehlt === o.id ? 'Gewählt – noch einmal klicken nimmt die Entscheidung zurück.' : 'Diese Entscheidung festhalten.'}">${w.gewaehlt === o.id ? '&#10003;' : '&nbsp;'}</button>
      <span class="mini"><b>${escapeHtml(o.label)}</b><br><span class="muted">Folge: ${escapeHtml(o.wirkung)}</span></span>
    </div>`).join('');
}
function renderWeichen(s) {
  const card = document.getElementById('m-weichen-card');
  const list = s.weichen || [];
  if (!list.length || s.status === 'idle') { card.style.display = 'none'; return; }
  card.style.display = '';
  document.getElementById('m-weichen').innerHTML = list.map(w => {
    const gew = w.optionen.find(o => o.id === w.gewaehlt);
    return `<div style="padding:8px 0;border-top:1px solid var(--border);">
      <div class="mini">${w.aktuell ? '<span class="badge ok">jetzt</span> ' : ''}<span class="muted">${escapeHtml(w.simZeit || '')} · ${escapeHtml(w.lageTitel || '')}</span></div>
      <div class="mini" style="margin:2px 0 4px;"><b>${escapeHtml(w.frage)}</b></div>
      ${w.aktuell || w.erreicht ? weicheButtons(w) : `<div class="mini muted">kommt noch${gew ? ' – festgehalten: ' + escapeHtml(gew.label) : ''}</div>`}
      ${!w.aktuell && w.erreicht && !gew ? '<div class="mini" style="color:var(--warn);">Noch nicht festgehalten – ohne Eintrag bleibt die Geschichte unverändert.</div>' : ''}
    </div>`;
  }).join('');
}

function renderFinaleCard(s) {
  const card = document.getElementById('m-finale-card');
  const f = s.finale || {};
  if (!f.verfuegbar || s.status === 'idle') { card.style.display = 'none'; return; }
  card.style.display = '';
  const aktiv = !!f.step;
  document.getElementById('m-finale-optionen').innerHTML = (f.optionen || []).length
    ? '<b>Je nach Verlauf der Übung einrechnen:</b>' + f.optionen.map(o => `
      <label style="display:flex;gap:8px;align-items:flex-start;width:auto;margin-top:6px;">
        <input type="checkbox" class="finale-option" data-id="${escapeHtml(o.id)}" ${o.aktiv ? 'checked' : ''} style="width:auto;margin-top:2px;">
        <span>${escapeHtml(o.frage)} <span class="muted">→ ${escapeHtml(o.posten)}: ${euro(o.betrag)}</span></span>
      </label>`).join('')
    : '';
  const r = f.rechnung || {};
  const summary = `<p class="muted">Rechnung aktuell: Schaden ${euro(r.summe || 0)}, Versicherung ${euro(r.versicherung || 0)}, bleibt beim Unternehmen <b>${euro(r.eigenanteil || 0)}</b>` +
    (r.anteilJahresgewinn ? ` (${Math.round(r.anteilJahresgewinn * 100)} % des Jahresgewinns)` : '') + '.</p>';
  document.getElementById('m-finale-body').innerHTML = aktiv
    ? `<p><b>Schritt ${f.step} von ${f.steps}</b> – auf der Bühne: ${escapeHtml(stepText(f.view))}</p>` +
      (f.naechster ? `<p class="muted">Nächster Klick: ${escapeHtml(f.naechster)}</p>` : '<p style="color:var(--ok);">Letzter Schritt erreicht – jetzt ins Debriefing.</p>') + summary
    : summary + (s.status === 'ended' ? '<p class="muted">Abschluss ist ausgeblendet.</p>' : '');
  document.getElementById('btn-finale-start').style.display = aktiv ? 'none' : '';
  document.getElementById('btn-finale-start').textContent = s.status === 'ended' ? 'Abschluss zeigen' : 'Krise beenden – Abschluss zeigen';
  document.getElementById('btn-finale-prev').style.display = aktiv ? '' : 'none';
  document.getElementById('btn-finale-next').style.display = aktiv ? '' : 'none';
  document.getElementById('btn-finale-close').style.display = aktiv ? '' : 'none';
  document.getElementById('btn-finale-prev').disabled = f.step <= 1;
  document.getElementById('btn-finale-next').disabled = f.step >= f.steps;
}
function stepText(v) {
  if (!v) return '';
  switch (v.phase) {
    case 'intro': return 'Einleitung „' + v.titel + '“';
    case 'nacharbeiten': return `Nacharbeiten (${v.nacharbeiten.length} von ${v.nacharbeitenGesamt})`;
    case 'rechnung': return `Rechnung (${v.posten.length} von ${v.postenGesamt} Posten, Zwischensumme ${euro(v.laufendeSumme)})`;
    case 'bilanz': return 'Bilanz: Schaden, Versicherung, Eigenanteil';
    case 'aha': return 'Anteil am Jahresgewinn und nötiger Zusatzumsatz';
    case 'fazit': return 'Fazit';
    default: return v.phase;
  }
}

async function refresh() {
  try { render(await api('/api/run/moderator-state')); } catch (e) { /* Server evtl. kurz nicht erreichbar */ }
}

document.getElementById('btn-open-stage').addEventListener('click', () => window.open('stage.html', '_blank'));
document.getElementById('btn-protokoll').addEventListener('click', () => { window.location.href = '/api/run/protokoll'; });
document.getElementById('btn-send-all-certs').addEventListener('click', async () => {
  const people = ((lastState && lastState.participants) || []).filter(p => p.name && p.email);
  const statusEl = document.getElementById('m-certs-status');
  if (!people.length) { statusEl.textContent = 'Keine Personen mit Name und E-Mail eingetragen.'; return; }
  if (!confirm(`${people.length} Urkunden jetzt per E-Mail versenden?`)) return;
  let ok = 0;
  for (const [i, p] of people.entries()) {
    statusEl.textContent = `Sende ${i + 1}/${people.length} …`;
    const r = await api('/api/certificate/participant/' + p.id + '/send', { method: 'POST' });
    if (r.ok) ok++;
  }
  statusEl.textContent = `${ok}/${people.length} Urkunden versendet.` + (ok < people.length ? ' Fehler siehe Versand-Log.' : '');
});
document.getElementById('btn-finale-start').addEventListener('click', () => {
  if (lastState && lastState.status !== 'ended' && !confirm('Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?')) return;
  api('/api/run/finale/start', { method: 'POST' }).then(refresh);
});
document.getElementById('btn-finale-next').addEventListener('click', () => api('/api/run/finale/next', { method: 'POST' }).then(refresh));
document.getElementById('btn-finale-prev').addEventListener('click', () => api('/api/run/finale/prev', { method: 'POST' }).then(refresh));
document.getElementById('btn-finale-close').addEventListener('click', () => api('/api/run/finale/close', { method: 'POST' }).then(refresh));
// Pfeiltasten/Leertaste blaettern im Abschluss -- praktisch mit Presenter.
document.addEventListener('keydown', e => {
  if (!lastState || !lastState.finale || !lastState.finale.step) return;
  if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement && document.activeElement.tagName)) return;
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); api('/api/run/finale/next', { method: 'POST' }).then(refresh); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); api('/api/run/finale/prev', { method: 'POST' }).then(refresh); }
});
document.getElementById('btn-begin-crisis').addEventListener('click', () => api('/api/run/begin-crisis', { method: 'POST' }).then(refresh));
document.getElementById('btn-pause').addEventListener('click', () => api('/api/run/pause', { method: 'POST' }).then(refresh));
document.getElementById('btn-resume').addEventListener('click', () => api('/api/run/resume', { method: 'POST' }).then(refresh));
document.getElementById('btn-reset').addEventListener('click', () => {
  if (confirm('Lauf wirklich zurücksetzen? Timer und ausgelöste Karten werden gelöscht, die Teilnehmerliste bleibt erhalten.')) {
    api('/api/run/reset', { method: 'POST' }).then(refresh);
  }
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('sk-alert-all')) {
    skAlerts.length = 0;
    if (lastState) updateSkAlerts(lastState);
  }
  if (e.target.classList.contains('sk-alert-ok')) {
    skAlerts.splice(Number(e.target.dataset.idx), 1);
    if (lastState) updateSkAlerts(lastState);
  }
  const wbtn = e.target.closest && e.target.closest('.weiche-opt');
  if (wbtn) {
    api('/api/run/weiche', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: wbtn.dataset.weiche, option: wbtn.dataset.option || null }) }).then(refresh);
  }
  if (e.target.classList.contains('replay-sound')) {
    api('/api/run/replay-sound', { method: 'POST' });
  }
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
  if (e.target.classList.contains('finale-option')) {
    api('/api/run/finale/option', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: e.target.dataset.id, aktiv: e.target.checked }) }).then(refresh);
  }
});

refresh();
setInterval(refresh, 2000);
