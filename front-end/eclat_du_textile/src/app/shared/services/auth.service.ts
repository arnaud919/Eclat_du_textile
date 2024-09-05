import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import jwt_decode from 'jwt-decode';

export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.url}api/login_check`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.roles.includes('ROLE_ADMIN');
    }
    return false;
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}