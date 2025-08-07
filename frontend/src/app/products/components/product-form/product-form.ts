import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { ProductModel } from '../../models/product-model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ProviderModel } from '../../../providers/models/provider-model';
import { ProviderService } from '../../../providers/services/provider-service';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    CheckboxModule,
    Select
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnChanges, OnInit {

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
    provider: new FormControl<string>('', Validators.required),
  });

  providers: ProviderModel[] = [];

  constructor(private productService: ProductService, private providerService: ProviderService) { }

/**
 * Called upon component initialization.
 * Fetches all providers from the provider service and assigns them
 * to the `providers` array, which is used to populate the provider
 * select dropdown in the component template.
 */
  ngOnInit(): void {
    this.providerService.getAllProviders().subscribe(providers => {
      this.providers = providers;
    });
  }

  /**
   * Called when the component is initialized or when the `selectedProduct` input is changed.
   * If `selectedProduct` is defined, patches the form with the values of `selectedProduct`.
   * This method is used to synchronize the form with the selected product when the component is initialized
   * or when the selected product is changed.
   *
   * @param changes The SimpleChanges object describing the change that occurred.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProduct'] && this.selectedProduct) {
      this.productForm.patchValue(this.selectedProduct);
    }
  }

  /**
   * Submits the form by either creating a new product or updating an existing one.
   * If the form is invalid, does nothing.
   * If the form is valid, fetches the values from the form and either creates a new product with the {@link ProductService}
   * or updates an existing product with the provided values and emits the {@link create} or {@link update} event respectively.
   */
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
    const provider = this.productForm.get('provider')?.value as string;

    if (_id) {
      this.productService.updateProduct({ _id, name, description, price, stock, featured, type, height, width, thickness, provider }).subscribe(() => this.resetAndEmitUpdate());
    } else {
      this.productService.createProduct({ name, description, price, stock, featured, type, height, width, thickness, provider }).subscribe(() => this.resetAndEmitCreate());
    }
  }

  /**
   * Resets the form to its initial state and emits the {@link create} event.
   * This method is used to signal that a new product should be created after the form has been submitted.
   */
  resetAndEmitCreate() {
    this.productForm.reset({ _id: null, name: '', description: '', price: 0, stock: 0, featured: false, type: '', height: 0, width: 0, thickness: 0, provider: '' });
    this.create.emit();
  }

  /**
   * Resets the form to its initial state and emits the {@link update} event.
   * This method is used to signal that an existing product should be updated after the form has been submitted.
   */
  resetAndEmitUpdate() {
    this.productForm.reset({ _id: null, name: '', description: '', price: 0, stock: 0, featured: false, type: '', height: 0, width: 0, thickness: 0, provider: '' });
    this.update.emit();
  }

/**
 * Resets the product form to its initial state and emits a cancel event.
 * This method is typically invoked when the user decides to cancel the current
 * product operation, such as creating or editing a product, and wishes to revert
 * any changes made to the form fields.
 */
  onCancel() {
    this.productForm.reset({ _id: null, name: '', description: '', price: 0, stock: 0, featured: false, type: '', height: 0, width: 0, thickness: 0, provider: '' });
    this.cancel.emit();
  }
}
