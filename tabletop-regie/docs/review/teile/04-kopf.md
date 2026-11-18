# 04 – NordTech: vollständiges Szenario

{{STAND}}

## Status: eingefroren

NordTech wurde in dieser Runde **nicht dramaturgisch verändert**. Grundlage ist der Stand nach Red-Team-Test (Befunde R01–R12 umgesetzt), präzisierter Freigabeaussage und sechs zusätzlichen Tönen (Commit `79c9b89`). Belege dafür, dass sich nichts geändert hat:

- `data/scenario.nordtech.json` ist seit Commit `79c9b89` unverändert (Git-Historie).
- Die mit `tools/geschichten.js` neu erzeugten sieben Verläufe sind inhaltlich identisch mit der eingecheckten Fassung `docs/nordtech-durchlaeufe.md` (Vergleich per `diff`: einzige Abweichung eine Leerzeile am Dateiende).
- Die Variantenprüfung meldet für NordTech keine Befunde (Anhang).

Einzige Korrektur in dieser Runde mit Bezug auf NordTech: Die Variantenprüfung hatte SK27 zunächst fälschlich als „nicht als Folgekarte markiert“ gemeldet. SK27 ist bewusst eine reguläre, zeitgebundene Karte, die bei W4 „gezahlt“ vorgezogen wird und einen anderen Text bekommt. Korrigiert wurde die **Prüfregel**, nicht das Drehbuch.

## Was dieses Dokument enthält

Teil B Faktenblatt und Zeitleiste · Teil C alle 26 Lagekarten mit Fragen, Krisen-Info, Bild, Sprechertext, Gesprächsleitfaden, Zuständigkeit und Bewertungshinweisen · alle vertraulichen Karten mit Empfänger, Ersatzrollen, Zeitpunkt, Abhängigkeiten und Bewertungshinweisen · W1–W4 mit allen Optionen und Folgen · Schwerpunkte mit Leitfragen und Pflichtkarten · B1–B8 mit Regie und Beobachtungsbogen · Abschluss mit Rechnung und Rechenweg · Debriefing · Teil D Ablauf je Dauer · Anhang: alle 25 Kombinationen aus Dauer und Schwerpunkt und alle 16 Entscheidungskombinationen.

Medien und Sprechertexte: `08-medien-und-audio.md`. Sieben durchgespielte Verläufe: `09-alle-spielverlaeufe.md`. Rechnung, Annahmen und Versicherung: `10-schaeden-sla-und-versicherungen.md`.

## Prüffragen für das finale Review

1. Stimmen alle Karten mit dem Faktenblatt überein (Zeiten, Beträge, Fristen, Zahl der Systeme)?
2. Ist jede Entscheidung W1–W4 ein echtes Dilemma, und hat jede Folge eine im Verlauf sichtbare Ursache?
3. Wird der Wiederanlauf nur mit den genannten Freigaben beschrieben (Backup → Integrität → Wiederherstellung → Sicherheitsfreigabe → fachliche Datenprüfung → Produktionsfreigabe → Lieferung)?
4. Enthalten Karten nur Hinweise „fachlich prüfen lassen“, aber keine rechtliche Bewertung?
5. Sind Bruttoschaden, Liquidität und mögliche Erstattung getrennt dargestellt?
6. Wird die Stellvertretung (B7) beobachtbar geprüft?
