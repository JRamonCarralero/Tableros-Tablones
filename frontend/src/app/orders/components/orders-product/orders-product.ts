import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { ProductModel } from '../../../products/models/product-model';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-product',
  imports: [CommonModule, ButtonModule, InputNumberModule, FormsModule],
  templateUrl: './orders-product.html',
  styleUrl: './orders-product.css'
})
export class OrdersProduct implements OnChanges {
  @Input() product?: ProductModel | null;

  @Output() save = new EventEmitter<any>();
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

  quantity: number = 0;
  prodPrice: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      console.log(this.product);
      this.currentProduct.set(this.product);
    }
  }

  onAddToOrder() {
    this.save.emit({ product: this.currentProduct(), quantity: this.quantity, price: this.prodPrice });
    this.resetCurrentProduct();
    this.cancel.emit();
  }

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
