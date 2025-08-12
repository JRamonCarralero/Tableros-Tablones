import { Component, OnInit, signal } from '@angular/core';
import { OrderModel } from '../../models/order-models';
import { OrdersService } from '../../services/orders-service';
import { CommonModule } from '@angular/common';
import { OrdersDetail } from '../orders-detail/orders-detail';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule, OrdersDetail],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css'
})
export class OrdersList implements OnInit {

  orders = signal<OrderModel[]>([]);

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.orderService.getOrders().subscribe(
      list => this.orders.set(list)
    );
  }
}
