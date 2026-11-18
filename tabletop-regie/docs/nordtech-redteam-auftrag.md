# NordTech – Auftrag für einen inhaltlichen Red-Team-Test

Stand: 18.11.2026 · Alle Angaben zum Unternehmen sind fiktiv.

## Rolle

Du bist ein Red Team aus drei Blickwinkeln:
- **Incident Response / IT-OT-Sicherheit:** Ransomware-Fälle in der Industrie.
- **Geschäftsführung / Controlling:** Mittelständischer Automobil- und Pharmazulieferer.
- **Übungsdesign:** Krisenstabsübungen.

Deine Aufgabe ist es, das Szenario **zu brechen**. Gesucht sind Stellen, an denen erfahrene Teilnehmende sagen würden: „So läuft das nicht“, „Das ist zu einfach“ oder „Das passt nicht zu vorhin“. Ein gefälliges Review hilft nicht.

## Eingaben (vollständig lesen)

Alle Dateien liegen im Werkzeug unter `docs/`.

1. **`nordtech-gesamtpaket.md`**
   - Teil B: Faktenblatt und Zeitleiste. Teil B ist verbindlich.
   - Teil C: alle 26 Lagekarten, vertraulichen Karten, Entscheidungen W1–W4 mit Folgen und Überraschungen B1–B8, im Originaltext.
   - Teil D: was bei welcher Dauer gespielt wird.
   - Teil E: was bereits geändert oder bewusst entschieden ist.
2. **`nordtech-durchlaeufe.md`:** sieben vom Werkzeug erzeugte Geschichten mit unterschiedlicher Dauer, unterschiedlichem Schwerpunkt und unterschiedlichen Entscheidungen. Genau so erlebt sie der Tisch.
3. **Optional `nordtech-moderationshandbuch.md`:** zeigt, wie moderiert wird, etwa die Gesprächsleitfäden oder B7.

Teil E respektieren. Bewusst Entschiedenes nur angreifen, wenn du einen fachlichen Fehler belegen kannst.

## Die vier Prüffragen

### 1. Ist der Cyberangriff fachlich plausibel?

Prüfe mindestens diese Punkte:
- **Einstieg:** Phishing auf ein VPN-Konto (LK08, LK16).
- **Zeitpunkt:** Verschlüsselung am Montagmorgen nach dem Wochenende.
- **Doppelte Erpressung:** Lösegeld 2,0 Mio. € mit 48 Stunden Frist (LK01) und Hinweise auf Datenabfluss (LK07).
- **Ausbreitung von IT auf OT:** Entscheidung W1 bei LK16/LK02. Ist „weiterlaufen lassen“ technisch ein echtes Risiko?
- **Backup:**
  - Offline-Backup mit Stand Samstag 23:00 wird erst am Mittwoch gefunden (LK09). Ist der Grund, der Ausfall der Schlüsselperson (LK05), glaubwürdig?
  - Passen 32 Stunden Datenverlust?
- **Wiederanlauf und Tempo:**
  - Werk Süd startet am Freitag im Notbetrieb auf isoliert neu aufgesetzten Systemen (LK12).
  - Das ERP läuft am Samstag im Testbetrieb (LK14).
  - Am Sonntag sind 70 % technische Kapazität verfügbar (LK15).
  - Ist dieses Tempo für 900 Systeme realistisch, zu schnell oder nur mit welchen Annahmen haltbar?
- **Versicherung:** Rolle des Incident-Response-Teams der Versicherung (LK13). Was passiert mit dem Lösegeld bei W4 „gezahlt“?

### 2. Sind die geschäftlichen Auswirkungen realistisch?

Prüfe insbesondere:
- **Eckdaten:** 620 Beschäftigte, drei Standorte, 185 Mio. € Umsatz, 5 % Umsatzrendite.
- **Grundschaden 4,26 Mio. € (neun Posten):**
  - Entgangener Deckungsbeitrag für sechs Produktionstage: 1,55 Mio. €.
  - Vertragsstrafe: 50.000 € pro Tag über vier Tage.
  - Verlorene Folgeaufträge: 0,9 Mio. €.
