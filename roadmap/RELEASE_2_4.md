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

**Status: umgesetzt (2.4.0-dev)**

- Ziel
  Jede Reviewart erhält eine eigene, optionale Zykluspolicy, damit nach
  Abschluss eines Reviews der nächste Termin nicht neu erfunden werden muss.
- Fachlicher Nutzen
  Prozessreview (typ. 12 Monate), BIA-Review (typ. 6 Monate), Notbetriebs-
  review (typischerweise ereignisbezogen) und Ressourcenreview (typ. 24
  Monate) folgen unterschiedlichen, vom Anwender frei konfigurierbaren
  Rhythmen. Ohne definierte Policy erfindet die Anwendung nie einen Termin.
- UX-Auswirkungen
  Kompakter Policy-Editor direkt in der Prozessakte (Maßnahmen-Tab, neben
  der bereits vorhandenen Reviewhistorie aus AP1) — vier Selects, keine
  eigene Ansicht. Der Abschlussdialog eines Reviews schlägt bei definierter
  Policy den nächsten Termin vor und kann den Folgereview mit einem Klick
  anlegen.
- Architektur
  `process.reviewConfig` (additive Migration 13→14), Auswertung über
  `computeNextReviewDate()`. Mehrere Reviewarten desselben Prozesses sind
  vollständig unabhängig (kein Konflikt, keine gegenseitige Sperre). Import/
  Merge behandeln `reviewConfig` wie eine bewusste fachliche Entscheidung:
  nie automatisch überschrieben, ungültige Werte werden auf "keine Policy"
  zurückgesetzt statt geraten.
- Tests
  9 neue Selbsttests (Migration, Default-Policy, Berechnung für alle
  Intervalltypen inkl. Ablehnung fehlender/ungültiger Policies, parallele
  Reviewarten, Import-Normalisierung, Merge-Verhalten) sowie eine Browser-
  Verifikation (Policy setzen → Review abschließen → korrekt vorgeschlagener
  Folgetermin → Folgereview wird angelegt).

### AP3 – Maßnahmenmanagement 2.0

**Status: umgesetzt (2.4.0-dev)**

- Ziel
  Herkunft, Zeitachse und Wirksamkeitsprüfung von Maßnahmen nachvollziehbar
  machen, ohne eine zweite Maßnahmenstruktur einzuführen.
- Fachlicher Nutzen
  Sichtbar, WOHER eine Maßnahme kam (Review, Parkplatz, Qualitätsbefund,
  Resilienz-Check, manuell) und WANN was passierte. "Erledigt" wird
  weiterhin klar von "wirksam" getrennt. Plausibilitätshinweise
  (Blockade ohne Begründung, Abschluss ohne Wirksamkeitsnachweis,
  abgeschlossene Reviews mit noch offenen Folgemaßnahmen) machen
  Dokumentationslücken sichtbar, ohne die Maßnahme selbst zu bewerten.
- UX-Auswirkungen
  Bestehendes Maßnahmenformular um Herkunftszeile (nicht editierbar),
  Prüfer/Wiedervorlage und eine bedingt eingeblendete
  Blockade-Begründung erweitert. Herkunfts-Filter und -Spalte im
  Maßnahmenkatalog. Neuer "+ Maßnahme"-Knopf direkt in der
  Qualitätsprüfung. Status-Dropdown zeigt jetzt sechs statt vier Werte.
- Architektur
  Additive Migration 14→15 auf dem bestehenden `massnahmen[]`-Array (keine
  zweite Struktur). `ENUM_MASSNAHMEN_STATUS` additiv erweitert,
  `zurueckgestellt` bleibt für Altdaten lesbar. `massnahmeIsOpen()` löst
  mehrere zuvor verstreute `status==='offen'||status==='in_arbeit'`-Prüfungen
  ab. Herkunft wird an allen vier Entstehungspunkten (Parkplatz-, Review-,
  Qualitätsbefund-, Resilienz-Konvertierung) gesetzt; die Review-Verknüpfung
  ist über `reviewId`/`massnahmenIds[]` vollständig bidirektional und
  überlebt Import/Merge/Selektiv-Import inklusive ID-Remapping.
