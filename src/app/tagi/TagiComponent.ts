/**
 * Created by joser on 26.09.2016.
 */
import {Component} from '@angular/core';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/map';

@Component({
  template: require('./tagi.html'),
  selector: 'tagi'
})
export class TagiComponent {

  public comments: any[] = [];

  constructor(private http: Http) {
    this.loadComments();
  }


  loadComments() {
    const url = 'http://www.tagesanzeiger.ch/api/articles/22062348/comments';

    this.http.get(url)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.comments = res.comments;
      })
  }
}
