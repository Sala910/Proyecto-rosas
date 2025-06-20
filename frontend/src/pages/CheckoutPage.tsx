// src/pages/CheckoutPage.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, Tag, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';


const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, placeOrder, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: user?.name || '',
  });

  const applyPromoCode = (): void => {
    if (promoCode.trim().toUpperCase() === 'FLOR90') {
      setDiscount(0.9);
      toast.success('Промокод применён: скидка 90%');
    } else if (promoCode.trim() !== '') {
      setDiscount(0);
      toast.error('Неверный промокод');
    } else {
      setDiscount(0);
    }
  };

  const getFinalPrice = (): number => {
    const base = getTotalPrice();
    return Math.round(base * (1 - discount));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'cardNumber') {
      v = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
    } else if (name === 'expiryDate') {
      v = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').slice(0, 5);
    } else if (name === 'cvv') {
      v = value.replace(/\D/g, '').slice(0, 3);
    }
    setFormData(prev => ({ ...prev, [name]: v }));
  };

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Пожалуйста, войдите в систему');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    if (items.length === 0) {
      toast.error('Ваша корзина пуста');
      navigate('/cart');
      return;
    }

    setIsProcessing(true);
    const ok = await placeOrder();
    setIsProcessing(false);

    if (ok) {
      clearCart();
      toast.success('Заказ успешно оформлен');
      navigate('/profile');
    } else {
      toast.error('Ошибка при оформлении заказа');
    }
  };

  if (items.length === 0) {
    // Redirección si no hay artículos
    setTimeout(() => navigate('/cart'), 0);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* ЛЕВАЯ КОЛОНКА: Доставка, промокод, оплата */}
            <div className="space-y-6">
              {/* Информация о доставке */}
              <section className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 text-primary mr-2" />
                  <h2 className="text-lg font-semibold">Информация о доставке</h2>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Имя получателя"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Адрес доставки"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Город"
                      className="flex-1 border px-3 py-2 rounded"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Телефон"
                      className="flex-1 border px-3 py-2 rounded"
                    />
                  </div>
                </div>
              </section>

              {/* Промокод */}
              <section className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-center mb-4">
                  <Tag className="w-6 h-6 text-primary mr-2" />
                  <h2 className="text-lg font-semibold">Промокод</h2>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="FLOR90"
                    className="flex-1 border px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    className="bg-primary text-white px-4 rounded"
                  >
                    Применить
                  </button>
                </div>
                {discount > 0 && (
                  <p className="mt-2 text-green-600">
                    Скидка {Math.round(discount * 100)}% применена!
                  </p>
                )}
              </section>

              {/* Оплата */}
              <section className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary mr-2" />
                  <h2 className="text-lg font-semibold">Оплата</h2>
                  <Lock className="w-4 h-4 text-gray-400 ml-2" />
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Номер карты"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      placeholder="MM/YY"
                      className="flex-1 border px-3 py-2 rounded"
                    />
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      placeholder="CVV"
                      className="flex-1 border px-3 py-2 rounded"
                    />
                  </div>
                  <input
                    type="text"
                    name="holderName"
                    value={formData.holderName}
                    onChange={handleInputChange}
                    required
                    placeholder="Имя держателя"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </section>
            </div>

            {/* ПРАВАЯ КОЛОНКА: Сводка заказа и кнопка */}
            <aside className="bg-white p-6 rounded-xl shadow sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Ваш заказ</h2>
              <div className="space-y-2 mb-4">
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span>
                      {i.name} × {i.quantity}
                    </span>
                    <span>{(i.price * i.quantity).toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Подытог</span>
                  <span>{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка</span>
                    <span>
                      -{(getTotalPrice() * discount).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Итого</span>
                  <span>
                    {getFinalPrice().toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-white py-3 mt-4 rounded font-semibold disabled:opacity-50"
              >
                {isProcessing ? 'Обрабатывается…' : 'Оформить заказ'}
              </button>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
