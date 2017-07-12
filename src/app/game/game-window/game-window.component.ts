import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/RX';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameWindowComponent implements OnInit {
  html: any;

  randomArticleJSON: string = "https://en.wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit=1&rnnamespace=0&origin=*";
  articleURLwoName:string = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&origin=*&pageid=";
  articleURL: string = "";

  constructor(private http: Http, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.getRandomWikipediaArticle().subscribe(
      resp => {
        this.articleURL = this.articleURLwoName + resp.query.random[0].id;
        this.getWikipediaArticle().subscribe(
          resp => {
            console.log(resp);
            this.html = this.sanitizer.bypassSecurityTrustHtml(resp.parse.text['*']);
            console.log(this.html);

          },
          err => { console.log(err) }
        );
        },
      err => { console.log(err) }
    );
  }
  getRandomWikipediaArticle(): Observable<any> {
    return this.http.get(this.randomArticleJSON).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getWikipediaArticle() : Observable<any> {
    return this.http.get(this.articleURL).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
