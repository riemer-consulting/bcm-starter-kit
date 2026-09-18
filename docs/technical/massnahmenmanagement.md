# Maßnahmenmanagement 2.0 — technische Referenz

*Arbeitspaket AP3, Version 2.4.0.*

> **Diese Seite ist technische Dokumentation** (Datenmodell, Funktionsnamen,
> Migrationen) — für die anwenderorientierte Erklärung siehe
> [Maßnahmenmanagement im Benutzerhandbuch](../handbook/15-massnahmenmanagement.md).

## Zweck

Erweitert das bestehende Maßnahmenmodell um Herkunft, Zeitachse und eine
präzisere Wirksamkeitsprüfung — ohne eine zweite, parallele
Maßnahmenstruktur einzuführen. Alle neuen Felder liegen additiv auf dem
bestehenden `massnahmen[]`.

## Neue Felder

| Feld | Bedeutung |
|---|---|
| `sourceType` | `manuell` \| `review` \| `parkplatz` \| `qualitaet` \| `resilienz` \| `unbekannt` (nur Altdaten) |
| `sourceId` | Opaque Referenz auf den Auslöser (Review-ID, Parkplatz-ID, Regelcode …) |
| `sourceLabel` | Menschenlesbare Kurzbeschreibung der Herkunft |
| `reviewId` | Nur gesetzt, wenn `sourceType==='review'` — zusätzlich zu `sourceId`, für direkte Verknüpfungsprüfung ohne Umweg über `sourceType` |
| `erstelltAm` | Anlagezeitpunkt (bei Altdaten leer, nie erfunden) |
| `abgeschlossenAm` | Wird beim ersten Wechsel auf `erledigt` automatisch gesetzt, danach nie überschrieben |
| `wirksamkeitPruefer` | Wer die Wirksamkeit geprüft hat (ergänzt das bestehende `wirksamkeitGeprueftAm`/`wirksamkeitErgebnis`) |
| `wiedervorlageAm` | Datum für eine erneute Prüfung/Wiedervorlage |
| `blockiertGrund` | Pflichtfeld-artig (Plausibilitätsprüfung), sobald Status `blockiert` ist |

## Statusmodell

`offen`, `geplant`, `in_arbeit` (Anzeige: "In Umsetzung"), `blockiert`,
`erledigt`, `verworfen`. Der frühere Wert `zurueckgestellt` bleibt für
Bestandsdaten gültig und lesbar (`ENUM_MASSNAHMEN_STATUS`), wird im
Status-Dropdown für neue/bearbeitete Maßnahmen aber nicht mehr angeboten
(`MASSNAHMEN_STATUS_UI_OPTIONS`) — keine Breaking Change, aber ein klareres
Zielmodell für neue Eingaben.

**"Erledigt" bedeutet ausdrücklich nicht "wirksam".** Diese Trennung
existierte bereits vor 2.4.0 und wird durch AP3 nicht verändert, nur um den
Prüfer (`wirksamkeitPruefer`) ergänzt.

`massnahmeIsOpen(m)` ersetzt mehrere zuvor verstreute
`status==='offen'||status==='in_arbeit'`-Prüfungen (Dashboard, GF-Ansicht,
Qualitätsprüfung) durch eine einzige Definition: offen ist alles außer
`erledigt` und `verworfen`.

## Herkunft — vier Entstehungspunkte

1. **Parkplatz → Maßnahme** (bestehende Funktion aus 2.3.0, jetzt mit
   Herkunftskennzeichnung: `sourceType:'parkplatz'`, `sourceId` = Parkplatz-
   Eintrags-ID).
2. **Review → Maßnahme** (AP1, jetzt vollständig bidirektional): die
   Maßnahme erhält `reviewId`, das Review sein `massnahmenIds[]`-Eintrag.
3. **Qualitäts-/Konsistenzbefund → Maßnahme** (neu in AP3): ein
   "+ Maßnahme"-Knopf direkt in der Qualitätsprüfung. `sourceId` ist die
   Kombination aus Regelcode und Prozess-ID, da Befunde selbst keine
   eigene ID besitzen.
4. **Roter/gelber Resilienz-Check → Maßnahme** (bestehende automatische
   Erzeugung, jetzt mit `sourceType:'resilienz'`, `sourceId` = Resilienz-
   Check-ID).

Ein Herkunfts-Filter und eine Herkunfts-Spalte im Maßnahmenkatalog machen
die Verteilung sichtbar (`ENUM_MASSNAHME_SOURCE_TYPE`,
`MASSNAHME_SOURCE_LABELS`).

## Plausibilitätshinweise (Dokumentationsqualität, keine fachliche Bewertung)

- Kein Verantwortlicher / kein Termin (bestehend)
- Termin überschritten (bestehend, `massnahmeIsOverdue()` — schließt seit
  AP3 `verworfen`-Maßnahmen aus, da eine verworfene Maßnahme nicht mehr
  "überfällig" sein kann)
- **Blockiert ohne Begründung** (neu, `massnahmeIsBlockedWithoutReason()`)
- **Erledigt ohne Wirksamkeitsnachweis** (bestehend als
  `massnahmeNeedsEffectivenessProof()`, jetzt zusätzlich in
  `validateMassnahme()`)
- **Review abgeschlossen, aber daraus entstandene Maßnahmen noch offen**
  (neu, `reviewsWithOpenFollowupMassnahmen()`, sichtbar im Review Center)

Keine dieser Prüfungen bewertet, ob die Blockade oder die Wirksamkeit
fachlich zutreffend ist — nur, ob die Dokumentation dazu vollständig ist.

## Migration

Additive Schema-Migration 14 → 15 (`migrateV14ToV15`): ergänzt die oben
genannten Felder bei jeder bestehenden Maßnahme. Herkunft wird dabei
niemals rückwirkend erfunden — Altdatensätze erhalten `sourceType:
'unbekannt'` statt z. B. `'manuell'`, und `erstelltAm` bleibt leer statt
auf den Migrationszeitpunkt gesetzt zu werden.
