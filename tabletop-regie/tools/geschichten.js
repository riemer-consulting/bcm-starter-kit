// Erzeugt vollständig durchgespielte Geschichten eines Drehbuchs (Dauer × Schwerpunkt × Entscheidungen)
// so, wie der Tisch sie erlebt. Aufruf: node tools/geschichten.js data/scenario.<name>.json <ausgabe.md>
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const s = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'));
const e = require(ROOT + '/server/runEngine');
const AKT = Object.fromEntries(e.AKTE.map(a => [a.key, a.label]));
const role = id => (s.roles.find(r => r.id === id) || {}).funktion || id;
const eur = n => new Intl.NumberFormat('de-DE').format(n) + ' €';
const out = []; const w = (...l) => out.push(...l);
const kurz = wahl => Object.entries(wahl).map(([k, v]) => `${k} ${v}`).join(', ');
const GESCHICHTEN = {
  'nordtech-7-tage-ausnahmezustand': (() => {
    const RISKANT = { W1: 'am-netz', W2: 'abwarten', W3: 'abwarten', W4: 'gezahlt' };
    const VORSICHTIG = { W1: 'trennen', W2: 'proaktiv', W3: 'melden', W4: 'nicht-gezahlt' };
    const GEMISCHT_A = { W1: 'trennen', W2: 'abwarten', W3: 'melden', W4: 'gezahlt' };
    const GEMISCHT_B = { W1: 'am-netz', W2: 'proaktiv', W3: 'abwarten', W4: 'nicht-gezahlt' };
    return [
      { nr: 1, minuten: 45, sp: null, wahl: RISKANT, name: 'alle Entscheidungen riskant' },
      { nr: 2, minuten: 90, sp: null, wahl: VORSICHTIG, name: 'alle Entscheidungen vorsichtig' },
      { nr: 3, minuten: 90, sp: 'fuehrung', wahl: RISKANT, name: 'alle Entscheidungen riskant' },
      { nr: 4, minuten: 90, sp: 'it', wahl: GEMISCHT_A, name: 'gemischt (trennen, Kunden abwarten, melden, gezahlt)' },
      { nr: 5, minuten: 90, sp: 'produktion', wahl: RISKANT, name: 'alle Entscheidungen riskant' },
      { nr: 6, minuten: 90, sp: 'kunden', wahl: GEMISCHT_B, name: 'gemischt (am Netz, Kunden proaktiv, Datenschutz abwarten, nicht gezahlt)' },
      { nr: 7, minuten: 180, sp: 'it', wahl: RISKANT, name: 'alle Entscheidungen riskant' }
    ];
  })(),
  'waterkant-rechenzentrum': [
    { nr: 1, minuten: 45, sp: null, wahl: { W1: 'herunterfahren', W2: 'frueh', W3: 'abwarten', W4: 'minimal', W5: 'gleichrangig' } },
    { nr: 2, minuten: 60, sp: 'betrieb', wahl: { W1: 'weiterlaufen', W2: 'spaeter', W3: 'bergen', W4: 'ausbauen', W5: 'eigene' } },
    { nr: 3, minuten: 90, sp: null, wahl: { W1: 'herunterfahren', W2: 'frueh', W3: 'bergen', W4: 'minimal', W5: 'gleichrangig' } },
    { nr: 4, minuten: 90, sp: 'fuehrung', wahl: { W1: 'weiterlaufen', W2: 'spaeter', W3: 'bergen', W4: 'ausbauen', W5: 'eigene' } },
    { nr: 5, minuten: 90, sp: 'it', wahl: { W1: 'weiterlaufen', W2: 'frueh', W3: 'abwarten', W4: 'ausbauen', W5: 'gleichrangig' } },
    { nr: 6, minuten: 120, sp: 'kunden', wahl: { W1: 'herunterfahren', W2: 'spaeter', W3: 'abwarten', W4: 'minimal', W5: 'eigene' } },
    { nr: 7, minuten: 180, sp: null, wahl: { W1: 'weiterlaufen', W2: 'spaeter', W3: 'bergen', W4: 'ausbauen', W5: 'eigene' } },
    { nr: 8, minuten: 180, sp: 'betrieb', wahl: { W1: 'herunterfahren', W2: 'frueh', W3: 'abwarten', W4: 'minimal', W5: 'gleichrangig' } }
  ]
};
const LAEUFE = (GESCHICHTEN[s.id] || []).map(l => Object.assign({ name: kurz(l.wahl) }, l));
w(`# ${s.company.name} – durchgespielte Geschichten zur fachlichen Prüfung`, '',
  `Stand: ${new Date().toISOString().slice(0, 10)} · Alle Angaben fiktiv. Erzeugt direkt aus dem Werkzeug: genau diese Karten, Texte und Reihenfolgen sieht der Tisch.`, '',
  '## Auftrag', '',
  'Lies jede Geschichte von vorne nach hinten so, wie der Tisch sie erlebt (öffentliche Lagen auf der Bühne, vertrauliche Karten per E-Mail an einzelne Rollen, Entscheidungen an den Weichen, am Ende die Rechnung). Prüfe für jede Geschichte:', '',
  '1. Ist sie in sich schlüssig – Zeitangaben, Zahlen, Wissen der Beteiligten, Folgen der Entscheidungen?',
  '2. Verändern Schwerpunkt und Entscheidungen tatsächlich, worüber der Tisch entscheiden muss (nicht nur, welche Karten kommen)?',
  '3. Gibt es Stellen, an denen eine Karte etwas voraussetzt, das in *dieser* Geschichte nicht passiert ist?',
  '4. Ist die Rechnung am Ende zu den getroffenen Entscheidungen plausibel?', '',
  'Bitte als Tabelle antworten: Geschichte | Stelle (Karten-ID) | Problem | Vorschlag (fertiger Text) | Dringlichkeit. Danach je Geschichte ein Satz Gesamturteil.', '');

