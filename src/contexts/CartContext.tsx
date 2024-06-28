import { createContext, ReactNode, useContext, useState } from 'react';
import Cart from '../components/Cart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartItem = {
  id: number | string,
  name?: string,
  quantity: number
}

type cartContextType = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number,
  increaseCartQuantity: (id: number) => void,
  decreaseCartQuantity: (id: number) => void,
  removeFromCart: (id: number) => void,
  cartQuantity: number
  cartItems: CartItem[]

}
type useCartProviderProps = {
  children: ReactNode
}
const CartContext = createContext({} as cartContextType)

export const UseCart = () => {
  return useContext(CartContext)
}

const CartContextProvider = ({ children }: useCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("", [])

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const getItemQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  const increaseCartQuantity = (id: number) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  const decreaseCartQuantity = (id: number) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  const removeFromCart = (id: number) => {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return <CartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart }}>{children}<Cart isOpen={isOpen} /></CartContext.Provider>
}

export default CartContextProvider