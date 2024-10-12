import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../event.service';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.css'
})

export class EventManagerComponent implements OnInit {

  events: Event[] = [];
  newEvent: Event = { start_time: 0, end_time: 0 };
  errorMessage: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // Load all events
  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      console.log(data);      
      this.events = [...data];
    });
  }

  // Add new event
  addEvent() {
    this.eventService.addEvent(this.newEvent).subscribe({
      next: () => {
        this.loadEvents(); // Call loadEvents to fetch updated events after adding
        this.newEvent = { start_time: 0, end_time: 0 }; // Reset input
        this.errorMessage = ''; // Clear any previous error messages
        console.log(this.events)
      },
      error: (err) => {
        console.error('Error adding event:', err);
        if (err.error && err.error.error) {
          this.errorMessage = err.error.error; // Display error from backend if available
        } else {
            this.errorMessage = 'An unknown error occurred'; // Fallback error message
        }
      }
    });
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

}
