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

async function sendMail(smtpSettings, { to, subject, text, html }) {
  const transport = buildTransport(smtpSettings);
  if (!transport) {
    return { ok: false, error: 'Kein SMTP-Server konfiguriert (Einstellungen prüfen).' };
  }
  try {
    const from = smtpSettings.fromName
      ? `"${smtpSettings.fromName}" <${smtpSettings.fromAddress || smtpSettings.user}>`
      : (smtpSettings.fromAddress || smtpSettings.user);
    const info = await transport.sendMail({ from, to, subject, text, html });
    return { ok: true, messageId: info.messageId };
  } catch (e) {
    return { ok: false, error: e.message || String(e) };
  }
}

module.exports = { sendMail, buildTransport };
