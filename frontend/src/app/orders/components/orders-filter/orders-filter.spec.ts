import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFilter } from './orders-filter';

describe('OrdersFilter', () => {
  let component: OrdersFilter;
  let fixture: ComponentFixture<OrdersFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
