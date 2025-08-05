import { Component, signal } from '@angular/core';
import { OrdersFilter } from "../orders-filter/orders-filter";
import { OrderFilterParams, ProductWithQuantity } from "../../models/order-models";
import { OrdersProductList } from "../orders-product-list/orders-product-list";
import { ProductModel } from '../../../products/models/product-model';
import { OrdersProduct } from "../orders-product/orders-product";
import { CommonModule } from '@angular/common';
import { OrdersKart } from "../orders-kart/orders-kart";
import { OrdersService } from '../../services/orders-service';
import { ButtonModule } from 'primeng/button';
import { OrdersList } from "../orders-list/orders-list";

@Component({
  selector: 'app-orders-view',
  imports: [OrdersFilter, OrdersProduct, CommonModule, OrdersKart, ButtonModule, OrdersProductList, OrdersList],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.css'
})
export class OrdersView {
  currentFilter = signal<OrderFilterParams | null>(null);
  selectedProduct = signal<ProductModel | null>(null);
  currentOrdersList = signal<ProductWithQuantity[]>([]);

  showList: boolean = true

  constructor(private orderService: OrdersService) { }

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

  onCancelOrder() {
    this.currentOrdersList.set([]);
  }

  onConfirmOrder() {
    console.log(this.currentOrdersList());
    this.orderService.createOrder(this.currentOrdersList()).subscribe(() => {
      this.currentOrdersList.set([]);
      alert('Pedido realizado con exito');
    });
  }

  onShowList() {
    this.showList = !this.showList;
  }
}
