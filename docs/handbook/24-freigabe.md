# 24. Freigabe und Release Readiness

## Wofür ist diese Funktion da?

Der Bearbeitungsstand zeigt, wie weit das Workbook fachlich fortgeschritten
ist — von "Entwurf" bis "Freigegeben". Der Wechsel zu "Zur Freigabe" oder
"Freigegeben" löst automatisch eine **Freigabeprüfung** aus, die
verhindert, dass ein Workbook mit gravierenden Lücken versehentlich als
freigegeben markiert wird.

## Wo finde ich das?

Im Feld **Bearbeitungsstand** in den Einstellungen (Karte "Kunde &
Branding").

## Die vier Stufen

Entwurf → In Bearbeitung → Zur Freigabe → Freigegeben. Nur beim Wechsel
zu "Zur Freigabe" oder "Freigegeben" wird die Freigabeprüfung ausgelöst;
die übrigen Wechsel werden direkt übernommen.

## Der Freigabe-Prüfbericht

Er unterscheidet zwei Arten von Befunden:

- **Blocker** — verhindern die Freigabe vollständig, solange sie
  bestehen. Beispiele: fehlende Pflichtangaben, RTO über MTA, kritischer
  Prozess ohne Notbetrieb, kritische Ressource ohne Alternative,
  überfällige kritische Maßnahme, unbegründete Kritikalitätsabweichung,
  kritischer Prozess ohne Reviewplanung, blockierte Maßnahme ohne
  Begründung, offener Managemententscheidungsbedarf.
- **Warnungen** — können mit einer dokumentierten Begründung akzeptiert
  werden, verhindern die Freigabe aber nicht.

Bestehen Blocker, ist eine Freigabe **nicht** möglich — die betroffenen
Punkte müssen zuerst behoben werden.

## So gehe ich vor

1. Bearbeitungsstand auf "Zur Freigabe" oder "Freigegeben" setzen.
2. Den angezeigten Prüfbericht durchgehen.
3. Bei bestehenden Blockern: die genannten Punkte in den jeweiligen
   Prozessakten beheben, dann erneut versuchen.
4. Bei Warnungen: Bearbeiter und Begründung eintragen, um sie bewusst zu
   akzeptieren.
5. Bei "Freigegeben" wird zusätzlich verlangt, dass die eingebauten
   kritischen Selbsttests bestehen (siehe [Kapitel 31](31-faq-troubleshooting.md)).

## Was das Starter Kit automatisch macht

Bei erfolgreicher Freigabe legt das Starter Kit automatisch eine neue
Version an (siehe [Kapitel 23](23-versionierung.md)) — die Freigabe ist
damit dauerhaft nachvollziehbar dokumentiert, inklusive Bearbeiter und
Zeitpunkt.

## Was ich selbst entscheiden muss

Ob eine Warnung tatsächlich akzeptabel ist, entscheiden und begründen
Sie selbst — das Starter Kit verlangt lediglich, dass diese Entscheidung
dokumentiert wird, statt stillschweigend zu geschehen.

## Beispiel aus der Praxis

Beim Versuch, das Workbook auf "Freigegeben" zu setzen, zeigt der
Prüfbericht einen Blocker: "Kritischer Prozess 'Warenausgang' hat keinen
definierten Notbetrieb." Erst nach Ergänzung im Notbetrieb-Reiter lässt
sich die Freigabe erneut versuchen — diesmal erfolgreich, mit einer
verbleibenden Warnung ("Erledigte Maßnahme ohne Wirksamkeitsnachweis"),
die mit Begründung "Wirksamkeitsprüfung für nächstes Quartal terminiert"
akzeptiert wird.

## Typische Fehler

- Eine Warnung ohne echte Begründung "wegklicken".
- Den Bearbeitungsstand manuell auf "Freigegeben" setzen wollen, ohne die
  zugrundeliegenden Lücken tatsächlich zu schließen.

## Verwandte Kapitel

- [Versionierung und Versionshistorie](23-versionierung.md)
- [Qualitäts- und Konsistenzprüfung](16-qualitaetspruefung.md)
- [Governance Dashboard](21-governance-dashboard.md)
