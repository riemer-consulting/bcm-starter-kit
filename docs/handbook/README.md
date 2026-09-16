# BCM Starter Kit — Handbuch (Markdown-Quelle)

Dieses Verzeichnis ist die fortlaufend gepflegte Markdown-Quelle für das
Anwenderhandbuch. Es wird während der Entwicklung von Version 2.4
("Governance & Lifecycle") kapitelweise ergänzt.

**Wichtig:** Das finale PDF-Handbuch wird erst zum Abschluss von Version 2.4
erzeugt (siehe `roadmap/RELEASE_2_4.md`). Bis dahin ist dieses Verzeichnis
die maßgebliche, kontinuierlich aktualisierte Quelle.

Für Anwender der aktuell stabilen Version siehe stattdessen
[docs/user-guide.md](../user-guide.md) — dieses Handbuch ergänzt dort, wo
neue, noch in Entwicklung befindliche Funktionen (2.4.0-dev) ausführlicher
erklärt werden müssen, als es im laufenden User Guide sinnvoll ist.

## Kapitel

1. [Review Center](review-center.md) *(AP1/AP2, 2.4.0-dev)*
2. [Maßnahmenmanagement 2.0](massnahmenmanagement.md) *(AP3, 2.4.0-dev)*
3. [BCM Timeline](timeline.md) *(AP4, 2.4.0-dev)*
4. [Governance Dashboard](governance-dashboard.md) *(AP5, 2.4.0-dev)*

## Glossar

Kurzreferenz der zentralen Begriffe aus Version 2.4 — vollständige
Erklärung jeweils im zugehörigen Kapitel.

| Begriff | Bedeutung | Kapitel |
|---|---|---|
| Review | Konkrete Arbeits-/Historieninstanz einer Reviewart zu einem Prozess | [1](review-center.md) |
| Reviewart | Prozess-/BIA-/Notbetriebs-/Ressourcenreview | [1](review-center.md) |
| Fälligkeit/Überfälligkeit | Aus `geplantAm` berechnet, nie gespeichert | [1](review-center.md) |
| Reviewzyklen-Policy | Optionales Intervall je Reviewart und Prozess | [1](review-center.md) |
| Herkunft (Maßnahme) | Woher eine Maßnahme entstand (Review/Parkplatz/Qualitätsbefund/Resilienz/manuell) | [2](massnahmenmanagement.md) |
| Wirksamkeitsprüfung | Separater Nachweis, dass eine erledigte Maßnahme tatsächlich wirkt | [2](massnahmenmanagement.md) |
| BCM Timeline | Chronologische, abgeleitete Ansicht fachlicher BCM-Ereignisse | [3](timeline.md) |
| Governance Dashboard | Zusammengeführte, priorisierte Arbeitsliste "Was ist als Nächstes zu tun?" | [4](governance-dashboard.md) |
| Priorisierungsstufe | Eine der 11 festen, deterministischen Rangstufen der Governance-Priorisierung | [4](governance-dashboard.md) |
| Deep Link | Direkter Klick-Link von einer Governance-Aufgabe in die zuständige bestehende Ansicht | [4](governance-dashboard.md) |

## Versionsgeschichte dieses Handbuchs

- **AP1/AP2** (2.4.0-dev): Kapitel "Review Center" angelegt.
- **AP3** (2.4.0-dev): Kapitel "Maßnahmenmanagement 2.0" ergänzt.
- **AP4** (2.4.0-dev): Kapitel "BCM Timeline" ergänzt.
- **AP5** (2.4.0-dev): Kapitel "Governance Dashboard" ergänzt; Glossar und
  diese Versionsgeschichte neu eingeführt.
