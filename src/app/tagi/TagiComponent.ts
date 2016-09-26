/**
 * Created by joser on 26.09.2016.
 */
import {Component} from '@angular/core';
import {Http, Headers} from "@angular/http";

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Component({
  template: require('./tagi.html'),
  selector: 'tagi'
})
export class TagiComponent {

  public loadingComments: boolean = false;
  public comments: any[] = [];

  constructor(private http: Http) {
    Observable.interval(2000)
      .subscribe(() => {
        if(!this.loadingComments) {
          this.loadComments();
        }
      });
  }


  loadComments() {
    this.loadingComments = true;
    const url = 'http://www.tagesanzeiger.ch/api/articles/22062348/comments';

    this.http.get(url)
      .map(res => res.json())
      .subscribe(res => {
        const newComments = res.comments.filter(c => -1 === this.comments.findIndex(comment => comment.id === c.id))
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        for(let newComment of newComments) {
          this.comments.unshift(newComment);
        }
        this.loadingComments = false;
      })
  }
}
