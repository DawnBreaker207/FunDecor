import { Product_Action, StateProduct } from '../interfaces/Product';

const productReducer = (
  state: StateProduct,
  action: Product_Action
): StateProduct => {
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
