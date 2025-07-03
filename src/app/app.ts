import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces für bessere Struktur (Workshop-Erklärung)
interface Callout {
  id: number;
  title: string;
  location: string;
  time: string;
  status: 'new' | 'in-progress' | 'completed';
}

interface Vehicle {
  name: string;
  available: boolean;
}

interface Personnel {
  name: string;
  role: string;
  available: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'thw-callouts';

  // Aktuelle Zeit für Header
  currentTime = new Date().toLocaleTimeString('de-DE');

  // Formular für neuen Einsatz
  showNewCalloutForm = false;

  // WORKSHOP-DATEN: Vorgefertigte Einsätze für Demo
  callouts: Callout[] = [
    {
      id: 1,
      title: 'Technische Hilfeleistung',
      location: 'Bahnhofstraße 42, Musterhausen',
      time: '14:23',
      status: 'new'
    },
    {
      id: 2,
      title: 'Hochwasser',
      location: 'Am Fluss 15, Wasserstadt',
      time: '13:45',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Verkehrsunfall',
      location: 'Autobahn A1, Km 234',
      time: '12:30',
      status: 'completed'
    }
  ];

  // Fahrzeuge-Daten
  vehicles: Vehicle[] = [
    { name: 'GKW 1', available: true },
    { name: 'GKW 2', available: false },
    { name: 'MLW', available: true },
    { name: 'FGr', available: false },
    { name: 'Anhänger', available: true }
  ];

  // Personal-Daten
  personnel: Personnel[] = [
    { name: 'Max Mustermann', role: 'Gruppenführer', available: true },
    { name: 'Anna Schmidt', role: 'Maschinistin', available: false },
    { name: 'Tom Weber', role: 'Helfer', available: true },
    { name: 'Lisa Müller', role: 'Helferin', available: true },
    { name: 'Jan Klein', role: 'Truppführer', available: false }
  ];

  // Objekt für neuen Einsatz
  newCallout: Partial<Callout> = {
    title: '',
    location: ''
  };

  constructor() {
    // Zeit jede Sekunde aktualisieren
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString('de-DE');
    }, 1000);
  }

  // AUFGABE 1 für Schüler: Status eines Einsatzes ändern
  updateCalloutStatus(calloutId: number, newStatus: 'in-progress' | 'completed') {
    // TODO für Workshop: Finde den Einsatz und ändere seinen Status
    const callout = this.callouts.find(c => c.id === calloutId);
    if (callout) {
      callout.status = newStatus;
      console.log(`Einsatz ${calloutId} Status geändert zu: ${newStatus}`);
    }
  }

  // AUFGABE 2 für Schüler: Neuen Einsatz hinzufügen
  addNewCallout() {
    if (this.newCallout.title && this.newCallout.location) {
      const newId = Math.max(...this.callouts.map(c => c.id)) + 1;
      const currentTime = new Date().toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // TODO für Workshop: Neuen Einsatz zum Array hinzufügen
      this.callouts.unshift({
        id: newId,
        title: this.newCallout.title,
        location: this.newCallout.location,
        time: currentTime,
        status: 'new'
      });

      // Formular zurücksetzen
      this.newCallout = { title: '', location: '' };
      this.showNewCalloutForm = false;

      console.log('Neuer Einsatz erstellt!');
    }
  }

  // AUFGABE 3 für Schüler: Statistik-Methoden
  getTotalCallouts(): number {
    // TODO: Anzahl aller Einsätze zurückgeben
    return this.callouts.length;
  }

  getActiveCallouts(): number {
    // TODO: Anzahl aktiver Einsätze (new + in-progress)
    return this.callouts.filter(c =>
      c.status === 'new' || c.status === 'in-progress'
    ).length;
  }

  getCompletedCallouts(): number {
    // TODO: Anzahl abgeschlossener Einsätze
    return this.callouts.filter(c => c.status === 'completed').length;
  }

  // BONUS-AUFGABE für fortgeschrittene Schüler
  getAvailableVehicles(): number {
    return this.vehicles.filter(v => v.available).length;
  }

  getAvailablePersonnel(): number {
    return this.personnel.filter(p => p.available).length;
  }
}
