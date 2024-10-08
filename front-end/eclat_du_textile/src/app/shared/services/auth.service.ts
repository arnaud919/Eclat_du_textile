import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";

export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) { }

  // Méthode pour inscrire un utilisateur
  registerUser(userData: any): Observable<any> {
    const url = `${this.url}api/customers`;  // Endpoint d'inscription
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post<any>(url, userData, { headers });
  }

  // Méthode de login pour envoyer les informations de connexion et récupérer le token JWT
  login(credentials: { email: string; password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.url}api/login_check`, credentials);
  }

  // Sauvegarder le token dans le sessionStorage
  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Vérifier si l'utilisateur est connecté
  isLogged(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  // Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');
    }
    return false;
  }

  // Récupérer le token JWT depuis le sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Déconnecter l'utilisateur
  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  // Décoder le token JWT
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
