# 08 – Medien und Audio

Stand: 2026-11-18 · Codestand `0c8013e`

## 1. Grundsätze (für beide Szenarien)

- Jeder Ton gehört genau zu einer Karte, endet von selbst (außer der Hintergrund vor Krisenbeginn und in den Vorboten), ist in der Moderation jederzeit stummschaltbar und bringt keine Fakten, die nicht auch auf der Karte stehen.
- Alarmtöne und Durchsagen tragen auf der Bühne das Schild **„Übungseinspielung – kein echter Alarm“** (Waterkant LK04, B5; NordTech wo vorgesehen). Durchsagen sagen hörbar „Übung“; bei Waterkant beginnen LK04 und B5 nach der unabhängigen Prüfung zusätzlich mit „Übung, Übung, Übung. Dies ist eine Einspielung für den Krisenstab, kein echter Alarm.“ und enden mit „Ende der Übungseinspielung.“ Signaltöne sind kurz und synthetisch, keine Nachbildung realer Alarmanlagen.
- **Organisatorisch vor jeder Übung mit Alarmtönen:** Empfang, Sicherheitsdienst und Brandschutzbeauftragte am Übungsort informieren, Türschild „Übung läuft – Alarmtöne sind Einspielungen“, Lautstärke begrenzen, nie über Haus- oder Durchsageanlagen abspielen. Ohne Ton bleibt jede Karte spielbar; Einspielungen mit Sprache haben eine Abschrift in der Moderation.
- Bei Karten mit **Signal** (z. B. Telefon, Funk) spielt der Ton nur das Signal; das Gespräch führt die Moderation live nach Sprechertext und Gesprächsleitfaden.
- Bilder zeigen keine realen Marken, Personen oder Orte.

## 2. Herkunft und Rechte

| Medienart | Herkunft | Rechtestatus |
|---|---|---|
| NordTech-Fotos | in früheren Runden bereitgestelltes Bildpaket; zwei Bilder (LK01, LK14) in dieser Abnahmephase von sichtbaren realen Marken bereinigt | Nutzung im Werkzeug abgestimmt; **endgültige Rechteklärung für Weitergabe außerhalb der Übung offen** |
| Karten-Banner (beide Szenarien, Waterkant vollständig) | im Projekt erzeugt (Vektorgrafik, Text und Symbol) | eigene Erstellung, keine Fremdrechte bekannt |
| Klänge (Signale, Atmosphären) | im Projekt per Klangsynthese erzeugt | eigene Erstellung, keine Fremdrechte bekannt |
| Sprachaufnahmen (Durchsagen, Nachrichten, Sprachnachrichten) | im Projekt mit freier Sprachsynthese (Piper, Stimmen „thorsten“ und „kerstin“, Lizenz CC0 laut Modellkarte) erzeugt | eigene Erzeugung; **Stimmlizenz vor externer Weitergabe durch die zuständige Stelle bestätigen lassen** |

Neue Medien dieser Runde (Waterkant) sind **nicht endgültig freigegeben**. Sie sind technisch geprüft (Datei vorhanden, lädt auf der Bühne, Ton startet und endet) und auf Bildschirmfotos sichtbar, aber nicht von einer zweiten Person angehört bzw. abgenommen. Die Sprachaufnahmen wurden in dieser Umgebung nicht angehört (kein Audioausgang); geprüft sind Dauer, Lautheit (Normalisierung auf −18 LUFS) und dass die Wiedergabe startet.

## 3. Generalprobe

Jede Lage und jede öffentliche Überraschung beider Szenarien wurde im laufenden Werkzeug auf der Bühne angezeigt und fotografiert (`testberichte/testbericht.md`, Abschnitt „Generalprobe“; Bilder unter `screenshots/`). Ergebnis: alle Bilder geladen, jeder vorgesehene Ton gestartet, Übungshinweis bei Alarmtönen sichtbar.

## 4. Medienlisten

Die folgenden Listen sind automatisch aus Drehbuch und Dateien erzeugt (`tools/medienliste.js`). „Ungenutzte Dateien“ sind ältere oder ersetzte Medien im Ordner, die kein Drehbuch-Eintrag verwendet; sie werden nicht abgespielt und sind nicht im Paket enthalten.


