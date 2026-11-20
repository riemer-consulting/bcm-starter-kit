# 06 – Browser- und Mediennachweise

**Geprüfter Commit:** `52f7c8fbe8465eb928d28b17873374bd051d41f5` · **Lauf:** 2026-11-20T08:27:50.312Z bis 2026-11-20T09:10:16.032Z · erzeugt mit `tools/qa/berichte.js` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).

Bühnentest im Browser (Generalprobe aller Lagen, Stummschalten, Wiederholen, Zeitsprung im Ton, Neuladen, Unterbrechung, Abschluss) und technische Medienmessung. Ob ein Ton im Raum verständlich, passend und angemessen laut ist, kann keine Messung feststellen: jeder Ton trägt „akustisch nicht abgenommen“, bis ein Mensch ihn gehört und in `docs/final-qa/hoerprotokoll.json` eingetragen hat.

## Bühne – NordTech

Prüfschritt `buehne-nordtech`: Exit-Code 0, 199 s, Konsole `konsole/buehne-nordtech.txt`

| ID | Prüfung | Ergebnis | beobachtet |
|---|---|---|---|
| B | Unterbrechung B7 (Geschäftsführung (CEO), Krisenstabsleitung, 5 Min.) | bestanden | Bühne enthält Zeitangabe: ja; Moderation erwähnt B7: ja |
| G | Generalprobe: 26 Lagen und 3 öffentliche Überraschungen | bestanden | 29 Bühnenzustände; Abweichungen: keine |
| N3 | Stummschalten mitten im Ton (LK10) | bestanden | vorher: läuft lk10-nordkanal-nachrichten.mp3; nach Stumm: Kartenton aus, Hintergrund aus; nach Aufheben: Kartenton aus, Hintergrund aus |
| N3 | Ton erneut abspielen nach Stummschaltung | bestanden | Kartenton läuft (lk10-nordkanal-nachrichten.mp3, 2.1 s) |
| N4 | Zeitsprung mitten im Ton (LK10 → LK11) | bestanden | danach: Kartenton aus; Hintergrund aus |
| N2 | Bühne neu laden mitten im Lauf | bestanden | Ton-Freigabe angezeigt: ja; aktuelle Lage „Pharmakunde eskaliert“ sichtbar: ja; nach Klick Hintergrund aus |
| F | Abschluss auf der Bühne bis zum Fazit | bestanden | 6 Bildschirmfotos, letzte Phase: fazit |
| M | Keine Browserfehler in Bühne und Moderation | bestanden | keine |

### Generalprobe: jede Lage und jede öffentliche Überraschung auf der Bühne

