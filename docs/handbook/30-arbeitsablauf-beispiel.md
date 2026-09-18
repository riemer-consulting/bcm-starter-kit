# 30. Ein Prozess von Anfang bis Ende: Arbeitsablauf-Beispiel

## Worum geht es in diesem Kapitel?

Die vorherigen Kapitel beschreiben jede Funktion einzeln. Dieses Kapitel
zeigt den **gesamten Ablauf am Stück**, am durchgängigen Beispiel des
Prozesses "Warenausgang" — von der ersten Anlage bis zur Freigabe.

## Schritt 1: Prozessakte anlegen

Neue Prozessakte "Warenausgang" anlegen (siehe [Kapitel 5](05-prozesse.md)).
Grunddaten und Ziel im Steckbrief erfassen: Fachbereich Logistik,
Verantwortlicher Herr Meyer, Ziel "Pünktlicher Versand aller
Kundenaufträge".

## Schritt 2: Workshop mit dem Fachbereich

Workshop-Modus starten (siehe [Kapitel 13](13-workshop.md)) und
gemeinsam mit dem Fachbereich durch die sechs Blöcke gehen. Eine offene
Frage zur Lagerorganisation wird auf den Parkplatz gesetzt (siehe
[Kapitel 14](14-parkplatz.md)).

## Schritt 3: Business Impact Analysis

Alle acht Kategorien der BIA bewerten und begründen (siehe
[Kapitel 7](07-bia.md)). Ergebnis: gewichteter Score deutet auf
Kritikalität "Hoch".

## Schritt 4: Kritikalität und Zeitwerte

Kritikalität manuell auf "Hoch" setzen — deckt sich mit der BIA-Empfehlung,
keine Abweichung zu begründen (siehe [Kapitel 6](06-kritikalitaet.md)).
MTA 24 Stunden, RTO 8 Stunden, RPO 1 Stunde erfassen (siehe
[Kapitel 8](08-mta-rto-rpo.md)).

## Schritt 5: Mindestfähigkeit

Drei-Spalten-Übersicht ausfüllen, messbare Mindestfähigkeit im Modus
"Menge" erfassen: 100 Bestellungen pro Tag (siehe
[Kapitel 9](09-mindestfaehigkeit.md)).

## Schritt 6: Kritische Ressourcen

Ressourcen erfassen, u. a. "Auftragssystem XY" als Single Point of
Failure ohne Alternative markieren (siehe
[Kapitel 10](10-ressourcen-abhaengigkeiten.md)).

## Schritt 7: Notbetrieb

Auslöser, Entscheidung, Schritte und benötigte Offline-Unterlagen
dokumentieren (siehe [Kapitel 11](11-notbetrieb.md)).

## Schritt 8: Resilienz-Check

Zwölf Punkte bewerten. "IT-Alternative vorhanden" wird Rot bewertet, aus
diesem Befund automatisch eine Maßnahme erzeugt (siehe
[Kapitel 12](12-resilienz.md)).

## Schritt 9: Maßnahme bearbeiten

Die erzeugte Maßnahme "IT-Alternative vorhanden schaffen" konkretisieren:
Verantwortlich, Termin, Aufwand (siehe
[Kapitel 15](15-massnahmenmanagement.md)).

## Schritt 10: Qualitätsprüfung ansehen

Verbleibende Lücken prüfen und schließen (siehe
[Kapitel 16](16-qualitaetspruefung.md)).

## Schritt 11: Review planen

Jährlichen Prozessreview mit Zykluspolicy "12 Monate" planen (siehe
[Kapitel 17](17-review-center.md) und [Kapitel 18](18-reviewzyklen.md)).

## Schritt 12: Version speichern

Zwischenstand als Version sichern, bevor die Freigabe versucht wird
(siehe [Kapitel 23](23-versionierung.md)).

## Schritt 13: Freigabe versuchen

Bearbeitungsstand auf "Freigegeben" setzen. Blocker beheben, falls
vorhanden; Warnungen ggf. mit Begründung akzeptieren (siehe
[Kapitel 24](24-freigabe.md)).

## Schritt 14: Bericht erzeugen

PDF-Bericht im Umfang "Nur einzelner Prozess" erzeugen und weitergeben
(siehe [Kapitel 27](27-pdf-druck.md)).

## Verwandte Kapitel

- [Prozesse erfassen und pflegen](05-prozesse.md)
- [Freigabe und Release Readiness](24-freigabe.md)
- [Governance Dashboard](21-governance-dashboard.md)
