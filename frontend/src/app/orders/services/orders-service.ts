import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../products/models/product-model';
import { OrderFilterParams, OrderModel, OrderModelWithProvider, ProductWithQuantity } from "../models/order-models";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private productsAPI = 'http://localhost:3000/products';
  private ordersAPI = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  /**
   * Gets filtered products.
   *
   * This function receives a filters object, builds query parameters from it,
   * calls the model to find products that match the given filters in the database,
   * and returns the matching product data.
   *
   * @param {OrderFilterParams} filters - The filters to apply for retrieving products.
   * @returns {Observable<Array>} - A promise containing an array of filtered product data.
   */
  getFilteredProducts(filters: OrderFilterParams): Observable<ProductModel[]> {
    let params = new HttpParams();

    if (filters.provider) params = params.append('provider', filters.provider);
    if (filters.name) params = params.append('name', filters.name);

    return this.http.get<ProductModel[]>(`${this.productsAPI}/filters`, { params });
  }

  createOrder(products: ProductWithQuantity[], provider: string): Observable<OrderModel> {
    const newOrder: Omit<OrderModel, '_id'> = {
      products: products,
      provider: provider,
      user: '',
      date: new Date()
    }
    return this.http.post<OrderModel>(this.ordersAPI, newOrder);
  }

  getOrders(): Observable<OrderModelWithProvider[]> {
    return this.http.get<OrderModelWithProvider[]>(this.ordersAPI);
  }
}
