// Isolierte Testumgebung für alle QA-Tests:
// - eigener Datenordner (Kopie der Drehbücher), die Projektkonfiguration in data/ bleibt unberührt
// - eigener Server (nur 127.0.0.1) mit Protokoll der Konsole
// - lokaler SMTP-Testempfänger mit Fehlermodi: 'normal' | 'ablehnen' (550 bei RCPT) | 'abbrechen' (Verbindung im DATA-Teil trennen)
// Keine Zufallswerte: Ports und Namen sind fest bzw. werden übergeben.
const fs = require('fs');
const path = require('path');
const net = require('net');
const os = require('os');
const { spawn } = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function smtpEmpfaenger(port) {
  const mails = []; let modus = 'normal'; const sockets = new Set();
  const server = net.createServer(sock => {
    sockets.add(sock); sock.on('close', () => sockets.delete(sock)); sock.on('error', () => {});
    let rcpt = [], inData = false, data = '', buf = '';
    sock.write('220 test ESMTP\r\n');
    sock.on('data', chunk => {
      buf += chunk.toString('utf8'); let i;
      while ((i = buf.indexOf('\r\n')) >= 0) {
        const line = buf.slice(0, i); buf = buf.slice(i + 2);
        if (inData) {
          if (modus === 'abbrechen') { sock.destroy(); return; }
          if (line === '.') { inData = false; mails.push({ to: rcpt, raw: data, zeit: new Date().toISOString() }); rcpt = []; data = ''; sock.write('250 OK\r\n'); } else data += line + '\n';
          continue;
        }
        const c = line.toUpperCase();
        if (c.startsWith('EHLO') || c.startsWith('HELO')) sock.write('250 test\r\n');
        else if (c.startsWith('MAIL FROM')) sock.write('250 OK\r\n');
        else if (c.startsWith('RCPT TO')) { if (modus === 'ablehnen') sock.write('550 Empfänger unbekannt\r\n'); else { rcpt.push(line.slice(8).replace(/[<>]/g, '').trim()); sock.write('250 OK\r\n'); } }
        else if (c === 'DATA') { inData = true; sock.write('354 go\r\n'); }
        else if (c === 'QUIT') { sock.write('221 bye\r\n'); sock.end(); }
        else sock.write('250 OK\r\n');
      }
    });
  });
  return {
    mails, setModus: m => { modus = m; },
    start: () => new Promise((res, rej) => { server.once('error', rej); server.listen(port, '127.0.0.1', res); }),
    stop: () => new Promise(res => { sockets.forEach(s => s.destroy()); server.close(() => res()); })
  };
}
const dekodiere = h => h.replace(/=\?UTF-8\?([QB])\?([^?]*)\?=\s*/gi, (m, enc, t) => enc.toUpperCase() === 'B' ? Buffer.from(t, 'base64').toString('utf8') : Buffer.from(t.replace(/_/g, ' ').replace(/=([0-9A-F]{2})/gi, (x, hh) => String.fromCharCode(parseInt(hh, 16))), 'latin1').toString('utf8'));
function mailListe(mails) {
  return mails.map(m => { const head = m.raw.split('\n\n')[0].replace(/\n[ \t]+/g, ' '); const body = m.raw.split('\n\n').slice(1).join('\n\n');
    const qp = body.replace(/=\n/g, '').replace(/=([0-9A-F]{2})/g, (x, h) => '%' + h); let text = body; try { text = decodeURIComponent(qp); } catch (e) { /* anders kodiert */ }
    return { to: m.to, subject: dekodiere(((head.match(/^Subject: (.*)$/mi) || [])[1] || '').trim()), text, zeit: m.zeit }; });
}

async function umgebung({ port, smtpPort, name, logDir, countdown }) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), `qa-${name || 'lauf'}-`));
  fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^scenario\..*\.json$/.test(f)).forEach(f => fs.copyFileSync(path.join(ROOT, 'data', f), path.join(dataDir, f)));
  const smtp = smtpEmpfaenger(smtpPort); await smtp.start();
  const B = `http://127.0.0.1:${port}`;
  const logDatei = path.join(logDir || dataDir, `server-${name || 'lauf'}.log`);
  let srv = null;
  const startServer = async () => {
    const log = fs.openSync(logDatei, 'a');
    srv = spawn(process.execPath, ['server/index.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(port), HOST: '127.0.0.1', TABLETOP_DATA_DIR: dataDir }, countdown !== undefined ? { TABLETOP_COUNTDOWN_SEKUNDEN: String(countdown) } : {}), stdio: ['ignore', log, log] });
    for (let i = 0; i < 80; i++) { try { await fetch(B + '/api/scenario-meta'); return; } catch (e) { await sleep(250); } }
    throw new Error('Server startet nicht');
  };
  const stopServer = async () => { if (!srv) return; const p = new Promise(r => srv.once('exit', r)); srv.kill('SIGTERM'); await p; srv = null; };
  await startServer();
  const post = (p, b) => fetch(B + p, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Regie': '1' }, body: JSON.stringify(b === undefined ? {} : b) }).then(async r => ({ status: r.status, body: await r.json().catch(() => null) }));
  const get = p => fetch(B + p).then(r => r.json());
  const text = p => fetch(B + p).then(r => r.text());
  await post('/api/settings', { smtp: { host: '127.0.0.1', port: smtpPort, secure: false, user: '', pass: '', fromAddress: 'regie@example.com' }, testMode: { enabled: false, dummyEmail: '' } });
  return {
    B, post, get, text, dataDir, logDatei, smtp, mails: () => mailListe(smtp.mails),
    neustart: async () => { await stopServer(); await sleep(800); await startServer(); },
    stopServer, startServer,
    ende: async () => { await stopServer(); await smtp.stop(); }
  };
}
// Teilnehmende einer Besetzung: feste Testadressen, keine echten Personen
function personen(rollenIds, jeRolle) {
  return rollenIds.flatMap((r, i) => Array.from({ length: (jeRolle && jeRolle[r]) || 1 }, (_, k) => ({ name: `Person ${i + 1}${k ? '-' + (k + 1) : ''}`, email: `person${i + 1}${k ? '-' + (k + 1) : ''}@example.com`, roleIds: [r] })));
}
module.exports = { umgebung, personen, mailListe, sleep, ROOT };
