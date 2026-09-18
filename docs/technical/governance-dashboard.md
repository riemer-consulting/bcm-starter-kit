# Governance Dashboard — technische Referenz

*Arbeitspaket AP5, Version 2.4.0.*

> **Diese Seite ist technische Dokumentation** (Datenmodell, Funktionsnamen,
> Priorisierungslogik im Detail) — für die anwenderorientierte Erklärung
> siehe [Governance Dashboard im Benutzerhandbuch](../handbook/21-governance-dashboard.md).

## Zweck

Das Governance Dashboard ist die operative Arbeits- und Steuerungsansicht,
mit der ein BCM-Verantwortlicher innerhalb weniger Sekunden erkennt: "Das
sind die Dinge, um die ich mich jetzt kümmern muss" — und bei jedem Punkt
nachvollziehen kann, warum genau dieser Punkt angezeigt wird.

Es ist ausdrücklich **kein** Managementreport, Compliance-Dashboard,
Auditbericht, Reifegradmodell, Risiko-Scoring-System oder BI-Dashboard.

## Kein neues Datenmodell

`computeGovernanceDashboard()` ist eine reine Berechnungsfunktion. Sie
wird bei jedem Rendern der Dashboard-Ansicht neu aufgerufen, liest
ausschließlich `STATE`, verändert nichts und speichert nichts. Es gibt
kein `STATE.dashboard[]`, keine gespeicherten Kennzahlen, keine
gespeicherten Prioritäten — und keine neue Schema-Version
(`CURRENT_SCHEMA_VERSION` bleibt bei 15).

Jede Aussage stützt sich auf bereits bestehende Funktionen:

| Bereich | Wiederverwendete Funktion | Herkunft |
|---|---|---|
| Reviews | `reviewCenterData()` | AP1 |
| Maßnahmen | `massnahmeIsOverdue()`, `massnahmeIsOpen()`, `massnahmeIsBlockedWithoutReason()`, `massnahmeNeedsEffectivenessProof()` | AP3 |
| Qualität/Konsistenz | `qualityAndConsistencyCheck()` | vor 2.4 |
| Änderungen/Freigabe | `buildTimelineEvents()` | AP4 |

Neu hinzugekommen sind ausschließlich kleine, rein filternde Aggregatoren
(`massnahmeGovernanceData()`, `openManagementDecisions()`,
`changesSinceLastRelease()`, `governanceQualityHighlights()`) — keiner von
ihnen berechnet etwas, das nicht bereits an anderer Stelle existiert.

## Die Priorisierung: 11 Stufen

`governancePriorityList()` ist eine feste, deterministische Abfolge von
Filtern und Sortierungen — kein Score, keine KI, keine Zufallslogik.
Gleiche Daten erzeugen immer dieselbe Reihenfolge (durch die Datensatz-ID
als Tie-Breaker in jeder Sortierung).

1. Überfälliger Review eines kritischen Prozesses
2. Überfällige Maßnahme hoher Priorität
3. Blockierte Maßnahme mit hoher Relevanz (hohe Priorität ODER kritischer Prozess)
4. Kritischer Prozess ohne jegliche Reviewplanung
5. Bald fälliger Review eines kritischen Prozesses
6. Erledigte Maßnahme ohne dokumentierte Wirksamkeitsprüfung
7. Offener Managemententscheidungsbedarf (`massnahme.entscheidungsbedarf`)
8. Wesentlicher offener Konsistenz-/Qualitätsbefund (Konsistenzbefunde + Qualitätsbefunde der Stufe "Warnung")
9. Überfälliger Review eines sonstigen Prozesses
10. Sonstige überfällige Maßnahme
11. Sonstige fällige Governance-Aufgabe (bald fälliger Review eines sonstigen Prozesses, blockierte Maßnahme ohne hohe Relevanz, fällige Wiedervorlage)

**Stufe 7 und die drei Bestandteile von Stufe 11 sind Ergänzungen** zur
10-Punkte-Beispielreihenfolge aus der Aufgabenstellung — begründet in
`roadmap/DECISIONS.md` (die Aufgabenstellung selbst verlangt, die
Beispielreihenfolge gegen das tatsächliche Datenmodell zu prüfen und nicht
blind zu übernehmen).

