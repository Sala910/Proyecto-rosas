import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import heartIcon from '../../assets/images/heart-icon.svg';
import addToCartIcon from '../../assets/images/add-to-cart-icon.svg';

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
          <button className="product-cart-btn">
            <img src={addToCartIcon} alt="Добавить в корзину" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
