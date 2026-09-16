# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.4.0-dev] — Governance & Lifecycle (in Entwicklung, noch nicht final)

> BCM endet nicht mit dem Workshop. Version 2.4 erweitert das BCM Starter Kit
> vom Workshop-/Erfassungswerkzeug um Funktionen für den laufenden BCM-Betrieb.
> Diese Version befindet sich in aktiver Entwicklung (`APP_VERSION = '2.4.0-dev'`)
> auf dem Branch `feature/2.4-governance-lifecycle` und ist noch nicht final.

### Added — AP1: Review Center
- **Neues `STATE.reviews[]`** (Schema-Migration 12→13, rein additiv). Ein Review
  ist eine konkrete Arbeits-/Historieninstanz mit Prozessbezug, Reviewart
  (Prozess-/BIA-/Notbetriebs-/Ressourcenreview), geplantem/gestartetem/
  abgeschlossenem Datum, Verantwortlichem, Status (nur `geplant` /
  `in_bearbeitung` / `abgeschlossen`), Ergebnis, nächstem Reviewtermin und
  Maßnahmenreferenzen.
- **Neue Ansicht „Review Center"** (Sidebar unter „Übergreifend"): zeigt
  überfällige und bald fällige Reviews, kritische Prozesse ohne jegliche
  Reviewplanung, und eine deterministisch (nach Fälligkeit, nicht nach Score)
  priorisierte „Was ist als Nächstes zu tun?"-Liste.
- **Fälligkeit wird berechnet, nicht gespeichert** (`reviewDueInfo()`) — es
  gibt bewusst keinen eigenen „überfällig"-Status.
- **Review → Maßnahme:** aus einem Review kann direkt eine verknüpfte
  Maßnahme angelegt werden (`review.massnahmenIds[]`).
- **Reviewhistorie in der Prozessakte:** kompakte Übersicht aller Reviews
  eines Prozesses im Maßnahmen-Tab, mit Link ins volle Review Center.
- Import/Export/Migration/Merge/Selektiv-Import vollständig angebunden
  (`normalizeReviewsForImport`, `IMPORT_LIMITS.maxReviews`).
- 11 neue Selbsttests (79 insgesamt): Migration 12→13, `newReview()`-Form,
  Fälligkeitsberechnung (überfällig/bald fällig/abgeschlossen), fehlende
  Reviewplanung bei kritischen Prozessen, deterministische Priorisierung,
  Import-Normalisierung und -Limits, Merge-Import.

### Added — AP2: Reviewzyklen je Reviewart
- **`process.reviewConfig`** (Schema-Migration 13→14, additiv): je Reviewart
  eine eigene, optionale Zykluspolicy (`{prozess, bia, notbetrieb,
  ressourcen}`). Unterstützte Intervalle: 3/6/12/24 Monate, individuell
  (eigene Monatsangabe) und ereignisbezogen (bewusst ohne Intervall). **Ist
  keine Policy definiert, wird nie ein Termin erfunden** —
  `computeNextReviewDate()` liefert dann konsequent `null`.
  Mehrere Reviewarten desselben Prozesses können unabhängig voneinander
  gleichzeitig offen sein.
- **Kompakter Policy-Editor** direkt in der Prozessakte (Maßnahmen-Tab, neben
  der Reviewhistorie) — je Reviewart ein Intervall-Select.
- **Folgereview nach Abschluss:** hat eine Reviewart eine definierte Policy,
  schlägt der Abschlussdialog automatisch den nächsten Termin vor und kann
  optional direkt einen neuen, geplanten Folgereview anlegen.
- Import/Merge berücksichtigen `reviewConfig`: ungültige Intervalle werden
  beim Import auf "keine Policy" zurückgesetzt statt geraten; beim
  Zusammenführen wird eine bereits gesetzte Policy nie automatisch
  überschrieben (analog zur bestehenden Regel bei `minimumCapability.mode`).
- 9 neue Selbsttests (88 insgesamt): Migration 13→14, `newProcess()`-Form,
  `computeNextReviewDate()` (keine Policy, ereignisbezogen, fest/individuell),
  gleichzeitig offene Reviewarten, Import-Normalisierung, Merge-Verhalten.

