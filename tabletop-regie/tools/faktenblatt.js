// Eckdaten je Drehbuch für den Export (tools/szenario-export.js). Nur Fakten, die auf den Karten stehen.
module.exports = {
 "nordtech-7-tage-ausnahmezustand": [
  [
   "Standorte",
   "3, einer davon „Werk Süd“; Fertigungslinien u. a. „Fräslinie 4“"
  ],
  [
   "Beschäftigte / IT",
   "ca. 620 Beschäftigte; 900 Endgeräte, Produktionsrechner und Server"
  ],
  [
   "Angreifer",
   "Ransomware „SHADOWVAULT“; Einstieg vermutlich über ein VPN-Konto (Phishing)"
  ],
  [
   "Lösegeld",
   "2.000.000 €, Frist 48 Stunden ab Montag 07:00 Uhr → Mittwoch 07:00 Uhr"
  ],
  [
   "Backup",
   "Offline-Backup, Stand Samstag 23:00 Uhr (vor dem Angriff), im Tresor des Hauptsitzes; Zugangsdaten im versiegelten IT-Notfallumschlag; Datenverlust rund 32 Stunden (Sonntag bis Montagfrüh); gefunden Mittwoch 11:00 Uhr, Prüfung mind. zwei Tage, abgeschlossen vor Samstag (ERP-Wiederherstellung im Test)"
  ],
  [
   "Medien",
   "Regionalsender „Nordkanal“: Anfrage Montag 14:00 Uhr, Sonderbericht Donnerstag 08:00 Uhr; LinkedIn-Beitrag Montag 11:00 Uhr"
  ],
  [
   "Kunden",
   "Automobilkunden (Just-in-time, Vertragsstrafe 50.000 € pro Tag Lieferausfall) und Pharmakunden (260 Chargen, Dokumentationspflichten)"
  ],
  [
   "Wiederanlauf",
   "Freitag 08:00 Uhr Werk Süd im Notbetrieb mit 30 % (isoliert neu aufgesetzte Produktionssysteme, ERP noch nicht produktiv); Samstag ERP aus dem geprüften Backup im isolierten Testbetrieb, Daten- und Sicherheitsfreigabe offen; Sonntag 12:00 Uhr 70 % der technischen Kapazität auf priorisierten Anlagen (nicht alle 900 Systeme, ERP nicht produktiv, Freigaben von Daten und Ware offen), Personal und Material knapp. **Szenarioannahme:** Dass dieser Wiederanlauf innerhalb der Übungswoche gelingt, ist für die Übung gesetzt und fachlich (IT/OT, Incident Response) zu bestätigen."
  ],
  [
   "Geld",
   "Cyberversicherung: bis zu 1,4 Mio. € unter Vorbehalt (in der Rechnung als optimistische, unbestätigte Annahme getrennt vom Bruttoschaden); Jahresumsatz 185 Mio. €, Umsatzrendite 5 %; Deckungsbeitrag je Stillstandstag ca. 260.000 € (fachliche Annahme)"
  ],
  [
   "Zeitmodell",
   "ca. 30 Sekunden Sprechzeit je Funktionsbereich und Lage (bei 180 Min. 11 Bereiche für 21 Rollen), dazu Lese- und Entscheidungszeit; nicht jede Rolle spricht bei jeder Lage – gefordert sind die zuständigen"
  ],
  [
   "Gremien",
   "Beirat (Sondersitzung Donnerstag), Betriebsrat, Hausbank, Datenschutzaufsicht, Polizei (ZAC)"
  ]
 ],
 "waterkant-rechenzentrum": [
  [
   "Standorte",
   "Zentrale mit Verwaltungsgebäude, eigenem Rechenzentrum und angrenzendem Zentrallager; 14 eigene Filialen (7 Nord, 7 Süd)"
  ],
  [
   "IT-Dienstleistung für Dritte",
   "9 selbständige Partnermärkte im Einkaufsverbund beziehen Kassen- und Warenwirtschaftsdienste aus dem Waterkant-Rechenzentrum (IT-Servicevertrag); vertragliches Wiederherstellungsziel 24 Stunden; zusammen 23 Märkte"
  ],
  [
   "Ereignis",
   "Montag 22:40 Uhr Warnung der USV; Dienstag 03:10 Uhr Brand im USV-Raum neben dem Serverraum, Gaslöschung im Serverraum; alle Personen wohlauf (ein Kollege aus dem Rechenzentrumsteam zunächst vermisst, später wohlauf); vorläufige Ursache (Samstag): thermisches Durchgehen eines Batteriemoduls, ein angekündigtes Update war nicht eingespielt, die Wartung zweimal verschoben, Zuständigkeit zwischen IT und Gebäudetechnik ungeklärt"
  ],
  [
   "Gebäude",
   "Verwaltungsgebäude bis zur Prüfung gesperrt; beschädigte Batteriemodule bis Dienstag 10:00 Uhr durch eine Fachfirma ausgebaut, danach Brandwache beendet und Gebäude übergeben; Büros ab Dienstag 10:00 Uhr freigegeben; Server- und USV-Raum gesperrt (Rußfilm, mögliche ätzende Gase), Messergebnis Mittwochmorgen: Grenzwerte noch überschritten"
  ],
  [
   "Meilensteine Serverraum",
   "Besichtigung durch den Gutachter Freitag → Reinigung ab dem Wochenende (nach Bergung einen Tag später), 5–8 Arbeitstage → Freimessung und Raumfreigabe frühestens ca. zehn Tage nach Mittwoch → neue USV, Brandschutzabnahme, Prüfung und Ersatz der Hardware → eigenes Rechenzentrum produktiv frühestens rund drei Wochen nach dem Brand"
  ],
  [
   "Ausfall",
   "Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale; Cloud-Mail läuft; Online-Shop zeigt veraltete Bestände"
  ],
  [
   "Kassen",
   "Offline-Betrieb ca. 72 Stunden laut Herstellerdokumentation, danach keine Buchungen bis zur Synchronisation: Grenze Freitag ca. 03:00 Uhr; eine bis dahin nicht umgestellte Kasse sperrt sich und kann nur vor Ort durch den Servicetechniker des Herstellers freigeschaltet werden (Freitag zwei Techniker ab 07:00 Uhr, etwa ein Markt pro Stunde)"
  ],
  [
   "Datensicherung",
   "Letzte vollständige Sicherung beim Colocation-Anbieter: Montag 01:00 Uhr; Dienstagssicherung nur auf dem Backup-Server im gesperrten Serverraum; ohne Bergung Datenlücke ca. 26 Stunden (Montag 01:00 bis Dienstag 03:10 Uhr)"
  ],
  [
   "Ausweichbetrieb",
   "Vertraglich vereinbartes Ausweich-Rack beim Colocation-Anbieter für den Produktivbetrieb der eigenen Systeme, ca. 40 % der bisherigen Rechenleistung, physisch sofort verfügbar, nie vollständig geübt; vor Betrieb müssen Netzanbindung, Anmeldedienste, Namensauflösung, Firewall, gesicherter Administrationszugang und Katalog der Sicherungssoftware eingerichtet werden (ab Mittwoch); ob dort auch Partner- und Gewerbekundendaten verarbeitet werden dürfen, regelt der Vertrag nicht ausdrücklich (fachlich zu prüfen); Kassen- und Preisdienste ab Donnerstag; Erweiterung für die übrigen Systeme binnen 48 Stunden mit zwölf Monaten Mindestlaufzeit, Zustimmung der Gesellschafter nötig (Bindung von zwölf Monaten oder länger)"
  ],
  [
   "Ersatzhardware",
   "10–12 Arbeitstage, zwei Rahmen gegen Aufpreis in drei Tagen"
  ],
  [
   "Wiederanlauf",
   "Donnerstag 18:00 Uhr Kassen- und Preisdienste wieder verfügbar, Umstellung ab ca. 17:00 Uhr Markt für Markt (ca. 2 Märkte pro Stunde); bis 03:00 Uhr ca. 20 von 23 Märkten, drei werden am Freitagmorgen vor Ort freigeschaltet; Sonntag 12:00 Uhr stabiler Notbetrieb aus dem Ausweich-Rack; eigenes Rechenzentrum weiter gesperrt (Szenarioannahme: der Notbetrieb gelingt, wenn die Freigaben wie beschrieben erteilt werden)"
  ],
  [
   "Saison",
   "Saisonstart mit Prospekt-Aktionspreisen; Samstag ist der umsatzstärkste Tag"
  ],
  [
   "Medien",
   "Regionalsender „Nordkanal“: Anfrage Dienstag 11:30 Uhr, Kurzmeldung Dienstag 13:00 Uhr, ausführlicher Beitrag Donnerstag 13:00 Uhr; Falschmeldung „Großbrand im Zentrallager“ eines Nachrichtenportals (Überraschung B6)"
  ],
  [
   "Geld",
   "Elektronik- und Betriebsunterbrechungsversicherung: Erstattung bis zu 1,6 Mio. € als optimistische, unbestätigte Modellannahme (Kostenübernahme nur „unter Vorbehalt“); Jahresumsatz 240 Mio. €, Umsatzrendite 5 % (Jahresgewinn 12 Mio. €)"
  ],
  [
   "Zeitmodell",
   "ca. 30 Sekunden Sprechzeit je Funktionsbereich und Lage, dazu Lese- und Entscheidungszeit; nicht jede Rolle spricht bei jeder Lage"
  ],
  [
   "Gremien und Externe",
   "Gesellschafterversammlung, Verbundbeirat der Partnermärkte, Feuerwehr, Sachverständige, Sanierungsfachfirma, Berufsgenossenschaft, Versicherer mit Gutachter, Colocation-Anbieter"
  ]
 ]
};
