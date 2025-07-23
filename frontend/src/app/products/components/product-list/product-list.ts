import { Component, OnInit, signal } from '@angular/core';
import { ProductForm } from "../product-form/product-form";
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../models/product-model';
import { ProductService } from '../../services/product-service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-list',
  imports: [ProductForm, CommonModule, TableModule, ButtonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products = signal<ProductModel[]>([]);
  editing = signal<ProductModel | undefined>(undefined);

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productService.getAllProducts().subscribe(
      list => this.products.set(list)
    );
  }

  onEdit(product: ProductModel) {
    this.editing.set(product);
  }

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
      thickness: 0
    });
  }

  onSaved() {
    this.editing.set(undefined);
    this.load();
  }

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
}