### Added — AP3: Maßnahmenmanagement 2.0
- **Erweitertes Maßnahmenmodell** (Schema-Migration 14→15, additiv):
  `sourceType`/`sourceId`/`sourceLabel`/`reviewId` (Herkunft nachvollziehbar
  — Review, Parkplatz, Qualitätsbefund, Resilienz-Check oder manuell),
  `erstelltAm`/`abgeschlossenAm` (Zeitachse), `wirksamkeitPruefer` (getrennt
  vom bestehenden `wirksamkeitGeprueftAm`/`wirksamkeitErgebnis`),
  `wiedervorlageAm`, `blockiertGrund`. Bei Altdatensätzen wird die Herkunft
  nie rückwirkend erfunden — sie erhalten `sourceType:'unbekannt'` und einen
  leeren, nicht geratenen Anlagezeitpunkt.
- **Erweitertes Statusmodell:** `offen`, `geplant`, `in_arbeit` (jetzt "In
  Umsetzung" beschriftet), `blockiert`, `erledigt`, `verworfen`. Der frühere
  Wert `zurueckgestellt` bleibt für Bestandsdaten lesbar, wird im UI aber
  nicht mehr neu angeboten. **"Erledigt" bedeutet weiterhin ausdrücklich
  nicht "wirksam"** — die Wirksamkeitsprüfung bleibt ein separater Vorgang.
- **Herkunft ist jetzt an drei Stellen aktiv nachvollziehbar:** Parkplatz →
  Maßnahme (bestehende Funktion, jetzt mit Herkunftskennzeichnung), Review →
  Maßnahme (vollständig bidirektional über `reviewId` und
  `review.massnahmenIds[]`), Qualitäts-/Konsistenzbefund → Maßnahme (neu, in
  der Qualitätsprüfung), sowie automatisch aus roten/gelben Resilienz-Checks.
  Ein Herkunfts-Filter im Maßnahmenkatalog macht die Verteilung sichtbar.
- **Neue Plausibilitätshinweise** (Dokumentationsqualität, keine fachliche
  Bewertung): "Blockiert ohne Begründung" und "Erledigt ohne
  Wirksamkeitsnachweis" (bereits vorhanden, jetzt zusätzlich in
  `validateMassnahme()`); im Review Center zusätzlich "abgeschlossene
  Reviews mit noch offenen Maßnahmen".
- `abgeschlossenAm` wird beim Wechsel auf „Erledigt" einmalig automatisch
  gesetzt und beim erneuten Öffnen/Schließen nicht überschrieben.
- 10 neue Selbsttests (98 insgesamt): Migration 14→15, Statusklassifikation,
  Blockade-ohne-Begründung, Wirksamkeitsnachweis-Hinweis, automatisches
  `abgeschlossenAm`, offene Folgemaßnahmen abgeschlossener Reviews,
  Import-Normalisierung von Herkunft/Review-Verknüpfung.

### Added — AP4: BCM Timeline
- **Neue Ansicht "BCM Timeline"** — filterbar nach Prozess, Ereignistyp und
  Zeitraum, mit Drill-down in Prozessakte/Review Center/Maßnahmenkatalog/
  Versionshistorie. **Bewusst kein neues `STATE.timeline[]`** — jedes
  Ereignis wird aus bereits vorhandenen Zeitstempeln und
  Versions-Snapshots abgeleitet (`buildTimelineEvents()`), nicht separat
  gespeichert. Kein Audit-Log, kein Event-Sourcing, keine Aufzeichnung
  jeder Feldänderung.
- Abgeleitete Ereignistypen: Prozess angelegt; Review geplant/gestartet/
  abgeschlossen; Maßnahme erstellt/abgeschlossen; Wirksamkeit geprüft;
  Kritikalität geändert; MTA/RTO/RPO geändert; Notbetrieb wesentlich
  geändert; kritische Ressourcen geändert; Version gespeichert; Freigabe
  erzeugt. Bewusst NICHT enthalten: "Maßnahme gestartet"/"Maßnahme
  blockiert" — für diese Übergänge speichert die Anwendung keinen eigenen
  Zeitstempel, ein Ereignis dafür würde einen Zeitpunkt erfinden statt ihn
  abzuleiten.
- `compareVersions()` erkennt jetzt zusätzlich wesentliche
  Notbetrieb-Änderungen (Auslöser, Entscheidung, Schritte, Rückkehr) und
  liefert je Prozessänderung zusätzlich dessen ID (rein additiv, bestehende
  Versionsvergleich-Ansicht unverändert).
- Kompakter "Timeline anzeigen"-Link direkt in der Prozessakte (vorgefiltert
  auf den jeweiligen Prozess).
