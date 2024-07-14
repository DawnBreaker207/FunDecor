import { Dispatch } from 'react';
import { Category } from './Category';

// export interface Product {
//   id?: number | string ;
//   title: string;
//   description: string;
//   thumbnail?: string;
//   category?: string;
//   price: number;
//   discountPercentage?: number;
//   rating?: number;
//   stock?: number;
//   tags?: string[];
//   brand?: string;
//   sku?: string;
//   weight?: number;

//   warrantyInformation?: string;
//   shippingInformation?: string;
//   availabilityStatus?: string;

//   returnPolicy?: string;
//   minimumOrderQuantity?: number;
//   images?: string[];
// }

export interface Product {
  _id?: string | undefined;
  // id?: string | number;
  title: string;
  sku: string;
  category: Category;
  slug?: string;
  brand?: string;
  thumbnail: string;
  stock?: number;
  description: string;
  material?: string;
  size?: string[];
  price: number;
  variants?: string[];
}

export interface StateProduct {
  products: Product[];
  error: string | null;
}
export enum ProductAction {
  SET_PRODUCTS = 'SET_PRODUCTS',
  ADD_PRODUCTS = 'ADD_PRODUCTS',
  UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
  DELETE_PRODUCTS = 'DELETE_PRODUCTS',
}
export interface SET_PRODUCTS {
  type: ProductAction.SET_PRODUCTS;
  payload: Product[];
}
export interface ADD_PRODUCTS {
  type: ProductAction.ADD_PRODUCTS;
  payload: Product;
}
export interface UPDATE_PRODUCTS {
  type: ProductAction.UPDATE_PRODUCTS;
  payload: Product;
}
export interface DELETE_PRODUCTS {
  type: ProductAction.DELETE_PRODUCTS;
  payload: Product | string | number;
}
export type Product_Action =
  | SET_PRODUCTS
  | ADD_PRODUCTS
  | UPDATE_PRODUCTS
  | DELETE_PRODUCTS;

export interface ProductContextType {
  state: StateProduct;
  dispatch: Dispatch<Product_Action>;
}
export interface ProductProviderProps {
  children: React.ReactNode;
}
