// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import CartPage from './components/cart/CartPage';
import FavoritesPage from './components/favorites/FavoritesPage'; 
import './styles/global.css';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Layout>
        </CartProvider>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