- 9 neue Selbsttests (107 insgesamt): keine erfundenen Zeitstempel bei
  unvollständigen Reviews/Altmaßnahmen, korrekte Ableitung aus
  Versionsdiffs, Unterscheidung Version/Freigabe, Duplikatfreiheit
  (deterministische, idempotente Ableitung), Filter- und Sortierverhalten.

## [2.3.1] — Polish & Productivity

Ergebnis eines vollständigen Workshop-Walkthroughs: über 40 einzelne UX-Verbesserungen,
die Moderatoren und Teilnehmern jeweils ein paar Sekunden sparen. Keine neuen Features,
sondern konsequente Nacharbeit an Texten, Labels, Platzhaltern und Interaktionsdetails.

### Added
- **Command-Palette (Strg+K).** Schneller Ein-Klick-Zugriff auf alle Funktionen, Ansichten und Prozessakten. Tastaturgesteuert mit Pfeil- und Eingabetaste, Freitextfilter.
- **Willkommens-Karte für neue Benutzer.** Dashboard zeigt bei leerem Workbook eine Schritt-für-Schritt-Einführung mit direkten Aktionsbuttons.
- **Klickbare KPI-Kacheln.** Dashboard-Statistiken navigieren direkt zur relevanten Ansicht.
- **Breadcrumb-Navigation.** Prozessdetailansicht zeigt einen Zurück-Link zum Dashboard.
- **Workshop-Button in Prozessdetail.** Direkt aus der Prozessakte den Workshop starten.
- **Moderatoren-Notiz → Parkplatz.** Sitzungsnotizen mit einem Klick als Parkplatz-Eintrag sichern.
- **Projekt-Unterstützung.** Dezenter Hinweis im Über-Dialog mit Links zur Projektwebsite und PayPal.
- **Keyboard-Hinweis im Workshop.** „Tab ↹ zum Textfeld · Strg+K Schnellzugriff" am unteren Rand.
- 4 neue Selbsttests (68 insgesamt): dashboardStats, klickbare statTile, qualityAndConsistencyCheck.processId, WORKSHOP_BLOCKS.

### Changed — Texte gekürzt (Begründung: weniger Lesezeit im Workshop)
- Steckbrief-Hilfstext: „Beschreiben Sie den Prozess so, dass ein neuer Geschäftsführer …" → „Kurzbeschreibung, die auch für Außenstehende verständlich ist."
- Moderatoren-Notiz-Warnung: 2 Sätze → 1 Satz „Nur für diese Sitzung — wird nicht gespeichert oder exportiert."
- Datei-Indikator: „Nur im Browser gespeichert (kein Datei-Export erfolgt)" → „Nur im Browser gespeichert".
- Qualitätsprüfung-Subtitle: gekürzt auf „Prüft Vollständigkeit und Konsistenz der Dokumentation."
- PDF-Hilfstext: 3 Sätze → 1 Satz „Es öffnet sich der Druckdialog — wählen Sie dort ‚Als PDF speichern'."
- Legacy-Freitext-Warnung: „Alter Freitextwert aus einer früheren Version … dann Hinweis ausblenden" → kompakter.

### Changed — Placeholder verbessert (Begründung: leere Felder geben keine Orientierung)
- Workshop-Antwort: „Antwort der Teilnehmer…" → „Gemeinsame Antwort erfassen…"
- Moderatoren-Notiz: „Persönliche Gedanken, Beobachtungen, Moderationshinweise…" → „Notiz für diese Sitzung…"
- Neuer-Prozess-Modal: „z. B. Auftragsabwicklung B2B" → „z. B. Auftragsbearbeitung"
- RTO/RPO/Recovery: „Zahl" → „z. B. 4"
- Versionsnotiz: „Was wurde geändert?" → „z. B. Workshop-Ergebnisse dokumentiert"
- Bearbeiter: „Name" → „Ihr Name"
- 14 neue Placeholder in Ressourcen-Feldern (Alternative, Schwachstelle, Owner, Provider, Testergebnis) und Maßnahmen-Feldern (Verantwortlich, Nutzen, Bemerkung, Kosten, Risiko ohne/nach Maßnahme, Genehmiger, Wirksamkeit).

