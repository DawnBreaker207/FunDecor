import { createContext, useContext, useEffect, useReducer } from "react";
import { CartActionCase, cartContextType, CartItem, CartTypeInput, StateCart, useCartProviderProps } from '../common/types/Cart';
import cartReducer from "../reducers/cartReducer";
import { Add_To_Cart, Decrease_Quantity, Get_Cart, Increase_Quantity, Remove_From_Cart, Update_Cart } from '../services/cart.services';
import { useAuth } from './AuthContext';


const CartContext = createContext<cartContextType>({} as cartContextType);
export const useCart = (): cartContextType => {
  const cartContext = useContext(CartContext)
  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return cartContext
}

const initialState: StateCart = {
  items: []
}
const CartProvider = ({ children }: useCartProviderProps) => {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    (async () => {
      const id = user?._id
      if (id) {
        const data = await Get_Cart(`${id}`)


        dispatch({ type: CartActionCase.SET_CART, payload: data })
      }
    })()
  }, [user?._id])

  const addToCart = async (dataInput: CartTypeInput) => {
    try {
      if (!dataInput.useProduct) {
        return
      }
      if (!state.items) {
        console.error('State items is undefined');
        return;
      }
      const existingItem = state.items.find((cartItem) => cartItem.useProduct === dataInput.useProduct)
      if (existingItem) {
        const updateItem = { ...existingItem, quantity: (existingItem.quantity || 0) + 1 }
        dispatch({ type: CartActionCase.UPDATE_QUANTITY, payload: updateItem })
        const newItem = { ...updateItem, userId: dataInput.userId, price: dataInput.price }
        await Update_Cart(newItem)

      } else {
        const newItem = {
          useProduct: dataInput.useProduct,
          quantity: dataInput.quantity,
          price: dataInput.price
        }
        dispatch({
          type: CartActionCase.ADD_TO_CART, payload: newItem
        })
        await Add_To_Cart(dataInput)
      }


    } catch (error) {
      console.log(error);

    }

  }
  const removeFromCart = async (data: CartTypeInput) => {
    await Remove_From_Cart(data)
    dispatch({
      type: CartActionCase.REMOVE_FROM_CART, payload: { useProduct: data.useProduct }
    })
  }
  const updateQuantity = async (data: CartTypeInput) => {
    await Update_Cart(data)
    dispatch({ type: CartActionCase.UPDATE_QUANTITY, payload: data })
  }
  const increaseQuantity = async (data: CartTypeInput) => {
    await Increase_Quantity(data)
    const item = state.items.find((item: CartItem) => item.useProduct === data.useProduct)
    if (item) {
      dispatch({
        type: CartActionCase.UPDATE_QUANTITY, payload: { useProduct: data.useProduct, quantity: item.quantity! + 1 }
      })
    }
  }
  const decreaseQuantity = async (data: CartTypeInput) => {
    await Decrease_Quantity(data)
    const item = state.items.find((item: CartItem) => item.useProduct === data.useProduct)
    if (item && item.quantity > 1) {
      dispatch({
        type: CartActionCase.UPDATE_QUANTITY, payload: { useProduct: data.useProduct, quantity: item.quantity! - 1 }
      })
    }
    else {
      await Remove_From_Cart(data)
      dispatch({
        type: CartActionCase.REMOVE_FROM_CART, payload: { useProduct: data.useProduct }
      })
    }
  }
  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;