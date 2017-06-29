import { Component, OnInit } from '@angular/core';
import {GameHeaderService} from "./game-header.service";

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css'],
  providers: [GameHeaderService]
})
export class GameHeaderComponent implements OnInit {
  showGoalArticleOverlay: Boolean = false;

  constructor(private gameHeaderService: GameHeaderService) { }

  ngOnInit() {
    this.gameHeaderService.chooseGoalArticle.subscribe(
      (chooseGoalArticle: Boolean) => this.showGoalArticleOverlay = chooseGoalArticle
    );
  }

  onChooseGoalArticle() {
    this.gameHeaderService.chooseGoalArticle.emit(true);
  }
}
