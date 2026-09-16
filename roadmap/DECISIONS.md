# Architecture & Product Decisions

Hier werden dauerhaft alle wichtigen Entscheidungen dokumentiert.

Beispiel:

## Workshopmodus

Entscheidung:
Evolution statt Neubau.

Begründung:
Bestehende Kundenworkshops nutzen den vorhandenen Workflow.

## AP1 — Reviews als eigenständige Liste statt Einbettung in den Prozess

Entscheidung:
Reviews werden als eigenständiges `STATE.reviews[]` mit Prozessreferenz
(`prozessId`) modelliert, nicht als verschachteltes Array innerhalb von
`process`.

Begründung:
Ein Review ist eine Arbeits-/Historieninstanz mit eigenem Lebenszyklus
(geplant → in Bearbeitung → abgeschlossen → Folgereview), die AP2
(Reviewzyklen) und AP4 (Timeline) direkt referenzieren müssen. Eine flache,
global filter-/sortierbare Liste folgt demselben Muster wie `massnahmen[]`
und `parkplatz[]` und lässt sich ohne Sonderfall in Import/Export/Merge/
Versionierung einhängen (`versionableSnapshot()` erfasst sie automatisch
über den Rest-Spread, ohne Codeänderung).

## AP1 — Fälligkeit wird berechnet, nicht gespeichert

Entscheidung:
Es gibt keinen gespeicherten Review-Status "überfällig". Der gespeicherte
Status ist auf `geplant`/`in_bearbeitung`/`abgeschlossen` beschränkt;
Überfälligkeit/baldige Fälligkeit wird bei jedem Rendern aus `geplantAm`
berechnet (`reviewDueInfo()`).

Begründung:
Ein aus einem vorhandenen Datum ableitbarer Fakt darf nicht zusätzlich als
Status persistiert werden — sonst könnten beide auseinanderlaufen (z. B.
wenn die Anwendung nicht geöffnet wird, während ein Termin verstreicht).
Dasselbe Prinzip gilt bereits für `massnahmeIsOverdue()` bei Maßnahmen.

## AP2 — Keine Policy bedeutet keinen erfundenen Termin

Entscheidung:
`process.reviewConfig[reviewart]` ist standardmäßig `null` (auch nach
Migration bestehender Prozesse). `computeNextReviewDate()` liefert in
diesem Fall, bei `ereignisbezogen` und bei ungültigem `individuell`-Wert
konsequent `null` statt eines geschätzten Datums.

Begründung:
Ausdrückliche Vorgabe der Aufgabenstellung. Ein erfundener Termin würde als
scheinbar verlässliche Systemaussage wahrgenommen, obwohl er keine fachliche
Grundlage hat — das wäre irreführender als gar kein Vorschlag.

## AP2 — Policy wird beim Zusammenführen nie automatisch überschrieben

Entscheidung:
`mergeProcessInto()` übernimmt eine importierte Reviewzyklen-Policy je
Reviewart nur, wenn im Ziel noch keine gesetzt ist.

Begründung:
Dieselbe Regel gilt bereits für `minimumCapability.mode` — eine bewusst
getroffene fachliche Entscheidung darf ein additiver Import nie stillschweigend ändern.

## AP3 — Erweiterung des bestehenden Maßnahmenmodells statt zweiter Struktur

Entscheidung:
Alle neuen Felder (Herkunft, Zeitachse, erweiterte Wirksamkeitsprüfung)
werden additiv auf `massnahmen[]` ergänzt (Migration 14→15). Es entsteht
keine zweite, parallele "Maßnahme 2.0"-Struktur.

