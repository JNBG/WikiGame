import { Component, OnInit } from '@angular/core';
import { GameHeaderService } from "../game-header.service";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Article } from "./goal-articles.model";


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-goal-articles',
  templateUrl: './goal-articles.component.html',
  styleUrls: ['./goal-articles.component.css']
})

export class GoalArticlesComponent implements OnInit {
  articles: Article[];
  selectedArticleID: number;

  constructor(private gameHeaderService: GameHeaderService, private http: Http) { }

  ngOnInit() {
    this.getArticles().subscribe(
      articles => this.articles = articles,
      err => { console.log(err) });
  }

  onCloseButtonClick() {
    this.gameHeaderService.chooseGoalArticle.emit(false);
  }

  getArticles() : Observable<Article[]> {
    return this.http.get("/src/app/game/game-header/goal-articles/goal-articles.json").map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  onSelectGoalArticle(i: number) {
    this.selectedArticleID = i;
  }
}
