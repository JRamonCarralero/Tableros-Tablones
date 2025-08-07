import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProductWithQuantity } from '../../models/order-models';
import { TableModule } from "primeng/table";
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders-kart',
  imports: [TableModule, IconFieldModule, ButtonModule],
  templateUrl: './orders-kart.html',
  styleUrl: './orders-kart.css'
})
export class OrdersKart implements OnChanges {
  @Input() products: ProductWithQuantity[] = [];

  @Output() delete = new EventEmitter<ProductWithQuantity>();
  @Output() cancelOrder = new EventEmitter<void>();
  @Output() confirmOrder = new EventEmitter<void>();

  totalPrice: number = 0;

  /**
   * Responds to changes in the input properties.
   * Specifically, it updates the totalPrice whenever the products list changes.
   * Calculates the total price by summing up the price multiplied by quantity for each product.
   *
   * @param changes - An object of current and previous property values.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.totalPrice = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }
  }

  /**
   * Emits a delete event for the specified product.
   * This function is typically called when a user wants to remove a product from the order.
   *
   * @param product - The product with quantity to be deleted from the order.
   */
  onDelete(product: ProductWithQuantity) {
    this.delete.emit(product);
  }

  /**
   * Emits a cancel order event.
   * This function is typically called when a user wants to cancel the entire order.
   */
  onCancel() {
    this.cancelOrder.emit();
  }

  /**
   * Emits a confirm order event.
   * This function is typically called when a user wants to confirm the entire order.
   */
  onConfirm() {
    this.confirmOrder.emit();
  }
}
