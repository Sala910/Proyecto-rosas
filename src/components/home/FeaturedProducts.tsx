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
    title: 'Букет с гортензией и розами',
    image: product1,
    price: 17000,
    bonusText: '15-25%',
    url: '/catalog/bukety/46363/',
    oldPrice: 20000,
    discount: 3000,
  },
  {
    id: 2,
    title: 'Нежность пионовидных роз',
    image: product2,
    price: 9500,
    bonusText: '5-15%',
    url: '/catalog/bukety/46343/',
    oldPrice: 12000,
    discount: undefined,
  },
  {
    id: 3,
    title: 'Премиум букет красных роз',
    image: product3,
    price: 40100,
    bonusText: '5-15%',
    url: '/catalog/bukety/46376/',
    oldPrice: undefined,
    discount: undefined,
  },
  {
    id: 4,
    title: 'Букет из белых роз и эустомы',
    image: product4,
    price: 9700,
    bonusText: '5-15%',
    url: '/catalog/bukety/46346/',
    oldPrice: undefined,
    discount: undefined,
  },
  {
    id: 5,
    title: 'Композиция из красных роз',
    image: product5,
    price: 21700,
    bonusText: '5-15%',
    url: '/catalog/bukety/46362/',
    oldPrice: undefined,
    discount: undefined,
  },
  {
    id: 6,
    title: 'Букет с пионовидными розами',
    image: product6,
    price: 12100,
    bonusText: '5-15%',
    url: '/catalog/bukety/46360/',
    oldPrice: undefined,
    discount: undefined,
  },
];

const specialProducts: ProductData[] = [
  {
    id: 7,
    title: 'Green mango крем для тела 200 мл.',
    image: 'https://ext.same-assets.com/2511376184/1863606977.webp',
    price: 750,
    oldPrice: 1500,
    discount: 50,
    bonusText: '5-15%',
    url: '/catalog/podarki/kosmetika_dlya_tela/32496/',
  },
  {
    id: 8,
    title: 'Amber крем для тела 200 мл.',
    image: 'https://ext.same-assets.com/2511376184/3920371864.webp',
    price: 750,
    oldPrice: 1500,
    discount: 50,
    bonusText: '5-15%',
    url: '/catalog/podarki/kosmetika_dlya_tela/32495/',
  },
  {
    id: 9,
    title: 'Cherry крем для тела 200 мл.',
    image: 'https://ext.same-assets.com/2511376184/3975393471.webp',
    price: 750,
    oldPrice: 1500,
    discount: 50,
    bonusText: '5-15%',
    url: '/catalog/podarki/kosmetika_dlya_tela/32494/',
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="featured-section">
      <div className="container">
        <h2 className="section-title">БУКЕТЫ НЕДЕЛИ</h2>
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
          <Link to="/catalog/bukety-nedeli/" className="view-all-link">
            Смотреть все букеты недели
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
          <Link to="/catalog/podarki/kosmetika_dlya_tela/" className="view-all-link">
            Смотреть все специальные предложения
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
