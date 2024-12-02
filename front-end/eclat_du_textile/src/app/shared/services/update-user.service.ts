import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  private apiUrl = `${environment.apiURL}/users`; // URL de base pour les utilisateurs

  constructor(private http: HttpClient) {}

  // Méthode pour mettre à jour un utilisateur
  updateUser(userId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
    });

    return this.http.patch(`${this.apiUrl}/${userId}`, updatedData, { headers });
  }

  // Méthode pour récupérer les données utilisateur (facultatif)
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
