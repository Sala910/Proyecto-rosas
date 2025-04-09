// src/components/cart/CartPage.tsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartPage.css'; // Puedes crear o ajustar este archivo de estilos

const CartPage: React.FC = () => {
  const { cartItems, updateItemQuantity, removeItemFromCart, clearCart } = useCart();

  const handleIncrement = (id: number, currentQuantity: number) => {
    updateItemQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateItemQuantity(id, currentQuantity - 1);
    } else {
      removeItemFromCart(id);
    }
  };

  const totalGeneral = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page" style={{ margin: '2rem' }}>
      <h2>Моя Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <strong>{item.title}</strong>
                  <div>Цена: {item.price.toLocaleString()} ₽</div>
                  <div>Итог: {(item.price * item.quantity).toLocaleString()} ₽</div>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                  <button onClick={() => removeItemFromCart(item.id)} className="delete-btn">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Итого: {totalGeneral.toLocaleString()} ₽</h3>
          <button onClick={clearCart} className="clear-cart-btn">
            Чистить корзину
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
