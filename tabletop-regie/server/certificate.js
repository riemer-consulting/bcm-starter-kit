// Erzeugt eine druckfertige HTML-Urkunde (Browser-Druckdialog -> "Als PDF
// speichern"). Bewusst kein PDF-Paket als Abhaengigkeit, analog zum BCM
// Starter Kit, der ebenfalls window.print() statt einer PDF-Bibliothek nutzt.
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function renderCertificate({ scenario, role, participant, score, branding }) {
  const maxPunkte = (scenario.urkunde && scenario.urkunde.maxPunkte) || 10;
  const veranstaltung = (scenario.urkunde && scenario.urkunde.veranstaltung) || scenario.title;
  const orgName = (branding && branding.organisationName) || 'Durchführende Organisation';
  const logoHtml = branding && branding.logo
    ? `<img src="${escapeHtml(branding.logo)}" alt="${escapeHtml(orgName)}" style="height:48px;">`
    : `<div style="font-size:20px;font-weight:700;letter-spacing:2px;">${escapeHtml(orgName)}</div>`;
  const scoreText = (score === null || score === undefined) ? '______' : escapeHtml(String(score));
  // Die Urkunde zeigt immer den echten, im Setup fuer diese Übung eingetragenen
  // Namen — niemals einen im Szenario fest hinterlegten Namen. Die Rolle
  // (Funktionsbezeichnung) erscheint nur als Zusatzinfo.
  const displayName = participant && participant.name ? participant.name : '[Name der Teilnehmerin/des Teilnehmers]';

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>Urkunde – ${escapeHtml(displayName)}</title>
<style>
  @page { size: A4 landscape; margin: 20mm; }
  body { font-family: Georgia, 'Times New Roman', serif; color:#1a2233; text-align:center; }
  .frame { border: 3pt solid #1c3d6b; padding: 40pt; height: calc(100vh - 110pt); display:flex; flex-direction:column; justify-content:center; align-items:center; }
  .company { font-size:14pt; letter-spacing:2pt; color:#556; margin-bottom:8pt; }
  h1 { font-size:30pt; margin:4pt 0 18pt; }
  .name { font-size:24pt; font-weight:700; margin:14pt 0; border-bottom:1pt solid #1c3d6b; padding-bottom:6pt; display:inline-block; min-width:320pt; }
  .role { font-size:12pt; color:#556; margin-top:-6pt; margin-bottom:10pt; }
  .text { font-size:13pt; max-width:560pt; line-height:1.6; margin: 10pt auto; }
  .score { font-size:16pt; margin-top:18pt; }
  .footer { margin-top:30pt; font-size:11pt; color:#556; }
</style>
</head>
<body onload="window.print()">
  <div class="frame">
    <div class="company">${escapeHtml(scenario.company ? scenario.company.name : '')}</div>
    <h1>🏆 URKUNDE 🏆</h1>
    <div class="text">Hiermit wird bestätigt, dass</div>
    <div class="name">${escapeHtml(displayName)}</div>
    <div class="role">in der Rolle: ${escapeHtml(role.funktion)}</div>
    <div class="text">erfolgreich an der ${escapeHtml(veranstaltung)} teilgenommen hat.<br>
    Die Teilnehmerin / Der Teilnehmer bewies Verantwortungsbewusstsein, Kommunikationsstärke,
    Entscheidungsfähigkeit und Teamarbeit unter den Bedingungen einer simulierten Unternehmenskrise.</div>
    <div class="score">Gesamtbewertung: ${scoreText} / ${maxPunkte} Punkten</div>
    <div class="footer">${logoHtml}<br>Ausgestellt durch ${escapeHtml(orgName)}</div>
  </div>
</body>
</html>`;
}

module.exports = { renderCertificate };
