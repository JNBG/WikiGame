import { Component, OnInit } from '@angular/core';
import { GameHeaderService } from "./game-header.service";
import { Article } from "./article.model";

import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {DataStorageService} from "../data-storage.service";


@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css'],
  providers: [GameHeaderService]
})
export class GameHeaderComponent implements OnInit {
  showGoalArticleOverlay: Boolean = false;

  stepCounter: string = "Stepcounter";
  goalArticleTitle: String = "Goal Article";
  startArticle: String = "Start Article";


  constructor(
    private gameHeaderService: GameHeaderService,
    private dataStorage: DataStorageService,
    private http: Http
  ) {}


  ngOnInit() {
    this.getArticles().subscribe(
      articles => this.dataStorage.setArticles(articles),
      err => { console.log(err) }
    );


    this.gameHeaderService.chooseGoalArticle.subscribe(
      (chooseGoalArticle: Boolean) => this.showGoalArticleOverlay = chooseGoalArticle
    );


    this.gameHeaderService.goalArticleTitle.subscribe(
      (goalArticle: string) => this.goalArticleTitle = goalArticle
    );
  }

  onChooseGoalArticle() {
    this.gameHeaderService.chooseGoalArticle.emit(true);
  }
  onChooseRandomGoalArticle() {
    var articles: Article[] = this.dataStorage.getArticles();
    var randomArticle: Article = articles[Math.floor(Math.random()*articles.length)];
    this.dataStorage.setGoalArticle(randomArticle);
    this.gameHeaderService.goalArticleTitle.emit(randomArticle.title);
    this.gameHeaderService.chooseGoalArticle.emit(false);
  }

  getArticles() : Observable<Article[]> {
    return this.http.get("/src/app/game/game-header/goal-articles/goal-articles.json").map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
