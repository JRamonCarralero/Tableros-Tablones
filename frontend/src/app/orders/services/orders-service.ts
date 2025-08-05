import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../products/models/product-model';
import { OrderFilterParams, OrderModel, ProductWithQuantity } from "../models/order-models";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private productsAPI = 'http://localhost:3000/products';
  private ordersAPI = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  getFilteredProducts(filters: OrderFilterParams): Observable<ProductModel[]> {
    let params = new HttpParams();

    if (filters.provider) params = params.append('provider', filters.provider);
    if (filters.name) params = params.append('name', filters.name);

    return this.http.get<ProductModel[]>(`${this.productsAPI}/filters`, { params });
  }

  createOrder(products: ProductWithQuantity[]): Observable<OrderModel> {
    const newOrder: Omit<OrderModel, '_id'> = {
      products: products,
      provider: '',
      user: '',
      date: new Date()
    }
    return this.http.post<OrderModel>(this.ordersAPI, newOrder);
  }

  getOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.ordersAPI);
  }
}
