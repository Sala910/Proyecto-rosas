import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = (): void => {
    if (!user) {
      toast.error('Пожалуйста, войдите, чтобы продолжить');
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  // Si está vacío mostramos mensaje
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ваша корзина пуста</h2>
          <p className="text-gray-600 mb-6">Добавьте товары, чтобы продолжить</p>
          <Link
            to="/catalog"
            className="text-primary underline font-medium"
          >
            Перейти к каталогу
          </Link>
        </div>
      </div>
    );
  }

  // Si no, mostramos lista
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          Корзина ({getTotalItems()} {getTotalItems() === 1 ? 'товар' : 'товаров'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl shadow flex items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg mr-6"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-pink-600 font-bold text-xl">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:border-primary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:border-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Итоговая панель */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4 sticky top-8">
            <div className="flex justify-between">
              <span>Товары ({getTotalItems()} шт.)</span>
              <span className="font-semibold">
                {getTotalPrice().toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between">
              <span>Доставка</span>
              <span className="text-green-600 font-semibold">Бесплатно</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Итого</span>
              <span className="text-pink-600">
                {getTotalPrice().toLocaleString('ru-RU')} ₽
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Оформить заказ</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/catalog')}
              className="w-full text-center text-primary hover:underline font-medium"
            >
              Продолжить покупки
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-red-600 hover:underline mt-2 font-medium"
            >
              Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
