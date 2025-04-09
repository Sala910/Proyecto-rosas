// src/context/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  cartCount: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = () => {
    setCartCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
