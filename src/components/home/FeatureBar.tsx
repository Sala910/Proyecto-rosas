import React from 'react';
import './FeatureBar.css';

const features = [
  {
    id: 1,
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="white"/>
        <path d="M29.5 18.5C29.5 17.5 30 15 35 15C38.5 15 39 17.5 39 19C39 25 30 24.5 30 28.5V30.5H22.5V28.5C22.5 24.5 14 24.5 14 19C14 16.5 15 15 18.5 15C23 15 23.5 17.5 23.5 18.5" stroke="#903d3c" strokeWidth="1.5"/>
        <rect x="22" y="30" width="9" height="6" stroke="#903d3c" strokeWidth="1.5"/>
        <line x1="26.5" y1="30" x2="26.5" y2="36" stroke="#903d3c" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Оптимальная доставка',
    description: 'по всей Москве'
  },
  {
    id: 2,
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="white"/>
        <rect x="15" y="15" width="20" height="20" rx="2" stroke="#903d3c" strokeWidth="1.5"/>
        <circle cx="25" cy="25" r="5" stroke="#903d3c" strokeWidth="1.5"/>
        <circle cx="32" cy="18" r="2" fill="#903d3c"/>
      </svg>
    ),
    title: 'Фото перед',
    description: 'отправкой'
  },
  {
    id: 3,
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="white"/>
        <path d="M25 15C25 15 21 19 21 21C21 23 23 24 25 24C27 24 29 23 29 21C29 19 25 15 25 15Z" stroke="#903d3c" strokeWidth="1.5"/>
        <path d="M25 24V35" stroke="#903d3c" strokeWidth="1.5"/>
        <path d="M21 28L25 32L29 28" stroke="#903d3c" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Свежие цветы',
    description: 'напрямую от садовников'
  },
  {
    id: 4,
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="white"/>
        <rect x="15" y="15" width="20" height="20" rx="2" stroke="#903d3c" strokeWidth="1.5"/>
        <line x1="15" y1="21" x2="35" y2="21" stroke="#903d3c" strokeWidth="1.5"/>
        <line x1="22" y1="15" x2="22" y2="35" stroke="#903d3c" strokeWidth="1.5"/>
        <circle cx="30" cy="26" r="2" stroke="#903d3c" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Бесплатная',
    description: 'открытка к каждому букету'
  },
  {
    id: 5,
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="white"/>
        <rect x="13" y="19" width="22" height="12" rx="2" stroke="#903d3c" strokeWidth="1.5"/>
        <circle cx="18" cy="30" r="2.5" stroke="#903d3c" strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="2.5" stroke="#903d3c" strokeWidth="1.5"/>
        <path d="M35 23H38L40 27H35V23Z" stroke="#903d3c" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Доставим за 2',
    description: 'часа'
  },
  {
    id: 6,
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="white"/>
        <path d="M25 15V20M25 20L22 17M25 20L28 17" stroke="#903d3c" strokeWidth="1.5"/>
        <path d="M25 35V30M25 30L22 33M25 30L28 33" stroke="#903d3c" strokeWidth="1.5"/>
        <path d="M15 25H20M20 25L17 22M20 25L17 28" stroke="#903d3c" strokeWidth="1.5"/>
        <path d="M35 25H30M30 25L33 22M30 25L33 28" stroke="#903d3c" strokeWidth="1.5"/>
        <circle cx="25" cy="25" r="3" stroke="#903d3c" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Экзотические',
    description: 'цветы из 15 стран'
  }
];

const FeatureBar: React.FC = () => {
  return (
    <section className="feature-bar">
      <div className="container">
        <div className="features-container">
          {features.map((feature) => (
            <div key={feature.id} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBar;
