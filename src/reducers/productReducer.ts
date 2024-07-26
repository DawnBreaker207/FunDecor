import { Product_Action, StateProduct } from '../common/types/Product';
export const initialState: StateProduct = {
  products: [],
  error: null,
  isLoading: true,
};

const productReducer = (
  state: StateProduct,
  action: Product_Action
): StateProduct => {
  const { products } = state;
  const { type, payload } = action;

  switch (type) {
    case 'SET_PRODUCTS':
      return { ...state, products: payload, isLoading: false };
    case 'ADD_PRODUCTS':
      return { ...state, products: [...products, payload] };
    case 'UPDATE_PRODUCTS':
      return {
        ...state,
        products: products.map((product) =>
          product._id === payload._id ? payload : product
        ),
      };
    case 'DELETE_PRODUCTS':
      return {
        ...state,
        products: products.filter((product) => product._id !== payload),
      };

    default:
      return state;
  }
};

export default productReducer;