### Changed — Labels klarer (Begründung: BCM-Jargon ist für Fachbereichsleiter oft unklar)
- MTA-Label: ergänzt um „(max. tolerierbarer Ausfall)"
- RTO-Label: „RTO (Recovery Time Objective)" → „RTO (Zeit bis Wiederherstellung)"
- RPO-Label: „RPO (Recovery Point Objective)" → „RPO (max. Datenverlust)"
- „Vorgelagerte Prozesse (Freitext, ergänzend)" → „Vorgelagerte Prozesse (Freitext)" — „ergänzend" war verwirrend.
- Parkplatz „Prozessbezug" → „Zugehöriger Prozess", „Kein Bezug" → „– keiner –"
- Parkplatz Block-Spalte: leerer Wert „–" → „Allgemein"

### Changed — Button-Labels (Begründung: Buttons sollen Aktion beschreiben, nicht Funktion)
- „Speichern (neue Version)" → „Version sichern" — weniger einschüchternd.
- „Export JSON" → „Daten exportieren" — verständlich für Nicht-Techniker.
- Workshop-Parkplatz „☐" → „+" — suggeriert Hinzufügen statt Abhaken.
- „→ Maßnahme" → „In Maßnahme umwandeln" — klare Handlung statt Richtungspfeil.
- „Erledigt" (Legacy-Warnung) → „Hinweis ausblenden" — sagt was passiert.
- Parkplatz-Speichern: „Speichern" bei neuem Eintrag → „Anlegen".
- Maßnahmen-Überführung: „Maßnahme anlegen" → „Maßnahme anlegen & Punkt schließen".
- PDF-Kurzbericht: ergänzt um „(empfohlen nach Workshop)".

### Changed — Tooltips ergänzt (Begründung: Buttons ohne Erklärung bremsen neue Benutzer)
- Prozessdetail: „Duplizieren" und „Löschen" mit Tooltip-Erklärung.
- „+ Ressource", „+ Maßnahme", „Hinzufügen" (Abhängigkeiten) mit Tooltip.
- „Maßnahmen aus Checks erzeugen" mit Tooltip.
- „Daten exportieren" im Topbar mit Tooltip.
- Workshop „+ Parkplatz" mit Tooltip.

### Changed — Workshop-UX (Begründung: Beamer-Sicht und Moderatoren-Effizienz)
- Fortschrittsformat konsistent: „Frage X von Y" → „Frage X/Y".
- Prozesswechsel merkt letzten Step pro Prozess (kein Reset mehr auf Frage 1).
- Block-Tabs: erledigte Blöcke mit grünem Hintergrund statt nur grüner Schrift.
- Prozess-Dropdown: „●" statt „✓" für abgeschlossene Prozesse (auf Beamer besser lesbar).
- Workshop-Abschluss: Tabellen-Header „Workshop-Fortschritt / Gesamt-Fortschritt" → „Workshop-Fragen / Gesamtdokumentation".

### Changed — Sonstige Verbesserungen
- **Dashboard Quick Actions** neu sortiert, um Workshop und Qualitätsprüfung ergänzt.
- **Sidebar** aufgeräumt: „Präsentation & Workshop" mit Tooltips; Prozessliste kollabierbar ab 8; Footer kompakter.
- **Parkplatz-Formular:** Workshop-Block als Dropdown, automatisch vorausgefüllt.
- **Parkplatz → Maßnahme:** Bearbeitungsformular statt Confirm-Dialog.
- **Qualitätsprüfung:** Befunde mit „Bearbeiten"-Button zur Direkt-Navigation; Empty-State „Alle Prüfungen bestanden" statt „Glückwunsch!".
- **Priorisierung:** 18px Schrift, kompaktere Spalten, Öffnen-Button pro Prozess.
- **Textarea-Größen:** Parkplatz-Beschreibung 3→4 Zeilen, Abschlussnotiz 2→3 Zeilen.
- **Empty-State Dashboard:** „Starten Sie mit der ersten Prozessakte" statt „Noch keine Prozesse erfasst."
- Workshop-Prompt: erklärt jetzt, dass die Prozessakte automatisch angelegt wird.

## [2.3.0] — Workshop Edition