# Teil 1 – NordTech


Stand: 2026-11-18 · erzeugt mit `tools/medienliste.js` aus `scenario.nordtech.json`. „vorhanden“, Maße, Dauer und Prüfsumme (SHA-256, gekürzt) sind aus den Dateien gelesen.

| Verwendet bei | Art | Datei | vorhanden | Pixel / Dauer | Abspielart | SHA-256 (12) |
|---|---|---|---|---|---|---|
| Bühne vor Start | Bild | `nordtech/idle-hauptsitz-foto.webp` | ja | – | – | ba0721925ca7 |
| Bühne vor Start / Vorboten | Ton | `nordtech/ambience-maschinenraum.mp3` | ja | 24,0 s | Schleife | de94b5404c03 |
| LK18 Anmeldung hakt | Bild | `nordtech/v1-anmeldung-hakt.png` | ja | 1000×280 | – | 29cf95429d6b |
| LK19 Maschine 4 verhält sich seltsam | Bild | `nordtech/v2-maschine-seltsam.png` | ja | 1000×280 | – | fd5d5d7e3f23 |
| LK19 Maschine 4 verhält sich seltsam | Ton | `nordtech/lk19-fraeslinie-stoerung.mp3` | ja | 11,0 s | endet selbst | b55eafbe63af |
| LK20 Keine Aufträge mehr | Bild | `nordtech/v3-keine-auftraege.png` | ja | 1000×280 | – | e408edb3cade |
| LK01 Cyberangriff | Bild | `nordtech/lk01-loesegeld-kamera-foto.webp` | ja | – | – | f60caa6d64c2 |
| LK01 Cyberangriff | Ton | `nordtech/lk01-stille-gemurmel.mp3` | ja | 7,2 s | endet selbst | 0db4a6afa833 |
| LK16 OT-Trennung | Bild | `nordtech/lk16-incident-overview-foto.webp` | ja | – | – | 7a07ed38e3c5 |
| LK02 Produktion stoppt | Bild | `nordtech/lk02-produktion-gestoppt-foto.webp` | ja | – | – | 50a3ad3e6480 |
| LK02 Produktion stoppt | Ton | `nordtech/lk02-produktion-faehrt-herunter.mp3` | ja | 14,0 s | endet selbst | c422c94440ee |
| LK22 Kommunikation ohne IT | Bild | `nordtech/lk22-kommunikation-ohne-it.png` | ja | 1000×280 | – | 41edb7380a49 |
| LK22 Kommunikation ohne IT | Ton | `nordtech/lk22-funk-abgebrochen.mp3` | ja | 11,7 s | endet selbst | f7a903511e0e |
| LK03 LinkedIn-Beitrag | Bild | `nordtech/lk03-linkedin-post-foto.webp` | ja | – | – | 7ced6d242f7a |
| LK04 Nordkanal-Anfrage | Bild | `nordtech/lk04-nordkanal-anfrage.png` | ja | 1000×280 | – | f2bff4d75f8b |
| LK04 Nordkanal-Anfrage | Ton | `nordtech/telefon-klingeln.mp3` | ja | 4,9 s | endet selbst, Signal, danach live | ff8d5274ddab |
| LK23 Wer darf ins Werk? | Bild | `nordtech/lk23-zutritt.png` | ja | 1000×280 | – | c35d06f5ec2c |
| LK23 Wer darf ins Werk? | Ton | `nordtech/funk-ruf.mp3` | ja | 0,8 s | endet selbst, Signal, danach live | b55f7997b6f3 |
| LK05 Schlüsselperson fällt aus | Bild | `nordtech/lk05-leerer-arbeitsplatz-foto.webp` | ja | – | – | 917114425f42 |
| LK05 Schlüsselperson fällt aus | Ton | `nordtech/lk05-it-bereitschaft.mp3` | ja | 16,3 s | endet selbst | b9d0c0467c9f |
| LK06 Kunde eskaliert | Bild | `nordtech/lk06-kunde-eskaliert-foto.webp` | ja | – | – | ea837e273580 |
| LK06 Kunde eskaliert | Ton | `nordtech/telefon-klingeln.mp3` | ja | 4,9 s | endet selbst, Signal, danach live | ff8d5274ddab |
| LK07 Datenschutz | Bild | `nordtech/lk07-datenschutz.png` | ja | 1000×280 | – | 3caf8c2ab76a |
| LK08 Positive Entwicklung | Bild | `nordtech/lk08-positive-entwicklung.png` | ja | 1000×280 | – | 8d418259476f |
| LK09 Backups gefunden | Bild | `nordtech/lk09-offline-backup-foto.webp` | ja | – | – | 11616b82d151 |
| LK24 Wer bekommt das erste System? | Bild | `nordtech/lk24-erstes-system.png` | ja | 1000×280 | – | 4c0533eabab8 |
| LK17 Beirat fordert Lagebericht | Bild | `nordtech/lk17-zwischenfazit-foto.webp` | ja | – | – | 3d44c806c212 |
| LK10 Nordkanal-Sonderbericht | Bild | `nordtech/lk10-nordkanal-studio-foto.webp` | ja | – | – | 98e7121cfc86 |
| LK10 Nordkanal-Sonderbericht | Ton | `nordtech/lk10-nordkanal-nachrichten.mp3` | ja | 56,5 s | endet selbst | 74b652a65f23 |
| LK11 Pharmakunde eskaliert | Bild | `nordtech/lk11-pharmakunde-foto.webp` | ja | – | – | 251522e54a7a |
| LK12 Teilweiser Wiederanlauf | Bild | `nordtech/lk12-werk-sued-online-foto.webp` | ja | – | – | 0436186b7100 |
| LK12 Teilweiser Wiederanlauf | Ton | `nordtech/lk12-anlage-faehrt-hoch.mp3` | ja | 11,0 s | endet selbst | cfb699b76ea7 |
| LK13 Cyberversicherung | Bild | `nordtech/lk13-cyberversicherung-foto.webp` | ja | – | – | 80a3a8bd341c |
| LK21 Chargenfreigabe | Bild | `nordtech/lk21-chargenfreigabe.png` | ja | 1000×280 | – | 452c5b561a57 |
| LK14 ERP-Testbetrieb | Bild | `nordtech/lk14-erp-testbetrieb-foto.webp` | ja | – | – | 41353da91674 |
| LK25 Zwei Listen, zwei Wahrheiten | Bild | `nordtech/lk25-zwei-listen.png` | ja | 1000×280 | – | e06c313bad12 |
| LK15 Wiederanlauf | Bild | `nordtech/lk15-wiederanlauf.png` | ja | 1000×280 | – | dd7de0a1bbf2 |
| LK26 Die Menschen sind am Limit | Bild | `nordtech/lk26-menschen-am-limit.png` | ja | 1000×280 | – | e6a4f0a1c176 |
| LK26 Die Menschen sind am Limit | Ton | `nordtech/lk26-schichtleitung-nachricht.mp3` | ja | 21,2 s | endet selbst | 30a03895910c |
| B6 Zwei widersprüchliche Anweisungen | Bild | `nordtech/b6-widerspruechliche-anweisungen.png` | ja | 1000×280 | – | eb6dbf9ccc64 |
| B6 Zwei widersprüchliche Anweisungen | Ton | `nordtech/b6-zwei-durchsagen.mp3` | ja | 27,6 s | endet selbst | 6e84ceb9300c |
| B7 Die Krisenstabsleitung ist nicht erreichbar | Bild | `nordtech/b7-krisenstabsleitung-abgerufen.png` | ja | 1000×280 | – | e505f1de4319 |
| B7 Die Krisenstabsleitung ist nicht erreichbar | Ton | `nordtech/telefon-klingeln.mp3` | ja | 4,9 s | endet selbst, Signal, danach live | ff8d5274ddab |
| B8 Ein vermeintlicher Erfolg | Bild | `nordtech/b8-vermeintlicher-erfolg.png` | ja | 1000×280 | – | 7537bb654071 |
| B8 Ein vermeintlicher Erfolg | Ton | `nordtech/b8-erp-test-meldung.mp3` | ja | 20,6 s | endet selbst | 919f5885f627 |
| Firmenzeichen | Bild | `nordtech/nordtech-logo.png` | ja | 900×265 | – | 089446a34d8c |
| Firmenzeichen Bühne | Bild | `nordtech/nordtech-logo-light.png` | ja | 900×265 | – | d21fc6492dc4 |

