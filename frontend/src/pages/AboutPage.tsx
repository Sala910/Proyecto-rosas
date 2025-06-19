
import React from 'react';
import { GraduationCap, Heart, Users, Target } from 'lucide-react';
import FotoMateo from '../assets/foto1.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">
            О нас
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            История молодого предпринимателя и семейной традиции
          </p>
        </div>

        {/* Main Story */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">
                Привет! Меня зовут Матео Саласар
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Я студент НИТУ МИСИС, 
                и этот проект — не просто университетское задание, а воплощение моей мечты 
                объединить семейные традиции с современными технологиями.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Мои родители много лет посвятили доставке прекрасных цветов из Эквадора в Россию. 
                Они знают, как передать очарование эквадорской природы через великолепные 
                композиции из роз, пионов, тюльпанов и альстромерий, но у них никогда не было 
                собственного веб-сайта. Я решил это изменить!
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Фреско Флорес</strong> — это мост между многолетним опытом моих родителей 
                в поставке цветов и возможностями цифрового мира. Моя цель — не только получить 
                отличную оценку, но и создать реальный инструмент, который поможет моей семье 
                делиться красотой эквадорских цветов с еще большим количеством людей.
              </p>
            </div>
            <div className="relative">
              <img 
                src={FotoMateo} 
                alt="Матео Саласар" 
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-xl">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Эквадорские традиции</h3>
            <p className="text-gray-600">
              Мы передаем очарование Эквадора через наши композиции, используя лучшие цветы со всего мира
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Инновации</h3>
            <p className="text-gray-600">
              Современные технологии для удобства наших клиентов и развития семейного бизнеса
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Забота о клиентах</h3>
            <p className="text-gray-600">
              Каждый букет создается с любовью и вниманием к деталям для ваших особых моментов
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-floral text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 font-playfair">
            Наша миссия
          </h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            Мы стремимся передать красоту и очарование эквадорских цветов в Россию, 
            объединяя традиционное цветочное искусство с современными возможностями 
            интернет-торговли. Каждый заказ — это возможность подарить частичку 
            эквадорской природы и создать незабываемые моменты.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
