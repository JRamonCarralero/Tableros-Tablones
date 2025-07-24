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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProvider'] && this.selectedProvider) {
      this.providerForm.patchValue(this.selectedProvider);
    }
  }

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

  resetAndEmitCreate() {
    this.providerForm.reset({ _id: null, name: '', email: '', phone: '', address: '' });
    this.create.emit();
  }

  resetAndEmitUpdate() {
    this.providerForm.reset({ _id: null, name: '', email: '', phone: '', address: '' });
    this.update.emit();
  }

  onCancel() {
    this.providerForm.reset({ _id: null, name: '', email: '', phone: '', address: '' });
    this.cancel.emit();
  }
}
