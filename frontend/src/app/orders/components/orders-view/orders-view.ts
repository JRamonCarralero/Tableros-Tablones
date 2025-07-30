import { Component, signal } from '@angular/core';
import { OrdersFilter } from "../orders-filter/orders-filter";
import { OrdersList } from "../orders-list/orders-list";
import { OrderFilterParams } from "../../models/order-models";
import { ProductModel } from '../../../products/models/product-model';
import { OrdersProduct } from "../orders-product/orders-product";
import { CommonModule } from '@angular/common';

interface ProductWithQuantity {
  product: ProductModel;
  quantity: number;
}

@Component({
  selector: 'app-orders-view',
  imports: [OrdersFilter, OrdersList, OrdersProduct, CommonModule],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.css'
})
export class OrdersView {
  currentFilter = signal<OrderFilterParams | null>(null);
  selectedProduct = signal<ProductModel | null>(null);

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
    console.log(data.product, data.quantity);
  }
}
