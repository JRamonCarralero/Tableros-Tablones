import { Component, Input, OnChanges, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { OrderModel } from '../../models/order-models';

@Component({
  selector: 'app-orders-detail',
  imports: [],
  templateUrl: './orders-detail.html',
  styleUrl: './orders-detail.css'
})
export class OrdersDetail implements OnChanges {
  @Input() orders?: OrderModel[] | null;

  currentOrders = signal<OrderModel[]>([]);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders'] && this.orders) {
      this.currentOrders.set(this.orders);
    }
  }
}