- Tests
  10 neue Selbsttests (Migration, Statusklassifikation, Plausibilitäts-
  regeln, automatisches Abschlussdatum, offene Folgemaßnahmen,
  Import-Normalisierung von Herkunft und Review-Verknüpfung) sowie eine
  Browser-Verifikation (Blockade-Badge erscheint/verschwindet korrekt,
  Wirksamkeitsnachweis-Hinweis, Qualitätsbefund → Maßnahme, Herkunfts-
  Spalte im Katalog) ohne Konsolenfehler.

### AP4 – BCM Timeline

**Status: umgesetzt (2.4.0-dev)**

- Ziel
  Fachlich relevante BCM-Ereignisse chronologisch sichtbar machen, ohne
  ein neues Persistenzformat (Audit-Log/Event-Sourcing) einzuführen.
- Fachlicher Nutzen
  "Was ist wann passiert?" wird beantwortbar, ohne durch Prozessakten,
  Review Center, Maßnahmenkatalog und Versionshistorie einzeln zu
  navigieren. Filter nach Prozess/Ereignistyp/Zeitraum, Drill-down in die
  jeweilige Fachansicht.
  Wichtig geprüft und bestätigt: alle in der Aufgabenstellung genannten
  Beispiel-Ereignisse ließen sich bis auf zwei aus vorhandenen Daten
  ableiten — siehe "Abweichungen" unten.
- UX-Auswirkungen
  Neue Sidebar-Ansicht "BCM Timeline" (Gruppe "Übergreifend"). Kompakter
  "Timeline anzeigen"-Link in der Prozessakte (vorgefiltert). Keine
  Änderung an bestehenden Ansichten außer der zusätzlichen `id` in
  `compareVersions().processChanges` (rein additiv, UI unverändert).
- Architektur
  **Kein `STATE.timeline[]`.** `buildTimelineEvents()` leitet jedes
  Ereignis aus bereits vorhandenen Zeitstempeln
  (`createdAt`/`erstelltAm`/`gestartetAm`/`abgeschlossenAm`/
  `wirksamkeitGeprueftAm`) und aus paarweisen `compareVersions()`-Diffs
  zwischen unmittelbar aufeinanderfolgenden Versionen ab — reine, seiteneffektfreie
  Ableitung, nichts wird zusätzlich gespeichert. `compareVersions()` um
  eine Notbetrieb-Änderungserkennung (operative Kernfelder) und
  Prozess-IDs in `processChanges` erweitert.
- Tests
  9 neue Selbsttests (keine erfundenen Zeitstempel, korrekte Ableitung aus
  Versionsdiffs, Version-vs-Freigabe-Unterscheidung, Duplikatfreiheit/
  Determinismus, Filter- und Sortierverhalten) sowie eine Browser-
  Verifikation (Timeline zeigt Prozessanlage, Filter nach Ereignistyp
  funktioniert, Drill-down aus der Prozessakte) ohne Konsolenfehler.

**Abweichung von der Aufgabenstellung:** die Beispiel-Ereignisse "Maßnahme
gestartet" und "Maßnahme blockiert" wurden NICHT umgesetzt. Das
Datenmodell speichert für diese Statuswechsel keinen eigenen Zeitstempel
(anders als bei `erstelltAm`/`abgeschlossenAm`); ein Timeline-Ereignis
dafür hätte einen Zeitpunkt erfinden statt ableiten müssen — ausdrücklich
untersagt ("Ableitung vor Persistenz", "keine Ereignisse für Funktionen
erfinden, die im Produkt nicht existieren"). Bewusst keine zusätzliche
Persistenz (z. B. ein `gestartetAm`/`blockiertAm`-Feld auf Maßnahmen)
eingeführt, um dieses eine Ereignispaar zu ermöglichen — das hätte AP3s
bereits abgeschlossenes, additives Feldmodell nachträglich erweitert. Falls
gewünscht, ist das für AP5 nachholbar (siehe Empfehlung im Abschlussbericht).

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
