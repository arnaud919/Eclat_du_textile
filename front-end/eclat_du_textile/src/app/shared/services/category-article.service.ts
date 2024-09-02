// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiListResponse, CategoryArticle } from '../interfaces/entities';

@Injectable({
  providedIn: 'root'
})

export class CategoryArticleService {

  apiUrl = "http://127.0.0.1:8000/api/category_articles";
  
  constructor(private http: HttpClient) { }

  fetchAllCategoryArticle(): Observable<ApiListResponse> {
    return this.http.get<ApiListResponse>(this.apiUrl);
  }

}