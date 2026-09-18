# 16. Qualitäts- und Konsistenzprüfung

## Wofür ist diese Funktion da?

Diese Ansicht prüft automatisch, ob Ihre Dokumentation vollständig und in
sich widerspruchsfrei ist — und macht typische Lücken sichtbar, bevor sie
in einem echten Ernstfall auffallen.

## Wo finde ich sie?

Als eigener Menüpunkt **Qualitätsprüfung** in der Seitenleiste.

## Die drei Kategorien

- **Konsistenzbefunde** — echte Datenwidersprüche, z. B. eine
  Wiederanlaufzeit (RTO), die länger ist als die maximal tolerierbare
  Ausfallzeit (MTA), eine kritische Ressource ohne dokumentierte
  Alternative, oder eine Ressource, deren eigene
  Wiederherstellungsanforderung langsamer ist als die MTA des Prozesses,
  der sie braucht.
- **Warnungen** — wichtige fehlende Angaben, z. B. kein dokumentierter
  Prozessverantwortlicher, ein roter Resilienz-Check ohne zugehörige
  offene Maßnahme, oder eine offene Maßnahme ohne Verantwortlichen bzw.
  Termin.
- **Hinweise** — weniger dringende Lücken, z. B. eine fehlende
  Mindestfähigkeit bei einem kritischen Prozess oder eine erledigte
  Maßnahme ohne Wirksamkeitsnachweis.

## So gehe ich vor

Zu jedem Befund zeigt das Starter Kit den betroffenen Prozess (falls
zutreffend) sowie zwei Direkt-Aktionen:

- **Bearbeiten** — springt direkt in den betroffenen Reiter der
  Prozessakte.
- **+ Maßnahme** — legt aus dem Befund direkt eine Maßnahme an (siehe
  [Kapitel 15](15-massnahmenmanagement.md)), ohne die Beschreibung erneut
  eintippen zu müssen.

## Was das Starter Kit automatisch macht

Es prüft laufend eine feste Regelmenge (z. B. fehlende Pflichtangaben,
Widersprüche zwischen Zeitwerten, Single Points of Failure ohne
Alternative) und aktualisiert die Befunde bei jeder Änderung. Es
entscheidet dabei nicht, ob ein Befund "schlimm" ist — die Einteilung in
Konsistenz/Warnung/Hinweis ist eine feste, technische Einstufung nach
Regelart.

## Was ich selbst entscheiden muss

Ob ein angezeigter Befund tatsächlich behoben werden muss oder im
Einzelfall bewusst so bleiben soll (z. B. eine gewollte, begründete
Abweichung), entscheiden Sie. Zeigt die Prüfung "Alle Prüfungen
bestanden", heißt das nur, dass die geprüften Regeln erfüllt sind — nicht,
dass die Dokumentation inhaltlich vollständig richtig ist.

## Beispiel aus der Praxis

Für den Prozess "Warenausgang" zeigt die Qualitätsprüfung den Hinweis
"Erledigte Maßnahme 'IT-Alternative vorhanden schaffen' ohne
Wirksamkeitsnachweis." Über "+ Maßnahme" wäre hier nichts weiter
anzulegen — stattdessen führt "Bearbeiten" direkt zur Maßnahme, wo
Nachweis und Prüfungsdatum nachgetragen werden.

## Typische Fehler

- Befunde dauerhaft ignorieren, ohne zu prüfen, ob sie berechtigt sind.
- Annehmen, "Alle Prüfungen bestanden" bedeute automatisch
  Freigabereife — die Freigabeprüfung (siehe
  [Kapitel 24](24-freigabe.md)) prüft zusätzliche, eigene Kriterien.

## Verwandte Kapitel

- [Maßnahmenmanagement](15-massnahmenmanagement.md)
- [Governance Dashboard](21-governance-dashboard.md)
- [Freigabe und Release Readiness](24-freigabe.md)