| Karte | Titel | Bild geladen | Soll-Ton | gespielter Ton | Übungshinweis auf der Bühne | Bildschirmfoto |
|---|---|---|---|---|---|---|
| LK18 | Anmeldung hakt | ja | – | – | – | `buehne/nordtech/02-LK18.png` |
| LK19 | Maschine 4 verhält sich seltsam | ja | lk19-fraeslinie-stoerung.mp3 | lk19-fraeslinie-stoerung.mp3 | – | `buehne/nordtech/03-LK19.png` |
| LK20 | Keine Aufträge mehr | ja | – | – | – | `buehne/nordtech/04-LK20.png` |
| LK01 | Cyberangriff | ja | lk01-stille-gemurmel.mp3 | lk01-stille-gemurmel.mp3 | – | `buehne/nordtech/05-LK01.png` |
| LK16 | OT-Trennung | ja | – | – | – | `buehne/nordtech/06-LK16.png` |
| LK02 | Produktion stoppt | ja | lk02-produktion-faehrt-herunter.mp3 | lk02-produktion-faehrt-herunter.mp3 | – | `buehne/nordtech/07-LK02.png` |
| LK22 | Kommunikation ohne IT | ja | lk22-funk-abgebrochen.mp3 | lk22-funk-abgebrochen.mp3 | – | `buehne/nordtech/08-LK22.png` |
| B6 | Zwei widersprüchliche Anweisungen | ja | b6-zwei-durchsagen.mp3 | b6-zwei-durchsagen.mp3 | – | `buehne/nordtech/09-B6.png` |
| LK03 | LinkedIn-Beitrag | ja | – | – | – | `buehne/nordtech/10-LK03.png` |
| LK04 | Nordkanal-Anfrage | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – | `buehne/nordtech/11-LK04.png` |
| LK23 | Wer darf ins Werk? | ja | funk-ruf.mp3 | funk-ruf.mp3 (bereits zu Ende) | – | `buehne/nordtech/12-LK23.png` |
| LK05 | Schlüsselperson fällt aus | ja | lk05-it-bereitschaft.mp3 | lk05-it-bereitschaft.mp3 | – | `buehne/nordtech/13-LK05.png` |
| LK06 | Kunde eskaliert | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – | `buehne/nordtech/14-LK06.png` |
| LK07 | Datenschutz | ja | – | – | – | `buehne/nordtech/15-LK07.png` |
| LK08 | Positive Entwicklung | ja | – | – | – | `buehne/nordtech/16-LK08.png` |
| LK09 | Backups gefunden | ja | – | – | – | `buehne/nordtech/17-LK09.png` |
| LK24 | Wer bekommt das erste System? | ja | – | – | – | `buehne/nordtech/18-LK24.png` |
| LK17 | Beirat fordert Lagebericht | ja | – | – | – | `buehne/nordtech/19-LK17.png` |
| B7 | Die Krisenstabsleitung ist nicht erreichbar | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – | `buehne/nordtech/20-B7.png` |
| LK10 | Nordkanal-Sonderbericht | ja | lk10-nordkanal-nachrichten.mp3 | lk10-nordkanal-nachrichten.mp3 | – | `buehne/nordtech/21-LK10.png` |
| LK11 | Pharmakunde eskaliert | ja | – | – | – | `buehne/nordtech/22-LK11.png` |
| LK12 | Teilweiser Wiederanlauf | ja | lk12-anlage-faehrt-hoch.mp3 | lk12-anlage-faehrt-hoch.mp3 | – | `buehne/nordtech/23-LK12.png` |
| LK13 | Cyberversicherung | ja | – | – | – | `buehne/nordtech/24-LK13.png` |
| LK21 | Chargenfreigabe | ja | – | – | – | `buehne/nordtech/25-LK21.png` |
| LK14 | ERP-Testbetrieb | ja | – | – | – | `buehne/nordtech/26-LK14.png` |
| B8 | Ein vermeintlicher Erfolg | ja | b8-erp-test-meldung.mp3 | b8-erp-test-meldung.mp3 | – | `buehne/nordtech/27-B8.png` |
| LK25 | Zwei Listen, zwei Wahrheiten | ja | – | – | – | `buehne/nordtech/28-LK25.png` |
| LK15 | Wiederanlauf | ja | – | – | – | `buehne/nordtech/29-LK15.png` |
| LK26 | Die Menschen sind am Limit | ja | lk26-schichtleitung-nachricht.mp3 | lk26-schichtleitung-nachricht.mp3 | – | `buehne/nordtech/30-LK26.png` |

## Bühne – Waterkant

Prüfschritt `buehne-waterkant`: Exit-Code 0, 191 s, Konsole `konsole/buehne-waterkant.txt`

| ID | Prüfung | Ergebnis | beobachtet |
|---|---|---|---|
| B | Unterbrechung B7 (IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), 5 Min.) | bestanden | Bühne enthält Zeitangabe: ja; Moderation erwähnt B7: ja |
| G | Generalprobe: 28 Lagen und 4 öffentliche Überraschungen | bestanden | 32 Bühnenzustände; Abweichungen: keine |
| N3 | Stummschalten mitten im Ton (LK21) | bestanden | vorher: läuft lk21-nordkanal-nachrichten.mp3; nach Stumm: Kartenton aus, Hintergrund aus; nach Aufheben: Kartenton aus, Hintergrund aus |
| N3 | Ton erneut abspielen nach Stummschaltung | bestanden | Kartenton läuft (lk21-nordkanal-nachrichten.mp3, 1.6 s) |
| N4 | Zeitsprung mitten im Ton (LK21 → LK22) | bestanden | danach: läuft lk22-kasse-startet.mp3; Hintergrund aus |
| N2 | Bühne neu laden mitten im Lauf | bestanden | Ton-Freigabe angezeigt: ja; aktuelle Lage „Die Kassen laufen wieder“ sichtbar: ja; nach Klick Hintergrund aus |
| F | Abschluss auf der Bühne bis zum Fazit | bestanden | 6 Bildschirmfotos, letzte Phase: fazit |
| M | Keine Browserfehler in Bühne und Moderation | bestanden | keine |

