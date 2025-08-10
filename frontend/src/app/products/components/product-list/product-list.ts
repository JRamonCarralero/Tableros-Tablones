import { Component, OnInit, signal } from '@angular/core';
import { ProductForm } from "../product-form/product-form";
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../models/product-model';
import { ProductService } from '../../services/product-service';
import { Table as ProductsTablePNG } from 'primeng/table';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductForm,
    CommonModule,
    SharedModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products = signal<ProductModel[]>([]);
  editing = signal<ProductModel | undefined>(undefined);

  searchValue: string | undefined;

  constructor(private productService: ProductService) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * Loads the products from the database into the component state.
   */
  ngOnInit(): void {
    this.load();
  }

  /**
   * Loads the products from the database into the component state.
   * This function is called by the lifecycle hook ngOnInit and
   * is also called when the component state needs to be updated.
   * For example, when a product is added, edited or deleted.
   */
  load() {
    this.productService.getAllProducts().subscribe(
      list => this.products.set(list)
    );
  }

  /**
   * Edits the given product.
   * The product is set into the editing state and the form is shown.
   * @param product The product to edit.
   */
  onEdit(product: ProductModel) {
    this.editing.set(product);
  }

  /**
   * Starts creating a new product.
   * The product is set into the editing state with initial values and the form is shown.
   */
  onNewProduct() {
    this.editing.set({
      _id: undefined!,
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

  /**
   * Called when the product form is saved or cancelled.
   * Resets the editing state and reloads the products from the database.
   */
  onSaved() {
    this.editing.set(undefined);
    this.load();
  }

  /**
   * Deletes a product.
   *
   * This function receives a product id,
   * prompts the user to confirm the deletion,
   * calls the model to delete the product from the database, and
   * reloads the products from the database upon success.
   *
   * @param id - The id of the product to be deleted.
   */
  onDelete(id: string) {
    if (!id) {
      console.warn('Product id is undefined');
      return;
    }
    if (confirm('Estás seguro de querer borrar este producto?')) {
       this.productService.deleteProduct(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error(err)
      });
    }
  }

  /**
   * Clears the table and resets the search input value.
   *
   * @param table - The table to clear.
   */
  clear(table: ProductsTablePNG) {
      table.clear();
      this.searchValue = ''
  }

  /**
   * Returns the value of an input element from an event.
   * This function casts the event target to an HTMLInputElement
   * and retrieves its value, returning an empty string if the value is null or undefined.
   *
   * @param event - The event containing the input element.
   * @returns The value of the input element.
   */
  getInputValue(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    return inputElement?.value ?? '';
  }
}
