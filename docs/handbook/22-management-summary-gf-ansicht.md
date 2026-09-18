# 22. Management Summary und GF-Ansicht

## Wofür sind diese Funktionen da?

Beide Ansichten fassen den Stand des gesamten Business Continuity
Workbooks für eine Managementzielgruppe zusammen — ohne dass diese Person
selbst durch alle Prozessakten klicken muss. Sie teilen sich denselben
Inhalt, unterscheiden sich aber in Darstellung und Umfang.

## Wo finde ich sie?

- **Management Summary** — eigener Menüpunkt in der Seitenleiste, wird
  innerhalb der normalen Navigation angezeigt.
- **Managementbericht (GF-Ansicht)** — eigener Knopf in der Seitenleiste,
  öffnet sich als eigenständige Vollbildansicht (auch geeignet, um sie
  während einer Besprechung am Bildschirm zu zeigen).

![GF-Ansicht, kompakter Führungsüberblick](images/12-gf-ansicht.png)

## Was beide Ansichten enthalten

- Eine kurze Textzusammenfassung: Anzahl Prozesse, davon kritisch, offene
  rote Resilienz-Risiken, offene Maßnahmen.
- **Kritischste Prozesse** (Top 5 nach BIA-Score) mit Kritikalität,
  BIA-Einstufung und MTA.
- **Entscheidungsbedarf** je Prozess.
- **Kritikalität vs. BIA-Empfehlung** — alle Prozesse, bei denen die
  manuelle Einstufung von der Empfehlung abweicht, mit Kennzeichnung, ob
  eine Begründung vorliegt (siehe [Kapitel 6](06-kritikalitaet.md)).
- **Prozessabhängigkeiten** — Prozesse mit den meisten Abhängigkeiten,
  mögliche Single Points of Failure, kritische mehrstufige Ketten.
- **Abhängigkeits-Warnungen** — Verweise auf gelöschte Prozesse,
  widersprüchliche gegenseitige Abhängigkeitsangaben.
- Top offene Maßnahmen nach Priorität.

## Was zusätzlich nur die GF-Ansicht zeigt

Die GF-Ansicht (Managementbericht) stellt vor dem übrigen Inhalt einen
kompakten Überblick voran:

- Eine **Gesamtampel** über alle Prozesse (Rot, sobald mindestens ein
  Prozess rot ist; Gelb, sobald mindestens ein Prozess gelb ist; sonst
  Grün).
- Die Liste der **roten Prozesse** mit den jeweiligen Gründen.
- **Offene Entscheidungen** — Prozesse, bei denen die
  Entscheidungslogik für den Notbetrieb noch nicht dokumentiert ist.

## Was das Starter Kit automatisch macht

Beide Ansichten berechnen ihren Inhalt bei jedem Aufruf neu aus den
vorhandenen Prozessdaten — es gibt keine separate, manuell zu pflegende
"Managementversion" der Daten.

## Was ich selbst entscheiden muss

Diese Ansichten fassen bestehende Informationen zusammen, treffen aber
keine eigene fachliche Bewertung darüber hinaus. Ob ein als "kritisch"
gezeigter Prozess tatsächlich Priorität braucht, bleibt eine
Managemententscheidung.

## Beispiel aus der Praxis

Vor einem Lenkungsausschuss öffnet der BCM-Verantwortliche die GF-Ansicht:
Gesamtampel Gelb, ein roter Prozess ("Warenausgang", Grund: "Single Point
of Failure ohne Alternative"), zwei offene Entscheidungen. Diese drei
Punkte bilden die Tagesordnung für den Termin.

## Typische Fehler

- Die GF-Ansicht mit einem vollständigen Prüfbericht verwechseln — sie
  ist eine Zusammenfassung, kein Ersatz für die Freigabeprüfung (siehe
  [Kapitel 24](24-freigabe.md)).

## Verwandte Kapitel

- [Kritikalität verstehen und dokumentieren](06-kritikalitaet.md)
- [Ressourcen und Abhängigkeiten](10-ressourcen-abhaengigkeiten.md)
- [Governance Dashboard](21-governance-dashboard.md)