### Generalprobe: jede Lage und jede öffentliche Überraschung auf der Bühne

| Karte | Titel | Bild geladen | Soll-Ton | gespielter Ton | Übungshinweis auf der Bühne | Bildschirmfoto |
|---|---|---|---|---|---|---|
| LK01 | USV meldet Batteriewarnung | ja | – | – | – | `buehne/waterkant/02-LK01.png` |
| LK02 | Geruch im Technikflur | ja | – | – | – | `buehne/waterkant/03-LK02.png` |
| LK03 | Serverraum wird warm | ja | lk03-klimaalarm.mp3 | lk03-klimaalarm.mp3 | – | `buehne/waterkant/04-LK03.png` |
| LK04 | Brandalarm im Rechenzentrum | ja | lk04-loeschanlage-durchsage.mp3 | lk04-loeschanlage-durchsage.mp3 | true | `buehne/waterkant/05-LK04.png` |
| LK05 | Feuerwehr im Einsatz | ja | funk-ruf.mp3 | funk-ruf.mp3 (bereits zu Ende) | – | `buehne/waterkant/06-LK05.png` |
| LK06 | Lagebild nach dem Löschen | ja | – | – | – | `buehne/waterkant/07-LK06.png` |
| LK07 | Was noch läuft – und was nicht | ja | – | – | – | `buehne/waterkant/08-LK07.png` |
| LK08 | Saisonstart ohne Aktionspreise | ja | – | – | – | `buehne/waterkant/09-LK08.png` |
| LK09 | Die Partnermärkte rufen an | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – | `buehne/waterkant/10-LK09.png` |
| B6 | Wo hat es gebrannt? | ja | – | telefon-klingeln.mp3 | – | `buehne/waterkant/11-B6.png` |
| LK10 | Serverraum gesperrt | ja | – | – | – | `buehne/waterkant/12-LK10.png` |
| LK11 | Nordkanal fragt nach | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – | `buehne/waterkant/13-LK11.png` |
| LK12 | Das Zentrallager steht | ja | – | – | – | `buehne/waterkant/14-LK12.png` |
| LK13 | Ersatz: Hardware oder Ausweich-Rack? | ja | – | – | – | `buehne/waterkant/15-LK13.png` |
| LK14 | Den Backup-Server bergen? | ja | – | – | – | `buehne/waterkant/16-LK14.png` |
| B5 | Zweiter Alarm | ja | b5-zweiter-alarm.mp3 | b5-zweiter-alarm.mp3 | true | `buehne/waterkant/17-B5.png` |
| LK15 | Wie weit geht der Ausweichbetrieb? | ja | – | – | – | `buehne/waterkant/18-LK15.png` |
| B7 | Die IT-Leitung muss raus | ja | – | – | – | `buehne/waterkant/19-B7.png` |
| B8 | Ein Angebot mit Haken | ja | – | – | – | `buehne/waterkant/20-B8.png` |
| LK16 | Ein Bauunternehmen will Vorrang | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – | `buehne/waterkant/21-LK16.png` |
| LK17 | Prospektpreise vor der Kasse | ja | – | – | – | `buehne/waterkant/22-LK17.png` |
| LK18 | Der Verbundbeirat verlangt Antworten | ja | – | – | – | `buehne/waterkant/23-LK18.png` |
| LK19 | Rücksicherung im Ausweich-Rack | ja | – | – | – | `buehne/waterkant/24-LK19.png` |
| LK20 | Wer wird zuerst umgestellt? | ja | – | – | – | `buehne/waterkant/25-LK20.png` |
| LK21 | Nordkanal berichtet ausführlich | ja | lk21-nordkanal-nachrichten.mp3 | lk21-nordkanal-nachrichten.mp3 | – | `buehne/waterkant/26-LK21.png` |
| LK22 | Die Kassen laufen wieder | ja | lk22-kasse-startet.mp3 | lk22-kasse-startet.mp3 | – | `buehne/waterkant/27-LK22.png` |
| LK23 | Die Datenlücke | ja | – | – | – | `buehne/waterkant/28-LK23.png` |
| LK24 | Der Versicherer ist da | ja | – | – | – | `buehne/waterkant/29-LK24.png` |
| LK25 | Der große Saisonsamstag | ja | – | – | – | `buehne/waterkant/30-LK25.png` |
| LK26 | Die Brandursache | ja | – | – | – | `buehne/waterkant/31-LK26.png` |
| LK27 | Stabiler Notbetrieb | ja | – | – | – | `buehne/waterkant/32-LK27.png` |
| LK28 | Zurück ins eigene Rechenzentrum? | ja | – | – | – | `buehne/waterkant/33-LK28.png` |

