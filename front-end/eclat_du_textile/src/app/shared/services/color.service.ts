import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiListResponse } from '../interfaces/entities';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "http://127.0.0.1:8000/api/colors";
  
  constructor(private http: HttpClient) { }

  fetchAllColor(): Observable<ApiListResponse> {
    return this.http.get<ApiListResponse>(this.apiUrl);
  }

}
