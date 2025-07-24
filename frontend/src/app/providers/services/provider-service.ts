import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderModel } from '../models/provider-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private productsAPI = 'http://localhost:3000/providers';

  constructor(private http: HttpClient) { }

  getAllProviders(): Observable<ProviderModel[]> {
    return this.http.get<ProviderModel[]>(this.productsAPI);
  }

  createProvider(provider: Omit<ProviderModel, '_id'>): Observable<ProviderModel> {
    return this.http.post<ProviderModel>(this.productsAPI, provider);
  }

  updateProvider(provider: ProviderModel): Observable<ProviderModel> {
    return this.http.put<ProviderModel>(`${this.productsAPI}/${provider._id}`, provider);
  }

  deleteProvider(id: string): Observable<void> {
    return this.http.delete<void>(`${this.productsAPI}/${id}`);
  }
}
