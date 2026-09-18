# 8. MTA, RTO und RPO

## Wofür sind diese Werte da?

Drei Zeitwerte im Steckbrief beschreiben, wie viel Zeit und wie viel
Datenverlust bei einer Störung tolerierbar sind. Sie beantworten drei
unterschiedliche Fragen:

- **MTA (maximal tolerierbare Ausfallzeit):** Wie lange darf der
  Geschäftsprozess insgesamt maximal ausfallen, bevor ein nicht mehr
  hinnehmbarer Schaden entsteht?
- **RTO (Recovery Time Objective, Wiederanlaufzeit):** Bis wann muss die
  benötigte Leistung bzw. das benötigte System wiederhergestellt sein?
- **RPO (Recovery Point Objective, Datenverlust-Toleranz):** Welcher
  maximale Datenverlust — gemessen in Zeit seit der letzten Sicherung —
  ist noch akzeptabel?

## Der Zusammenhang

MTA ist die fachliche Obergrenze aus Sicht des Geschäftsprozesses. RTO
ist die technische/organisatorische Zusage, wie schnell die
Wiederherstellung tatsächlich gelingt. **RTO darf die MTA nicht
überschreiten** — sonst ist das Wiederanlaufziel langsamer als das, was
der Prozess maximal verträgt. Das Starter Kit prüft das automatisch.

## Wo finde ich sie?

Im Steckbrief-Reiter, unter "Kritikalität & Zeitwerte".

## So gehe ich vor

1. **MTA** als Zahl und Einheit erfassen (z. B. 24 Stunden).
2. **RTO** als Zahl und Einheit erfassen.
3. **RPO** als Zahl und Einheit erfassen — bei Prozessen, die keine
   laufend aktualisierten Daten verarbeiten, kann das auch "nicht
   zutreffend" bedeuten; tragen Sie dann einen für Sie sinnvollen
   Referenzwert ein oder vermerken Sie das im Bemerkungsfeld.

## Was das Starter Kit automatisch macht

Direkt unter den Feldern zeigt das Starter Kit eine
**Plausibilitätsprüfung**:

- **RTO über MTA** — harter Hinweis (blockiert später eine Freigabe):
  das Wiederanlaufziel ist langsamer als die maximal tolerierbare
  Ausfallzeit.
- **RTO entspricht genau der MTA** — Warnung: kein Puffer für
  Verzögerungen im tatsächlichen Wiederanlauf.
- **RPO = 0** ("kein Datenverlust tolerierbar") — Warnung: das ist eine
  besonders anspruchsvolle Anforderung, deren technische Machbarkeit Sie
  prüfen sollten.
- Fehlt ein RPO, obwohl der Prozess mit einer datenbezogenen kritischen
  Ressource verknüpft ist (siehe [Kapitel 10](10-ressourcen-abhaengigkeiten.md)),
  weist das Starter Kit ebenfalls darauf hin.

Diese Prüfung bewertet ausschließlich die **Plausibilität der Werte
zueinander** — nicht, ob die von Ihnen gewählten Werte fachlich richtig
sind.

## Was ich selbst entscheiden muss

Welche Zeitwerte für Ihren Prozess angemessen sind, ist eine fachliche
Entscheidung, die aus der Business-Impact-Analyse abgeleitet werden
sollte (siehe [Kapitel 7](07-bia.md)) — das Starter Kit schlägt keine
Werte vor.

## Beispiel aus der Praxis

Prozess "Warenausgang": MTA 24 Stunden (länger ausfallen darf der
Prozess nicht, sonst drohen Vertragsstrafen), RTO 8 Stunden (die
IT-Wiederherstellung ist vertraglich mit dem Provider auf 8 Stunden
zugesichert — ausreichend Puffer zur MTA), RPO 1 Stunde (stündliche
Datensicherung des Auftragssystems gilt als ausreichend).

## Typische Fehler

- RTO gleich der MTA setzen "weil es passt" statt einen Sicherheitspuffer
  einzuplanen.
- RPO vergessen, obwohl der Prozess an eine Datenressource geknüpft ist.

## Verwandte Kapitel

- [Kritikalität verstehen und dokumentieren](06-kritikalitaet.md)
- [Business Impact Analysis (BIA)](07-bia.md)
- [Ressourcen und Abhängigkeiten](10-ressourcen-abhaengigkeiten.md)
