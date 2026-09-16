# Governance & Lifecycle

> BCM endet nicht mit dem Workshop.

## Ziel

Dieses Release erweitert das BCM Starter Kit konsequent entlang der Produktvision.

## Geplante Arbeitspakete

### AP1 – Review Center

**Status: umgesetzt (2.4.0-dev)**

- Ziel
  Beantwortet "Was muss als Nächstes getan werden?" für Reviews, ohne dem
  Anwender eine fachliche Bewertung abzunehmen.
- Fachlicher Nutzen
  Überfällige und bald fällige Reviews sowie kritische Prozesse ohne
  jegliche Reviewplanung werden sichtbar, statt in Prozessakten verstreut
  zu bleiben. Priorisierung ist rein deterministisch (Fälligkeitsdatum,
  Kritikalität) — kein Score, keine verdeckte Gewichtung.
- UX-Auswirkungen
  Neue Sidebar-Ansicht "Review Center" (Gruppe "Übergreifend", zwischen
  Abhängigkeitscluster und Maßnahmenkatalog). Bestehende Navigation,
  Prozessakte und Maßnahmenkatalog bleiben unverändert; eine kompakte
  Reviewhistorie wurde zusätzlich in den Maßnahmen-Tab der Prozessakte
  integriert (Drill-down bleibt im Review Center).
- Architektur
  Neues additives `STATE.reviews[]` (Schema-Migration 12→13). Review-Status
  ist auf drei gespeicherte Werte beschränkt (`geplant`/`in_bearbeitung`/
  `abgeschlossen`); Fälligkeit/Überfälligkeit wird ausschließlich aus
  `geplantAm` berechnet (`reviewDueInfo()`), nie zusätzlich gespeichert.
  Vollständig an Import/Export/Merge/Selektiv-Import/Versionierung
  angebunden, exakt nach dem bestehenden Muster für `massnahmen`/`parkplatz`.
- Tests
  11 neue Selbsttests (Migration, Datenmodell, Fälligkeitsberechnung,
  fehlende Reviewplanung, deterministische Priorisierung, Import-
  Normalisierung/-Limits, Merge-Import) sowie eine Browser-Verifikation
  (Review anlegen mit überfälligem Datum → Badge erscheint; Review
  abschließen → Status aktualisiert sich; keine Konsolenfehler).

### AP2 – Reviewzyklen

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP3 – Maßnahmenmanagement 2.0

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP4 – BCM Timeline

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP5 – Governance Dashboard

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP6 – Prozessreife

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP7 – Freigaben

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP8 – Historie

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP9 – Dokumentenreferenzen

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

### AP10 – Lifecycle-Berichte

- Ziel
- Fachlicher Nutzen
- UX-Auswirkungen
- Architektur
- Tests

## Nicht Bestandteil

- Ungeprüfte Experimente
- Breaking Changes
- Verlust der Offlinefähigkeit

## Abnahmekriterien

- Empirische Browserprüfung
- Vollständige Selbsttests
- Roundtrip-Tests
- Dokumentation aktualisiert
- Produktreview bestanden
