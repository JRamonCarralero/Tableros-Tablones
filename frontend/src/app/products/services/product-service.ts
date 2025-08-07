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

  /**
   * Gets all products.
   *
   * This function sends a GET request to the /products endpoint and returns an
   * Observable containing an array of ProductModel objects.
   *
   * @returns {Observable<ProductModel[]>} - An Observable containing an array of
   *   ProductModel objects.
   */
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsAPI);
  }

  /**
   * Creates a new product.
   *
   * This function sends a POST request to the /products endpoint and returns an
   * Observable containing the newly created ProductModel object.
   *
   * @param {Omit<ProductModel, '_id'>} product - The product details to be created.
   * @returns {Observable<ProductModel>} - An Observable containing the newly created ProductModel object.
   */
  createProduct(product: Omit<ProductModel, '_id'>): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.productsAPI, product);
  }

  /**
   * Updates an existing product.
   *
   * This function sends a PUT request to the /products endpoint with the product ID appended,
   * and returns an Observable containing the updated ProductModel object.
   *
   * @param {ProductModel} product - The product details to be updated, including the product ID.
   * @returns {Observable<ProductModel>} - An Observable containing the updated ProductModel object.
   */
  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.productsAPI}/${product._id}`, product);
  }

  /**
   * Deletes a product.
   *
   * This function sends a DELETE request to the /products endpoint with the product ID appended,
   * and returns an Observable containing no data.
   *
   * @param {string} id - The ID of the product to be deleted.
   * @returns {Observable<void>} - An Observable containing no data.
   */
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.productsAPI}/${id}`);
  }
}
