import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameComponent } from './game/game.component';
import { GameHeaderComponent } from './game/game-header/game-header.component';
import {routing} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    GameComponent,
    GameHeaderComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
