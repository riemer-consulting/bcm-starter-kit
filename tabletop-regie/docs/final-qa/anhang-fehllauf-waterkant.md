# Fehlgeschlagener Lauftest Waterkant (19.11.2026, vor dem Wiederholungslauf)

**Ergebnis:** 10 von 15 Prüfungen bestanden, danach Abbruch des Testablaufs.

**Ursache (festgestellt):** Während der Lauftest lief, wurden im Arbeitsverzeichnis `data/run-state.json` und `data/settings.json` gelöscht (Aufräumschritt vor einem Commit, parallel zum Test). Damit fehlte dem laufenden Server die SMTP-Konfiguration des Tests: Es wurden 0 Mails zugestellt (M2, M4, M5, N9), und nach dem Neustart in N2 fehlte der gespeicherte Laufzustand, sodass der Test abbrach (Antwort HTML statt JSON). Es handelt sich um einen Fehler in der Testdurchführung, nicht im Werkzeug.

**Maßnahme:** Wiederholungslauf ohne Eingriff (20 von 20 bestanden). Regel für weitere Läufe: Während Tests laufen, werden keine Dateien unter `data/` verändert.

## Rohausgabe des fehlgeschlagenen Laufs

```
scenario.waterkant.json: 10 von 15 bestanden
BESTANDEN N10 Fehlende Mediendatei – Prüfung: „FEHLER  Karte LK01 (Bild): Datei /media/gibt-es-nicht.png fehlt.“; HTTP 404
FEHLER    N9 Doppelauslösung: SK01 dreimal gleichzeitig – 0 Mail(s)
FEHLER    M2 Jede ausgelöste vertrauliche Karte genau einmal bei den richtigen Personen – 19 Karten, 0 Mails, Abweichungen: SK03: soll person2@example.com, ist –; SK04: soll person4@example.com, ist –; SK06: soll person4@example.com, ist –; SK11: soll person3@example.com, ist –; SK08: soll person2@example.com, ist –; SK35: soll person2@example.com, ist –; SK41: soll person7@example.com, ist –; SK42: soll person-team@example.com+person1@example.com, ist –; SK21: soll person4@example.com, ist –; SK13: soll person4@example.com, ist –; SK14: soll person7@example.com, ist –; SK18: soll person5@example.com, ist –; SK19: soll person2@example.com, ist –; SK24: soll person6@example.com, ist –; SK46: soll person-team@example.com+person1@example.com, ist –; SK20: soll person-team@example.com+person1@example.com, ist –; SK01: soll person7@example.com, ist –; SK38: soll person8@example.com, ist –; SK27: soll person5@example.com, ist –
FEHLER    M4 Private Überraschung per Mail, öffentliche nur auf der Bühne – B1: ; B5: Mails 0, Bühne zeigt Ereignis
FEHLER    M5 Ersatzrolle (Rolle facility-management bewusst nicht besetzt) – 6 Karte(n) an Ersatzrolle (SK04→leiter-arbeitssicherheit, SK08→leiter-it, SK35→leiter-it, SK13→leiter-arbeitssicherheit, SK18→leiter-finanzen-cfo, SK24→leiterin-kommunikation-pr), davon mit Hinweis: 0
FEHLER    X Testablauf – Abbruch: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

```
