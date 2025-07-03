# THW Einsatzmanagement - Workshop Anleitung

## Für Lehrkräfte

### Workshop-Übersicht
**Zielgruppe:** 14-18 jährige THW-Schüler  
**Dauer:** 2-3 Stunden  
**Ziel:** Erste Schritte in der Webentwicklung mit Angular

### Workshop-Struktur

#### Phase 1: Einführung (30 min)
- Vorstellung des Projekts
- Erklärung der Grundlagen: HTML, TypeScript, Angular
- Demo der fertigen Anwendung

#### Phase 2: Aufgaben (90-120 min)

## Workshop-Aufgaben für Schüler

### Aufgabe 1: Einsatz-ID richtig anzeigen (15 min)
**Problem:** In der Einsatzliste wird `#callout.id` statt der echten ID angezeigt.

**Lösung:** 
Suche in `app.html` nach `#callout.id` und ändere es zu `#{{callout.id}}`

**Lernziel:** Template-Syntax in Angular verstehen

---

### Aufgabe 2: Neuen Einsatztyp hinzufügen (10 min)
**Aufgabe:** Füge "Brand" als neue Option in das Dropdown hinzu.

**Wo:** In `app.html` beim `<select>` Element
**Lösung:** Neue `<option>` hinzufügen

**Lernziel:** HTML-Formulare verstehen

---

### Aufgabe 3: Fahrzeugstatus ändern (20 min)
**Aufgabe:** Erstelle Buttons um Fahrzeuge von "verfügbar" auf "im Einsatz" zu setzen.

**Schritte:**
1. In `app.html`: Button zu jedem Fahrzeug hinzufügen
2. In `app.ts`: Methode `toggleVehicleStatus(index)` erstellen

**Lernziel:** Event-Handling und Array-Manipulation

---

### Aufgabe 4: Filter für Einsätze (25 min)
**Aufgabe:** Zeige nur neue Einsätze an, wenn ein Filter aktiviert ist.

**Schritte:**
1. Button "Nur neue Einsätze" hinzufügen
2. Variable `showOnlyNew` erstellen
3. `*ngIf` verwenden um Einsätze zu filtern

**Lernziel:** Bedingte Anzeige und Datenfilterung

---

### Aufgabe 5: Einsatz löschen (20 min)
**Aufgabe:** Möglichkeit schaffen, abgeschlossene Einsätze zu löschen.

**Schritte:**
1. Button "🗑️ Löschen" zu abgeschlossenen Einsätzen
2. Methode `deleteCallout(id)` erstellen
3. Sicherheitsabfrage mit `confirm()`

**Lernziel:** Array-Manipulation und Benutzerinteraktion

---

### Bonus-Aufgabe: Prioritäten (30 min)
**Für fortgeschrittene Schüler:**
- Priorität (Hoch/Mittel/Niedrig) zu Einsätzen hinzufügen
- Farbkodierung nach Priorität
- Sortierung nach Priorität

## Technische Hinweise

### Wichtige Angular-Konzepte:
- `{{}}` - Daten anzeigen
- `*ngFor` - Listen anzeigen
- `*ngIf` - Bedingte Anzeige
- `(click)` - Button-Klicks
- `[(ngModel)]` - Zwei-Wege-Datenbindung

### Häufige Fehler:
1. Vergessene geschweifte Klammern `{{}}`
2. Fehlende Imports in `app.ts`
3. Syntaxfehler in TypeScript

### Debugging-Tipps:
- Browser-Konsole öffnen (F12)
- `console.log()` verwenden
- Angular DevTools für Chrome installieren

## Zeitplanung

| Phase | Dauer | Inhalt |
|-------|-------|---------|
| Einführung | 30 min | Projekt vorstellen, Grundlagen erklären |
| Aufgabe 1-2 | 25 min | Einfache Template-Änderungen |
| Pause | 15 min | |
| Aufgabe 3-4 | 45 min | Event-Handling und Logik |
| Aufgabe 5 | 20 min | Array-Manipulation |
| Bonus | 30 min | Für schnelle Schüler |
| Abschluss | 15 min | Ergebnisse zeigen, Feedback |

## Erweiterungsmöglichkeiten

Nach dem Workshop können die Schüler:
- Lokale Speicherung hinzufügen
- Karten-Integration
- Push-Benachrichtigungen
- Mobile App mit Ionic
- Backend mit Node.js

## Support während des Workshops

### Checkliste für Betreuer:
- [ ] Alle PCs haben Node.js installiert
- [ ] Angular CLI ist verfügbar
- [ ] Projekt läuft mit `ng serve`
- [ ] Browser-Entwicklertools sind bekannt
- [ ] Backup-USB-Sticks mit fertigem Code

### Häufige Probleme:
1. **Port bereits belegt:** `ng serve --port 4201`
2. **Module fehlen:** `npm install`
3. **Browser-Cache:** Strg+F5 für Hard-Reload
