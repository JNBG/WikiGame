import { Component, OnInit } from '@angular/core';

import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/RX';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css']
})
export class GameWindowComponent implements OnInit {
  articleHTML: string;

  randomArticleURL: string = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=10&origin=*";

  constructor(private http: Http) { }

  // TODO: use this.getWikipediaArticles().map().subscribe to map the json to html ; maybe in a function
  ngOnInit() {
    this.getWikipediaArticles().subscribe(
      articleHTML => {this.articleHTML = articleHTML; console.log(articleHTML)},
      err => { console.log(err) }
    );
  }

  getWikipediaArticles() : Observable<any> {

    let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.randomArticleURL).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