Jeder Eintrag enthält:
- **Aufgabe** (`title`) — kurzer Titel
- **Grund** (`reason`) — vollständiger, lesbarer Satz, nie nur "Hohe Priorität"
- **Zeitlicher Kontext** (`context`) — z. B. "14 Tage überfällig"
- **Deep Link** (`object` → `governanceDrilldownHtml()`) — direkter Klick in Review Center, Prozessakte, Maßnahmenkatalog, Qualitätsprüfung oder Timeline

## Kompakte Detailkarten

Unterhalb der Prioritätsliste und der Kennzahlenreihe zeigt das Dashboard
fünf kompakte Karten — jede eine reine Darstellung bereits berechneter
Daten, nicht deren erneute Berechnung:

- **Review-Governance** — überfällige/bald fällige Reviews, kritische
  Prozesse ohne Reviewplanung (`reviewCenterData()`)
- **Maßnahmen-Governance** — überfällig, blockiert, offen mit hoher
  Priorität, ohne Wirksamkeitsnachweis, fällige Wiedervorlage
  (`massnahmeGovernanceData()`)
- **Änderungen seit letzter Freigabe** — siehe unten
- **Offene Managemententscheidungen** — siehe unten
- **Datenqualität & Konsistenz** — Warnungen und Konsistenzbefunde, nicht
  die vollständige Liste (dafür gibt es die Qualitätsprüfung)

Kritische Prozesse werden **nicht** als eigene Liste gezeigt — sie
erscheinen ausschließlich dort, wo aus ihnen tatsächlich eine
Governance-Aufgabe entsteht (Stufe 1, 3, 4, 5 der Prioritätsliste).

## Änderungen seit letzter Freigabe

`changesSinceLastRelease()` ermittelt die zuletzt erzeugte Freigabe-Version
(`STATE.versions[].source==='release'`, höchste `nr`) und listet
fachlich relevante Timeline-Ereignisse (Kritikalität, MTA/RTO/RPO,
Notbetrieb, kritische Ressourcen, abgeschlossene Reviews/Maßnahmen,
geprüfte Wirksamkeit) seit deren Zeitpunkt — reine Wiederverwendung von
`buildTimelineEvents()` (AP4), gefiltert nach Zeitstempel und Ereignistyp.

**Existiert noch keine Freigabe, wird das transparent kommuniziert** —
es wird kein Referenzzeitpunkt erfunden (z. B. nicht "seit der ersten
Version" oder "seit heute").

## Offene Managemententscheidungen

`openManagementDecisions()` filtert Maßnahmen mit nicht-leerem
`entscheidungsbedarf`, die noch nicht erledigt oder verworfen sind
(`massnahmeIsOpen()`). Es wird keine neue Entscheidungs-Entität
eingeführt — das Feld existierte bereits vor Version 2.4.

## Empty States

- **Kein einziger Prozess dokumentiert:** die bestehende Willkommenskarte
  übernimmt diese Rolle bereits vollständig; das Governance Dashboard
  erscheint in diesem Fall gar nicht.
- **Prozesse vorhanden, aber keine Reviewplanung existiert:** eigene
  Meldung ("Für diese Prozesse ist noch keine Reviewplanung hinterlegt"),
  statt einer leeren "Keine dringenden Aufgaben"-Liste, die fälschlich
  "alles in Ordnung" suggerieren könnte.
- **Prioritätsliste tatsächlich leer, aber Reviewplanung existiert:**
  neutrale Meldung ("Aktuell keine dringenden Governance-Aufgaben
  erkannt") — keine positive Pauschalaussage wie "BCM vollständig
  aktuell".

## Kennzahlen

Acht Kacheln, jede mit direktem operativem Nutzen: Reviews überfällig/bald
fällig, Maßnahmen überfällig/blockiert, offene Wirksamkeitsprüfungen,
kritische Prozesse ohne Reviewplanung, offene Managemententscheidungen,
Änderungen seit letzter Freigabe. Keine künstlichen Prozentwerte, keine
Reifegradzahl, kein Score — jede Zahl ist eine direkte Zählung eines
bereits deterministisch klassifizierten Zustands.
