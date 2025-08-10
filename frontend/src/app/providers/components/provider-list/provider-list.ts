import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderForm } from '../provider-form/provider-form';
import { ProviderService } from '../../services/provider-service';
import { ProviderModel } from '../../models/provider-model';
import { SharedModule } from '../../../shared/shared-module';
import { Table as ProviderTablePNG } from 'primeng/table';

@Component({
  selector: 'app-provider-list',
  imports: [
    ProviderForm,
    CommonModule,
    SharedModule
  ],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css'
})
export class ProviderList {

  providers = signal<ProviderModel[]>([]);
  editing = signal<ProviderModel | undefined>(undefined);

  searchValue: string | undefined;

  constructor(private providerService: ProviderService) { }

  /**
   * Called when the component is initialized.
   * Loads the providers from the provider service.
   */
  ngOnInit(): void {
    this.load();
  }

  /**
   * Loads the providers from the provider service and updates the component's providers signal.
   */
  load() {
    this.providerService.getAllProviders().subscribe(
      list => this.providers.set(list)
    );
  }

  /**
   * Edits the given provider.
   * The provider is set into the editing state and the form is shown.
   * @param provider The provider to edit.
   */
  onEdit(provider: ProviderModel) {
    this.editing.set(provider);
  }

  /**
   * Starts creating a new provider.
   * The provider is set into the editing state and the form is shown.
   * The provider has no ID and all fields are empty.
   */
  onNewProvider() {
    this.editing.set({
      _id: undefined!,
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  }

  /**
   * Called when the provider form is saved or cancelled.
   * Resets the editing state and reloads the providers from the database.
   */
  onSaved() {
    this.editing.set(undefined!);
    this.load();
  }

  /**
   * Deletes a provider.
   * Prompts the user to confirm the deletion,
   * calls the model to delete the provider from the database, and
   * reloads the providers from the database upon success.
   *
   * @param id - The id of the provider to be deleted.
   */
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

  /**
   * Clears the table and resets the search input value.
   *
   * @param table - The table to clear.
   */
  clear(table: ProviderTablePNG) {
    table.clear();
    this.searchValue = '';
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
    return (event.target as HTMLInputElement).value;
  }
}
