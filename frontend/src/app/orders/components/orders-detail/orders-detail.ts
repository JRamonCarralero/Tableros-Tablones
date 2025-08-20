import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { OrderModelWithProvider } from '../../models/order-models';
import { DatePipe, CommonModule } from '@angular/common';
import { OrdersProductDetail } from '../orders-product-detail/orders-product-detail';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-orders-detail',
  imports: [CommonModule, DatePipe, OrdersProductDetail, SharedModule],
  templateUrl: './orders-detail.html',
  styleUrl: './orders-detail.css'
})
export class OrdersDetail implements OnChanges {
  @Input() order?: OrderModelWithProvider | null;

  currentOrder = signal<OrderModelWithProvider>({ _id: '', products: [], provider: { _id: '', name: '', email: '', address: '', phone: ''}, user: '', date: new Date() });
  total = signal<number>(0);

  showTable: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && this.order) {
      this.currentOrder.set(this.order);
      this.total.set(this.order.products.reduce((total, product) => total + product.price * product.quantity, 0));
    }
  }

  showProductTable() {
    this.showTable = !this.showTable;
  }
}
