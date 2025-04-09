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
];

const Categories: React.FC = () => {
  return (
    <section id="categories-section" className="categories-section">
      <div className="container">
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category">
              <h3 className="category-title">{category.title}</h3>
              <div className="category-items">
                {category.items.map((item) => (
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
