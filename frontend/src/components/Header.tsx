
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            {/* Rosa minimalista SVG */}
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path 
                d="M16 4C12 4 8 8 8 12C8 16 12 20 16 20C20 20 24 16 24 12C24 8 20 4 16 4Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M16 12C14.5 10.5 12 10 10 12C8 14 8.5 16.5 10 18C11.5 19.5 14 19 16 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M16 12C17.5 10.5 20 10 22 12C24 14 23.5 16.5 22 18C20.5 19.5 18 19 16 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M16 20L16 28" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M13 24C13 24 15 22 16 22C17 22 19 24 19 24" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                fill="none"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gradient">
              Фреско Флорес
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/catalog" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Каталог
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              О нас
            </Link>
            <Link 
              to="/contacts" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Контакты
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
