import {Component} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'fountain-app',
  template: require('./hello.html')
})
export class HelloComponent {
  public notes: any[] = [];
  public note: any = { dateTime: '12.12.1222' };
  public loadError: boolean = false;
  public loadingNotes: boolean = true;

  private baseUrl = 'http://160.85.39.212:8080/api';

  constructor(private http: Http) {
    Observable.interval(500)
      .subscribe(() => {
        if(!this.loadingNotes) {
          this.loadNotes();
        }
      });

  }

  loadNotes() {
    this.loadingNotes = true;

    this.http.get(`${this.baseUrl}/notes`)
      .map(res => res.json())
      .subscribe(res => {
        this.loadError = false;
        this.notes = res.notes;
        this.loadingNotes = false;
      }, err => {
        this.loadError = true
      });
  }

  saveNote(note: any): void {

    const query = new URLSearchParams();
    query.set('subject', note.subject);
    query.set('message', note.message);
    query.set('creator', note.creator);

    this.http.get(`${this.baseUrl}/addNote`, { search: query })
      .map(res => res.json())
      .subscribe(res => {
        note.id = res.id;
        this.notes.unshift(note);
        this.note = {};
      }, err => alert('Unable to save note. Server unreachable'));
  }

  deleteNote(note) {
    const query = new URLSearchParams();
    query.set('id', note.id);

    this.http.get(`${this.baseUrl}/deleteNote`, { search: query })
      .map(res => res.json())
      .subscribe(res => {
        this.notes = this.notes.filter(n => n.id !== note.id);
      });
  }
}
