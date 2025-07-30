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

  totalPrice: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.totalPrice = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }
  }

  onDelete(product: ProductWithQuantity) {
    this.delete.emit(product);
  }
}
