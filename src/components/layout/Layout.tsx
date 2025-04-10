// src/components/layout/Layout.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/cart' || location.pathname === '/favorites';// Oculta el Footer en /cart y /favorites

  return (
    <>
      <Header />
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
