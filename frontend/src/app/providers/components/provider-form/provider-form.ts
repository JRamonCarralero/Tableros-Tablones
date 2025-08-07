import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider-service';
import { ProviderModel } from '../../models/provider-model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-form',
  imports: [CommonModule, InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './provider-form.html',
  styleUrl: './provider-form.css'
})
export class ProviderForm {

  @Input() selectedProvider?: ProviderModel;

  @Output() create = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  providerForm = new FormGroup({
    _id: new FormControl<string | null>(null),
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
  });

  constructor(private providerService: ProviderService) { }

  /**
   * Called when the component is initialized or when the `selectedProvider` input is changed.
   * If `selectedProvider` is defined, patches the form with the values of `selectedProvider`.
   * This method is used to synchronize the form with the selected provider when the component is initialized
   * or when the selected provider is changed.
   *
   * @param changes The SimpleChanges object describing the change that occurred.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProvider'] && this.selectedProvider) {
      this.providerForm.patchValue(this.selectedProvider);
    }
  }

  /**
   * Submits the provider form by either creating a new provider or updating an existing one.
   * If the form is invalid, the submission is aborted.
   * Extracts form values including `_id`, `name`, `email`, `phone`, and `address`.
   * If `_id` is present, updates the existing provider and emits the update event.
   * Otherwise, creates a new provider and emits the create event.
   */
  onSubmit() {
    if (this.providerForm.invalid) return;

    const _id = this.providerForm.get('_id')?.value as string | null;
    const name = this.providerForm.get('name')?.value as string;
    const email = this.providerForm.get('email')?.value as string;
    const phone = this.providerForm.get('phone')?.value as string;
    const address = this.providerForm.get('address')?.value as string;

    if (_id) {
      this.providerService.updateProvider({ _id, name, email, phone, address }).subscribe(() => this.resetAndEmitUpdate());
    } else {
      this.providerService.createProvider({ name, email, phone, address }).subscribe(() => this.resetAndEmitCreate());
    }
  }

  /**
   * Resets the provider form to its initial state and emits the `create` event.
   * This method signals that a new provider should be created after the form has been submitted.
   */
  resetAndEmitCreate() {
    this.providerForm.reset({ _id: null, name: '', email: '', phone: '', address: '' });
    this.create.emit();
  }

  /**
   * Resets the provider form to its initial state and emits the `update` event.
   * This method signals that an existing provider should be updated after the form has been submitted.
   */
  resetAndEmitUpdate() {
    this.providerForm.reset({ _id: null, name: '', email: '', phone: '', address: '' });
    this.update.emit();
  }

/**
 * Resets the provider form to its initial state and emits a cancel event.
 * This method is typically invoked when the user decides to cancel the current
 * provider operation, such as creating or editing a provider, and wishes to revert
 * any changes made to the form fields.
 */
  onCancel() {
    this.providerForm.reset({ _id: null, name: '', email: '', phone: '', address: '' });
    this.cancel.emit();
  }
}
