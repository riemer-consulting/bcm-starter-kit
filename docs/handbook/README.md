# BCM Starter Kit — Handbuch (Markdown-Quelle)

Dieses Verzeichnis ist die gepflegte Markdown-Quelle für das
Anwenderhandbuch zu Version 2.4.0 ("Governance & Lifecycle"). Es wurde
während der Entwicklung von Version 2.4.0 kapitelweise ergänzt und ist mit
dem Release vollständig.

**PDF-Handbuch:** Aus diesen Kapiteln wurde
[`docs/BCM-Starter-Kit_Benutzerhandbuch.pdf`](../BCM-Starter-Kit_Benutzerhandbuch.pdf)
erzeugt (Version 2.4.0, Titelseite, Inhaltsverzeichnis mit Sprungmarken,
Seitenzahlen, Kapitel 1–4, Anhang: Glossar). Dieses Verzeichnis bleibt die
maßgebliche, fortlaufend gepflegte Quelle — das PDF ist ein daraus erzeugter,
einmaliger Snapshot für den Release, kein eigenständig gepflegtes Dokument.
Bei einer künftigen inhaltlichen Änderung dieser Kapitel muss das PDF erneut
erzeugt werden, um konsistent zu bleiben.

Für Anwender siehe außerdem [docs/user-guide.md](../user-guide.md) — dieses
Handbuch ergänzt dort, wo die mit Version 2.4.0 hinzugekommenen Funktionen
ausführlicher erklärt werden müssen, als es im laufenden User Guide sinnvoll
ist.

## Kapitel

1. [Review Center](review-center.md) *(AP1/AP2, Version 2.4.0)*
2. [Maßnahmenmanagement 2.0](massnahmenmanagement.md) *(AP3, Version 2.4.0)*
3. [BCM Timeline](timeline.md) *(AP4, Version 2.4.0)*
4. [Governance Dashboard](governance-dashboard.md) *(AP5, Version 2.4.0)*

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
| Wiedervorlage | Datum für eine erneute Prüfung einer offenen Maßnahme (`wiedervorlageAm`) | [2](massnahmenmanagement.md) |
| Blockiert ohne Begründung | Plausibilitätshinweis: Maßnahme mit Status `blockiert`, aber ohne `blockiertGrund` | [2](massnahmenmanagement.md) |
| Plausibilitätshinweis | Hinweis auf eine Dokumentationslücke (z. B. fehlende Begründung/Nachweis) — keine fachliche Bewertung der Maßnahme selbst | [2](massnahmenmanagement.md) |
| BCM Timeline | Chronologische, abgeleitete Ansicht fachlicher BCM-Ereignisse | [3](timeline.md) |
| Governance Dashboard | Zusammengeführte, priorisierte Arbeitsliste "Was ist als Nächstes zu tun?" | [4](governance-dashboard.md) |
| Priorisierungsstufe | Eine der 11 festen, deterministischen Rangstufen der Governance-Priorisierung | [4](governance-dashboard.md) |
| Deep Link | Direkter Klick-Link von einer Governance-Aufgabe in die zuständige bestehende Ansicht | [4](governance-dashboard.md) |

## Versionsgeschichte dieses Handbuchs

- **AP1/AP2** (während der Entwicklung, damals 2.4.0-dev): Kapitel "Review
  Center" angelegt.
- **AP3** (während der Entwicklung, damals 2.4.0-dev): Kapitel
  "Maßnahmenmanagement 2.0" ergänzt.
- **AP4** (während der Entwicklung, damals 2.4.0-dev): Kapitel "BCM
  Timeline" ergänzt.
- **AP5** (während der Entwicklung, damals 2.4.0-dev): Kapitel "Governance
  Dashboard" ergänzt; Glossar und diese Versionsgeschichte neu eingeführt.
- **AP6/Release Candidate** (Version 2.4.0): Sprache auf den finalen
  Releasezustand aktualisiert, Glossar um Wiedervorlage/"Blockiert ohne
  Begründung"/Plausibilitätshinweis ergänzt, PDF-Handbuch erzeugt.
