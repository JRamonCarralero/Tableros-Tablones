import { Component, signal } from '@angular/core';
import { OrdersFilter } from "../orders-filter/orders-filter";
import { OrdersList } from "../orders-list/orders-list";
import { OrderFilterParams, ProductWithQuantity } from "../../models/order-models";
import { ProductModel } from '../../../products/models/product-model';
import { OrdersProduct } from "../orders-product/orders-product";
import { CommonModule } from '@angular/common';
import { OrdersKart } from "../orders-kart/orders-kart";


@Component({
  selector: 'app-orders-view',
  imports: [OrdersFilter, OrdersList, OrdersProduct, CommonModule, OrdersKart],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.css'
})
export class OrdersView {
  currentFilter = signal<OrderFilterParams | null>(null);
  selectedProduct = signal<ProductModel | null>(null);
  currentOrdersList = signal<ProductWithQuantity[]>([]);

  onFilter(filter: OrderFilterParams) {
    if (filter.provider === null) {
      this.currentFilter.set(null);
      return;
    }
    this.currentFilter.set(filter);
  }

  onOrderProduct(product: ProductModel) {
    this.selectedProduct.set(product);
  }

  onCancelProduct() {
    this.selectedProduct.set(null);
  }

  onSaveProduct(data: ProductWithQuantity) {
    this.currentOrdersList.set([...this.currentOrdersList(), data]);
    console.log(this.currentOrdersList());
  }

  onDeleteOrder(product: ProductWithQuantity) {
    this.currentOrdersList.set(this.currentOrdersList().filter(p => p.product._id !== product.product._id));
  }
}
