import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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
export class OrdersKart {
  @Input() products: ProductWithQuantity[] = [];

  @Output() delete = new EventEmitter<ProductWithQuantity>();

  onDelete(product: ProductWithQuantity) {
    this.delete.emit(product);
  }
}
