// src/components/home/FeaturedProducts.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';
import ProductCard from './ProductCard';
import product1 from '../../assets/images/product1.webp';
import product2 from '../../assets/images/product2.webp';
import product3 from '../../assets/images/product3.webp';
import product4 from '../../assets/images/product4.webp';
import product5 from '../../assets/images/product5.webp';
import product6 from '../../assets/images/product6.webp';
import product7 from '../../assets/images/product7.webp';
import product8 from '../../assets/images/product8.webp';
import product9 from '../../assets/images/product9.webp';

interface ProductData {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  bonusText?: string;
  url: string;
}

const featuredProducts: ProductData[] = [
  {
    id: 1,
    title: 'Розы Hot Majolika',
    image: product1,
    price: 200,
    bonusText: 'за 1 шт',
    url: '',
    oldPrice: 250,
    discount: 20,
  },
  {
    id: 2,
    title: 'Розы White Majolika',
    image: product2,
    price: 200,
    bonusText: 'за 1 шт',
    url: '',
    oldPrice: 250,
    discount: 20,
  },
  {
    id: 3,
    title: 'Розы Red Mikado',
    image: product3,
    price: 200,
    bonusText: 'за 1 шт',
    url: '',
    oldPrice: 300,
    discount: 30,
  },
  {
    id: 4,
    title: 'Розы Sun City',
    image: product4,
    price: 200,
    bonusText: 'за 1 шт',
    url: '',
    oldPrice: 300,
    discount: 30,
  },
  {
    id: 5,
    title: 'Розы Brilliant star Taurus',
    image: product5,
    price: 200,
    bonusText: 'за 1 шт',
    url: '',
    oldPrice: 250,
    discount: 20,
  },
  {
    id: 6,
    title: 'Розы Sahara Sensation',
    image: product6,
    price: 200,
    bonusText: 'за 1 шт',
    url: '',
    oldPrice: 250,
    discount: 20,
  },
];

const specialProducts: ProductData[] = [
  {
    id: 7,
    title: 'Букет 101 красных роз',
    image: product7,
    price: 17500,
    oldPrice: 20000,
    discount: 15,
    bonusText: 'С упоковкой!',
    url: '',
  },
  {
    id: 8,
    title: 'Букет 101 белых роз',
    image: product8,
    price: 17500,
    oldPrice: 20000,
    discount: 15,
    bonusText: 'С упоковкой!',
    url: '',
  },
  {
    id: 9,
    title: 'Букет 101 сортированных роз',
    image: product9,
    price: 17500,
    oldPrice: 20000,
    discount: 15,
    bonusText: 'С упоковкой!',
    url: '',
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <section id="featured-products" className="featured-section">
      <div className="container">
        <h2 className="section-title">РОЗЫ</h2>
        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              bonusText={product.bonusText}
              url={product.url}
            />
          ))}
        </div>

        <div className="view-all-container">
          <Link to="" className="view-all-link">
            Смотреть все букеты 
          </Link>
        </div>

        <h2 className="section-title special-title">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</h2>
        <div className="special-grid">
          {specialProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              bonusText={product.bonusText}
              url={product.url}
            />
          ))}
        </div>

        <div className="view-all-container">
          <Link to="" className="view-all-link">
            Смотреть все специальные предложения
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
