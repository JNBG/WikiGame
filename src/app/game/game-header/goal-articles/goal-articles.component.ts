import { Component, OnInit } from '@angular/core';
import { GameHeaderService } from "../game-header.service";
import { DataStorageService } from "../../data-storage.service";
import { Article } from "../article.model";

@Component({
  selector: 'app-goal-articles',
  templateUrl: './goal-articles.component.html',
  styleUrls: ['./goal-articles.component.css']
})

export class GoalArticlesComponent implements OnInit {
  private articles: Article[];

  constructor(
    private gameHeaderService: GameHeaderService,
    private dataStorage: DataStorageService
  ) { }

  ngOnInit() {
    this.articles = this.dataStorage.getArticles();
  }

  onCloseButtonClick() {
    this.gameHeaderService.chooseGoalArticle.emit(false);
  }

  onSelectGoalArticle(i: number) {
    this.dataStorage.setGoalArticle(this.articles[i]);
    this.gameHeaderService.goalArticleTitle.emit(this.articles[i].title);
    this.gameHeaderService.chooseGoalArticle.emit(false);
  }
}
