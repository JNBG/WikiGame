import { Component, OnInit } from '@angular/core';
import { Article } from "../article.model";
import { GameService } from "../../game.service";

@Component({
  selector: 'app-goal-articles',
  templateUrl: './goal-articles.component.html',
  styleUrls: ['./goal-articles.component.css']
})

export class GoalArticlesComponent implements OnInit {
  private articles: Article[];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.articles = this.gameService.getArticles();
  }

  onCloseButtonClick() {
    this.gameService.showGoalArticles.emit(false);
  }

  onSelectGoalArticle(i: number) {
    this.gameService.setGoalArticle(this.articles[i]);
    this.gameService.goalArticleTitle.emit(this.articles[i].title);
    this.gameService.showGoalArticles.emit(false);
  }
}
