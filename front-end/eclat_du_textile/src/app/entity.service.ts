import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiListResponse } from './shared/interfaces/entities';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

/*   constructor(
    protected http: HttpClient, @Inject('baseUri') protected entityBaseUri: string
  ) { }

  fetchAllServicesProvision(): Observable<ApiListResponse<T>> {
    return this.http.get<ApiListResponse<T>>(
      `${environment.apiURL}${this.entityBaseUri}`
    );
  }

  fetch(id:number): Observable<T> {
    return this.http.get<T>(
      `${environment.apiURL}${this.entityBaseUri}/${id}`
    )
  } */
}
