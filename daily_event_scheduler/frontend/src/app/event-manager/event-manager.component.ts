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

  // Validate the input before adding event
  validateInput(): boolean {
    // Ensure start_time and end_time are within [0, 23]
    if (this.newEvent.start_time < 0 || this.newEvent.start_time > 23 || this.newEvent.end_time < 0 || this.newEvent.end_time > 23) {
      this.errorMessage = 'Start time and End Time must be between 0 and 23.';
      return false;
    }

    // Ensure start_time is not greater than end_time
    if (this.newEvent.start_time > this.newEvent.end_time) {
      this.errorMessage = 'Start time cannot be greater than end time.';
      return false;
    }

    // Clear error message if everything is valid
    this.errorMessage = '';
    return true;
  }

  // Add new event
  addEvent() {
    if (!this.validateInput()) {
      return; // If input is invalid, stop the request
    }

    this.eventService.addEvent(this.newEvent).subscribe({
      next: () => {
        this.loadEvents(); // Call loadEvents to fetch updated events after adding
        this.newEvent = { start_time: 0, end_time: 0 }; // Reset input
        this.errorMessage = ''; // Clear any previous error messages
        console.log(this.events)
      },
      error: (err) => {
        console.error('Error adding event:', err);
        this.errorMessage = err.error?.error || 'An unknown error occurred'; // Fallback error message
      }
    });
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

}
