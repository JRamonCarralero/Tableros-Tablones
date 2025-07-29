import { Component, signal } from '@angular/core';
import { OrdersFilter } from "../orders-filter/orders-filter";
import { OrdersList } from "../orders-list/orders-list";
import { OrderFilterParams } from "../../models/order-models";
import { ProductModel } from '../../../products/models/product-model';

@Component({
  selector: 'app-orders-view',
  imports: [OrdersFilter, OrdersList],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.css'
})
export class OrdersView {
  currentFilter = signal<OrderFilterParams | null>(null);

  onFilter(filter: OrderFilterParams) {
    if (filter.provider === null) {
      this.currentFilter.set(null);
      return;
    }
    this.currentFilter.set(filter);
  }

  onOrderProduct(product: ProductModel) {
    console.log(product);
  }
}
