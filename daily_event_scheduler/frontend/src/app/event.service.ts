import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  start_time: number;
  end_time: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8080'; //Go backend URL

  constructor(private http: HttpClient) { }

  // Fetch events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/api/events`);
  }

  // Add an event
  addEvent(event: Event): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/api/events`, event, { headers });
  }

}
