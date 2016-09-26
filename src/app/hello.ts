import {Component} from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/map';

@Component({
  selector: 'fountain-app',
  template: require('./hello.html')
})
export class HelloComponent {
  public notes: any[] = [];
  public note: any = { dateTime: '12.12.1222' };

  private baseUrl = 'http://<BASE>/api';

  constructor(private http: Http) {

  }

  loadNotes() {
    this.http.get(`${this.baseUrl}`)
      .map(res => res.json())
      .subscribe(res => {
        this.notes = res.notes;
      });
  }

  saveNote(note: any): void {
    note.id = Math.random();
    this.notes.unshift(note);

    this.http.post(`${this.baseUrl}/addNote`, JSON.stringify(note))
      .map(res => res.json())
      .subscribe(res => {
        note.id = res.id;
        this.notes.unshift(note);
        this.note = {};
      });
  }

  deleteNote(note: any): void {
    this.notes = this.notes.filter(n => n.id !== note.id);

    this.http.post(`${this.baseUrl}/deleteNote`, note.id)
      .map(res => res.json())
      .subscribe(res => {
        this.notes = this.notes.filter(n => n.id !== note.id);
      });
  }
}
