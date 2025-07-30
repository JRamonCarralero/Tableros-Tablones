import { ProductModel } from "../../products/models/product-model";

export interface OrderFilterParams {
  provider: string | null;
  name: string | null;
}

export interface ProductWithQuantity {
  product: ProductModel;
  quantity: number;
  price: number;
}