**Ergebnis:** 47 von 47 Verweisen zeigen auf vorhandene Dateien. Ungenutzte Dateien in `media/nordtech/`: `nordtech/lk01-loesegeldforderung.png`, `nordtech/lk02-produktion-stoppt.png`, `nordtech/lk03-linkedin-post.png`, `nordtech/lk05-schluesselperson-faellt-aus.png`, `nordtech/lk06-kunde-eskaliert.png`, `nordtech/lk09-backups-gefunden.png`, `nordtech/lk10-nordkanal-bericht.png`, `nordtech/lk11-pharmakunde-eskaliert.png`, `nordtech/lk12-teilweiser-wiederanlauf.png`, `nordtech/lk13-cyberversicherung.png`, `nordtech/lk14-erp-testbetrieb.png`, `nordtech/lk16-ot-trennung.png`, `nordtech/lk17-beirat-sondersitzung.png`.

### Sprechertexte und Einspielungen (10)

Wortlaut, wie er vorgelesen oder eingespielt wird. „Einspielung“ = als Ton hinterlegt; „vorlesen“ = Moderation spricht live (ggf. nach einem Signalton).

- **LK04 Nordkanal-Anfrage** (vorlesen): Guten Tag, hier ist die Redaktion von Nordkanal. Uns erreichen Hinweise auf einen Cyberangriff bei NordTech. Ist Ihre Produktion betroffen? Wurden Kundendaten gestohlen? Und zahlen Sie Lösegeld? Wir bitten bis sechzehn Uhr um eine Stellungnahme.
- **LK05 Schlüsselperson fällt aus** (Einspielung): Telefon klingelt. „Hier ist die IT-Bereitschaft. Wir haben es jetzt mehrfach versucht. Wir erreichen ihn nicht, er liegt weiter im Krankenhaus. Und ehrlich gesagt: Die Zugänge für die Firewall und die Backup-Konsole hat keiner von uns vollständig.“
- **LK06 Kunde eskaliert** (vorlesen): Hier ist der Einkauf. Wir hören seit gestern von Störungen bei Ihnen und haben bis jetzt keine belastbare Auskunft. Ich erwarte bis sechzehn Uhr den Rückruf Ihrer Geschäftsführung und binnen vierundzwanzig Stunden einen schriftlichen Störungsbericht nach unserem Lieferantenhandbuch. Eine mündliche Zusage reicht mir nicht. Und ich erinnere an die Vertragsstrafe: fünfzigtausend Euro für jeden Tag Lieferausfall.
- **LK10 Nordkanal-Sonderbericht** (Einspielung): Nordkanal Nachrichten, Donnerstag, acht Uhr. Guten Morgen. Seit Montag steht bei der NordTech Components GmbH die Produktion weitgehend still. Ein Cyberangriff hat zentrale IT-Systeme des Zulieferers für die Automobil- und Pharmaindustrie lahmgelegt. Auf Bildschirmen im Werk war eine Lösegeldforderung zu sehen, Fotos davon kursieren seit Montag im Netz. Ob Kundendaten abgeflossen sind, ist weiter unklar. Ein Beschäftigter, der anonym bleiben möchte, wirft dem Unternehmen vor, die interne Kommunikation sei unzureichend gewesen. Auch Kunden werden ungeduldig. Nach Informationen von Nordkanal drohen erste Abnehmer mit Vertragsstrafen. Wie lange der Ausfall noch dauert, sagt das Unternehmen bislang nicht. Für die rund 620 Beschäftigten bleibt die Ungewissheit. Wir bleiben für Sie dran.
- **LK22 Kommunikation ohne IT** (Einspielung): Funkrauschen. „Zentrale an Werk Süd, bitte kommen. Werk Süd, hören Sie mich?“ – Abriss, Rauschen. „Werk Süd hier. Wir haben keine Anweisung, die Leute wissen nicht, ob sie …“ – Abriss.
- **LK23 Wer darf ins Werk?** (vorlesen): Werkschutz Werk Süd an Krisenstab. Am Tor stehen zwei externe Techniker, sie sollen sich einen ausgefallenen Produktionsrechner ansehen. Ich kann ihre Berechtigung nicht elektronisch prüfen, die Zutrittsverwaltung ist nicht erreichbar. Die Instandhaltung drängt, sie sofort reinzulassen. Ohne Freigabe lasse ich niemanden in den gesicherten Bereich. Wer gibt frei?
- **LK26 Die Menschen sind am Limit** (Einspielung): Hier Schichtleitung Werk Süd. Technisch könnten wir ab morgen deutlich mehr fahren. Aber viele meiner Leute sind nach dieser Woche über der Belastungsgrenze, und für die Frühschicht morgen habe ich keinen belastbaren Plan. Ich brauche heute eine Entscheidung: Welche Aufträge haben Vorrang, und mit welcher Besetzung fahren wir sicher?
- **B6 Zwei widersprüchliche Anweisungen** (Einspielung): Gong. „Achtung, eine Durchsage der Produktionsleitung Werk Süd. Alle Rechner bleiben ausgeschaltet, bis die IT etwas anderes sagt. Ich wiederhole: Alle Rechner bleiben aus.“ – Gong. „Durchsage an alle Bereiche in Werk Süd. Bitte starten Sie jetzt alle Rechner neu und prüfen Sie, ob sie funktionieren. Melden Sie Probleme an Ihre Schichtleitung.“
- **B7 Die Krisenstabsleitung ist nicht erreichbar** (vorlesen): „Entschuldigung – Sie werden dringend zu einem vertraulichen Gespräch gebeten. Bitte kommen Sie sofort mit, Sie sind die nächsten fünf Minuten nicht erreichbar.“
- **B8 Ein vermeintlicher Erfolg** (Einspielung): Signal. „E-R-P-Test, Auftrag eins: Funktionstest erfolgreich abgeschlossen.“ – Warnton. „Qualitätsmanagement an den Krisenstab. Bei einem Testauftrag zeigt das System eine Chargennummer, die nicht zu unseren Unterlagen passt. Die Ursache ist ungeklärt. Wir brauchen eine Entscheidung, wie es weitergeht.“



