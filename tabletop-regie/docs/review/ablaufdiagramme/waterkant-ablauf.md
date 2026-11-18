# Waterkant: Ablauf und Entscheidungen

Stand: 2026-11-18 · Codestand `07b0fb2`

Lagen in Drehbuch-Reihenfolge, gruppiert nach Station. Fett umrandet = Priorität 1 (in jeder Dauer enthalten). Rauten = Entscheidungen mit ihren Folgen.

```mermaid
flowchart TD
  subgraph vorboten["Vorboten"]
    LK01["LK01 USV meldet Batteriewarnung"]
    LK02["LK02 Geruch im Technikflur"]
    LK03[["LK03 Serverraum wird warm"]]
  end
  subgraph ausbruch["Ausbruch"]
    LK04[["LK04 Brandalarm im Rechenzentrum"]]
    LK05["LK05 Feuerwehr im Einsatz"]
    LK06[["LK06 Lagebild nach dem Löschen"]]
    LK07["LK07 Was noch läuft – und was nicht"]
  end
  subgraph eskalation["Eskalation"]
    LK08["LK08 Saisonstart ohne Aktionspreise"]
    LK09[["LK09 Die Partnermärkte rufen an"]]
    LK10["LK10 Serverraum gesperrt"]
    LK11["LK11 Nordkanal fragt nach"]
    LK12["LK12 Das Zentrallager steht"]
    LK13["LK13 Ersatz: Hardware oder Ausweich-Rack?"]
  end
  subgraph hoehepunkt["Höhepunkt"]
    LK14[["LK14 Den Backup-Server bergen?"]]
    LK15[["LK15 Wie weit geht der Ausweichbetrieb?"]]
    LK16["LK16 Ein Bauunternehmen will Vorrang"]
    LK17["LK17 Prospektpreise vor der Kasse"]
    LK18["LK18 Der Verbundbeirat verlangt Antworten"]
  end
  subgraph folgen["Folgen"]
    LK19["LK19 Rücksicherung im Ausweich-Rack"]
    LK20[["LK20 Wer kassiert zuerst?"]]
    LK21["LK21 Nordkanal berichtet"]
  end
  subgraph wiederanlauf["Wiederanlauf"]
    LK22[["LK22 Die Kassen laufen wieder"]]
    LK23["LK23 Die Datenlücke"]
    LK24["LK24 Der Versicherer ist da"]
    LK25["LK25 Der große Saisonsamstag"]
    LK26["LK26 Die Brandursache"]
    LK27[["LK27 Stabiler Notbetrieb"]]
    LK28["LK28 Zurück ins eigene Rechenzentrum?"]
  end
  LK01 --> LK02
  LK02 --> LK03
  LK03 --> LK04
  LK04 --> LK05
  LK05 --> LK06
  LK06 --> LK07
  LK07 --> LK08
  LK08 --> LK09
  LK09 --> LK10
  LK10 --> LK11
  LK11 --> LK12
  LK12 --> LK13
  LK13 --> LK14
  LK14 --> LK15
  LK15 --> LK16
  LK16 --> LK17
  LK17 --> LK18
  LK18 --> LK19
  LK19 --> LK20
  LK20 --> LK21
  LK21 --> LK22
  LK22 --> LK23
  LK23 --> LK24
  LK24 --> LK25
  LK25 --> LK26
  LK26 --> LK27
  LK27 --> LK28
  LK03 -.-> W1{"W1"}
  W1 -- "herunterfahren" --> W1o0("Nicht zwingend benötigte Systeme sofort kontrolliert herunte… · Posten")
  W1o0 -.-> LK19
  W1o0 -.-> LK22
  W1 -- "weiterlaufen" --> W1o1("Weiterlaufen lassen, bis die Gebäudetechnik die Ursache gekl… · Folgekarte SK41 · Posten")
  W1o1 -.-> LK08
  W1o1 -.-> LK15
  LK09 -.-> W2{"W2"}
  W2 -- "frueh" --> W2o0("Heute 11 Uhr alle Partner informieren: Lage, ehrliche Spanne…")
  W2o0 -.-> LK22
  W2 -- "spaeter" --> W2o1("Erst informieren, wenn ein belastbarer Termin feststeht (vor… · Folgekarte SK42 · Posten")
  W2o1 -.-> LK18
  W2o1 -.-> LK14
  LK14 -.-> W3{"W3"}
  W3 -- "bergen" --> W3o0("Heute durch die Fachfirma unter Schutzausrüstung bergen lass… · Folgekarte SK43 · Posten")
  W3o0 -.-> LK23
  W3o0 -.-> LK27
  W3o0 -.-> LK22
  W3 -- "abwarten" --> W3o1("Freigabe des Raums abwarten (nach Reinigung, ca. eine Woche) · Posten")
  W3o1 -.-> LK23
  W3o1 -.-> LK27
  LK15 -.-> W4{"W4"}
  W4 -- "minimal" --> W4o0("Nur Kassen- und Preisdienste und den Kern der Warenwirtschaf… · Posten")
  W4o0 -.-> LK25
  W4o0 -.-> LK27
  W4 -- "ausbauen" --> W4o1("Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Ge… · Folgekarte SK45 · Posten")
  W4o1 -.-> LK25
  W4o1 -.-> LK27
  LK20 -.-> W5{"W5"}
  W5 -- "gleichrangig" --> W5o0("Eigene Filialen und Partnermärkte nach einem gemeinsamen Kri… · Posten")
  W5o0 -.-> LK22
  W5 -- "eigene" --> W5o1("Eigene 14 Filialen zuerst, Partnermärkte etwa zwölf Stunden … · Folgekarte SK44 · Posten")
  W5o1 -.-> LK22
```
