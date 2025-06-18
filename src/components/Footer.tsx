
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
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
              <h3 className="text-2xl font-bold">Фреско Флорес</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Мы создаем прекрасные цветочные композиции для ваших особых моментов. 
              Свежие цветы из Эквадора, профессиональная флористика и быстрая доставка по городу.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+7 (903) 776-46-48</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@frescoflores.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>г. Москва, Ленинский проспект, д. 4</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Режим работы</h4>
            <div className="space-y-2 text-gray-400">
              <p>Пн-Пт: 9:00 - 21:00</p>
              <p>Сб-Вс: 10:00 - 20:00</p>
              <p className="text-primary">Доставка круглосуточно</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 Фреско Флорес. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