# Teil 2 – Waterkant


Stand: 2026-11-18 · erzeugt mit `tools/medienliste.js` aus `scenario.waterkant.json`. „vorhanden“, Maße, Dauer und Prüfsumme (SHA-256, gekürzt) sind aus den Dateien gelesen.

| Verwendet bei | Art | Datei | vorhanden | Pixel / Dauer | Abspielart | SHA-256 (12) |
|---|---|---|---|---|---|---|
| Bühne vor Start | Bild | `waterkant/idle-ruhe-vor-dem-sturm.png` | ja | 1280×600 | – | 24c52e4c4eb6 |
| Bühne vor Start / Vorboten | Ton | `waterkant/ambience-rechenzentrum.mp3` | ja | 23,0 s | Schleife | 0144239d9921 |
| LK01 USV meldet Batteriewarnung | Bild | `waterkant/lk01-usv-warnung.png` | ja | 1000×280 | – | e20d0ad2c0b4 |
| LK02 Geruch im Technikflur | Bild | `waterkant/lk02-geruch-technikflur.png` | ja | 1000×280 | – | 658361a455cf |
| LK03 Serverraum wird warm | Bild | `waterkant/lk03-serverraum-warm.png` | ja | 1000×280 | – | 35b73ba3e865 |
| LK03 Serverraum wird warm | Ton | `waterkant/lk03-klimaalarm.mp3` | ja | 6,0 s | endet selbst | 2428cb0ab314 |
| LK04 Brandalarm im Rechenzentrum | Bild | `waterkant/lk04-brandalarm.png` | ja | 1000×280 | – | 00b3e22388f4 |
| LK04 Brandalarm im Rechenzentrum | Ton | `waterkant/lk04-loeschanlage-durchsage.mp3` | ja | 27,4 s | endet selbst, Übungshinweis auf der Bühne | e27c37c5446e |
| LK05 Feuerwehr im Einsatz | Bild | `waterkant/lk05-feuerwehr.png` | ja | 1000×280 | – | 7b6d80827fa1 |
| LK05 Feuerwehr im Einsatz | Ton | `waterkant/funk-ruf.mp3` | ja | 0,8 s | endet selbst, Signal, danach live | b55f7997b6f3 |
| LK06 Lagebild nach dem Löschen | Bild | `waterkant/lk06-lagebild.png` | ja | 1000×280 | – | 3ceb6fc9c1b6 |
| LK07 Was noch läuft – und was nicht | Bild | `waterkant/lk07-was-laeuft.png` | ja | 1000×280 | – | 1d03995b24e1 |
| LK08 Saisonstart ohne Aktionspreise | Bild | `waterkant/lk08-saisonstart.png` | ja | 1000×280 | – | 2fa224a509ab |
| LK09 Die Partnermärkte rufen an | Bild | `waterkant/lk09-partnermaerkte.png` | ja | 1000×280 | – | ee9747a10bd5 |
| LK09 Die Partnermärkte rufen an | Ton | `waterkant/telefon-klingeln.mp3` | ja | 4,9 s | endet selbst, Signal, danach live | ff8d5274ddab |
| LK10 Serverraum gesperrt | Bild | `waterkant/lk10-serverraum-gesperrt.png` | ja | 1000×280 | – | 028f37ea1f59 |
| LK11 Nordkanal fragt nach | Bild | `waterkant/lk11-nordkanal.png` | ja | 1000×280 | – | 568b76d6512b |
| LK11 Nordkanal fragt nach | Ton | `waterkant/telefon-klingeln.mp3` | ja | 4,9 s | endet selbst, Signal, danach live | ff8d5274ddab |
| LK12 Das Zentrallager steht | Bild | `waterkant/lk12-zentrallager.png` | ja | 1000×280 | – | ef11300c26d8 |
| LK13 Ersatz: Hardware oder Ausweich-Rack? | Bild | `waterkant/lk13-ersatz.png` | ja | 1000×280 | – | 0aa8a089f94f |
| LK14 Den Backup-Server bergen? | Bild | `waterkant/lk14-bergen.png` | ja | 1000×280 | – | 6afe2b9ff2a6 |
| LK15 Wie weit geht der Ausweichbetrieb? | Bild | `waterkant/lk15-ausweich.png` | ja | 1000×280 | – | 6177d177160d |
| LK16 Ein Bauunternehmen will Vorrang | Bild | `waterkant/lk16-bauunternehmen.png` | ja | 1000×280 | – | 206150129fcf |
| LK16 Ein Bauunternehmen will Vorrang | Ton | `waterkant/telefon-klingeln.mp3` | ja | 4,9 s | endet selbst, Signal, danach live | ff8d5274ddab |
| LK17 Prospektpreise vor der Kasse | Bild | `waterkant/lk17-prospektpreise.png` | ja | 1000×280 | – | 040ea3199def |
| LK18 Der Verbundbeirat verlangt Antworten | Bild | `waterkant/lk18-verbundbeirat.png` | ja | 1000×280 | – | 9ca42cfc858b |
| LK19 Rücksicherung im Ausweich-Rack | Bild | `waterkant/lk19-ruecksicherung.png` | ja | 1000×280 | – | 8ec3e84a499f |
| LK20 Wer wird zuerst umgestellt? | Bild | `waterkant/lk20-reihenfolge.png` | ja | 1000×280 | – | 6b5c6506a0bd |
| LK21 Nordkanal berichtet ausführlich | Bild | `waterkant/lk21-nordkanal-bericht.png` | ja | 1000×280 | – | b1ac0479dc96 |
| LK21 Nordkanal berichtet ausführlich | Ton | `waterkant/lk21-nordkanal-nachrichten.mp3` | ja | 48,9 s | endet selbst | 1914f8095506 |
| LK22 Die Kassen laufen wieder | Bild | `waterkant/lk22-kassen-laufen.png` | ja | 1000×280 | – | 82cb68cb0335 |
| LK22 Die Kassen laufen wieder | Ton | `waterkant/lk22-kasse-startet.mp3` | ja | 5,0 s | endet selbst | faf8939801d2 |
| LK23 Die Datenlücke | Bild | `waterkant/lk23-datenluecke.png` | ja | 1000×280 | – | 9029f9af8ac7 |
| LK24 Der Versicherer ist da | Bild | `waterkant/lk24-versicherer.png` | ja | 1000×280 | – | f4891addcbc3 |
| LK25 Der große Saisonsamstag | Bild | `waterkant/lk25-saisonsamstag.png` | ja | 1000×280 | – | 373ece102e9e |
| LK26 Die Brandursache | Bild | `waterkant/lk26-brandursache.png` | ja | 1000×280 | – | 5b4865f84ce2 |
| LK27 Stabiler Notbetrieb | Bild | `waterkant/lk27-notbetrieb.png` | ja | 1000×280 | – | 23c8136c8087 |
| LK28 Zurück ins eigene Rechenzentrum? | Bild | `waterkant/lk28-rueckkehr.png` | ja | 1000×280 | – | 563e36035e41 |
| B5 Zweiter Alarm | Bild | `waterkant/b5-zweiter-alarm.png` | ja | 1000×280 | – | 1deb09ac878d |
| B5 Zweiter Alarm | Ton | `waterkant/b5-zweiter-alarm.mp3` | ja | 19,5 s | endet selbst, Übungshinweis auf der Bühne | 1d029cf58813 |
| B6 Wo hat es gebrannt? | Bild | `waterkant/b6-falschmeldung.png` | ja | 1000×280 | – | 0ca1053c6004 |
| B7 Die IT-Leitung muss raus | Bild | `waterkant/b7-it-leitung-raus.png` | ja | 1000×280 | – | e6d90dfe5b9b |
| B8 Ein Angebot mit Haken | Bild | `waterkant/b8-angebot.png` | ja | 1000×280 | – | c3fd283a5262 |
| Firmenzeichen | Bild | `waterkant/waterkant-logo.png` | ja | 524×152 | – | af770cdd78ce |
| Firmenzeichen Bühne | Bild | `waterkant/waterkant-logo-light.png` | ja | 524×152 | – | d9c834ecbf03 |

