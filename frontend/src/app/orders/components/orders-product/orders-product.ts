import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { ProductModel } from '../../../products/models/product-model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders-product',
  imports: [ButtonModule],
  templateUrl: './orders-product.html',
  styleUrl: './orders-product.css'
})
export class OrdersProduct implements OnChanges {
  @Input() product?: ProductModel | null;

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

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
  });

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      console.log(this.product);
      this.currentProduct.set(this.product);
    }
  }

  onSave() {}

  onCancel() {
    this.resetCurrentProduct();
    this.cancel.emit();
  }

  resetCurrentProduct() {
    this.currentProduct.set({
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
    });
  }
}
