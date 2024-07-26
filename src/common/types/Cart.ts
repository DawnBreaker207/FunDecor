import React, { ReactNode } from 'react';

export interface CartItem {
  useProduct: string;
  quantity: number;
  price: number;
}

export type CartTypeInput = {
  userId: string | undefined;
  useProduct: string;
  quantity: number;
  price: number;
};
export type CartTypeUser = Pick<CartTypeInput, 'userId'>;
export interface StateCart {
  items: CartItem[];
}
export enum CartActionCase {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  SET_CART = 'SET_CART',
}
export interface ADD_TO_CART {
  type: CartActionCase.ADD_TO_CART;
  payload: CartItem;
}
export interface REMOVE_FROM_CART {
  type: CartActionCase.REMOVE_FROM_CART;
  payload: Pick<CartItem, 'useProduct'>;
}
export interface UPDATE_QUANTITY {
  type: CartActionCase.UPDATE_QUANTITY;
  payload: Pick<CartItem, 'useProduct' | 'quantity'>;
}
export interface SET_CART {
  type: CartActionCase.SET_CART;
  payload: StateCart;
}
export type Cart_Action_Type =
  | ADD_TO_CART
  | REMOVE_FROM_CART
  | UPDATE_QUANTITY
  | SET_CART;

export type cartContextType = {
  state: StateCart;
  dispatch: React.Dispatch<Cart_Action_Type>;
  addToCart: (data: CartTypeInput) => Promise<void>;
  removeFromCart: (data: CartTypeInput) => Promise<void>;
  updateQuantity: (data: CartTypeInput) => Promise<void>;
  increaseQuantity: (data: CartTypeInput) => Promise<void>;
  decreaseQuantity: (data: CartTypeInput) => Promise<void>;
};

export type useCartProviderProps = {
  children: ReactNode;
};
