import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">Каталог</h3>
            <ul className="footer-links">
              <li><Link to="">Розы</Link></li>
              <li><Link to="">Букеты</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Покупателям</h3>
            <ul className="footer-links">
              <li><Link to="">Доставка</Link></li>
              <li><Link to="">Личный кабинет</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Информация</h3>
            <ul className="footer-links">
              <li><Link to="">О компании</Link></li>
              <li><Link to="">Отзывы</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Подписывайтесь на нас</h3>
            <div className="social-links">
              <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="social-link vk">VK</a>
              <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer" className="social-link telegram">TG</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="social-link youtube">YT</a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Наши контакты</h3>
            <ul className="footer-contacts">
              <li className="contact-item phone">
                <a href="tel:+79037764648">8 903 776 4648</a>
                <span>Бесплатно по России</span>
              </li>
              <li className="contact-item email">
                <a href="mailto:m2213636@edu.misis.ru">m2213636@edu.misis.ru</a>
              </li>
              <li className="contact-item address">
                <p>Москва, Ленинский проспект, 6</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 MNSM. Все права защищены.</p>
          <div className="payment-methods">
            <span className="payment-icon visa">Visa</span>
            <span className="payment-icon mastercard">MasterCard</span>
            <span className="payment-icon mir">MIR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
