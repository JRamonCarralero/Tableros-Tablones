import { ProductModel } from "../../products/models/product-model";
import { ProviderModel } from "../../providers/models/provider-model";

export interface OrderFilterParams {
  provider: string | null;
  name: string | null;
}

export interface ProductWithQuantity {
  product: ProductModel;
  quantity: number;
  price: number;
}

export interface OrderModel {
  _id: string;
  products: ProductWithQuantity[];
  provider: string;
  user: string;
  date: Date;
}

export interface OrderModelWithProvider extends Omit<OrderModel, 'provider'> {
  provider: ProviderModel;
}
