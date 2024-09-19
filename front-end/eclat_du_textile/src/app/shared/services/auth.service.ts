import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  // Méthode de login pour envoyer les informations de connexion et récupérer le token JWT
  login(credentials: { email: string; password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.url}api/login_check`, credentials);
  }

  // Sauvegarder le token dans le localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Vérifier si l'utilisateur est connecté
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;  // Retourne true si un token est présent
  }

  // Vérifier si l'utilisateur est un admin en décodant le token JWT
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);  // Utilise 'jwt_decode' pour décoder le token
      return decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');
    }
    return false;
  }

  // Récupérer le token JWT depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Déconnecter l'utilisateur (supprimer le token et rediriger vers la page de login)
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);  // Rediriger vers la page de login
  }

  // Méthode pour décoder le token JWT et obtenir les informations utilisateur
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);  // Utilise 'jwt_decode' pour décoder le token
    }
    return null;
  }
}
