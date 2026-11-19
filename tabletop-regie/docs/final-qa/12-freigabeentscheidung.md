# 12 – Freigabeentscheidung

**Geprüfter Stand:** Commit `33154fd` (Zyklus 2, vollständiger Lauf). Vorheriger Zyklus 1: `5a61845`.
**Ergebnis in einem Satz:** Die Software ist für beide Szenarien technisch belastbar geprüft. Eine **Pilotfreigabe wird mit diesem Paket nicht erteilt**: Medien und Betrieb im Raum (Gate C) sowie die fachlich-didaktische Abnahme (Gate D) sind offen. Die endgültige Bewertung erfolgt im unabhängigen Review anhand dieses Pakets.

## Die vier Gates

Jedes Gate ist für sich bewertet. Keines ist bestanden, weil ein anderes bestanden ist. Ein grüner Test bedeutet „technisch bestanden“, nicht „fachlich abgenommen“.

| Gate | Anforderung laut Auftrag | Bewertung | Begründung |
|---|---|---|---|
| A – Softwarefunktion | alle kritischen Funktionen getestet, keine offenen technischen Blocker | **technisch bestanden, mit Auflagen** | Alle kritischen Plattformfunktionen bis zur Stufe Browser bzw. integriert geprüft, keine offenen technischen Blocker. Auflagen: keine Zugriffstrennung Bühne/Moderation (O-06), Medienfehler ohne Hinweis (O-07), Echtzeit über 45–180 Min. nicht gemessen (O-08), Werkzeugbefund Z2-01. |
| B – Szenariokonsistenz | alle Pflichtlagen und Entscheidungsfolgen konsistent, keine offenen hohen fachlichen Widersprüche | **regelbasiert bestanden; fachliche Bestätigung offen** | Alle Varianten und Entscheidungskombinationen beider Szenarien ohne Regelverstoß gegen das unabhängige Orakel; NordTech unverändert; Waterkant-Delta F01–F15 regelgeprüft. Offen: fachliche Bestätigung (Gate D) und W2-R11/SK28/SK36 (O-11). |
| C – Medien und Betrieb | Browser, Audio, SMTP, Veranstaltungsraum, Rechte und Betriebsbedingungen geprüft | **offen** | Technische Medienmessung und Browserwiedergabe liegen vor. Nicht geprüft sind: Hörtest (kein Ton akustisch abgenommen, O-03), Veranstaltungsraum mit Beamer und Lautsprechern (O-05), echter Mailserver (O-04), Bild- und Tonrechte (O-14), Betriebsbedingungen im Raum (O-10). |
| D – Fachlich-didaktische Abnahme | Fachannahmen geprüft, moderierter Probelauf durchgeführt, Lernziele und Bewertungsraster praktisch validiert | **offen** | Kein Fachreview von Brandschutz, IT-Architektur, Verträgen/Datenschutz, Controlling/Versicherung, Arbeitsschutz (O-01). Kein moderierter Probelauf mit Menschen (O-02). Bewertungsraster nur technisch geprüft. |

## Empfehlung

| Szenario | Empfehlung | Voraussetzungen |
|---|---|---|
| NordTech | **bereit für eine moderierte Generalprobe** mit einer Testgruppe | Hörtest und Technikprobe im Raum (Gate C); Testpostfächer der Organisation; danach Entscheidung der Spielleitung über den Pilot |
| Waterkant | **bereit für das fachliche Review**, danach Generalprobe | Fachprüfung F01–F05/F13 durch die zuständigen Stellen (Gate D), Hörtest der Alarm-Einspielungen mit vorheriger Information von Empfang und Sicherheitsdienst, Entscheidung zu O-11; Format 90 Minuten in einem Zeitfenster ab 120 Minuten |

## Selbstprüfung (Abschnitt 16 des Auftrags)

| Frage | Antwort | Beleg |
|---|---|---|
| Könnte ein fremder Entwickler die Tests reproduzieren? | Ja. Ein Befehl startet den Gesamtlauf am Commit; Voraussetzungen, Ports, Testdaten und der feste Startwert der Drehbuchsimulation sind dokumentiert. Abweichungen sind nur bei Zeitstempeln, Sitzungs-IDs, Laufzeiten und Bildschirmfotos zu erwarten. | `README.md`, `nachweis/umgebung.json` |
| Könnte ein unabhängiger Reviewer jede Behauptung prüfen? | Ja für alle technischen Behauptungen: Jede Zeile der Dokumente 03–08 ist aus einer Ergebnisdatei erzeugt; Traces, Bildschirmfotos, Journale, Protokoll-Exporte und Quellen liegen bei, mit Prüfsummen. Fachliche Behauptungen sind ausdrücklich als ungeprüft gekennzeichnet. | `manifest.json`, `quellen/` |
| Gibt es Tests, deren Soll und Ist aus derselben fehlerhaften Funktion stammen? | Weitgehend nein: Orakel ohne Engine/Server mit Selbsttest, handgerechnete Sollwerte, Regression gegen den eingefrorenen Stand. **Schwach** bleibt die genaue Auswahl optionaler Karten je Dauer (nur Regeln geprüft, O-09). Die Delta-Regeln prüfen den Drehbuchtext, nicht seine fachliche Richtigkeit. | 01 Abschnitt 5, 02 |
| Wurden tatsächlich Browseraktionen durchgeführt? | Ja: 14 Übungen über Schaltflächen und Eingabefelder in Chromium, mit Trace jedes Klicks; die Schnittstelle nur lesend. Ersatzklicks (Klick ohne Ruheprüfung) sind gezählt: 0 in Zyklus 2. | 05, `nachweis/e2e/*/trace.zip` |
| Sind Fehler und gescheiterte Tests erhalten geblieben? | Ja: früherer Waterkant-Fehllauf (F-00), Vorlaufbefunde V-01…V-09, abgebrochener Start 1a, Replay-Abweichung aus Zyklus 1 mit vollständigem Nachweis (`nachweis-zyklus1/`). | 10 |
| Stimmen Commit-ID, Quellcode, Szenarien und Screenshots überein? | Ja: `umgebung.json` enthält Commit und SHA-256 aller Quellen und Drehbücher dieses Laufs; `quellen/` stammt per `git archive` aus demselben Commit; der Ergebnis-Commit unterscheidet sich nur unter `docs/final-qa/` (beim Paketbau geprüft). | `manifest.json` |
| Sind die Testnachweise vollständig? | Für die in 02 genannten Anforderungen ja. Bewusst nicht im Paket: Traces und Fotos von Zyklus 1 (Größe; deren Ergebnisse, Journale und Protokolle sind enthalten). | 02, `manifest.json` |
| Ist jeder offene Punkt eindeutig dokumentiert? | Ja: 18 offene Risiken mit Schwere, Gate und nächstem Schritt; maschinenlesbar in `befunde.json`. | 11 |
| Gibt es einen nachweisbaren Unterschied zwischen technisch bestanden und fachlich abgenommen? | Ja: Gate A/B (technisch, regelbasiert) und C/D (Raum, Fachleute, Menschen) sind getrennt bewertet; C und D sind offen; der Prüfstand zeigt ausdrücklich, dass ein bestandener Test keine Freigabe ist. | dieses Dokument, `pruefstand.jpg` |

Diese Unterlage ersetzt keine rechtliche, versicherungs-, datenschutz- oder arbeitsschutzrechtliche Beratung; die zuständigen Fachabteilungen sind einzubeziehen.
