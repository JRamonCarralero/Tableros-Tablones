import { Component } from '@angular/core';
import { OrdersFilter } from "../orders-filter/orders-filter";

interface OrderFilterParams {
  provider: string | null;
  name: string | null;
}

@Component({
  selector: 'app-orders-view',
  imports: [OrdersFilter],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.css'
})
export class OrdersView {
  currentFilter: OrderFilterParams | null = null;

  onFilter(filter: OrderFilterParams) {
    this.currentFilter = filter;

    console.log(filter);
  }
}
