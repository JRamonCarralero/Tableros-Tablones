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

  /**
   * Retrieves all providers.
   *
   * This function sends a GET request to the /providers endpoint and returns an
   * Observable containing an array of ProviderModel objects.
   *
   * @returns {Observable<ProviderModel[]>} - An Observable containing an array of ProviderModel objects.
   */
  getAllProviders(): Observable<ProviderModel[]> {
    return this.http.get<ProviderModel[]>(this.productsAPI);
  }

  /**
   * Creates a new provider.
   *
   * This function sends a POST request to the /providers endpoint and returns an
   * Observable containing the newly created ProviderModel object.
   *
   * @param {Omit<ProviderModel, '_id'>} provider - The provider to be created.
   * @returns {Observable<ProviderModel>} - An Observable containing the newly created ProviderModel object.
   */
  createProvider(provider: Omit<ProviderModel, '_id'>): Observable<ProviderModel> {
    return this.http.post<ProviderModel>(this.productsAPI, provider);
  }

  /**
   * Updates an existing provider.
   *
   * This function sends a PUT request to the /providers endpoint with the provider ID appended,
   * and returns an Observable containing the updated ProviderModel object.
   *
   * @param {ProviderModel} provider - The provider to be updated.
   * @returns {Observable<ProviderModel>} - An Observable containing the updated ProviderModel object.
   */
  updateProvider(provider: ProviderModel): Observable<ProviderModel> {
    return this.http.put<ProviderModel>(`${this.productsAPI}/${provider._id}`, provider);
  }

  /**
   * Deletes a provider.
   *
   * This function sends a DELETE request to the /providers endpoint with the provider ID appended,
   * and returns an Observable containing no data.
   *
   * @param {string} id - The ID of the provider to be deleted.
   * @returns {Observable<void>} - An Observable containing no data.
   */
  deleteProvider(id: string): Observable<void> {
    return this.http.delete<void>(`${this.productsAPI}/${id}`);
  }
}
