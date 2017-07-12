import { Component, OnInit } from '@angular/core';
import { Article } from "./article.model";
import { GameService } from "../game.service";

import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements OnInit {
  showGoalArticles: Boolean = false;

  stepCounter: string = "Stepcounter";
  goalArticleTitle: String = "Goal Article";
  startArticle: String = "Start Article";


  constructor(
    private gameService: GameService,
    private http: Http
  ) {}


  ngOnInit() {
    this.getArticles().subscribe(
      articles => this.gameService.setArticles(articles),
      err => { console.log(err) }
    );

    this.gameService.showGoalArticles.subscribe(
      (chooseGoalArticle: Boolean) => this.showGoalArticles = chooseGoalArticle
    );

    this.gameService.goalArticleTitle.subscribe(
      (goalArticle: string) => this.goalArticleTitle = goalArticle
    );
    this.gameService.stepCounter.subscribe(
      (step: string) => this.stepCounter = step
    );
    this.gameService.startArticleTitle.subscribe(
      (title: string) => this.startArticle = title
    );
  }

  onChooseGoalArticle() {
    this.gameService.showGoalArticles.emit(true);
  }
  onChooseRandomGoalArticle() {
    var articles: Article[] = this.gameService.getArticles();
    var randomArticle: Article = articles[Math.floor(Math.random()*articles.length)];
    this.gameService.setGoalArticle(randomArticle);
    this.gameService.goalArticleTitle.emit(randomArticle.title);
    this.gameService.showGoalArticles.emit(false);
  }

  getArticles() : Observable<Article[]> {
    return this.http.get("/src/app/game/game-header/goal-articles/goal-articles.json").map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  onStartGame() {
    // is GoalArticle set?
    if (this.gameService.getSelectedGoalArticle() != null){
      this.gameService.showGameWindow.emit(true);
    } else {
      window.alert('Choose Goal Article first!')
    }
  }

  onResetGame() {
    this.gameService.showGameWindow.emit(false);
    this.gameService.stepCounter.emit("Stepcounter");
  }

}
