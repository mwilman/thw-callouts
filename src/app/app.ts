import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';

// Erweiterte Interfaces mit Priorität
interface Callout {
  id: number;
  title: string;
  location: string;
  time: string;
  status: 'new' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
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
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'thw-callouts';

  // Aktuelle Zeit für Header
  currentTime = new Date().toLocaleTimeString('de-DE');

  // UI-Zustand
  showNewCalloutForm = false;
  showOnlyNew = false; // LÖSUNG AUFGABE 4: Filter-Zustand

  // ERWEITERTE Einsätze mit Prioritäten
  callouts: Callout[] = [
    {
      id: 1,
      title: 'Technische Hilfeleistung',
      location: 'Bahnhofstraße 42, Musterhausen',
      time: '14:23',
      status: 'new',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'Hochwasser',
      location: 'Am Fluss 15, Wasserstadt',
      time: '13:45',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Verkehrsunfall',
      location: 'Autobahn A1, Km 234',
      time: '12:30',
      status: 'completed',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Brand',
      location: 'Industriestraße 78, Feuerstadt',
      time: '15:45',
      status: 'new',
      priority: 'high'
    }
  ];

  // Fahrzeuge-Daten
  vehicles: Vehicle[] = [
    { name: 'GKW 1', available: true },
    { name: 'GKW 2', available: false },
    { name: 'MLW', available: true },
    { name: 'FGr', available: false },
    { name: 'Anhänger', available: true },
    { name: 'TLF', available: true }
  ];

  // Personal-Daten
  personnel: Personnel[] = [
    { name: 'Max Mustermann', role: 'Gruppenführer', available: true },
    { name: 'Anna Schmidt', role: 'Maschinistin', available: false },
    { name: 'Tom Weber', role: 'Helfer', available: true },
    { name: 'Lisa Müller', role: 'Helferin', available: true },
    { name: 'Jan Klein', role: 'Truppführer', available: false },
    { name: 'Sarah Bauer', role: 'Rettungsassistentin', available: true }
  ];

  // Erweitertes Objekt für neuen Einsatz
  newCallout: Partial<Callout> = {
    title: '',
    location: '',
    priority: 'medium'
  };

