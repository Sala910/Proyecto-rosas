// src/components/home/ProductCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import heartIcon from '../../assets/images/heart-icon.svg';
import filledHeartIcon from '../../assets/images/filled-heart-icon.svg';
import addToCartIcon from '../../assets/images/add-to-cart-icon.svg';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  bonusText?: string;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  price,
  oldPrice,
  discount,
  bonusText,
  url,
}) => {
  const { addItemToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(0);

  const handleAddInitial = () => {
    setQuantity(1);
    addItemToCart({ id, title, image, url, price, quantity: 1 });
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    addItemToCart({ id, title, image, url, price, quantity: 1 });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite({ id, title, image, url, price });
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={url} className="product-image-link">
          <img src={image} alt={title} className="product-image" />
        </Link>
        {discount && (
          <span className="product-discount">-{discount}%</span>
        )}
      </div>

      <div className="product-info">
        <Link to={url} className="product-title">
          {title}
        </Link>

        <div className="product-price-container">
          <div className="product-price-wrapper">
            <span className="product-price">{price.toLocaleString()} ₽</span>
            {oldPrice && (
              <span className="product-old-price">{oldPrice.toLocaleString()} ₽</span>
            )}
          </div>

          {bonusText && (
            <div className="product-bonus">
              <Link to="/information_for_customers/bonusnaya-programma/">{bonusText}</Link>
            </div>
          )}
        </div>

        <div className="product-actions">
          <button className="product-wishlist-btn" onClick={toggleFavorite}>
            <img
              src={isFavorite(id) ? filledHeartIcon : heartIcon}
              alt="Favorito"
            />
          </button>

          {quantity === 0 ? (
            <button className="product-cart-btn" onClick={handleAddInitial}>
              <img src={addToCartIcon} alt="Agregar al carrito" />
            </button>
          ) : (
            <div className="product-cart-counter">
              <button className="product-cart-btn-decrement" onClick={handleDecrement}>
                –
              </button>
              <span className="product-cart-btn-quantity">{quantity}</span>
              <button className="product-cart-btn-increment" onClick={handleIncrement}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
