import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  {
    id: 1,
    title: 'ДОСТАВКА ЦВЕТОВ В МОСКВЕ',
    items: [
      { id: 1, name: 'ЦАО', url: '/delivery/tsao/' },
      { id: 2, name: 'САО', url: '/delivery/sao/' },
      { id: 3, name: 'СВАО', url: '/delivery/svao/' },
      { id: 4, name: 'ВАО', url: '/delivery/vao/' },
      { id: 5, name: 'ЮВАО', url: '/delivery/uvao/' },
      { id: 6, name: 'ЮАО', url: '/delivery/uao/' },
      { id: 7, name: 'ЮЗАО', url: '/delivery/uzao/' },
      { id: 8, name: 'ЗАО', url: '/delivery/zao/' },
      { id: 9, name: 'СЗАО', url: '/delivery/szao/' },
      { id: 10, name: 'Зеленоград', url: '/delivery/zelenograd/' },
      { id: 11, name: 'Новая Москва', url: '/delivery/new-moscow/' },
    ]
  },
  {
    id: 2,
    title: 'ЦЕНА',
    items: [
      { id: 1, name: 'до 5000', url: '/catalog/price-to-5000/' },
      { id: 2, name: '5000 - 10000', url: '/catalog/price-5000-10000/' },
      { id: 3, name: '10000 - 15000', url: '/catalog/price-10000-15000/' },
      { id: 4, name: 'от 15000', url: '/catalog/price-from-15000/' },
    ]
  }
];

const Categories: React.FC = () => {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category">
              <h3 className="category-title">{category.title}</h3>
              <div className="category-items">
                {category.items.map((item) => (
                  <Link key={item.id} to={item.url} className="category-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