Begründung:
Ausdrückliche Vorgabe der Aufgabenstellung ("Keine zweite Maßnahmenstruktur
bauen"). Zwei Strukturen für dasselbe fachliche Konzept hätten jede
bestehende Auswertung (Qualitätsprüfung, GF-Ansicht, PDF, Freigabeprüfung)
doppelt pflegepflichtig gemacht.

## AP3 — Herkunft von Altdaten wird nie erfunden

Entscheidung:
Bei der Migration 14→15 erhalten bestehende Maßnahmen `sourceType:
'unbekannt'` und ein leeres `erstelltAm` statt eines geratenen Werts
(z. B. "manuell" oder des Migrationszeitpunkts als Anlagedatum).

Begründung:
Dieselbe Leitlinie wie bei den Reviewzyklen (AP2): ein erfundener Wert
würde wie eine echte, geprüfte Aussage wirken, obwohl er keine ist.
"Unbekannt" ist ehrlich, "manuell" wäre eine Vermutung.

## AP3 — "Erledigt" bleibt getrennt von "wirksam"

Entscheidung:
Der Statuswert `erledigt` löst keine automatische Aussage zur Wirksamkeit
aus. Wirksamkeit wird ausschließlich über die separaten Felder
`wirksamkeitGeprueftAm`/`wirksamkeitPruefer`/`wirksamkeitErgebnis` erfasst.

Begründung:
Ausdrückliche Vorgabe der Aufgabenstellung. Diese Trennung existierte
bereits vor 2.4.0 (`massnahmeNeedsEffectivenessProof()`); AP3 erweitert sie
nur um den Prüfer, ändert die Grundregel aber nicht.

## AP4 — Kein STATE.timeline[], Ableitung statt Persistenz

Entscheidung:
Die BCM Timeline führt keine eigene, persistierte Ereignisliste ein.
`buildTimelineEvents()` leitet alle Ereignisse bei jedem Aufruf frisch aus
`STATE.processes`/`STATE.reviews`/`STATE.massnahmen`/`STATE.versions` ab.

Begründung:
Ausdrückliche Vorgabe der Aufgabenstellung. Ein zusätzliches
Persistenzformat hätte dauerhaft mit den eigentlichen Datensätzen
synchron gehalten werden müssen (Migrationen, Import/Export, Merge) —
für Daten, die bereits vollständig anderswo vorliegen.

## AP4 — "Maßnahme gestartet"/"Maßnahme blockiert" nicht umgesetzt

Entscheidung:
Diese beiden in der Aufgabenstellung als Beispiel genannten Ereignistypen
fehlen in `TIMELINE_EVENT_TYPES`. Es wurde auch KEIN neues Zeitstempelfeld
auf Maßnahmen ergänzt, um sie nachträglich ableitbar zu machen.

Begründung:
Für den Wechsel auf `in_arbeit` oder `blockiert` speichert das Datenmodell
keinen Zeitpunkt. Ein Timeline-Ereignis dafür hätte einen Zeitpunkt
erfinden müssen (z. B. den Zeitpunkt der Ableitung selbst) — das
widerspricht direkt "Ableitung vor Persistenz" und "keine Ereignisse für
Funktionen erfinden, die im Produkt nicht existieren". Eine zusätzliche
Persistenzerweiterung dafür hätte zudem AP3 nachträglich angefasst, dessen
additives Feldmodell zum Zeitpunkt von AP4 bereits abgeschlossen war.
Siehe Abschlussbericht für eine Empfehlung, dies bei Bedarf gezielt in
einem künftigen Arbeitspaket nachzuholen.

## AP5 — Keine neue Persistenz, keine neue Schema-Version

Entscheidung:
`computeGovernanceDashboard()` ist eine reine Berechnungsfunktion, die bei
jedem Rendern neu aufgerufen wird. Es gibt kein `STATE.dashboard[]`, keine
gespeicherten Kennzahlen, keine gespeicherten Prioritäten.
`CURRENT_SCHEMA_VERSION` bleibt bei 15.

Begründung:
Ausdrückliche Vorgabe der Aufgabenstellung. Alle für das Dashboard
benötigten Informationen liegen bereits in AP1–AP4 vor; eine zusätzliche
Persistenzschicht hätte nur eine weitere Stelle geschaffen, die mit den
eigentlichen Datensätzen synchron gehalten werden müsste.

## AP5 — Wiederverwendung statt zweiter Fachlogik

Entscheidung:
Jede Governance-Aussage stützt sich ausschließlich auf bereits bestehende
Funktionen (`reviewCenterData()`, die AP3-Maßnahmenprädikate,
`qualityAndConsistencyCheck()`, `buildTimelineEvents()`). Neu geschriebene
Funktionen (`massnahmeGovernanceData()`, `openManagementDecisions()`,
`changesSinceLastRelease()`, `governanceQualityHighlights()`) filtern oder
gruppieren ausschließlich deren Ergebnisse, berechnen aber nichts neu.

Begründung:
Ausdrückliche Vorgabe der Aufgabenstellung ("keine zweite Reviewberechnung
aufbauen", "keine zweite Maßnahmenlogik aufbauen", "keine zweite Quality
Engine bauen"). Eine parallele Implementierung hätte zwangsläufig
auseinanderlaufen können (z. B. eine andere Definition von "überfällig").

## AP5 — Priorisierungsreihenfolge um zwei Punkte erweitert (11 statt 10 Stufen)

Entscheidung:
`governancePriorityList()` ergänzt die in der Aufgabenstellung genannte
10-Punkte-Beispielreihenfolge um eine eigene Stufe 7 ("offener
Managemententscheidungsbedarf") und fasst "bald fälliger Review eines
sonstigen Prozesses", "blockierte Maßnahme ohne hohe Relevanz" und
"fällige Wiedervorlage" in einer Sammelstufe 11 zusammen.

Begründung:
"Offene Managemententscheidungen" ist einer der acht Kernpunkte im
Abschnitt "Fachliches Ziel" der Aufgabenstellung, fehlt aber in der
10-Punkte-Beispielreihenfolge — die Aufgabenstellung selbst fordert
ausdrücklich, die Reihenfolge "gegen das tatsächlich vorhandene
Datenmodell zu prüfen" und "nicht blind zu übernehmen". Eine offene
Entscheidung blockiert typischerweise weitere Schritte und wurde daher
zwischen Wirksamkeitsprüfung (Stufe 6) und Konsistenzbefund (jetzt Stufe
8) eingeordnet. "Wiedervorlagen, sofern fällig" wird in Abschnitt 4
("Maßnahmen-Governance") der Aufgabenstellung ebenfalls explizit gefordert,
ohne einer Stufe zugeordnet zu sein — sie erhält daher die am wenigsten
dringliche Sammelstufe 11, zusammen mit den beiden anderen in der
Aufgabenstellung erwähnten, aber nicht einsortierten Fällen.

## AP5 — "Hohe Relevanz" bei blockierten Maßnahmen definiert

Entscheidung:
"Blockierte Maßnahme hoher Relevanz" (Stufe 3) wird als `prioritaet==='hoch'
ODER Bezug zu einem kritischen Prozess` definiert (`massnahmeHatHoheRelevanz()`).

Begründung:
Die Aufgabenstellung nennt "hoher Relevanz" ohne Definition (im
Unterschied zu "hoher Priorität" bei Maßnahmen in Stufe 2, wo das Feld
`prioritaet` eindeutig ist). Da Relevanz im gesamten Datenmodell sowohl
über die Maßnahmenpriorität als auch über die Prozesskritikalität
ausgedrückt wird, wird hier bewusst die Vereinigung beider bestehender
Signale verwendet, statt ein neues Relevanzfeld einzuführen.

## AP1 — Kein Score, keine fachliche Bewertung

Entscheidung:
Die Priorisierung im Review Center (`reviewCenterPriorityList()`) ist eine
reine, nachvollziehbare Sortierung (Überfälligkeitsdauer, dann
Resttage bis fällig, dann Prozessname) — kein gewichteter Score.

Begründung:
Vorgabe der Architekturprinzipien für Version 2.4: keine Blackbox-Scores,
keine fachliche Bewertung von BCM-Entscheidungen des Anwenders. Jede
Position in der Liste muss aus dem Sortierkriterium erklärbar sein.
