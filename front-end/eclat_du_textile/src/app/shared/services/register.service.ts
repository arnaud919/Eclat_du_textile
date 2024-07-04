import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  
   register(user:AuthService): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }
}