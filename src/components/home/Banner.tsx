import React, { useState, useEffect } from 'react';
import './Banner.css';
import hero1 from '../../assets/images/hero1.webp';
import hero2 from '../../assets/images/hero2.webp';
import hero3 from '../../assets/images/hero3.webp';
import hero4 from '../../assets/images/hero4.webp';
import hero5 from '../../assets/images/hero5.webp';
import hero6 from '../../assets/images/hero6.webp';

const slides = [
  {
    id: 1,
    image: hero1,
    alt: 'Скидка 50% на подарки при покупке от 15000 рублей',
    title: 'СКИДКА 50%',
    subtitle: 'НА ВЫБРАННЫ ПОДАРКИ ПРИ ПОКУПКЕ ОТ 15 000 РУБЛЕЙ',
  },
  {
    id: 2,
    image: hero2,
    alt: 'Скидка на популярные букеты',
    title: 'СКИДКА',
    subtitle: 'НА ПОПУЛЯРНЫЕ БУКЕТЫ',
  },
  {
    id: 3,
    image: hero3,
    alt: 'Специальные предложения',
    title: 'ВЫГОДНЫЕ',
    subtitle: 'ПРЕДЛОЖЕНИЯ',
  },
  {
    id: 4,
    image: hero4,
    alt: 'Новая коллекция цветов',
    title: 'ЦВЕТЫ из Эквадора',
    subtitle: '',
  },
  {
    id: 5,
    image: hero5,
    alt: 'Новая коллекция цветов',
    title: 'НОВАЯ КОЛЛЕКЦИЯ',
    subtitle: 'Новая коллекция цветов весна 2025',
  },
  {
    id: 6,
    image: hero6,
    alt: 'БУКЕТИК2025',
    title: 'СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ',
    subtitle: 'Специальные предложения с промкодом "БУКЕТИК2025"',
  },
];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="banner-section">
      <div className="banner-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.alt} className="banner-image" />
            <div className="banner-content">
              <h2 className="banner-title">{slide.title}</h2>
              <p className="banner-subtitle">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <button className="banner-nav prev" onClick={handlePrevClick}>
          <span>&#10094;</span>
        </button>
        <button className="banner-nav next" onClick={handleNextClick}>
          <span>&#10095;</span>
        </button>

        <div className="banner-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
