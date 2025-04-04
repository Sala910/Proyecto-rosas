import React from 'react';
import Banner from './Banner';
import FeatureBar from './FeatureBar';
import FeaturedProducts from './FeaturedProducts';
import Categories from './Categories';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Banner />
      <FeatureBar />
      <div id="section-3">
        <FeaturedProducts />
      </div>
      <Categories />
      </div>
  );
};

export default HomePage;
