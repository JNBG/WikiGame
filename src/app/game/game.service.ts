import {EventEmitter, Injectable} from '@angular/core';
import {Article} from "./game-header/article.model";

@Injectable()
export class GameService {
  private articles: Article[];
  private selectedGoalArticle: Article;

  showGoalArticles = new EventEmitter<Boolean>();
  goalArticleTitle = new EventEmitter<string>();

  showGameWindow = new EventEmitter<Boolean>();

  constructor() { }

  setArticles(articles: Article[]) {
    this.articles = articles;
  }
  getArticles() {
    return this.articles;
  }
  getSelectedGoalArticle(){
    return this.selectedGoalArticle;
  }

  setGoalArticle(goalArticle: Article) {
    this.selectedGoalArticle = goalArticle;
  }
}
