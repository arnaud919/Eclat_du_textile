import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = environment.apiURL;

  constructor(private http: HttpClient) {}
  
   register(user:AuthService): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }
}