import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User, Package, Calendar, MapPin,
  RotateCcw, X, CheckCircle, Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getUserOrders, deleteOrder, Order } from '../api/orders';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state?.orderSuccess) {
      toast.success('Заказ успешно оформлен!');
    }
  }, [location.state]);

  useEffect(() => {
    if (!user) return;
    getUserOrders()
      .then(setOrders)
      .catch(() => toast.error('Ошибка загрузки заказов'))
      .finally(() => setIsLoading(false));
  }, [user]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('ru-RU', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  const genNum = (id: string) =>
    Math.abs(id.split('')
      .reduce((a,b)=>(a<<5)-a + b.charCodeAt(0),0))
      .toString().padStart(6,'0').slice(-6);

  const handleRepeat = (o: Order) => {
    o.items.forEach(i =>
      addItem({ id: i.productId, name: i.productName, price: i.price, image:'/placeholder.svg' })
    );
    toast.success('Товары добавлены в корзину');
    navigate('/cart');
  };

  const handleDelete = async (id: string) => {
    if (await deleteOrder(id)) {
      setOrders(prev => prev.filter(o => o.id !== id));
      toast.success('Заказ удалён');
    } else {
      toast.error('Ошибка при удалении');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Usuario */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex items-center">
          <User className="w-10 h-10 text-primary mr-4"/>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Historial */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6 space-x-3">
            <Package className="w-6 h-6 text-primary"/>
            <h2 className="text-2xl font-semibold">История заказов</h2>
          </div>

          {isLoading ? (
            <p>Загрузка...</p>
          ) : orders.length ? (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id}
                     className="border rounded-xl p-6 hover:shadow-md transition">

                  {/* Cabecera */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Заказ №{genNum(order.id)}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <Calendar className="w-4 h-4"/>
                        <span>{formatDate(order.createdAt)}</span>
                        <MapPin className="w-4 h-4"/>
                        <span>{order.shippingAddress.city}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={
                        'inline-block px-3 py-1 rounded-full text-sm ' +
                        (order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'shipped'
                          ? 'bg-purple-100 text-purple-800'
                          : order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800')
                      }>
                        {order.status}
                      </span>
                      <div className="text-xl font-bold text-primary mt-2">
                        {order.totalAmount.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>

                  {/* Artículos */}
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium">Товары:</h4>
                    {order.items.map((i, idx) => (
                      <div key={idx}
                           className="flex justify-between text-sm text-gray-600">
                        <span>{i.productName} × {i.quantity}</span>
                        <span>{(i.price*i.quantity).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                  </div>

                  {/* Dirección */}
                  <div className="mb-4 text-sm text-gray-700">
                    <p><strong>Получатель:</strong> {order.shippingAddress.name}</p>
                    <p><strong>Адрес:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                    <p><strong>Телефон:</strong> {order.shippingAddress.phone}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex space-x-3">
                    <button onClick={()=>handleRepeat(order)}
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-primary/90 transition">
                      <RotateCcw className="w-4 h-4 mr-1"/> Повторить
                    </button>
                    <button onClick={()=>handleDelete(order.id)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center hover:bg-gray-400 transition">
                      <Trash2 className="w-4 h-4 mr-1"/> Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-gray-600">
              У вас пока нет заказов
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
