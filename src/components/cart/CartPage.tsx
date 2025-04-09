import React from 'react';
import { useCart } from '../../context/CartContext';

const CartPage: React.FC = () => {
  const { cartCount, addToCart, removeFromCart } = useCart();

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Mi Carrito</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={removeFromCart}>-</button>
        <span>{cartCount}</span>
        <button onClick={addToCart}>+</button>
      </div>
    </div>
  );
};

export default CartPage;
