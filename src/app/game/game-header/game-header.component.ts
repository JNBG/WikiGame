import { Component, OnInit } from '@angular/core';
import {GameHeaderService} from "./game-header.service";
import {Article} from "./goal-articles/goal-articles.model";
import {GoalArticlesComponent} from "./goal-articles/goal-articles.component";

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css'],
  providers: [GameHeaderService]
})
export class GameHeaderComponent implements OnInit {
  showGoalArticleOverlay: Boolean = false;

  selectedArticle: Article;

  stepCounter: string = "Stepcounter";
  goalArticle: string = "Goal Article";
  startArticle: string = "Starting Article";

  constructor(private gameHeaderService: GameHeaderService) { }

  ngOnInit() {
    this.gameHeaderService.chooseGoalArticle.subscribe(
      (chooseGoalArticle: Boolean) => this.showGoalArticleOverlay = chooseGoalArticle
    );
    this.gameHeaderService.selectArticle.subscribe(
      (selectArticle: Article) => {this.selectedArticle = selectArticle; this.goalArticle = this.selectedArticle.title;}
    );

  }

  onChooseGoalArticle() {
    this.gameHeaderService.chooseGoalArticle.emit(true);
  }
  onChooseRandomGoalArticle() {
    // TODO: get random article from goalArticleComponent
    this.gameHeaderService.chooseGoalArticle.emit(false);
  }

}
