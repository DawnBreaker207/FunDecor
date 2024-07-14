import { ReactNode } from 'react';

export type CartItem = {
  id: number | string;
  name?: string;
  quantity: number;
};
export type cartContextType = {
  // openCart: () => void;
  // closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};
export type useCartProviderProps = {
  children: ReactNode;
};