**Ergebnis:** 45 von 45 Verweisen zeigen auf vorhandene Dateien. Ungenutzte Dateien in `media/waterkant/`: `waterkant/ambience-kundschaft.mp3`, `waterkant/lk01-feueralarm.png`, `waterkant/lk02-lagerbrand.png`, `waterkant/lk03-serverraum-betroffen.png`, `waterkant/lk04-filialen-oeffnen-trotzdem.png`, `waterkant/lk04-unruhe-kasse.mp3`, `waterkant/lk05-social-post.png`, `waterkant/lk06-pressekontakt.png`, `waterkant/lk07-grosskunde-storniert.png`, `waterkant/lk08-online-shop-bricht-ein.png`, `waterkant/lk09-ersatzlager-gefunden.png`, `waterkant/lk10-nordkanal-ankuendigung.png`, `waterkant/lk11-gutachter-vor-ort.png`, `waterkant/lk12-wiederanlauf.png`, `waterkant/lk13-stoerfall-behoerde.png`, `waterkant/lk14-loeschwasser.png`, `waterkant/lk15-ermittlungsverfahren.png`, `waterkant/v1-stoermeldung-brandmelder.png`, `waterkant/v2-geruch-halle3.png`, `waterkant/v3-lueftung-faellt-aus.png`.

