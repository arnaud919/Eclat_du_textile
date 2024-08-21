import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiListResponse, ServiceProvision } from '../interfaces/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProvisionResponseService {

  private apiUrl = "http://127.0.0.1:8000/api/services";

  constructor(private http: HttpClient) { }

  fetchAllServicesProvision(): Observable<ApiListResponse> {
    return this.http.get<ApiListResponse>(this.apiUrl);
  }

  fetchOneServiceProvisionResponse(id:any){
    return this.http.get<ServiceProvision>(this.apiUrl+"/"+id);
  }
}
