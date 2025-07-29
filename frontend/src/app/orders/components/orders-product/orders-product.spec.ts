import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProduct } from './orders-product';

describe('OrdersProduct', () => {
  let component: OrdersProduct;
  let fixture: ComponentFixture<OrdersProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