## Medienmessung

Grenzwerte (vor der Messung festgelegt): Lautheit -30 … -14 LUFS, True Peak ≤ -0.5 dBTP, Ereignistöne ≤ 120 s und ≤ Diskussionszeit der Lage. „wirksam“ = Lautheit der Datei zuzüglich der Abspiellautstärke aus dem Drehbuch (nur Information).

### scenario.nordtech.json

47/47 Verweise technisch in Ordnung; Töne akustisch abgenommen: 0/15.

| Karte | Art | Datei | Messwerte | Prüfungen | akustisch |
|---|---|---|---|---|---|
| LK01 | Bild | `lk01-loesegeld-kamera-foto.webp` | 1673×940 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK01 | Ton | `lk01-stille-gemurmel.mp3` | 7.2 s, -20.3 LUFS (wirksam -22.2), TP -1.7 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK16 | Bild | `lk16-incident-overview-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK02 | Bild | `lk02-produktion-gestoppt-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK02 | Ton | `lk02-produktion-faehrt-herunter.mp3` | 14 s, -20.7 LUFS (wirksam -22.6), TP -5.4 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK03 | Bild | `lk03-linkedin-post-foto.webp` | 1149×1369 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK04 | Bild | `lk04-nordkanal-anfrage.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK04 | Ton | `telefon-klingeln.mp3` | 4.9 s, -15.5 LUFS (wirksam -19.9), TP -6.8 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK05 | Bild | `lk05-leerer-arbeitsplatz-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK05 | Ton | `lk05-it-bereitschaft.mp3` | 16.3 s, -20.4 LUFS (wirksam -22.3), TP -7.2 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK06 | Bild | `lk06-kunde-eskaliert-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK06 | Ton | `telefon-klingeln.mp3` | 4.9 s, -15.5 LUFS (wirksam -19.9), TP -6.8 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK07 | Bild | `lk07-datenschutz.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK08 | Bild | `lk08-positive-entwicklung.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK09 | Bild | `lk09-offline-backup-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK10 | Bild | `lk10-nordkanal-studio-foto.webp` | 1672×941 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK10 | Ton | `lk10-nordkanal-nachrichten.mp3` | 56.5 s, -16.9 LUFS (wirksam -18.8), TP -1.9 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK11 | Bild | `lk11-pharmakunde-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK12 | Bild | `lk12-werk-sued-online-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK12 | Ton | `lk12-anlage-faehrt-hoch.mp3` | 11 s, -17.7 LUFS (wirksam -19.6), TP -5.4 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK13 | Bild | `lk13-cyberversicherung-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK14 | Bild | `lk14-erp-testbetrieb-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK15 | Bild | `lk15-wiederanlauf.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK17 | Bild | `lk17-zwischenfazit-foto.webp` | 1536×1024 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK18 | Bild | `v1-anmeldung-hakt.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK19 | Bild | `v2-maschine-seltsam.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK19 | Ton | `lk19-fraeslinie-stoerung.mp3` | 11 s, -19.2 LUFS (wirksam -22.3), TP -5.1 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK20 | Bild | `v3-keine-auftraege.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK22 | Bild | `lk22-kommunikation-ohne-it.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK22 | Ton | `lk22-funk-abgebrochen.mp3` | 11.7 s, -18.4 LUFS (wirksam -20.3), TP -1.9 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK21 | Bild | `lk21-chargenfreigabe.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK23 | Bild | `lk23-zutritt.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK23 | Ton | `funk-ruf.mp3` | 0.8 s, -14.5 LUFS (wirksam -18.9), TP -3.9 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK24 | Bild | `lk24-erstes-system.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK25 | Bild | `lk25-zwei-listen.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK26 | Bild | `lk26-menschen-am-limit.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK26 | Ton | `lk26-schichtleitung-nachricht.mp3` | 21.2 s, -18.4 LUFS (wirksam -20.3), TP -3 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| B6 | Bild | `b6-widerspruechliche-anweisungen.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| B6 | Ton | `b6-zwei-durchsagen.mp3` | 27.6 s, -17.2 LUFS (wirksam -19.1), TP -1.9 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s · Hinweis: Durchsage außerhalb des Waterkant-Prüfumfangs: Übungskennzeichnung fachlich bewerten | akustisch nicht abgenommen |
| B7 | Bild | `b7-krisenstabsleitung-abgerufen.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| B7 | Ton | `telefon-klingeln.mp3` | 4.9 s, -15.5 LUFS (wirksam -19.9), TP -6.8 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s | akustisch nicht abgenommen |
| B8 | Bild | `b8-vermeintlicher-erfolg.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| B8 | Ton | `b8-erp-test-meldung.mp3` | 20.6 s, -18 LUFS (wirksam -19.9), TP -1.8 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s | akustisch nicht abgenommen |
| Hintergrund | Ton | `ambience-maschinenraum.mp3` | 24 s, -25.9 LUFS (wirksam -31.9), TP -9.9 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Hintergrund läuft in Schleife | akustisch nicht abgenommen |
| Wartebild | Bild | `idle-hauptsitz-foto.webp` | 1672×941 webp | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| Logo | Bild | `nordtech-logo.png` | 900×265 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar | akustisch nicht abgenommen |
| Logo Bühne | Bild | `nordtech-logo-light.png` | 900×265 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar | akustisch nicht abgenommen |

Mehrfach verwendet: `telefon-klingeln.mp3` (LK04, LK06, B7)

Im Medienordner, aber von keinem Drehbuchfeld verwendet (frühere Fassungen, Varianten): `lk01-loesegeldforderung.png`, `lk02-produktion-stoppt.png`, `lk03-linkedin-post.png`, `lk05-schluesselperson-faellt-aus.png`, `lk06-kunde-eskaliert.png`, `lk09-backups-gefunden.png`, `lk10-nordkanal-bericht.png`, `lk11-pharmakunde-eskaliert.png`, `lk12-teilweiser-wiederanlauf.png`, `lk13-cyberversicherung.png`, `lk14-erp-testbetrieb.png`, `lk16-ot-trennung.png`, `lk17-beirat-sondersitzung.png`

### scenario.waterkant.json

45/45 Verweise technisch in Ordnung; Töne akustisch abgenommen: 0/10.

| Karte | Art | Datei | Messwerte | Prüfungen | akustisch |
|---|---|---|---|---|---|
| LK01 | Bild | `lk01-usv-warnung.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK02 | Bild | `lk02-geruch-technikflur.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK03 | Bild | `lk03-serverraum-warm.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK03 | Ton | `lk03-klimaalarm.mp3` | 6 s, -20.1 LUFS (wirksam -24.5), TP -15.4 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK04 | Bild | `lk04-brandalarm.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK04 | Ton (Alarm) | `lk04-loeschanlage-durchsage.mp3` | 27.4 s, -20.2 LUFS (wirksam -24.6), TP -3.7 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage; ✓ Bühne zeigt „Übungseinspielung – kein echter Alarm“ (Drehbuchfeld); ✓ Abschrift beginnt mit „Übung“; ✓ Beginn hörbar (Kennzeichnung nicht stumm) | akustisch nicht abgenommen |
| LK05 | Bild | `lk05-feuerwehr.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK05 | Ton | `funk-ruf.mp3` | 0.8 s, -14.5 LUFS (wirksam -18.9), TP -3.9 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK06 | Bild | `lk06-lagebild.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK07 | Bild | `lk07-was-laeuft.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK08 | Bild | `lk08-saisonstart.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK09 | Bild | `lk09-partnermaerkte.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK09 | Ton | `telefon-klingeln.mp3` | 4.9 s, -15.5 LUFS (wirksam -19.9), TP -6.8 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK10 | Bild | `lk10-serverraum-gesperrt.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK11 | Bild | `lk11-nordkanal.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK11 | Ton | `telefon-klingeln.mp3` | 4.9 s, -15.5 LUFS (wirksam -19.9), TP -6.8 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK12 | Bild | `lk12-zentrallager.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK13 | Bild | `lk13-ersatz.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK14 | Bild | `lk14-bergen.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK15 | Bild | `lk15-ausweich.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK16 | Bild | `lk16-bauunternehmen.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK16 | Ton | `telefon-klingeln.mp3` | 4.9 s, -15.5 LUFS (wirksam -19.9), TP -6.8 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK17 | Bild | `lk17-prospektpreise.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK18 | Bild | `lk18-verbundbeirat.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK19 | Bild | `lk19-ruecksicherung.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK20 | Bild | `lk20-reihenfolge.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK21 | Bild | `lk21-nordkanal-bericht.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK21 | Ton | `lk21-nordkanal-nachrichten.mp3` | 48.9 s, -16.5 LUFS (wirksam -18.4), TP -2.2 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK22 | Bild | `lk22-kassen-laufen.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK22 | Ton | `lk22-kasse-startet.mp3` | 5 s, -19.9 LUFS (wirksam -23), TP -5.1 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ kürzer als die Diskussionszeit der Lage | akustisch nicht abgenommen |
| LK23 | Bild | `lk23-datenluecke.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK24 | Bild | `lk24-versicherer.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK25 | Bild | `lk25-saisonsamstag.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK26 | Bild | `lk26-brandursache.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK27 | Bild | `lk27-notbetrieb.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| LK28 | Bild | `lk28-rueckkehr.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| B5 | Bild | `b5-zweiter-alarm.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| B5 | Ton (Alarm) | `b5-zweiter-alarm.mp3` | 19.5 s, -21.2 LUFS (wirksam -25.6), TP -3.1 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Ereignis höchstens 120 s; ✓ Bühne zeigt „Übungseinspielung – kein echter Alarm“ (Drehbuchfeld); ✓ Abschrift beginnt mit „Übung“; ✓ Beginn hörbar (Kennzeichnung nicht stumm) | akustisch nicht abgenommen |
| B6 | Bild | `b6-falschmeldung.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| B7 | Bild | `b7-it-leitung-raus.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| B8 | Bild | `b8-angebot.png` | 1000×280 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| Hintergrund | Ton | `ambience-rechenzentrum.mp3` | 23 s, -22.3 LUFS (wirksam -29.2), TP -10.1 dBTP | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Lautheit -30 … -14 LUFS; ✓ True Peak ≤ -0.5 dBTP; ✓ Hintergrund läuft in Schleife | akustisch nicht abgenommen |
| Wartebild | Bild | `idle-ruhe-vor-dem-sturm.png` | 1280×600 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar; ✓ Mindestgröße 800 px Breite | akustisch nicht abgenommen |
| Logo | Bild | `waterkant-logo.png` | 524×152 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar | akustisch nicht abgenommen |
| Logo Bühne | Bild | `waterkant-logo-light.png` | 524×152 png | ✓ liegt unter media/; ✓ Datei vorhanden; ✓ vollständig dekodierbar | akustisch nicht abgenommen |

Mehrfach verwendet: `telefon-klingeln.mp3` (LK09, LK11, LK16)

Im Medienordner, aber von keinem Drehbuchfeld verwendet (frühere Fassungen, Varianten): `ambience-kundschaft.mp3`, `lk01-feueralarm.png`, `lk02-lagerbrand.png`, `lk03-serverraum-betroffen.png`, `lk04-filialen-oeffnen-trotzdem.png`, `lk04-unruhe-kasse.mp3`, `lk05-social-post.png`, `lk06-pressekontakt.png`, `lk07-grosskunde-storniert.png`, `lk08-online-shop-bricht-ein.png`, `lk09-ersatzlager-gefunden.png`, `lk10-nordkanal-ankuendigung.png`, `lk11-gutachter-vor-ort.png`, `lk12-wiederanlauf.png`, `lk13-stoerfall-behoerde.png`, `lk14-loeschwasser.png`, `lk15-ermittlungsverfahren.png`, `v1-stoermeldung-brandmelder.png`, `v2-geruch-halle3.png`, `v3-lueftung-faellt-aus.png`

