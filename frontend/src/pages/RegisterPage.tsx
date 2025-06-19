// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Heart } from 'lucide-react';
import { toast } from 'sonner';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 handleSubmit fired, form =', form);
    if (form.password !== form.confirm) {
      toast.error('Пароли не совпадают');
      return;
    }
    setLoading(true);
    const ok = await register(form.email.trim(), form.password, form.name.trim());
    setLoading(false);
    if (ok) {
      toast.success('Регистрация прошла успешно!');
      navigate('/', { replace: true });
    } else {
      toast.error('Ошибка регистрации');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <Heart className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold text-gradient">Фреско Флорес</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Создание аккаунта</h2>
          <p className="text-gray-600 mt-2">
            Создайте аккаунт для быстрого оформления заказов
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Имя
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary transition-colors"
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary transition-colors"
                placeholder="Введите email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary transition-colors pr-12"
                  placeholder="Введите пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={showPass ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  {showPass ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-2">
                Подтвердите пароль
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                value={form.confirm}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary transition-colors"
                placeholder="Повторите пароль"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Секунду…' : 'Создать аккаунт'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Уже есть аккаунт? </span>
            <Link to="/login" className="text-primary hover:underline">
              Войдите
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
