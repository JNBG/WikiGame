import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageContentComponent } from './page-content/page-content.component';
import { LeaderboardComponent } from './page-content/leaderboard/leaderboard.component';
import { GameComponent } from './page-content/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageContentComponent,
    LeaderboardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
