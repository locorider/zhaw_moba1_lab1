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

  public articleId: string = '22062348';
  public loadingComments: boolean = false;
  public comments: any[] = [];

  public prevArticleId: string = '22062348';

  constructor(private http: Http) {
    this.loadComments();

    Observable.interval(2000)
      .subscribe(() => {
        if(!this.loadingComments) {
          this.loadComments();
        }
      });
  }

  loadComments() {
    this.loadingComments = true;

    if(this.prevArticleId !== this.articleId) {
      console.log('articleId changed', this.prevArticleId, this.articleId);
      this.prevArticleId = this.articleId;
      this.comments = [];
    }

    if(this.articleId) {
      const url = `http://www.tagesanzeiger.ch/api/articles/${this.articleId}/comments`;

      this.http.get(url)
        .map(res => res.json())
        .map(res => res.comments.filter(c => -1 === this.comments.findIndex(comment => comment.id === c.id))
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()))
        .subscribe(newComments => {
          for(let newComment of newComments) {
            this.comments.unshift(newComment);
          }
          this.loadingComments = false;
        })
    } else {
      this.loadingComments = false;
    }
  }
}