### Sprechertexte und Einspielungen (8)

Wortlaut, wie er vorgelesen oder eingespielt wird. „Einspielung“ = als Ton hinterlegt; „vorlesen“ = Moderation spricht live (ggf. nach einem Signalton).

- **LK04 Brandalarm im Rechenzentrum** (Einspielung): Einspielung (Abschrift): „Übung, Übung, Übung. Dies ist eine Einspielung für den Krisenstab, kein echter Alarm.“ Gedämpfter Vorwarnton der Löschanlage, Geräusch der Gasflutung, Durchsage: „Übung. Achtung, Feueralarm im Verwaltungsgebäude. Bitte verlassen Sie das Gebäude über die gekennzeichneten Fluchtwege und gehen Sie zum Sammelplatz. Übung.“ Ende: „Ende der Übungseinspielung.“
- **LK05 Feuerwehr im Einsatz** (vorlesen): Einsatzleitung Feuerwehr an Waterkant. Wer ist bei Ihnen verantwortlich? Ich brauche sofort drei Dinge: Ist noch jemand im Gebäude? Wo genau liegt der Batterieraum, und was für Batterien sind das? Und wer kann mir sagen, was hinter der Tür mit der Löschanlage ist?
- **LK09 Die Partnermärkte rufen an** (vorlesen): Guten Morgen, hier spricht der Inhaber eines Partnermarkts. Meine Kassen laufen offline, die Aktionspreise fehlen, und von Ihnen höre ich nichts außer Gerüchten über einen Brand. Laut Vertrag haben Sie 24 Stunden. Ich will heute wissen, wann meine Kassen wieder laufen – und was ich meinen Leuten sagen soll.
- **LK11 Nordkanal fragt nach** (vorlesen): Guten Tag, Redaktion Nordkanal. Bei Ihnen hat es heute Nacht gebrannt, im Netz ist von giftigen Gasen die Rede. Waren Menschen in Gefahr? Was ist mit Ihrer IT – stimmt es, dass Ihre Kassen nicht funktionieren? Und warum gelten Ihre Prospektpreise nicht? Wir bringen um 13 Uhr eine erste Meldung und arbeiten an einem längeren Beitrag.
- **LK16 Ein Bauunternehmen will Vorrang** (vorlesen): Hier ist der Einkauf. Ich habe zwei Baustellen, die am Freitag Material brauchen – Dämmung und Trockenbau, die Liste liegt Ihnen seit Montag vor. Ihr Portal geht nicht, Ihre Zentrale geht nicht ans Telefon. Ich brauche heute eine verbindliche Zusage, sonst bestelle ich woanders – und dann dauerhaft.
- **LK21 Nordkanal berichtet ausführlich** (Einspielung): Nordkanal Nachrichten, Donnerstag, dreizehn Uhr. Bei der Waterkant Baumärkte GmbH hat in der Nacht zum Dienstag ein Brand im Technikraum des Firmenrechenzentrums die IT lahmgelegt. Nach Angaben der Feuerwehr geriet eine Batterieanlage in Brand, verletzt wurde niemand. Seitdem kassieren die vierzehn Filialen im Notbetrieb, die Preise aus dem aktuellen Prospekt gelten an vielen Kassen nicht. Betroffen sind auch neun selbständige Partnermärkte, deren Kassensysteme Waterkant betreibt. Ein Inhaber sagt, auf seine Bestellungen warte er bis heute. Waterkant kündigte an, die Systeme in einem Ausweichrechenzentrum wieder in Betrieb zu nehmen. Wann der Normalbetrieb zurückkehrt, ist offen. Wir bleiben für Sie dran.
- **B5 Zweiter Alarm** (Einspielung): Einspielung beginnt mit „Übung, Übung, Übung. Dies ist eine Einspielung für den Krisenstab, kein echter Alarm.“ Dann Signal der Brandmeldeanlage, gedämpft. Durchsage: „Übung. Achtung, Feueralarm im Zentrallager. Bitte verlassen Sie das Lager über die gekennzeichneten Wege.“ Ende: „Ende der Übungseinspielung.“
- **B7 Die IT-Leitung muss raus** (vorlesen): „Der Betriebsarzt hat entschieden: Sie gehen jetzt nach Hause und schlafen. Bitte kommen Sie mit.“

