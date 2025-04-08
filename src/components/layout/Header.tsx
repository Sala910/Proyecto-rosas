import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.webp';
import LoginMenu from '../auth/LoginMenu';

const handleCatalogClick = (event: React.MouseEvent) => {
  event.preventDefault();
  const section = document.getElementById('section-3');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(!showLoginModal);
      setShowUserMenu(false);
    } else {
      setShowUserMenu(!showUserMenu);
      setShowLoginModal(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип" className="logo-image" />
          </Link>

          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <button onClick={handleCatalogClick} className="nav-link">КАТАЛОГ</button>
              </li>
              <li className="nav-item">
                <Link to="/delivery/" className="nav-link">ДОСТАВКА</Link>
              </li>
              <li className="nav-item">
                <Link to="/about/" className="nav-link">O НАС</Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button onClick={handleAccountClick} className="icon-button account-icon" title="Личный кабинет">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12,12c2.2,0,4-1.8,4-4s-1.8-4-4-4S8,5.8,8,8S9.8,12,12,12z M12,14c-2.7,0-8,1.3-8,4v2h16v-2
                  C20,15.3,14.7,14,12,14z" fill="currentColor"/>
              </svg>
            </button>
            <Link to="/favorites/" className="icon-button wishlist-icon" title="Избранное">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12,21.4l-1.6-1.5C5.4,15.4,2,12.3,2,8.5C2,5.4,4.4,3,7.5,3c1.7,0,3.4,0.8,4.5,2.1C13.1,3.8,14.8,3,16.5,3
                  C19.6,3,22,5.4,22,8.5c0,3.8-3.4,6.9-8.4,11.4L12,21.4z" fill="currentColor"/>
              </svg>
              <span className="count">0</span>
            </Link>
            <Link to="/cart/" className="icon-button cart-icon" title="Корзина">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.1,18,7,18z M17,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2
                  S18.1,18,17,18z M7.2,14.8v-0.1l0.9-1.7h8.3c0.7,0,1.4-0.4,1.7-1l3.9-7l-1.7-1h0l-1.1,2l-2.8,5h-7.9L5.9,4L4.5,2L1.3,2v2
                  h2l3.6,7.6L5.7,14c-0.4,0.7-0.1,1.6,0.6,2.1c0.2,0.1,0.5,0.2,0.8,0.2h12.6v-2H7.2z" fill="currentColor"/>
              </svg>
              <span className="count">0</span>
            </Link>
          </div>
        </div>

        {showLoginModal && !isLoggedIn && (
          <div className="login-modal">
            <button className="close-button" onClick={handleAccountClick}>×</button>
            <LoginMenu onLoginSuccess={handleLoginSuccess} />
          </div>
        )}

        {showUserMenu && isLoggedIn && (
          <div className="user-menu">
            <button className="user-menu-item">Настройки</button>
            <button className="user-menu-item" onClick={handleLogout}>Выйти</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;