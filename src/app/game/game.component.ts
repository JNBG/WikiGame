import { Component, OnInit } from '@angular/core';
import {GameService} from "./game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
  showGameWindow: Boolean = false;
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.showGameWindow.subscribe(
      (showGameWindow: Boolean) => this.showGameWindow = showGameWindow
    );
  }

}
