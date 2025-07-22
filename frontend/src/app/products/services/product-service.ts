import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsAPI = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsAPI);
  }

  createProduct(product: Omit<ProductModel, '_id'>): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.productsAPI, product);
  }

  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.productsAPI}/${product._id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.productsAPI}/${id}`);
  }
}
