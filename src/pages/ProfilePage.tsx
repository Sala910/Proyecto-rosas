import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Package, Calendar, MapPin, CheckCircle, RotateCcw, X, MessageSquare, Edit, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Order, getUserOrders } from '../api/orders';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (location.state?.orderSuccess) {
      toast.success('Заказ успешно оформлен! Ожидайте звонка от менеджера.');
    }
  }, [location.state]);

  useEffect(() => {
    const loadOrders = async (): Promise<void> => {
      if (!user) return;
      
      try {
        const userOrders = await getUserOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        toast.error('Ошибка загрузки заказов');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'Ожидает подтверждения';
      case 'processing':
        return 'Обрабатывается';
      case 'shipped':
        return 'Доставляется';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Неизвестно';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateOrderNumber = (orderId: string): string => {
    // Generate a 6-digit number based on the order ID
    const hash = orderId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash).toString().padStart(6, '0').slice(-6);
  };

  const handleRepeatOrder = (order: Order): void => {
    // Add all items from the order to cart
    order.items.forEach(item => {
      addItem({
        id: item.productId,
        name: item.productName,
        price: item.price,
        image: '/placeholder.svg' // Default image, could be improved with actual product images
      });
    });
    
    toast.success('Товары добавлены в корзину');
    navigate('/cart');
  };

  const handleCancelOrder = (orderId: string): void => {
    setCancellingOrder(orderId);
  };

  const confirmCancelOrder = (): void => {
    if (cancellingOrder) {
      // Update order status to cancelled
      setOrders(prev => prev.map(order => 
        order.id === cancellingOrder 
          ? { ...order, status: 'cancelled' as const }
          : order
      ));
      toast.success('Заказ отменен');
      setCancellingOrder(null);
    }
  };

  const handleEditOrder = (order: Order): void => {
    // Add items to cart and navigate to checkout
    order.items.forEach(item => {
      addItem({
        id: item.productId,
        name: item.productName,
        price: item.price,
        image: '/placeholder.svg'
      });
    });
    navigate('/checkout');
  };

  const handleSubmitComment = (orderId: string): void => {
    if (comment.trim()) {
      toast.success('Комментарий отправлен');
      setComment('');
      setExpandedOrder(null);
    }
  };

  if (!user) {
    return null;
  }

  if (showSettings) {
    return <UserSettings onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* User Info */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 font-playfair">
                    {user.name}
                  </h1>
                  <p className="text-gray-600 text-lg">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <Settings className="w-6 h-6" />
                <span>Настройки</span>
              </button>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">
                История заказов
              </h2>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse border rounded-xl p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Заказ №{generateOrderNumber(order.id)}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{order.shippingAddress.city}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status === 'delivered' && <CheckCircle className="w-4 h-4 mr-1" />}
                          {getStatusText(order.status)}
                        </span>
                        <div className="text-xl font-bold text-primary mt-2">
                          {order.totalAmount.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Товары:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>{item.productName} × {item.quantity}</span>
                          <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <p><span className="font-medium">Получатель:</span> {order.shippingAddress.name}</p>
                        <p><span className="font-medium">Адрес:</span> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                        <p><span className="font-medium">Телефон:</span> {order.shippingAddress.phone}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                      <button
                        onClick={() => handleRepeatOrder(order)}
                        className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Повторить заказ</span>
                      </button>
                      
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <>
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Редактировать</span>
                          </button>
                          
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            <X className="w-4 h-4" />
                            <span>Отменить заказ</span>
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Оставить отзыв</span>
                      </button>
                    </div>

                    {/* Comment Section */}
                    {expandedOrder === order.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-3">Оставить комментарий:</h5>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary"
                          rows={3}
                          placeholder="Напишите ваш отзыв о заказе..."
                        />
                        <div className="flex space-x-3 mt-3">
                          <button
                            onClick={() => handleSubmitComment(order.id)}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                          >
                            Отправить
                          </button>
                          <button
                            onClick={() => setExpandedOrder(null)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                          >
                            Отмена
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  У вас пока нет заказов
                </h3>
                <p className="text-gray-600">
                  Оформите первый заказ в нашем каталоге!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancellingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Отменить заказ?
            </h3>
            <p className="text-gray-600 mb-6">
              Вы уверены, что хотите отменить этот заказ? Это действие нельзя отменить.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmCancelOrder}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Да, отменить
              </button>
              <button
                onClick={() => setCancellingOrder(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Нет, оставить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// User Settings Component
const UserSettings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In a real app, this would update user data
    toast.success('Настройки сохранены');
  };

  const handleDeleteAccount = () => {
    // In a real app, this would delete the account
    toast.success('Аккаунт удален');
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-playfair">
                Настройки профиля
              </h1>
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                ← Назад
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текущий пароль
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Новый пароль
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Подтвердить новый пароль
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Сохранить изменения
              </button>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Опасная зона
                </h3>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Удалить аккаунт?
            </h3>
            <p className="text-gray-600 mb-6">
              Это действие нельзя отменить. Все ваши данные и заказы будут удалены навсегда.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Да, удалить
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
