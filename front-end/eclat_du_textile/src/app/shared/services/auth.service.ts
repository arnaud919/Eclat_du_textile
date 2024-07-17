import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

export interface IToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<IToken> {
    return this.http.post<IToken>(`${this.url}api/login_check`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}