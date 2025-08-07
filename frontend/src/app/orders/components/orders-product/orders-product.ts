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

  /**
   * Responds to changes in the input properties.
   * Specifically, it updates the currentProduct signal whenever the product input property changes.
   * This function is called every time the user navigates to a different product in the product list.
   *
   * @param changes - An object of current and previous property values.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      console.log(this.product);
      this.currentProduct.set(this.product);
    }
  }

  /**
   * Emits a save event with the current product, quantity and price.
   * Then resets the current product to its initial state.
   * Finally emits a cancel event.
   */
  onAddToOrder() {
    this.save.emit({ product: this.currentProduct(), quantity: this.quantity, price: this.prodPrice });
    this.resetCurrentProduct();
    this.cancel.emit();
  }

  /**
   * Resets the current product to its initial state and emits a cancel event.
   * This function is typically called when a user wants to cancel the current product
   * selection and return to the previous state.
   */
  onCancel() {
    this.resetCurrentProduct();
    this.cancel.emit();
  }

  /**
   * Resets the current product to its initial state.
   * This function is typically called when a user wants to cancel the current product
   * selection and return to the previous state.
   */
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
