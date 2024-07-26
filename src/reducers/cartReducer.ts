import {
  Cart_Action_Type,
  CartActionCase,
  CartItem,
  StateCart,
} from '../common/types/Cart';

const cartReducer = (state: StateCart, action: Cart_Action_Type): StateCart => {
  switch (action.type) {
    case CartActionCase.ADD_TO_CART: {
      const item = action.payload;

      const existItem = state.items.find(
        (index) => index.useProduct === item.useProduct
      );

      if (existItem) {
        return {
          ...state,
          items: state.items.map((index) =>
            index.useProduct === item.useProduct
              ? {
                  ...index,
                  quantity: index.quantity + (item.quantity || 0),
                }
              : index
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...item }],
        };
      }
    }
    case CartActionCase.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item: CartItem) =>
          item.useProduct === action.payload.useProduct
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case CartActionCase.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.useProduct !== action.payload.useProduct
        ),
      };
    case CartActionCase.SET_CART:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          items: action.payload,
        };
      } else {
        console.error('Invalid payload structure for SET_CART');
        return state;
      }
    default:
      return state;
  }
};

export default cartReducer;
