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
  public note: any = { };
  public loadError: boolean = false;
  public loadingNotes: boolean = false;
  public loadedFirstTime: boolean = false;

  private baseUrl = 'http://srv-lab-t-968.zhaw.ch:8080/api/';

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

    this.http.get(`${this.baseUrl}notes`)
      .map(res => res.json())
      .subscribe(res => {
        const newNotes = res.notes.filter(n => -1 === this.notes.findIndex(n0 => n0.id === n.id));

        for(let newNote of newNotes) {
          this.notes.unshift(newNote);
          this.notes.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
            .reverse();
        }
        this.loadError = false;
        this.loadedFirstTime = true;
        this.loadingNotes = false;
      }, err => {
        this.loadError = true;
        this.loadingNotes = false;
      });
  }

  saveNote(note: any): void {

    const query = new URLSearchParams();
    query.set('subject', note.subject);
    query.set('message', note.message);
    query.set('creator', note.creator);

    this.http.get(`${this.baseUrl}addNote`, { search: query })
      .map(res => res.json())
      .subscribe(res => {
        note.dateTime = new Date();
        note.id = res.id;
        this.notes.unshift(note);
        this.note = {};
      }, err => alert('Unable to save note. Server unreachable'));
  }

  deleteNote(note) {
    const query = new URLSearchParams();
    query.set('id', note.id);

    this.http.get(`${this.baseUrl}deleteNote`, { search: query })
      .map(res => res.json())
      .subscribe(res => {
        this.notes = this.notes.filter(n => n.id !== note.id);
      });
  }
}
