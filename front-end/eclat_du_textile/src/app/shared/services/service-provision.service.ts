import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiListResponse } from '../interfaces/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProvisionService {

  private apiUrl = "http://127.0.0.1:8000/api/services"; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getJsonLdData(): Observable<ApiListResponse> {
    return this.http.get<ApiListResponse>(this.apiUrl);
  }
}
