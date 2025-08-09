import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ProductModel } from '../../../products/models/product-model';

@Component({
  selector: 'app-orders-product-detail',
  imports: [],
  templateUrl: './orders-product-detail.html',
  styleUrl: './orders-product-detail.css'
})
export class OrdersProductDetail implements OnChanges {
  @Input() product?: ProductModel;

  currentProduct = signal<ProductModel>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    featured: false,
    type: '',
    height: 0,
    width: 0,
    thickness: 0,
    provider: ''
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.currentProduct.set(this.product);
    }
  }
}
