import { Routes } from '@angular/router';
import { Home } from './home/components/home/home';
import { ProductList } from './products/components/product-list/product-list';
import { ProviderList } from './providers/components/provider-list/provider-list';
import { OrdersView } from './orders/components/orders-view/orders-view';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'providers', component: ProviderList },
  { path: 'orders', component: OrdersView },
];
