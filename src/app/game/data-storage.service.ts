import { Injectable } from '@angular/core';
import {Article} from "./game-header/article.model";

@Injectable()
export class DataStorageService {
  private articles: Article[];
  private selectedGoalArticle: Article;

  constructor() { }

  setArticles(articles: Article[]) {
    this.articles = articles;
  }
  getArticles() {
    return this.articles;
  }

  setGoalArticle(goalArticle: Article) {
    this.selectedGoalArticle = goalArticle;
  }
}
