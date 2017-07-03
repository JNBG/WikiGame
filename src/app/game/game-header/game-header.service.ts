import {EventEmitter} from "@angular/core";

export class GameHeaderService {

  chooseGoalArticle = new EventEmitter<Boolean>();
  goalArticleTitle = new EventEmitter<string>();

}
