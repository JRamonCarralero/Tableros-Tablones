import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProductDetail } from './orders-product-detail';

describe('OrdersProductDetail', () => {
  let component: OrdersProductDetail;
  let fixture: ComponentFixture<OrdersProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersProductDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
