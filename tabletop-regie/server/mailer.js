// Dünner nodemailer-Wrapper. SMTP-Zugangsdaten kommen ausschließlich aus
// data/settings.json (lokal, nicht eingecheckt) — nirgends hartkodiert.
const nodemailer = require('nodemailer');

function buildTransport(smtpSettings) {
  if (!smtpSettings || !smtpSettings.host) return null;
  return nodemailer.createTransport({
    host: smtpSettings.host,
    port: Number(smtpSettings.port) || 587,
    secure: !!smtpSettings.secure,
    auth: smtpSettings.user ? { user: smtpSettings.user, pass: smtpSettings.pass } : undefined,
    // Interne/Test-SMTP-Server haben oft selbstsignierte oder abgelaufene
    // Zertifikate. Nur explizit auf Wunsch lockern, nie standardmäßig.
    tls: smtpSettings.allowInsecureTLS ? { rejectUnauthorized: false } : undefined
  });
}

// Trockenlauf: Inhalt bleibt unveraendert (genau das, was die echte Person
// bekommen haette), nur Empfaenger + ein deutlicher Hinweis aendern sich --
// so laesst sich pruefen, wie jede Mail aussieht, ohne echte Teilnehmer
// anzuschreiben. testMode kommt aus den Einstellungen (settings.testMode).
function applyTestMode(to, subject, text, html, testMode) {
  if (!testMode || !testMode.enabled || !testMode.dummyEmail) return { to, subject, text, html };
  const banner = `>>> TESTLAUF – diese Mail wäre eigentlich an ${to} gegangen. <<<`;
  return {
    to: testMode.dummyEmail,
    subject: `[TESTLAUF → ${to}] ${subject}`,
    text: text ? `${banner}\n\n${text}` : text,
    html: html ? `<p style="background:#fff3cd;border:1px solid #e0a832;padding:8px 12px;border-radius:6px;color:#7a5c00;font-family:sans-serif;"><b>TESTLAUF</b> — diese Mail wäre eigentlich an <b>${String(to).replace(/[<>&]/g, '')}</b> gegangen.</p>${html}` : html
  };
}

async function sendMail(smtpSettings, { to, subject, text, html, attachments }, testMode) {
  const transport = buildTransport(smtpSettings);
  if (!transport) {
    return { ok: false, error: 'Kein SMTP-Server konfiguriert (Einstellungen prüfen).' };
  }
  const redirected = applyTestMode(to, subject, text, html, testMode);
  try {
    const from = smtpSettings.fromName
      ? `"${smtpSettings.fromName}" <${smtpSettings.fromAddress || smtpSettings.user}>`
      : (smtpSettings.fromAddress || smtpSettings.user);
    const info = await transport.sendMail({ from, to: redirected.to, subject: redirected.subject, text: redirected.text, html: redirected.html, attachments });
    return { ok: true, messageId: info.messageId, testModeRedirectedFrom: redirected.to !== to ? to : undefined };
  } catch (e) {
    return { ok: false, error: e.message || String(e) };
  }
}

module.exports = { sendMail, buildTransport };
