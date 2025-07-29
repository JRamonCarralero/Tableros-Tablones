import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { OrderFilterParams } from "../../models/order-models";
import { OrdersService } from '../../services/orders-service';
import { ProductModel } from '../../../products/models/product-model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders-list',
  imports: [TableModule, ButtonModule],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css'
})
export class OrdersList implements OnChanges{
  @Input() currentFilters?: OrderFilterParams | null;

  @Output() orderProduct = new EventEmitter<any>();

  products = signal<ProductModel[]>([]);

  constructor(private orderService: OrdersService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentFilters'] && this.currentFilters) {
      this.orderService.getFilteredProducts(this.currentFilters).subscribe({
        next: (list) => {
          this.products.set(list);
          console.log('Inside ngOnChanges');
        },
        error: (err) => console.error(err),
        complete: () => console.log('Complete', this.products())
      })
    }
  }

  onOrderProduct(product: ProductModel) {
    this.orderProduct.emit(product);
  }
}
