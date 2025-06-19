
import React from 'react';
import { MapPin, Phone, Mail, Clock, Users, MessageCircle } from 'lucide-react';

const ContactsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">
            Контакты
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-playfair flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary mr-3" />
              Как с нами связаться
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                  <p className="text-gray-600 mb-2">+7 (903) 776-46-48</p>
                  <p className="text-sm text-gray-500">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 mb-2">info@frescoflores.ru</p>
                  <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
                  <p className="text-gray-600 mb-2">г. Москва, Ленинский проспект, дом 4</p>
                  <p className="text-sm text-gray-500">МИСИС, корпус А</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours & Additional Info */}
          <div className="space-y-8">
            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair flex items-center">
                <Clock className="w-8 h-8 text-primary mr-3" />
                Режим работы
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Понедельник - Пятница</span>
                  <span className="text-gray-600">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Суббота - Воскресенье</span>
                  <span className="text-gray-600">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-primary">Доставка</span>
                  <span className="text-primary font-semibold">Круглосуточно</span>
                </div>
              </div>
            </div>

            {/* Team Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair flex items-center">
                <Users className="w-8 h-8 text-primary mr-3" />
                О команде
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Матео Саласар</h3>
                  <p className="text-gray-600 text-sm mb-2">Основатель проекта, студент МИСИС</p>
                  <p className="text-gray-500 text-sm">
                    Разработчик веб-платформы и идейный вдохновитель цифровизации семейного бизнеса
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Comtransflor</h3>
                  <p className="text-gray-600 text-sm mb-2">Семья Матео</p>
                  <p className="text-gray-500 text-sm">
                    Многолетний опыт в поставке цветов в Россию из Эквадора
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
            Как нас найти
          </h2>
          <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-gray-600">
                г. Москва, Ленинский проспект, дом 4
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Национальный исследовательский технологический университет МИСИС
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-floral text-white rounded-2xl p-8 text-center mt-12">
          <h2 className="text-3xl font-bold mb-4 font-playfair">
            Готовы сделать заказ?
          </h2>
          <p className="text-xl mb-6">
            Свяжитесь с нами прямо сейчас и создадим идеальный букет для вас!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+79991234567" 
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Позвонить сейчас
            </a>
            <a 
              href="mailto:info@florparaiso.ru" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Написать email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
