import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/RX';
import {DomSanitizer} from "@angular/platform-browser";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: [
    './game-window.component.css',
    './wiki-css.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class GameWindowComponent implements OnInit {
  html: any;

  randomArticleJSON: string = "https://en.wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit=1&rnnamespace=0&origin=*";
  articleURLwoID:string = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&origin=*&pageid=";
  articleURLwoTitle:string = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&origin=*&page=";
  articleURL: string = "";

  constructor(private http: Http, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    /*document.addEventListener("getNewArticleEvent", function(e){
      var title = document.getElementById("newArticleName").getAttribute("title");
      console.log(title);
      this.getNewWikipediaArticle(title);
    });*/
    this.getRandomWikipediaArticle().subscribe(
      resp => {
        this.articleURL = this.articleURLwoID + resp.query.random[0].id;
        this.getWikipediaArticle().subscribe(
          resp => {
            this.makeWorkingLinks(this.sanitizer.bypassSecurityTrustHtml(resp.parse.text['*']));
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

  getNewWikipediaArticle(){
    console.log(document.getElementById("newArticleName").getAttribute("title"));
    var title = document.getElementById("newArticleName").getAttribute("title");
    this.articleURL = this.articleURLwoTitle+title;
    console.log(this.articleURL);
    this.getWikipediaArticle().subscribe(
      resp => {
        console.log(resp);
        this.makeWorkingLinks(this.sanitizer.bypassSecurityTrustHtml(resp.parse.text['*']));
      },
      err => { console.log(err) }
    );
  }

  makeWorkingLinks(shtml: any){
    this.html = shtml;
    var aTags = document.getElementsByClassName("wg-game-window")[0].getElementsByTagName("A");
    setTimeout(() => {
      var titles = [];
      for(let i = 0; i <= aTags.length-1; i++) {

        var href = aTags[i].getAttribute("href")

        if (href.slice(0, 1) == "#") {
          titles.push("\""+href+"\"");
          aTags[i].removeAttribute("href");
          aTags[i].setAttribute("onclick", "window.location.hash = '"+href+"'")
        } else if (href.slice(0, 7) == "//tools" || href.slice(0, 3) == "/w/" || href.slice(0, 11) == "/wiki/File:" || href.slice(0, 11) == "/wiki/Help:" || href.slice(0, 15) == "/wiki/Template:" || href.slice(0, 20) == "/wiki/Template_Talk:" || href.slice(0, 21) == "//en.wikipedia.org/w/") {
          titles.push("\""+href+"\"");
          aTags[i].removeAttribute("href");
        } else if (href.slice(0, 8) == "https://" || href.slice(0, 7) == "http://" ) {
          titles.push("\""+href+"\"");
          aTags[i].setAttribute("target", "_blanc");
        } else {
          titles.push(href.slice(6));
          aTags[i].removeAttribute("href");

          aTags[i].addEventListener("click", function(){
            document.dispatchEvent(new CustomEvent("setNewArticleName"+i,{"detail": titles[i]}));
            return false
          });
          document.addEventListener("setNewArticleName"+i, function(e){
            document.getElementById("newArticleName").setAttribute("title",(<CustomEvent>e).detail);
            //document.dispatchEvent(new CustomEvent("getNewArticleEvent",{"detail": ""}));
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0,
              false, false, false, false, 0, null);

            var cb = document.getElementById("newArticleName");
            cb.dispatchEvent(evt);
          });
        }

      }

    },1000)
  }
}
