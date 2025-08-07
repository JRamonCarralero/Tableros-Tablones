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

  /**
   * Updates the current filter based on the provided filter parameters.
   * If the provider in the filter is null, the current filter is reset.
   * Otherwise, the current filter is set to the provided filter.
   *
   * @param filter - The filter parameters containing provider and name.
   */
  onFilter(filter: OrderFilterParams) {
    if (filter.provider === null) {
      this.currentFilter.set(null);
      return;
    }
    this.currentFilter.set(filter);
  }

  /**
   * Sets the selected product to the specified product.
   * This method is typically called when a user selects a product
   * from the product list, updating the selectedProduct signal.
   *
   * @param product - The product to be set as selected.
   */
  onOrderProduct(product: ProductModel) {
    this.selectedProduct.set(product);
  }

  /**
   * Resets the selected product to null, effectively cancelling
   * the current product selection.
   */
  onCancelProduct() {
    this.selectedProduct.set(null);
  }

  /**
   * Adds a product with its quantity to the current order list.
   * This method is typically called when a user saves the product after selection,
   * updating the currentOrdersList signal with the new product data.
   *
   * @param data - The product with quantity and price details to be added to the order list.
   */
  onSaveProduct(data: ProductWithQuantity) {
    this.currentOrdersList.set([...this.currentOrdersList(), data]);
    console.log(this.currentOrdersList());
  }

  /**
   * Removes a product from the current order list.
   * This method is typically called when a user wants to remove a product from the order.
   * It filters out the product from the current order list based on the product id.
   * @param product - The product to be removed from the order list.
   */
  onDeleteOrder(product: ProductWithQuantity) {
    this.currentOrdersList.set(this.currentOrdersList().filter(p => p.product._id !== product.product._id));
  }

  /**
   * Resets the current order list to an empty array, effectively canceling
   * the entire order.
   */
  onCancelOrder() {
    this.currentOrdersList.set([]);
  }

  /**
   * Emits a confirm order event.
   * This function is typically called when a user wants to confirm the entire order.
   * It sends a request to the server to create an order with the current products and provider.
   * If the request is successful, it resets the order list to an empty array and shows a success alert.
   */
  onConfirmOrder() {
    console.log(this.currentOrdersList());
    this.orderService.createOrder(this.currentOrdersList(), this.currentFilter()?.provider!).subscribe(() => {
      this.currentOrdersList.set([]);
      alert('Pedido realizado con exito');
    });
  }

  /**
   * Toggles the showList flag, which is used to show/hide the product list.
   * This method is typically called when a user wants to show/hide the product list.
   */
  onShowList() {
    this.showList = !this.showList;
  }
}
