import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { OrderFilterParams } from "../../models/order-models";
import { OrdersService } from '../../services/orders-service';
import { ProductModel } from '../../../products/models/product-model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders-product-list',
  imports: [TableModule, ButtonModule],
  templateUrl: './orders-product-list.html',
  styleUrl: './orders-product-list.css'
})
export class OrdersProductList implements OnChanges {
  @Input() currentFilters?: OrderFilterParams | null;

  @Output() orderProduct = new EventEmitter<any>();

  products = signal<ProductModel[]>([]);

  constructor(private orderService: OrdersService) { }

  /**
   * Responds to changes in the input properties.
   * Specifically, it updates the products when the currentFilters input property changes.
   * The products are then used to populate the product table in the component template.
   *
   * @param changes - An object of current and previous property values.
   */
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

/**
 * Emits an orderProduct event for the specified product.
 * This function is typically called when a user wants to order a product from the list.
 *
 * @param product - The product to be ordered.
 */
  onOrderProduct(product: ProductModel) {
    this.orderProduct.emit(product);
  }
}
