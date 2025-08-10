import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProviderModel } from '../../../providers/models/provider-model';
import { ProviderService } from '../../../providers/services/provider-service';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-orders-filter',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
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

  /**
   * Called when the component is initialized.
   * Loads the providers from the database and stores them in the providers array.
   * The providers are then used to populate the provider select dropdown in the
   * component template.
   */
  ngOnInit(): void {
    this.providerService.getAllProviders().subscribe(providers => {
      this.providers = providers;
    });
  }

  /**
   * Emits the current form values through the `filter` event.
   * This method is typically called when the form is submitted,
   * allowing parent components to receive and process the filter
   * parameters specified in the form.
   */
  onSubmit() {
    this.filter.emit(this.orderFilterForm.value);
  }

  /**
   * Resets the order filter form to its initial state and emits the reset filter values.
   * This method is typically called to clear the current filter selections,
   * allowing the user to start a new filter process with default values.
   */
  onCancel() {
    this.orderFilterForm.reset({ provider: null, name: '' });
    this.filter.emit(this.orderFilterForm.value);
  }
}
