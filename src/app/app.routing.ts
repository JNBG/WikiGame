import {RouterModule, Routes} from "@angular/router";
import {GameComponent} from "./game/game.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";


const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/play', pathMatch: 'full' },
  { path: 'play', component: GameComponent },
  { path: 'leaderboard', component: LeaderboardComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
