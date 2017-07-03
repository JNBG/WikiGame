import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameComponent } from './game/game.component';
import { GameHeaderComponent } from './game/game-header/game-header.component';
import {routing} from "./app.routing";
import { GoalArticlesComponent } from './game/game-header/goal-articles/goal-articles.component';
import {HttpModule} from "@angular/http";
import { GameWindowComponent } from './game/game-window/game-window.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    GameComponent,
    GameHeaderComponent,
    GoalArticlesComponent,
    GameWindowComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
