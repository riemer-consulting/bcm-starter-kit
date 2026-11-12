// Erzeugt die Urkunde als HTML — wird per E-Mail an die Teilnehmerin/den
// Teilnehmer verschickt (kein Ausdrucken/Als-PDF-Speichern mehr nötig).
// Bewusst kein PDF-Paket als Abhaengigkeit.
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// companyLogoSrc/brandingLogoSrc: fertiger <img src="..."> Wert. Der Aufrufer
// entscheidet, was dort steht — ein relativer "/media/..."-Pfad fuer die
// Browser-Vorschau (vom Server ausgeliefert), oder eine "cid:..."-Referenz
// fuers E-Mail-Versenden (mit passendem nodemailer-Inline-Attachment).
function renderCertificate({ scenario, role, roles, participant, score, branding, companyLogoSrc, brandingLogoSrc, ort, datum, starterKitUrl, starterKitLabel, starterKitScreenshotSrc, starterKitQrSrc }) {
  const maxPunkte = (scenario.urkunde && scenario.urkunde.maxPunkte) || 10;
  const veranstaltung = (scenario.urkunde && scenario.urkunde.veranstaltung) || scenario.title;
  const orgName = (branding && branding.organisationName) || 'Durchführende Organisation';
  const rollenText = (roles && roles.length ? roles : [role]).filter(Boolean).map(r => r.funktion).join(', ');
  const ortDatumText = [ort, datum].filter(Boolean).join(', ');
  const logoHtml = brandingLogoSrc
    ? `<img src="${escapeHtml(brandingLogoSrc)}" alt="${escapeHtml(orgName)}" style="height:48px;">`
    : `<div style="font-size:20px;font-weight:700;letter-spacing:2px;">${escapeHtml(orgName)}</div>`;
  const scoreText = (score === null || score === undefined) ? '______' : escapeHtml(String(score));
  // Die Urkunde zeigt immer den echten, im Setup fuer diese Übung eingetragenen
  // Namen — niemals einen im Szenario fest hinterlegten Namen. Die Rolle
  // (Funktionsbezeichnung) erscheint nur als Zusatzinfo.
  const displayName = participant && participant.name ? participant.name : '[Name der Teilnehmerin/des Teilnehmers]';
  const companyName = scenario.company ? scenario.company.name : '';
  const companyLogoHtml = companyLogoSrc
    ? `<img src="${escapeHtml(companyLogoSrc)}" alt="${escapeHtml(companyName)}" style="height:40px;margin-bottom:6pt;">`
    : '';

  // Call-to-Action unterhalb der eigentlichen Urkunde: die Übung ist der
  // Einstieg, das Starter Kit der naheliegende naechste Schritt fuer alle,
  // die BCM danach auch fuer das eigene Unternehmen angehen wollen.
  const starterKitHtml = starterKitUrl ? `
  <div style="font-family:-apple-system,'Segoe UI',Arial,sans-serif;text-align:center;max-width:480pt;margin:24pt auto 0;padding-top:20pt;border-top:1pt solid #d5dbe3;">
    <div style="font-size:13pt;font-weight:700;color:#1a2233;margin-bottom:6pt;">Nächster Schritt: ${escapeHtml(starterKitLabel || 'BCM Starter Kit')}</div>
    <div style="font-size:11pt;color:#556;margin-bottom:12pt;">Diese Übung war eine Simulation — für die eigene Business-Continuity-Planung im Unternehmen gibt es das kostenlose, lokal laufende BCM Starter Kit.</div>
    ${starterKitScreenshotSrc ? `<img src="${escapeHtml(starterKitScreenshotSrc)}" alt="BCM Starter Kit" style="max-width:320pt;border:1pt solid #d5dbe3;border-radius:6pt;margin-bottom:10pt;">` : ''}
    <div style="display:flex;align-items:center;justify-content:center;gap:14pt;">
      ${starterKitQrSrc ? `<img src="${escapeHtml(starterKitQrSrc)}" alt="QR-Code zum BCM Starter Kit" style="width:84pt;height:84pt;">` : ''}
      <a href="${escapeHtml(starterKitUrl)}" style="font-size:11pt;color:#2f6ba3;word-break:break-all;">${escapeHtml(starterKitUrl)}</a>
    </div>
  </div>` : '';

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
<body>
  <div class="frame">
    ${companyLogoHtml}
    <div class="company">${escapeHtml(companyName)}</div>
    <h1>🏆 URKUNDE 🏆</h1>
    <div class="text">Hiermit wird bestätigt, dass</div>
    <div class="name">${escapeHtml(displayName)}</div>
    <div class="role">in der Rolle: ${escapeHtml(rollenText)}</div>
    <div class="text">erfolgreich an der ${escapeHtml(veranstaltung)} teilgenommen hat.<br>
    Die Teilnehmerin / Der Teilnehmer bewies Verantwortungsbewusstsein, Kommunikationsstärke,
    Entscheidungsfähigkeit und Teamarbeit unter den Bedingungen einer simulierten Unternehmenskrise.</div>
    <div class="score">Gesamtbewertung: ${scoreText} / ${maxPunkte} Punkten</div>
    <div class="footer">${ortDatumText ? escapeHtml(ortDatumText) + '<br>' : ''}${logoHtml}<br>Ausgestellt durch ${escapeHtml(orgName)}</div>
  </div>
  ${starterKitHtml}
</body>
</html>`;
}

module.exports = { renderCertificate };
