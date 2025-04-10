// src/components/home/HomePage.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FeaturedProducts from './FeaturedProducts';
import Categories from './Categories';
import ScrollToTopButton from '../buttons/ScrollToTopButton'; // Importa desde la carpeta buttons
import './HomePage.css';
import Banner from './Banner';
import Footer from '../layout/Footer';

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const sectionId = (location.state as any).scrollTo;
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <Banner/>
      <FeaturedProducts />
      <Categories />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