### Added
- **Parkplatz (offene Punkte).** Neues persistiertes Datenobjekt (`parkplatz[]`, Schema v12) zum Sammeln von Rückfragen, aufgeschobenen Diskussionen und offenen Punkten. Einträge können angelegt, bearbeitet, gelöscht und in Maßnahmen überführt werden. Eigene Ansicht mit Filtern, Integration in Dashboard, Management Summary und Workshop-Modus.
- **Erweiterter Workshop-Modus.** Die geführte Fragenfolge wurde von 10 auf 20 Fragen in 6 thematischen Blöcken (Prozessvorstellung, Unternehmensbewertung, Mindestfähigkeit, Kritische Ressourcen, Notbetrieb, Ergebnis) erweitert. Neue Block-Navigation (Tabs), Fortschrittsanzeige je Prozess, „Nächster Prozess"-Workflow und direkte Parkplatz-Schaltfläche.
- **Transiente Moderatoren-Notiz.** Persönliche Sitzungsnotiz im Workshop-Modus, die beim Schließen des Tabs endgültig gelöscht wird — wird niemals in STATE, localStorage, Export oder PDF gespeichert.
- **Qualitäts- und Konsistenzprüfung.** Neue Ansicht mit dokumentierbaren Regeln (Q1–Q13 für Vollständigkeit, C1–C9 für Datenwidersprüche). Prüft u. a. Prozessketten-RTO-Konsistenz (C2: RTO des vorgelagerten Prozesses darf nicht größer als RTO des abhängigen Prozesses sein), fehlende Verantwortliche, unversorgte rote Resilienz-Checks, Maßnahmen ohne Termin und SPOFs ohne Alternative.
- **Priorisierungsansicht.** Beamertaugliches Overlay mit allen Prozessen, sortiert nach BIA-Score, inkl. Kritikalität, MTA und Bearbeitungsfortschritt — für die gemeinsame Priorisierung im Workshop.
- **Workshop-Abschluss-Check.** Letzte Station des Workshop-Modus: fasst Bearbeitungsstand je Prozess, offene Parkplatz-Punkte und Qualitätsbefunde zusammen, bietet direkt Versionssicherung, PDF-Export und Parkplatz-Zugriff an.
- **Management Summary erweitert.** Offene Parkplatz-Punkte und zugehörige Handlungsempfehlung werden in der Summary dargestellt.

### Changed
- Schema-Version von 11 auf 12 angehoben (Migration vollständig abwärtskompatibel, addiert ausschließlich `parkplatz: []`).
- Dashboard zeigt offene Parkplatz-Punkte als Statistik-Kachel, wenn welche vorhanden sind.
- Sidebar-Navigation um Parkplatz, Qualitätsprüfung und Priorisierung erweitert.
- Workshop-Modus kann jetzt für einen bestimmten Prozess gestartet werden (Deep Link).

## [2.2.0] — Correctness, Security & Accessibility

### Fixed
- **Critical, silent data loss on import: structured process dependencies were discarded.** `processes[].dependencies` was lost entirely and without any message on every import path (replace, merge, manual selection), and therefore on every exchange of a workbook between two installations. The cause was that `validateImportData()` re-enumerated the process fields to carry over instead of deriving them from `newProcess()`; `dependencies` was missing from that list. Because every analysis built on dependencies (cycle detection, critical chains, single-point-of-failure hints, release readiness) then simply found "no dependencies", the result was *quietly wrong* rather than visibly broken — an import reported success, and the loss was only discoverable by counting dependencies by hand. Dependencies are now also validated on import (self-references, duplicates, references to non-existent processes) and correctly remapped when a process is assigned a new ID, instead of pointing nowhere.
- Search results, the executive view's KPI tiles and all choice cards were clickable `<div>` elements and thus unreachable by keyboard — you could search but not open a result.

### Security
- Metadata from imported files is now validated before reaching HTML: `meta.version` is coerced to an integer, `meta.accent` is accepted only as a colour value, and `bearbeitungsstand`/`vertraulichkeit` are escaped at every output site. The same applies to `versions[].nr` (rendered into an inline JavaScript context) and to process IDs (rendered into attribute context).
- Non-list values in list fields (`dependencies`, `minfaehigkeit.*`, `resilienz`, `meta.releaseWarningAcceptances`) are normalised on import. Previously a manipulated file could make the interface abort while rendering, leaving the application unusable until local storage was cleared.
- PBKDF2 iterations for the encrypted export raised from 250,000 to 600,000 (current OWASP recommendation for PBKDF2-HMAC-SHA256).
- The encrypted export format now declares its own KDF parameters (payload `version: 2` plus a `kdf` block), so that future parameter changes cannot devalue existing files. **Files in the previous format (v1, without a `kdf` block) remain readable** using 250,000 iterations; this is guaranteed by a dedicated self-test. Implausible iteration counts in a file are rejected rather than obeyed, so a manipulated file can neither weaken key derivation nor block the browser.
- Password quality is now enforced for the encrypted export: a hard minimum of 12 characters, plus non-blocking advice. Deliberately no requirement for particular character classes — that pushes people towards short, hard-to-remember passwords instead of long passphrases.

