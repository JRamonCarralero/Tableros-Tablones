import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProductList } from './orders-product-list';

describe('OrdersProductList', () => {
  let component: OrdersProductList;
  let fixture: ComponentFixture<OrdersProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersProductList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
