
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import { Product, getFeaturedProducts } from '../api/products';
import ProductCard from '../components/ProductCard';

const Index: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async (): Promise<void> => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white py-20 overflow-hidden"
        style={{ backgroundImage: "url('https://media.istockphoto.com/id/484763618/es/foto/pink-roses-en-un-holand%C3%A9s-greenhouse.jpg?s=612x612&w=0&k=20&c=5jMJrUFfbqhIsiykwDFTdz53kPAxf9VLPoq-B8HsAbY=')" }} >
      
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-playfair animate-fade-in">
              Дарите счастье каждый день
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
              Свежие букеты и композиции с доставкой по городу
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link 
                to="/catalog" 
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Смотреть каталог</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                О нашей флористике
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Быстрая доставка</h3>
              <p className="text-gray-600">Доставим ваш заказ в течение 2-3 часов по всему городу</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Свежие цветы</h3>
              <p className="text-gray-600">Работаем только с проверенными поставщиками свежих цветов</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Гарантия качества</h3>
              <p className="text-gray-600">Заменим букет бесплатно, если он не соответствует ожиданиям</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Популярные букеты
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Самые любимые композиции наших клиентов
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/catalog" 
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Смотреть все букеты</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Clock className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">
              Работаем для вас круглосуточно
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Заказывайте цветы в любое время - мы доставим их точно в срок
            </p>
            <Link 
              to="/catalog" 
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Заказать сейчас</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
