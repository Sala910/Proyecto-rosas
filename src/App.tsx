import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import './styles/global.css';
import { CartProvider } from './context/CartContext';
import CartPage from './components/cart/CartPage';

function App() {
  return (
    <Router>
     <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Layout>
     </CartProvider>
    </Router>
  );
}

export default App;
