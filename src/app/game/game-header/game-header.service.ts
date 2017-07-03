import {EventEmitter} from "@angular/core";
import {Article} from "./goal-articles/goal-articles.model";

export class GameHeaderService {

  chooseGoalArticle = new EventEmitter<Boolean>();
  selectArticle = new EventEmitter<Article>();

}
