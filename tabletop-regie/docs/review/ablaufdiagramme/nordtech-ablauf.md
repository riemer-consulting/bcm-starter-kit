# NordTech: Ablauf und Entscheidungen

Stand: 2026-11-18 · Codestand `0c8013e`

Lagen in Drehbuch-Reihenfolge, gruppiert nach Station. Doppelt umrandet = Priorität 1 (in jeder Dauer enthalten). Rauten = Entscheidungen mit ihren Folgen.

```mermaid
flowchart TD
  subgraph vorboten["Vorboten"]
    LK18[["LK18 Anmeldung hakt"]]
    LK19["LK19 Maschine 4 verhält sich seltsam"]
    LK20["LK20 Keine Aufträge mehr"]
  end
  subgraph ausbruch["Ausbruch"]
    LK01[["LK01 Cyberangriff"]]
    LK16["LK16 OT-Trennung"]
    LK02[["LK02 Produktion stoppt"]]
    LK22[["LK22 Kommunikation ohne IT"]]
  end
  subgraph eskalation["Eskalation"]
    LK03["LK03 LinkedIn-Beitrag"]
    LK04["LK04 Nordkanal-Anfrage"]
    LK23["LK23 Wer darf ins Werk?"]
    LK05["LK05 Schlüsselperson fällt aus"]
    LK06["LK06 Kunde eskaliert"]
    LK07[["LK07 Datenschutz"]]
    LK08["LK08 Positive Entwicklung"]
    LK09[["LK09 Backups gefunden"]]
    LK24["LK24 Wer bekommt das erste System?"]
  end
  subgraph hoehepunkt["Höhepunkt"]
    LK17[["LK17 Beirat fordert Lagebericht"]]
    LK10["LK10 Nordkanal-Sonderbericht"]
    LK11["LK11 Pharmakunde eskaliert"]
  end
  subgraph folgen["Folgen"]
    LK12[["LK12 Teilweiser Wiederanlauf"]]
    LK13["LK13 Cyberversicherung"]
    LK21["LK21 Chargenfreigabe"]
  end
  subgraph wiederanlauf["Wiederanlauf"]
    LK14["LK14 ERP-Testbetrieb"]
    LK25["LK25 Zwei Listen, zwei Wahrheiten"]
    LK15[["LK15 Wiederanlauf"]]
    LK26["LK26 Die Menschen sind am Limit"]
  end
  LK18 --> LK19
  LK19 --> LK20
  LK20 --> LK01
  LK01 --> LK16
  LK16 --> LK02
  LK02 --> LK22
  LK22 --> LK03
  LK03 --> LK04
  LK04 --> LK23
  LK23 --> LK05
  LK05 --> LK06
  LK06 --> LK07
  LK07 --> LK08
  LK08 --> LK09
  LK09 --> LK24
  LK24 --> LK17
  LK17 --> LK10
  LK10 --> LK11
  LK11 --> LK12
  LK12 --> LK13
  LK13 --> LK21
  LK21 --> LK14
  LK14 --> LK25
  LK25 --> LK15
  LK15 --> LK26
  LK16 -.-> W1{"W1"}
  W1 -- "am-netz" --> W1o0("Anlagen bleiben am Netz, Aufträge werden fertiggestellt · Posten")
  W1o0 -.-> LK12
  W1o0 -.-> LK15
  W1 -- "trennen" --> W1o1("Übrige Anlagen kontrolliert in einen sicheren Zustand fahren…")
  W1o1 -.-> LK12
  LK22 -.-> W2{"W2"}
  W2 -- "proaktiv" --> W2o0("Kunden heute proaktiv informieren (gesicherte Fakten, nächst…")
  W2o0 -.-> LK15
  W2 -- "abwarten" --> W2o1("Erst informieren, wenn die Lage klar ist · Folgekarte SK43 · Posten")
  W2o1 -.-> LK15
  W2o1 -.-> LK07
  LK07 -.-> W3{"W3"}
  W3 -- "melden" --> W3o0("Vorsorglich melden, Informationen nachreichen")
  W3o0 -.-> LK17
  W3 -- "abwarten" --> W3o1("Abwarten, bis der Abfluss bestätigt ist · Folgekarte SK44 · Posten")
  W3o1 -.-> LK17
  W3o1 -.-> LK12
  LK07 -.-> W4{"W4"}
  W4 -- "nicht-gezahlt" --> W4o0("Kein Lösegeld gezahlt")
  W4 -- "gezahlt" --> W4o1("Lösegeld gezahlt · Folgekarte SK27 · Posten")
  W4o1 -.-> LK12
  W4o1 -.-> LK15
  W4o1 -.-> LK17
```