  constructor() {
    // Zeit jede Sekunde aktualisieren
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString('de-DE');
    }, 1000);
  }

  // LÖSUNG AUFGABE 1: Status eines Einsatzes ändern (erweitert)
  updateCalloutStatus(calloutId: number, newStatus: 'in-progress' | 'completed') {
    const callout = this.callouts.find(c => c.id === calloutId);
    if (callout) {
      callout.status = newStatus;

      // Erweiterte Logik: Bei Start/Abschluss Ressourcen automatisch ändern
      if (newStatus === 'in-progress') {
        this.assignResourcesToCallout();
        console.log(`🚨 Einsatz ${calloutId} gestartet - Ressourcen zugewiesen`);
      } else if (newStatus === 'completed') {
        this.releaseResourcesFromCallout();
        console.log(`✅ Einsatz ${calloutId} abgeschlossen - Ressourcen freigegeben`);
      }
    }
  }

  // LÖSUNG AUFGABE 2: Erweiterte Einsatz-Erstellung
  addNewCallout() {
    if (this.isFormValid()) {
      const newId = Math.max(...this.callouts.map(c => c.id)) + 1;
      const currentTime = new Date().toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const newCalloutData: Callout = {
        id: newId,
        title: this.newCallout.title!,
        location: this.newCallout.location!,
        time: currentTime,
        status: 'new',
        priority: this.newCallout.priority || 'medium'
      };

      // Hohe Priorität an den Anfang
      if (newCalloutData.priority === 'high') {
        this.callouts.unshift(newCalloutData);
      } else {
        this.callouts.push(newCalloutData);
      }

      // Formular zurücksetzen
      this.cancelNewCallout();

      console.log(`🚨 Neuer ${newCalloutData.priority} Priorität Einsatz erstellt!`);
    }
  }

  // LÖSUNG AUFGABE 3: Fahrzeugstatus ändern
  toggleVehicleStatus(index: number) {
    this.vehicles[index].available = !this.vehicles[index].available;
    const status = this.vehicles[index].available ? 'verfügbar' : 'im Einsatz';
    console.log(`🚛 ${this.vehicles[index].name} ist jetzt ${status}`);
  }

  // BONUS: Personalstatus ändern
  togglePersonnelStatus(index: number) {
    this.personnel[index].available = !this.personnel[index].available;
    const status = this.personnel[index].available ? 'verfügbar' : 'im Einsatz';
    console.log(`👤 ${this.personnel[index].name} ist jetzt ${status}`);
  }

  // LÖSUNG AUFGABE 4: Filter-Toggle
  toggleFilter() {
    this.showOnlyNew = !this.showOnlyNew;
    console.log(`🔍 Filter: ${this.showOnlyNew ? 'Nur neue Einsätze' : 'Alle Einsätze'}`);
  }

  // LÖSUNG AUFGABE 4: Gefilterte Einsätze
  getFilteredCallouts(): Callout[] {
    if (this.showOnlyNew) {
      return this.callouts.filter(c => c.status === 'new');
    }
    return this.callouts.sort((a, b) => {
      // Sortierung: Priorität dann Status
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      const statusOrder = { 'new': 3, 'in-progress': 2, 'completed': 1 };

      if (a.priority !== b.priority) {
        return (priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium']);
      }
      return statusOrder[b.status] - statusOrder[a.status];
    });
  }

  // LÖSUNG AUFGABE 5: Einsatz löschen
  deleteCallout(calloutId: number) {
    const callout = this.callouts.find(c => c.id === calloutId);
    if (callout && callout.status === 'completed') {
      const confirmed = confirm(`Möchten Sie den Einsatz "${callout.title}" wirklich löschen?`);
      if (confirmed) {
        this.callouts = this.callouts.filter(c => c.id !== calloutId);
        console.log(`🗑️ Einsatz ${calloutId} gelöscht`);
      }
    }
  }

  // Hilfsmethoden
  getStatusText(status: string): string {
    const statusTexts = {
      'new': 'Neu',
      'in-progress': 'In Bearbeitung',
      'completed': 'Abgeschlossen'
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  }

  isFormValid(): boolean {
    return !!(this.newCallout.title && this.newCallout.location && this.newCallout.priority);
  }

  cancelNewCallout() {
    this.newCallout = { title: '', location: '', priority: 'medium' };
    this.showNewCalloutForm = false;
  }

  // Statistik-Methoden (erweitert)
  getTotalCallouts(): number {
    return this.callouts.length;
  }

  getActiveCallouts(): number {
    return this.callouts.filter(c =>
      c.status === 'new' || c.status === 'in-progress'
    ).length;
  }

  getCompletedCallouts(): number {
    return this.callouts.filter(c => c.status === 'completed').length;
  }

  getAvailableVehicles(): number {
    return this.vehicles.filter(v => v.available).length;
  }

  getAvailablePersonnel(): number {
    return this.personnel.filter(p => p.available).length;
  }

  // BONUS-Funktionen: Realistische Ressourcen-Verwaltung
  private assignResourcesToCallout() {
    // Simuliere automatische Ressourcenzuweisung
    const availableVehicle = this.vehicles.find(v => v.available);
    const availablePerson = this.personnel.find(p => p.available);

    if (availableVehicle && Math.random() > 0.3) {
      availableVehicle.available = false;
    }
    if (availablePerson && Math.random() > 0.3) {
      availablePerson.available = false;
    }
  }

  private releaseResourcesFromCallout() {
    // Simuliere Ressourcenfreigabe
    const busyVehicle = this.vehicles.find(v => !v.available);
    const busyPerson = this.personnel.find(p => !p.available);

    if (busyVehicle && Math.random() > 0.5) {
      busyVehicle.available = true;
    }
    if (busyPerson && Math.random() > 0.5) {
      busyPerson.available = true;
    }
  }
}
