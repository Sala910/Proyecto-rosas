// src/components/favorites/FavoritesPage.tsx
import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart, CartItem } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { cartItems, addItemToCart, updateItemQuantity, removeItemFromCart } = useCart();

  const getCartItemQuantity = (favoriteId: number) => {
    const cartItem = cartItems.find(item => item.id === favoriteId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item: { id: number; title: string; image: string; url: string; price: number }) => {
    if (getCartItemQuantity(item.id) === 0) {
      addItemToCart({ ...item, quantity: 1 });
    }
  };

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

  return (
    <div className="favorites-page">
      <h1>Избранное</h1>
      {favorites.length === 0 ? (
        <p>Нет продуктов в избранное</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map(item => {
            const quantity = getCartItemQuantity(item.id);
            return (
              <li key={item.id} className="favorites-item">
                <Link to={item.url} className="favorites-link">
                  <img src={item.image} alt={item.title} className="favorites-image" />
                  <div className="favorites-details">
                    <span className="favorites-title">{item.title}</span>
                    <span className="favorites-price">{item.price.toLocaleString()} ₽</span>
                  </div>
                </Link>
                <div className="favorites-cart-actions">
                  {quantity === 0 ? (
                    <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">
                      Добавить в корзину
                    </button>
                  ) : (
                    <div className="cart-counter">
                      <button onClick={() => handleDecrement(item.id, quantity)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => handleIncrement(item.id, quantity)}>+</button>
                      <span className="total-price">
                        Итого: {(item.price * quantity).toLocaleString()} ₽
                      </span>
                    </div>
                  )}
                  <button onClick={() => removeFavorite(item.id)} className="remove-favorite-btn">
                    Удалить
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