w('## Übersicht', '', '| Nr. | Dauer | Schwerpunkt | Entscheidungen |', '|---:|---:|---|---|');
LAEUFE.forEach(l => w(`| ${l.nr} | ${l.minuten} Min. | ${l.sp ? s.schwerpunkte.find(x => x.key === l.sp).label : 'Ausgewogen'} | ${l.name} |`));
w('');

LAEUFE.forEach(l => {
  const sp = l.sp ? s.schwerpunkte.find(x => x.key === l.sp) : null;
  const rec = e.recommendRoles(s, { targetMinutes: l.minuten });
  const besetzt = new Set(rec.roleIds);
  const plan = e.buildAdaptiveSchedule(s, { targetMinutes: l.minuten, difficulty: 'mittel', roleCount: rec.groups.length, activeRoleIds: rec.roleIds, schwerpunkt: l.sp });
  const lkOrder = plan.schedule.filter(x => x.type === 'lagekarte').map(x => x.id);
  const weicheBei = {};
  (s.weichen || []).forEach(wc => { const at = lkOrder.find(id => wc.lagekarten.includes(id)); if (at) (weicheBei[at] = weicheBei[at] || []).push(wc); });
  const gezeigt = new Set(); const verschickt = new Set();
  const opt = wc => wc.optionen.find(o => o.id === l.wahl[wc.id]);
  const entschieden = new Set();
  const gewaehlt = wc => (entschieden.has(wc.id) ? opt(wc) : null);
  const posten = [];

  w('---', '', `## Geschichte ${l.nr}: ${l.minuten} Minuten · ${sp ? sp.label : 'Ausgewogen'} · ${l.name}`, '',
    `**Besetzte Rollen (${rec.roleIds.length}):** ${rec.roleIds.map(role).join(', ')}  `,
    `**Geplante Krisenzeit:** ${plan.totalMinutes} Min. + ca. ${plan.finaleMinutes} Min. Abschluss · Entscheidungszeit je Lage ca. ${String(plan.decisionMinutesUsed).replace('.', ',')} Min.`);
  if (sp) w(`  `, `**Leitfrage des Schwerpunkts (für die Moderation):** ${sp.leitfrage}`);
  w('');

  const folgeKarten = [];
  // Entscheidungen fallen am Ende der Diskussion ihrer Lage
  const offen = [];
  const entscheide = () => {
    while (offen.length) {
      const wc = offen.shift();
      entschieden.add(wc.id);
      const o = opt(wc);
      (o.posten || []).forEach(pid => posten.push(pid));
      w(`**Entscheidung ${wc.id} (am Ende dieser Lage):** ${wc.frage}  `, `→ Der Tisch entscheidet: **${o.label}**  `, `*Folge laut Drehbuch:* ${o.wirkung}`, '');
    }
  };
  const textVon = k => {
    let t = k.text;
    (k.textVarianten || []).forEach(v => { if (gezeigt.has(v.nachLagekarte)) t = v.text; });
    (s.weichen || []).forEach(wc => { const o = gewaehlt(wc); (o && o.folgen || []).filter(f => f.sonderlagekarte === k.id && f.text).forEach(f => { t = f.text; }); });
    return t;
  };
  plan.schedule.forEach(ev => {
    if (ev.type === 'lagekarte') {
      entscheide();
      const lk = s.lagekarten.find(x => x.id === ev.id);
      gezeigt.add(lk.id);
      let text = lk.text; let ki = lk.kriseninfo;
      (s.weichen || []).forEach(wc => { const o = gewaehlt(wc); (o && o.folgen || []).filter(f => f.lagekarte === lk.id).forEach(f => { if (f.zusatz) text += ' ' + f.zusatz; if (f.kriseninfo) ki = f.kriseninfo; }); });
      const fragen = [...(lk.aufgabe || []), ...(sp && sp.zusatzfragen && sp.zusatzfragen[lk.id] ? [sp.zusatzfragen[lk.id] + ' *(Schwerpunkt)*'] : [])];
      w(`### Min. ${ev.minute.toFixed(1).replace('.', ',')} · ${lk.id} ${lk.titel} · ${lk.simZeit} · ${AKT[lk.akt]}`, '', text, '');
      if (ki) w(`*Krisen-Info:* ${ki}`, '');
      w(...fragen.map(f => '- ' + f), '');
      // Folgekarten aus frueheren Entscheidungen, die an dieser Lage haengen
      (s.weichen || []).forEach(wc => { const o = gewaehlt(wc); if (o && o.karte && o.karte.beiLagekarte === lk.id) folgeKarten.push(o.karte.sonderlagekarte); });
      while (folgeKarten.length) {
        const fid = folgeKarten.shift(); const k = s.sonderlagekarten.find(x => x.id === fid);
        if (verschickt.has(k.id)) continue;
        verschickt.add(k.id);
        const an = e.resolveRecipient(k, besetzt);
        w(`> **Vertraulich (Folge einer Entscheidung) ${k.id} an ${an ? role(an) : 'niemand besetzt'}${an && an !== k.empfaenger ? ' (statt ' + role(k.empfaenger) + ')' : ''}:** ${textVon(k)}`, '');
      }
      offen.push(...(weicheBei[lk.id] || []));
    } else {
      const k = s.sonderlagekarten.find(x => x.id === ev.id);
      if (verschickt.has(k.id)) return;
      verschickt.add(k.id);
      const text = textVon(k);
      const an = e.resolveRecipient(k, besetzt);
      w(`> **Vertraulich ${k.id} an ${role(an)}${an !== k.empfaenger ? ' (statt ' + role(k.empfaenger) + ')' : ''}** (Min. ${ev.minute.toFixed(1).replace('.', ',')}): ${text}`, '');
    }
  });

  entscheide();
  const n = s.nachspiel;
  const basis = n.rechnung.reduce((a, p) => a + p.betrag, 0);
  const zusatz = posten.map(pid => n.optionalePosten.find(o => o.id === pid));
  const summe = basis + zusatz.reduce((a, p) => a + p.betrag, 0);
  const eigen = summe - n.versicherung.betrag;
  w('### Abschluss', '', n.einleitung, '',
    `Rechnung: Grundschaden ${eur(basis)}${zusatz.length ? ' + aus Entscheidungen: ' + zusatz.map(p => `${p.posten} (${eur(p.betrag)})`).join('; ') : ' (keine Zusatzposten)'} = **${eur(summe)}**; ${n.versicherung.text}: − ${eur(n.versicherung.betrag)} → **beim Unternehmen bleiben ${eur(eigen)}** (${Math.round(eigen / (n.jahresumsatz * n.umsatzrendite) * 100)} % des Jahresgewinns).`, '',
    `*Fazit auf der Bühne:* ${n.fazit}`, '');
  w('### Debriefing in dieser Geschichte', '', ...s.moderationsleitfaden.debriefingFragen.map(q => '- ' + q), ...((sp && sp.debriefing) || []).map(q => '- *(Schwerpunkt)* ' + q), '');
});
fs.writeFileSync(process.argv[3], out.join('\n') + '\n');
console.log('geschrieben:', process.argv[3], LAEUFE.length, 'Geschichten');
console.log('ok', out.length);
