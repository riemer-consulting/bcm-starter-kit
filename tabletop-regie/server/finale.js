// Abschluss einer Übung: "Alles läuft wieder?" -- Nacharbeiten und die
// Rechnung, was der Ausfall wirklich gekostet hat. Der Moderator klickt sich
// Schritt für Schritt durch, die Bühne deckt Zahl für Zahl auf.
//
// Schritte (in dieser Reihenfolge):
//   intro                -> Titel + Einleitung
//   nacharbeiten (k)     -> die ersten k Nacharbeiten sind sichtbar
//   rechnung (k)         -> die ersten k Kostenposten + laufende Summe
//   bilanz               -> Summe, Versicherung, Eigenanteil
//   aha                  -> Anteil am Jahresgewinn, nötiger Zusatzumsatz
//   fazit                -> Kernbotschaft + Hinweis "fiktive Beispielrechnung"

function activePosten(nachspiel, optionen) {
  const base = (nachspiel.rechnung || []).map(p => Object.assign({ optional: false }, p));
  const extra = (nachspiel.optionalePosten || [])
    .filter(p => optionen && optionen[p.id])
    .map(p => Object.assign({ optional: true }, p));
  return base.concat(extra);
}

function bill(nachspiel, optionen) {
  const posten = activePosten(nachspiel, optionen);
  const summe = posten.reduce((s, p) => s + (Number(p.betrag) || 0), 0);
  const versicherung = nachspiel.versicherung ? Math.min(summe, Number(nachspiel.versicherung.betrag) || 0) : 0;
  const eigenanteil = summe - versicherung;
  const jahresgewinn = nachspiel.jahresumsatz && nachspiel.umsatzrendite
    ? nachspiel.jahresumsatz * nachspiel.umsatzrendite : null;
  return {
    posten,
    summe,
    versicherung,
    versicherungText: nachspiel.versicherung ? nachspiel.versicherung.text : null,
    eigenanteil,
    jahresumsatz: nachspiel.jahresumsatz || null,
    umsatzrendite: nachspiel.umsatzrendite || null,
    jahresgewinn,
    anteilJahresgewinn: jahresgewinn ? eigenanteil / jahresgewinn : null,
    // Um den Eigenanteil aus dem laufenden Geschäft zu verdienen, braucht es
    // bei gegebener Umsatzrendite diesen zusätzlichen Umsatz.
    noetigerZusatzumsatz: nachspiel.umsatzrendite ? eigenanteil / nachspiel.umsatzrendite : null
  };
}

function steps(nachspiel, optionen) {
  if (!nachspiel) return [];
  const list = [{ phase: 'intro', reveal: 0 }];
  const n = (nachspiel.nacharbeiten || []).length;
  for (let k = 1; k <= n; k++) list.push({ phase: 'nacharbeiten', reveal: k });
  const m = activePosten(nachspiel, optionen).length;
  for (let k = 1; k <= m; k++) list.push({ phase: 'rechnung', reveal: k });
  list.push({ phase: 'bilanz', reveal: 0 });
  if (nachspiel.jahresumsatz && nachspiel.umsatzrendite) list.push({ phase: 'aha', reveal: 0 });
  list.push({ phase: 'fazit', reveal: 0 });
  return list;
}

// Was Bühne und Moderation für den aktuellen Schritt brauchen. step ist
// 1-basiert; 0 bedeutet "Abschluss nicht aktiv".
function view(nachspiel, finaleState) {
  if (!nachspiel || !finaleState || !finaleState.step) return null;
  const optionen = finaleState.optionen || {};
  const all = steps(nachspiel, optionen);
  const idx = Math.min(all.length, Math.max(1, finaleState.step)) - 1;
  const cur = all[idx];
  const b = bill(nachspiel, optionen);
  const phaseOrder = ['intro', 'nacharbeiten', 'rechnung', 'bilanz', 'aha', 'fazit'];
  const reached = p => phaseOrder.indexOf(cur.phase) >= phaseOrder.indexOf(p);
  const nachSichtbar = cur.phase === 'nacharbeiten' ? cur.reveal : (reached('rechnung') ? (nachspiel.nacharbeiten || []).length : 0);
  const postenSichtbar = cur.phase === 'rechnung' ? cur.reveal : (reached('bilanz') ? b.posten.length : 0);
  const sichtbarePosten = b.posten.slice(0, postenSichtbar);
  return {
    step: idx + 1,
    steps: all.length,
    phase: cur.phase,
    titel: nachspiel.titel,
    einleitung: nachspiel.einleitung,
    nacharbeiten: (nachspiel.nacharbeiten || []).slice(0, nachSichtbar),
    nacharbeitenGesamt: (nachspiel.nacharbeiten || []).length,
    posten: sichtbarePosten,
    postenGesamt: b.posten.length,
    laufendeSumme: sichtbarePosten.reduce((s, p) => s + (Number(p.betrag) || 0), 0),
    bilanz: reached('bilanz') ? {
      summe: b.summe, versicherung: b.versicherung, versicherungText: b.versicherungText, eigenanteil: b.eigenanteil
    } : null,
    aha: reached('aha') && b.jahresgewinn ? {
      jahresumsatz: b.jahresumsatz, umsatzrendite: b.umsatzrendite, jahresgewinn: b.jahresgewinn,
      anteilJahresgewinn: b.anteilJahresgewinn, noetigerZusatzumsatz: b.noetigerZusatzumsatz, eigenanteil: b.eigenanteil
    } : null,
    fazit: cur.phase === 'fazit' ? nachspiel.fazit : null,
    hinweis: nachspiel.hinweis || null
  };
}

// Vorschau fuer die Moderation: was kommt beim naechsten Klick?
function stepLabel(nachspiel, finaleState, offset) {
  const all = steps(nachspiel, (finaleState && finaleState.optionen) || {});
  const i = ((finaleState && finaleState.step) || 0) - 1 + offset;
  const s = all[i];
  if (!s) return null;
  const posten = activePosten(nachspiel, (finaleState && finaleState.optionen) || {});
  switch (s.phase) {
    case 'intro': return 'Einleitung: ' + nachspiel.titel;
    case 'nacharbeiten': { const n = nachspiel.nacharbeiten[s.reveal - 1]; return `Nacharbeit ${s.reveal}/${nachspiel.nacharbeiten.length}: ${n.zahl} ${n.text}`; }
    case 'rechnung': { const p = posten[s.reveal - 1]; return `Kosten ${s.reveal}/${posten.length}: ${p.posten}`; }
    case 'bilanz': return 'Summe, Versicherung, Eigenanteil';
    case 'aha': return 'Was das für das Unternehmen bedeutet (Jahresgewinn, nötiger Zusatzumsatz)';
    case 'fazit': return 'Fazit: ' + nachspiel.fazit;
    default: return null;
  }
}

module.exports = { bill, steps, view, stepLabel, activePosten };
