// src/components/product/ProductCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import heartIcon from '../../assets/images/heart-icon.svg';
import addToCartIcon from '../../assets/images/add-to-cart-icon.svg';
// Se importa el hook del carrito para actualizar el total global si fuera necesario
import { useCart } from '../../context/CartContext';

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
  const { addToCart, removeFromCart } = useCart();
  // Estado local para la cantidad específica de este producto
  const [quantity, setQuantity] = useState(0);

  // Función para pasar de "no agregado" a haberlo agregado (cantidad 1)
  const handleAddInitial = () => {
    setQuantity(1);
    addToCart();
  };

  // Incrementar cantidad
  const handleIncrement = () => {
    setQuantity(quantity + 1);
    addToCart();
  };

  // Decrementar cantidad: si llega a 0 se vuelve al estado original
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      removeFromCart();
    } else {
      // Si quantity es 1, al restar se reinicia el contador
      setQuantity(0);
      removeFromCart();
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
          <button className="product-wishlist-btn">
            <img src={heartIcon} alt="В избранное" />
          </button>

          {quantity === 0 ? (
            // Estado inicial: botón para agregar al carrito
            <button className="product-cart-btn" onClick={handleAddInitial}>
              <img src={addToCartIcon} alt="Agregar en carrito" />
            </button>
          ) : (
            // Si hay cantidad, mostramos el contador con botones para decrementar e incrementar.
            <div className="product-cart-counter">
              <button 
                className="product-cart-btn-decrement" 
                onClick={handleDecrement}
              >
                –
              </button>
              <span className="product-cart-btn-quantity">{quantity}</span>
              <button 
                className="product-cart-btn-increment" 
                onClick={handleIncrement}
              >
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
