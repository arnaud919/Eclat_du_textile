import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiListResponse } from '../interfaces/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeMaterialService {

  apiUrl = "http://127.0.0.1:8000/api/type_materials";
  
  constructor(private http: HttpClient) { }

  fetchAllTypeMaterials(): Observable<ApiListResponse> {
    return this.http.get<ApiListResponse>(this.apiUrl);
  }
}
