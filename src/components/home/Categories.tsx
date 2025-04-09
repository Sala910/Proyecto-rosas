// src/components/Categories.tsx
import React from 'react';
import './Categories.css';

const categories = [
  {
    id: 1,
    title: 'ДОСТАВКА ЦВЕТОВ В МОСКВЕ',
    items: [
      { id: 1, name: 'ЦАО', url: '/delivery/tsao/', tooltip: '+250₽' },
      { id: 2, name: 'САО', url: '/delivery/sao/', tooltip: '+250₽' },
      { id: 3, name: 'СВАО', url: '/delivery/svao/', tooltip: '+250₽' },
      { id: 4, name: 'ВАО', url: '/delivery/vao/', tooltip: '+250₽' },
      { id: 5, name: 'ЮВАО', url: '/delivery/uvao/', tooltip: '+250₽' },
      { id: 6, name: 'ЮАО', url: '/delivery/uao/', tooltip: '+250₽' },
      { id: 7, name: 'ЮЗАО', url: '/delivery/uzao/', tooltip: '+350₽' },
      { id: 8, name: 'ЗАО', url: '/delivery/zao/', tooltip: '+350₽' },
      { id: 9, name: 'СЗАО', url: '/delivery/szao/', tooltip: '+350₽' },
      { id: 10, name: 'Зеленоград', url: '/delivery/zelenograd/', tooltip: '+450₽' },
      { id: 11, name: 'Новая Москва', url: '/delivery/new-moscow/', tooltip: '+450₽' },
    ]
  },
  {
    id: 2,
    title: 'ЦЕНА',
    items: [
      { id: 1, name: 'до 5000', url: '/catalog/price-to-5000/', tooltip: 'Precios hasta 5000 ₽' },
      { id: 2, name: '5000 - 10000', url: '/catalog/price-5000-10000/', tooltip: 'Entre 5000 y 10000 ₽' },
      { id: 3, name: '10000 - 15000', url: '/catalog/price-10000-15000/', tooltip: 'Entre 10000 y 15000 ₽' },
      { id: 4, name: 'от 15000', url: '/catalog/price-from-15000/', tooltip: 'Desde 15000 ₽ en adelante' },
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
                  // Se utiliza un div con el atributo data-tooltip que toma el valor de item.tooltip
                  <div
                    key={item.id}
                    className="category-item"
                    data-tooltip={item.tooltip ? item.tooltip : 'Más información'}
                  >
                    {item.name}
                  </div>
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