### Added
- **Detection of competing browser tabs.** Two tabs on the same browser storage previously overwrote each other ("last writer wins") with nothing indicating it had happened. A write from another tab is now surfaced explicitly, and both ways of resolving it automatically back up the version being discarded first. Deliberately no automatic merge: the application cannot know which version is the correct one, so it presents the conflict and the consequence of each option instead of guessing.
- PDF reports covering more than one section now include a table of contents, and every section carries "Abschnitt X von Y" in its footer. Deliberately **not** page numbers — see "Deliberate deviations" below.
- Accessibility groundwork: form fields are associated with their labels; modal dialogs and the full-screen overlays have a role, an accessible name, focus placement, a focus trap and Escape handling; navigation, process tabs, choice cards, KPI tiles and search results are real controls reachable by keyboard; toggle state is conveyed via `aria-pressed`/`aria-current` rather than colour alone; status messages use live regions. The focus outline is now only suppressed for mouse interaction, not for keyboard use.
- Self-test suite extended from 29 to 57 tests: import fidelity (checked generically against `newProcess()`, so fields added in future are covered automatically), dependencies and multi-step chains, ID remapping on manual selection and merge, migration without data loss, import/export round-trip, the release gate, the security regressions listed above, backward compatibility of encrypted files, PDF structure, and accessibility invariants.

### Changed
- `dashboard.png` in the screenshot inventory is documented as what it actually shows (the executive view), rather than as the dashboard.

### Documentation
- Corrected references to `LICENSE.txt` and `NOTICE.txt`; the files are named `LICENSE` and `NOTICE`, so every one of those links was broken.
- Corrected the claim that the unencrypted JSON import lives under **Settings → Import**; it is in the top bar (**Import JSON**). Settings contains only the *encrypted* import.
- Removed the claim of a `.github/` directory with issue/PR templates and a validation workflow — see the correction note under 2.1.0.
- Corrected the self-test count (29 → 57) everywhere it is stated.

### Deliberate deviations
- **No page numbers in PDF reports.** Real page numbers would have to come from the printer's pagination. The CSS margin boxes required for that (`@page { @bottom-center { content: counter(page) } }`) are not supported by any mainstream browser, and the page count additionally depends on paper size, margins and the scaling factor the user only chooses *in* the print dialog. A number rendered into the document would therefore be wrong on a regular basis — and in an audit record, a wrong page number is worse than none. Section numbering plus a table of contents delivers what page numbers are actually needed for in that context (spotting a missing sheet) and is always correct. Browsers' own print dialogs can add real sheet numbers via their "Headers and footers" option.
- **No ARIA tab pattern for the process tabs and sidebar navigation.** `role="tab"` promises arrow-key navigation that does not exist here; a half-implemented ARIA role misleads more than none. `aria-current` states precisely what is true.

## [2.1.0] — Repository & Open Source Finalization

