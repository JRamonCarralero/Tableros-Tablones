export interface ProductModel {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  featured: boolean;
  type: string;
  height: number;
  width: number;
  thickness: number;
  provider: string;
}