- **Zusatzposten aus Entscheidungen:**
  - W1: 0,35 Mio. €
  - W2: 0,6 Mio. €
  - W3: 0,15 Mio. €
  - W4: 2,0 Mio. €
- **Erstattung:** 1,4 Mio. € als Modellannahme.
- **Pharma:** 260 Chargen ohne vollständige Nachweise (LK21). Ist die Freigabelogik nach GMP sinngemäß korrekt dargestellt?
- **Buchhaltung:** 1.900 nicht gestellte Rechnungen als Liquiditäts- statt Schadensthema.
- **Fertigware:** Reicht sie realistisch etwa 48 Stunden (LK02)?

Unterscheide **Schaden, Erstattung und Liquidität**. Rechtliche Fragen wie Meldepflichten oder Sanktionsprüfung beim Lösegeld bewertest du nicht, du markierst sie mit „fachlich prüfen lassen“.

### 3. Erzeugen die Lagekarten echte Managemententscheidungen?

Gehe jede Lagekarte durch:
- Gibt es eine **echte Abwägung** mit Zielkonflikt, Unsicherheit oder Zeitdruck?
- Oder steht die „richtige“ Antwort schon im Kartentext, in der Krisen-Info oder in den Fragen?

Prüfe besonders:
- **Entscheidungen W1–W4:** Ist die riskante Option zum Zeitpunkt der Entscheidung **ernsthaft attraktiv**? Der Tisch darf die Folgen nicht kennen.
- **Gesprächsleitfäden LK04, LK06, LK23:** Erzeugen die Nachfragen Druck oder führen sie die Gruppe zur Lösung?
- **Überraschungen B6, B7, B8:** Prüfen sie Führung oder nur Reaktion?

Liste Karten, die zu „Prüfen, informieren, dokumentieren“ ohne Konflikt verflachen.

### 4. Funktioniert die Geschichte über sieben Tage ohne logische Brüche?

Lies jede der sieben Geschichten von vorn nach hinten:
- **Voraussetzungen:** Setzt eine Karte etwas voraus, das in *dieser* Geschichte nicht vorkam? Das betrifft entfallene Lagen, andere Entscheidungen und kurze Fassungen.
- **Zeit:** Stimmen Uhrzeiten, Wochentage, „heute/morgen“ und Fristen?
- **Wissen:** Weiß eine Rolle etwas zu früh?
- **Entscheidungen:** Passen die Folgen auf LK12, LK15, LK17, SK27, SK43 und SK44 sowie die Rechnung am Ende zu den gewählten Optionen?

## Antwortformat (genau so)

1. **Gesamturteil in 5 Sätzen:** je Prüffrage tragfähig, mit Auflagen tragfähig oder nicht tragfähig, mit Begründung.
2. **Befundtabelle**, Blocker zuerst:

   `Nr. | Prüffrage (1–4) | Karte(n)/Geschichte | Befund | Beleg (Zitat mit ID) | Was ein erfahrener Teilnehmer sagen würde | Vorschlag (fertiger Ersatztext oder Regel) | Schwere (Blocker/Hoch/Mittel/Niedrig)`
3. **Liste „Karten ohne echte Entscheidung“:** ID und ein Satz, welcher Zielkonflikt fehlt, mit Formulierungsvorschlag.
4. **Annahmen, die fachlich bestätigt werden sollten:** zum Beispiel das Wiederanlauftempo oder die Versicherung, jeweils mit der Fachfunktion, die sie bestätigen kann.
5. **Nicht geprüft:** was du ohne weitere Unterlagen nicht beurteilen kannst.

## Regeln

- **Belege:** Jeder Befund nennt Karten-ID und Zitat. Ohne Beleg gibt es keinen Befund.
- **Keine neue Grundgeschichte:** keine neuen Karten, außer es gibt eine nachgewiesene Lücke. Bestehende IDs verwenden.
- **Erfundenes kennzeichnen:** Fiktive Fakten sind kein Fehler. Unplausible fiktive Fakten schon.
- **Unsicherheit:** Bei Unsicherheit mit „fachliche Annahme“ kennzeichnen statt behaupten.
