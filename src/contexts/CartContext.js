import { createContext } from 'react';

export const CartContext = createContext({
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});