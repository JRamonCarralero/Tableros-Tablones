import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProviderForm } from '../provider-form/provider-form';
import { ProviderService } from '../../services/provider-service';
import { ProviderModel } from '../../models/provider-model';

@Component({
  selector: 'app-provider-list',
  imports: [ProviderForm, CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css'
})
export class ProviderList {

  providers = signal<ProviderModel[]>([]);
  editing = signal<ProviderModel | undefined>(undefined);

  searchValue: string | undefined;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.providerService.getAllProviders().subscribe(
      list => this.providers.set(list)
    );
  }

  onEdit(provider: ProviderModel) {
    this.editing.set(provider);
  }

  onNewProvider() {
    this.editing.set({
      _id: undefined!,
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  }

  onSaved() {
    this.editing.set(undefined!);
    this.load();
  }

  onDelete(id: string) {
    if (!id) {
      console.warn('Provider id is undefined');
      return;
    }
    if (confirm('Estas seguro de querer borrar este proveedor?')) {
      this.providerService.deleteProvider(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error(err)
      });
    }
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
