// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
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

  // Récupérer les données pour plusieurs IDs
  fetchCategoryArticlesByIds(ids: number[]): Observable<any[]> {
    // Créer une requête pour chaque ID
    const requests = ids.map((id) => this.http.get(`${this.apiUrl}/${id}`));
    return forkJoin(requests); // Exécuter les requêtes en parallèle
  }
}