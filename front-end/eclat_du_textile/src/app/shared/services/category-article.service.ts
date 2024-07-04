// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryArticleEntitie } from '../interfaces/entities';

@Injectable({
  providedIn: 'root'
})

export class CategoryArticleService {

  CategoryArticleUrl = "http://127.0.0.1:8000/api/category_articles";
  constructor(private http: HttpClient) { }

  fetchAllCategoryArticle(): Observable<categoryArticleEntitie[]> {
    return this.http.get<categoryArticleEntitie[]>(this.CategoryArticleUrl);
  }

}