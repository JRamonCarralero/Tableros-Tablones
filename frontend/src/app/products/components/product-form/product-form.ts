import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { ProductModel } from '../../models/product-model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnChanges {

  @Input() selectedProduct?: ProductModel;

  @Output() create = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  productForm = new FormGroup({
    _id: new FormControl<string | null>(null),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    stock: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    featured: new FormControl<boolean>(false),
    type: new FormControl<string>('', Validators.required),
    height: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    width: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    thickness: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
  });

  constructor(private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProduct'] && this.selectedProduct) {
      this.productForm.patchValue(this.selectedProduct);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const _id = this.productForm.get('_id')?.value as string | null;
    const name = this.productForm.get('name')?.value as string;
    const description = this.productForm.get('description')?.value as string;
    const price = this.productForm.get('price')?.value as number;
    const stock = this.productForm.get('stock')?.value as number;
    const featured = this.productForm.get('featured')?.value as boolean;
    const type = this.productForm.get('type')?.value as string;
    const height = this.productForm.get('height')?.value as number;
    const width = this.productForm.get('width')?.value as number;
    const thickness = this.productForm.get('thickness')?.value as number;

    if (_id) {
      this.productService.updateProduct({ _id, name, description, price, stock, featured, type, height, width, thickness }).subscribe(() => this.resetAndEmitUpdate());
    } else {
      this.productService.createProduct({ name, description, price, stock, featured, type, height, width, thickness }).subscribe(() => this.resetAndEmitCreate());
    }
  }

  resetAndEmitCreate() {
    this.productForm.reset({ _id: null, name: '', description: '', price: 0, stock: 0, featured: false, type: '', height: 0, width: 0, thickness: 0 });
    this.create.emit();
  }

  resetAndEmitUpdate() {
    this.productForm.reset({ _id: null, name: '', description: '', price: 0, stock: 0, featured: false, type: '', height: 0, width: 0, thickness: 0 });
    this.update.emit();
  }

  onCancel() {
    this.productForm.reset({ _id: null, name: '', description: '', price: 0, stock: 0, featured: false, type: '', height: 0, width: 0, thickness: 0 });
    this.cancel.emit();
  }
}
