import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ProviderModel } from '../../../providers/models/provider-model';
import { ProviderService } from '../../../providers/services/provider-service';

@Component({
  selector: 'app-orders-filter',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    Select
  ],
  templateUrl: './orders-filter.html',
  styleUrl: './orders-filter.css'
})
export class OrdersFilter implements OnInit {
  @Output() filter = new EventEmitter<any>();

  orderFilterForm = new FormGroup({
    provider: new FormControl<string | null>(null, Validators.required),
    name: new FormControl<string>(''),
  });

  providers: ProviderModel[] = []

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.providerService.getAllProviders().subscribe(providers => {
      this.providers = providers;
    });
  }

  onSubmit() {
    this.filter.emit(this.orderFilterForm.value);
  }

  onCancel() {
    this.orderFilterForm.reset({ provider: null, name: '' });
    this.filter.emit(this.orderFilterForm.value);
  }
}
