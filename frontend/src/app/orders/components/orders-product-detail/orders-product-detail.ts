import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ProductWithQuantity } from '../../models/order-models';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-orders-product-detail',
  imports: [SharedModule],
  templateUrl: './orders-product-detail.html',
  styleUrl: './orders-product-detail.css'
})
export class OrdersProductDetail implements OnChanges {
  @Input() products?: ProductWithQuantity[];

  currentProducts = signal<ProductWithQuantity[]>([]);

  totalPrice: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.currentProducts.set(this.products);
      this.totalPrice = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }
  }
}
