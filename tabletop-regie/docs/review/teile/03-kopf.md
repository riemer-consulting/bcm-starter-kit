# 03 – Architektur und Datenflüsse

{{STAND}}

Die Tabletop-Regie ist eine lokale Node.js-Anwendung (Express) mit drei Browser-Ansichten: **Setup** (Vorbereitung), **Moderation** (nicht teilen, enthält alle vertraulichen Inhalte) und **Bühne** (für alle sichtbar, nur öffentliche Inhalte), dazu eine Ablaufseite für Teilnehmende. Drehbücher sind JSON-Dateien unter `data/`; Lauf- und Einstellungsdaten liegen lokal in `data/run-state.json` und `data/settings.json` und werden nicht eingecheckt. Vertrauliche Karten gehen per SMTP an einzelne Personen.

**Änderungen an der Architektur in dieser Runde:** Standard-Bindung an `127.0.0.1` (Netzbetrieb nur bewusst mit `HOST=0.0.0.0`), Export ohne SMTP-Passwort, Pfadprüfung für Medien, Upload nur für Bildtypen, Eingabeprüfung bei Bewertungen, Sperre gegen parallelen Doppelversand. Sonst ist die Architektur unverändert; die Inventur unten bezieht sich auf den Codestand vor diesen Korrekturen, die betroffenen Stellen sind markiert.

**Verbleibende Architekturgrenzen** (bewusst nicht in dieser Runde geändert): keine Anmeldung und keine Rollentrennung zwischen Moderation und Bühne (Schutz nur durch lokalen Betrieb), Einstellungen ohne Anmeldung änderbar (Mailumleitung möglich, wenn der Server im Netz erreichbar ist), Namen der Personen auf dem Spielbrett der Bühne, Ausfallzeit zählt als Übungszeit, kein erneuter Versand fehlgeschlagener Mails, kein HTTPS, nur eine Übung gleichzeitig.

Ablaufdiagramme der Szenarien (Lagen, Stationen, Entscheidungen) liegen unter `ablaufdiagramme/`.
