
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, MapPin, Phone, Lock, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { processPayment, PaymentData } from '../api/payment';
import { createOrder } from '../api/orders';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    // Shipping info
    name: user?.name || '',
    address: '',
    city: 'Москва',
    phone: '',
    
    // Payment info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: user?.name || ''
  });

  const applyPromoCode = (): void => {
    if (promoCode.toUpperCase() === 'FLOR90') {
      setDiscount(0.9);
      toast.success('Промокод применен! Скидка 90%');
    } else if (promoCode.trim() !== '') {
      toast.error('Неверный промокод');
    } else {
      setDiscount(0);
    }
  };

  const getFinalPrice = (): number => {
    const basePrice = getTotalPrice();
    return Math.round(basePrice * (1 - discount));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    // Форматирование номера карты
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Форматирование даты истечения
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Ограничение CVV
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 3);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Необходимо войти в систему');
      return;
    }

    setIsProcessing(true);

    try {
      // Подготовка данных для платежа
      const paymentData: PaymentData = {
        amount: getFinalPrice(),
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        holderName: formData.holderName
      };

      // Обработка платежа
      const paymentResult = await processPayment(paymentData);

      if (!paymentResult.success) {
        toast.error(paymentResult.error || 'Ошибка оплаты');
        return;
      }

      // Создание заказа
      const orderData = {
        userId: user.id,
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getFinalPrice(),
        status: 'processing' as const,
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          phone: formData.phone
        }
      };

      await createOrder(orderData);

      // Очистка корзины
      clearCart();

      toast.success('Заказ успешно оформлен!');
      navigate('/profile', { state: { orderSuccess: true } });

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Произошла ошибка при оформлении заказа');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 font-playfair">
            Оформление заказа
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Forms */}
              <div className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Информация о доставке</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя получателя
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Введите имя"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Адрес доставки
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Улица, дом, квартира"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Город
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Tag className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Промокод</h2>
                  </div>

                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Введите промокод"
                    />
                    <button
                      type="button"
                      onClick={applyPromoCode}
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Применить
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 mt-2 font-medium">
                      Скидка {Math.round(discount * 100)}% применена!
                    </p>
                  )}
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Оплата</h2>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Номер карты
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Срок действия
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя держателя карты
                      </label>
                      <input
                        type="text"
                        name="holderName"
                        required
                        value={formData.holderName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Как указано на карте"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Ваш заказ
                  </h3>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-gray-600 text-sm">{item.quantity} шт.</p>
                        </div>
                        <span className="font-semibold">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Подытог</span>
                      <span>{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка ({Math.round(discount * 100)}%)</span>
                        <span>-{(getTotalPrice() * discount).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Доставка</span>
                      <span className="text-green-600">Бесплатно</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2">
                      <span>Итого</span>
                      <span className="text-primary">{getFinalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      'Оплатить заказ'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
