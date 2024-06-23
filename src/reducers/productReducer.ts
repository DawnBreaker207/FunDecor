import { Product } from '../interfaces/Product';

export interface State {
  products: Product[];
  error: string | null;
}

export enum ProductAction {
  SET_PRODUCTS = 'SET_PRODUCTS',
  ADD_PRODUCTS = 'ADD_PRODUCTS',
  UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
  DELETE_PRODUCTS = 'DELETE_PRODUCTS',
}
interface SET_PRODUCTS {
  type: ProductAction.SET_PRODUCTS;
  payload: Product[];
}
interface ADD_PRODUCTS {
  type: ProductAction.ADD_PRODUCTS;
  payload: Product;
}
interface UPDATE_PRODUCTS {
  type: ProductAction.UPDATE_PRODUCTS;
  payload: Product;
}
interface DELETE_PRODUCTS {
  type: ProductAction.DELETE_PRODUCTS;
  payload: Product | string | number;
}
export type Product_Action =
  | SET_PRODUCTS
  | ADD_PRODUCTS
  | UPDATE_PRODUCTS
  | DELETE_PRODUCTS;
const productReducer = (state: State, action: Product_Action): State => {
  const { products } = state;
  const { type, payload } = action;

  switch (type) {
    case 'SET_PRODUCTS':
      return { ...state, products: payload };
    case 'ADD_PRODUCTS':
      return { ...state, products: [...products, payload] };
    case 'UPDATE_PRODUCTS':
      return {
        ...state,
        products: products.map((product) =>
          product.id === payload.id ? payload : product
        ),
      };
    case 'DELETE_PRODUCTS':
      return {
        ...state,
        products: products.filter((product) => product.id !== payload),
      };

    default:
      return state;
  }
};
export default productReducer;