### Added
- Complete GitHub repository structure: `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, documentation set under `docs/`, and a fictional demo workbook under `examples/`.

### Changed
- No changes to application behavior. This release is documentation and repository packaging only.

### Correction (added in 2.2.0)
- This entry originally also claimed "GitHub issue/PR templates and a validation workflow under `.github/`". **No such directory has ever existed in this repository.** The claim was inaccurate and has been removed rather than left standing; the documents that relied on it (`CONTRIBUTING.md`, `SUPPORT.md`, `docs/faq.md`, `docs/release-process.md`) were corrected in 2.2.0. This follows the same principle as the 2.0.1 entry below: a documentation claim that turns out to be false gets corrected in the open, not quietly rewritten.

## [2.0.2] — Branding & Open Source

### Added
- Official project branding: horizontal logo as the default for the sidebar, startup screen, About dialog, PDF cover page, and the default branding of new workbooks (`defaultMeta()` fallback). A customer's own uploaded logo continues to take precedence wherever one is set.
- Square icon mark as favicon and Apple touch icon.
- New **About dialog** showing logo, app version, data schema version, license, copyright, original author, and project website.
- Attribution surfaced consistently in the About dialog, the sidebar footer, Settings ("About & License"), the footer of every generated PDF page, the file header comment, and — as four additive metadata fields (`createdWith`, `edition`, `originalAuthor`, `projectWebsite`, `license`) — in every new JSON export. These fields do not affect the data model; older files and files without them import unchanged.

### Changed
- The project's previous custom terms of use were fully replaced by the unmodified **Apache License, Version 2.0**, including the standard "how to apply" boilerplate and a project-specific NOTICE section per License §4(d). The in-app acknowledgment version was bumped so existing users see and accept the new license once.

## [2.0.1] — Documentation Accuracy Correction

### Fixed
- A prior claim of "100% JSDoc coverage" (2.0.0) was based on an overly loose check (any comment counted). A stricter, automated audit against real `/** */` blocks with complete `@param`/`@returns` tags found only 91 of 220 top-level functions and 9 of 84 `App.*` methods were actually fully documented. All 220 functions and all 84 methods now carry complete JSDoc.

## [2.0.0] — Release Engineering Pass

Technical and editorial finalization pass. No new features.

### Added
- JSDoc documentation across the codebase (documentation completeness was later found incomplete and corrected in 2.0.1 — see above).

### Changed
- Consolidated six duplicated option-list generators, three duplicated time-unit generators, three duplicated dependency-graph builders, three duplicated filename helpers, three duplicated import-feedback call sites, and three duplicated percentage/quantity checks into shared helper functions.
- Renamed `App.removeResource` / `App.removeMassnahme` to `App.deleteResource` / `App.deleteMassnahme` for consistency with the project's existing naming convention (`delete` for confirmation-gated destructive actions, `remove` for simple list removal).
- Consolidated three hardcoded color values into an existing CSS design token.

### Removed
- Two functions that were never called anywhere in the application, and two unused CSS classes, identified through automated cross-reference analysis.

### Fixed
- Standardized the wording of an existing silent `catch` block to match the project's established convention of always explaining why an error is intentionally ignored.
- Closed a gap in the version history: v1.1.0 was missing from the in-file changelog (it previously existed only in a header comment that had since been removed).

## [1.6.0] — Measures, Management View, Release Gate, Self-Tests

### Added
- Measures extended with effort level, cost estimate, risk before/after, decision requirements, approver/approval date, evidence, and effectiveness review fields; a benefit/effort matrix; new catalog filters (effort, owner, overdue only); and visual flags for overdue or effectiveness-unverified measures.
- A compact, decision-oriented management overview at the top of the executive view: six clickable KPIs, structured top risks, data-quality warnings kept clearly separate from confirmed risks, and structured decision points. Existing detailed sections remain available below it.
- A genuinely compact PDF executive summary for the short report, replacing the full management summary that had grown too long for that purpose over time. Every PDF page now carries the workbook name, version, status, export date, and a configurable confidentiality label.
- `releaseReadinessCheck()` with centrally configurable blocking vs. warning criteria. Moving to "Ready for approval" / "Approved" now shows a readiness report; blockers prevent the transition entirely, warnings can only be accepted with a documented justification (reviewer, date, reason). A successful approval automatically creates a new, immutable version.
- A hidden, integrated self-test suite (29 tests, reachable only via a keyboard shortcut or URL fragment) covering time-value parsing, plausibility checks, ID uniqueness, import validation, schema migration, XSS test values, version comparison, resource/measure reference integrity, encrypted export/import, corrupted-data recovery, and permission-denied file saves — using only synthetic data, never touching the active workbook. Approval is additionally blocked if any critical self-test fails.

### Changed
- Data schema extended by three additive migration steps (now 11 steps total since schema version 1).

## [1.5.2] — Dependency Chain Direction Fix

### Fixed
- The arrow direction shown for critical dependency chains and direct critical dependencies was inverted relative to the actual flow of impact: a stored "A depends on B" reference was displayed as "A → B" even though the operational flow runs from B to A. Output now correctly reads "upstream process → dependent process". Redundant sub-chains that are already fully contained within a longer chain are no longer listed separately.

## [1.5.1] — Targeted Follow-ups to 1.5.0

### Fixed
- Recovery time/point objective parsing no longer guesses a unit for bare numbers (e.g. "4"); an explicit unit is now required, otherwise the value is kept for manual review instead of being silently interpreted as hours.
- Minimum viable capability now has an explicit `mode` (percentage / quantity / description) instead of allowing both a percentage and a quantity to be set ambiguously; legacy data with both values set is flagged for a clear, mandatory choice rather than having a value silently discarded.
- "Critical chains" previously meant simple two-process pairs, which is not a chain in any meaningful sense. Chain detection now performs genuine multi-step path analysis (three or more consecutive critical processes, cycle-safe); direct two-process relationships are now reported separately and honestly labeled.

## [1.5.0] — Business Continuity Data Model Package

### Added
- Structured recovery time/point objectives (numeric value + unit instead of free text), with automatic migration of unambiguous legacy values and manual-review flagging of ambiguous ones.
- A criticality-vs-impact-analysis comparison that surfaces disagreement between a process's manually assigned criticality and the criticality suggested by its impact scores, without ever overriding the manual value.
- Structured, ID-based process dependencies (replacing free text) with detection of self-references, duplicates, references to deleted processes, contradictory relationships, and cycles.
- Extended resource fields: owner, provider, structured recovery requirement, availability requirement, fallback test date/result, single-point-of-failure flag, data classification, and a personal-data flag (never mandatory).
- Optional, structured minimum viable capability (percentage, or quantity + unit + period), never mandatory and never auto-converted between the two.

## [1.4.1] — Post-Release Fixes for 1.4.0

### Fixed
- **Critical:** the schema migration function could incorrectly report success even when a migration step was missing; it now always reports failure unless every step ran and the result exactly matches the current schema version.
- Automatic backups now report structured success/failure instead of a silent boolean; every destructive action requires explicit confirmation if its pre-action backup failed.
- Legacy version snapshots that recursively embedded the entire version history (a since-fixed growth bug) are now cleaned up on load, with an automatic backup taken first.
- Import references to a process ID that appears more than once are no longer silently assigned to the first match; they are flagged as ambiguous and shown in a dedicated review list instead.

## [1.4.0] — Technical Hardening

### Added
- Independently tracked browser vs. linked-file save status.
- Schema versioning with stepwise, chainable migrations; unrecognized newer schemas are not opened blindly.
- Recovery flow for corrupted or unrecognized locally stored data: raw data is preserved (never overwritten), and a conservative recovery attempt only recovers fully parseable sub-structures.
- Five rotating automatic backup slots, taken before import, version restore, deletion/cleanup, and schema migration.
- Hardened import validation: size limits, recursive removal of dangerous object keys, ID uniqueness checks, reference validation, and enum value validation.
- Centralized safe-output helpers for DOM text and attributes; logo URLs restricted to safe protocols.
- IDs now generated with `crypto.randomUUID()` (with a `crypto.getRandomValues()` fallback) instead of `Math.random()`.
- Version entries extended with provenance, app/schema version, and a SHA-256 checksum; a version comparison view highlights what changed between two versions.

### Fixed
- Three real, previously unnoticed XSS vulnerabilities (unescaped process names in the resource view, the dependency cluster view, and PDF output).
- Version snapshots previously embedded the entire prior version history recursively, causing exponential data growth and crashes after a handful of saved versions.
- An infinite loop between checksum refresh and version-history re-render when all checksums were already cached.

## [1.3.1]

### Added
- Terms-of-use acknowledgment flow with a startup-screen summary that must be confirmed once; the full text remains available from Settings and the sidebar at any time. Acknowledgment resets when the workbook is cleaned for handoff or fully erased, so subsequent recipients see it too.

## [1.3.0]

### Added
- A two-level status indicator, at both the individual-process and whole-workbook level, visible in the executive view and dashboard.
- File-based storage via the File System Access API (Chromium-based browsers): open, save, and save-as write directly to a user-chosen file, with autosave keeping it in sync. A full `localStorage`-based fallback remains available for other browsers.

## [1.2.0]

### Added
- Weighted business impact analysis scoring.
- Recovery time objective / recovery point objective plausibility checks against maximum tolerable downtime.
- Measure quality checks, resource duplicate detection, and resilience-check recommendations per checklist item.
- An expanded management summary (decision points, maturity level, top risks) reused automatically in the executive view and PDF summary.
- XSS hardening for inline event handlers.
- Optional password-protected JSON export/import (PBKDF2 + AES-GCM via the Web Crypto API).
- More robust PDF output and import validation.

## [1.1.0]

### Fixed
- The "60-second pitch" process tab returned no content when navigated to directly (a missing return statement).

## [1.0.0] — Initial Release

### Added
- Process records, business impact analysis, minimum viable capability, critical resources, emergency operations, resilience check, measures, version history, JSON import/export, executive view, workshop mode, and PDF export.

[2.1.0]: #
[2.0.2]: #
[2.0.1]: #
[2.0.0]: #
[1.6.0]: #
[1.5.2]: #
[1.5.1]: #
[1.5.0]: #
[1.4.1]: #
[1.4.0]: #
[1.3.1]: #
[1.3.0]: #
[1.2.0]: #
[1.1.0]: #
[1.0.0]: #
