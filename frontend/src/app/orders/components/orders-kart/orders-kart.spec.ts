import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersKart } from './orders-kart';

describe('OrdersKart', () => {
  let component: OrdersKart;
  let fixture: ComponentFixture<OrdersKart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersKart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersKart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
