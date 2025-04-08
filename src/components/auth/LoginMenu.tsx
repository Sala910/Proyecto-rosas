import React, { useState } from 'react';
import './LoginMenu.css'; // Asegúrate de tener este archivo con los estilos que desees

const LoginMenu: React.FC = () => {
  // Estado para cambiar entre modos: false = Вход, true = Регистрация
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  /* ------------------ MODO Вход (Авторизация) ------------------ */
  // Selección del método: 'phone' o 'email'
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  // Estados para login por teléfono
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [smsCode, setSmsCode] = useState('');

  // Estados para login por e-mail
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* ------------------ MODO Регистрация ------------------ */
  // Selección del método de registro: 'phone' o 'email'
  const [registrationMethod, setRegistrationMethod] = useState<'phone' | 'email'>('phone');

  // Estados para registro por teléfono
  const [registrationPhone, setRegistrationPhone] = useState('');
  const [registrationCodeSent, setRegistrationCodeSent] = useState(false);
  const [registrationSmsCode, setRegistrationSmsCode] = useState('');

  // Estados para registro por e-mail
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  /* ------------------ Estado de Error ------------------ */
  const [error, setError] = useState<string | null>(null);

  /* ------------------ Funciones de Вход ------------------ */
  const handleSendCode = () => {
    if (!phone) {
      setError('Введите номер телефона.');
      return;
    }
    setError(null);
    setCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (smsCode.length !== 6) {
      setError('Введите 6-значный код из SMS.');
      return;
    }
    setError(null);
    console.log('Логин по телефону успешен');
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      setError('Заполните все поля.');
      return;
    }
    setError(null);
    console.log('Логин по E-mail успешен');
  };

  /* ------------------ Funciones de Регистрация ------------------ */
  const handleSendRegCode = () => {
    if (!registrationPhone) {
      setError('Введите номер телефона для регистрации.');
      return;
    }
    setError(null);
    setRegistrationCodeSent(true);
  };

  const handleVerifyRegCode = () => {
    if (registrationSmsCode.length !== 6) {
      setError('Введите 6-значный код из SMS.');
      return;
    }
    setError(null);
    console.log('Регистрация по телефону успешна');
  };

  const handleRegisterEmail = () => {
    if (!regEmail || !regPassword) {
      setError('Заполните все поля для регистрации.');
      return;
    }
    setError(null);
    console.log('Регистрация по E-mail успешна');
  };

  return (
    <div className="login-menu">
      <div className="login-menu-content">
        { !isRegisterMode ? (
          /* ================= MODO Вход (Авторизация) ================= */
          <>
            <h2>Вход</h2>
            <div className="method-tabs">
              <button
                className={loginMethod === 'phone' ? 'active' : ''}
                onClick={() => {
                  setLoginMethod('phone');
                  setError(null);
                  setCodeSent(false);
                }}
              >
                ПО ТЕЛЕФОНУ
              </button>
              <button
                className={loginMethod === 'email' ? 'active' : ''}
                onClick={() => {
                  setLoginMethod('email');
                  setError(null);
                }}
              >
                ЧЕРЕЗ E-MAIL
              </button>
            </div>
            <div className="tab-content">
              {loginMethod === 'phone' ? (
                <div className="phone-form">
                  {!codeSent ? (
                    <>
                      <label htmlFor="phone">Введите номер телефона</label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <button onClick={handleSendCode}>Получить код</button>
                    </>
                  ) : (
                    <>
                      <label htmlFor="smsCode">Введите код из SMS (6 цифр)</label>
                      <input
                        type="text"
                        id="smsCode"
                        placeholder="XXXXXX"
                        value={smsCode}
                        onChange={(e) => setSmsCode(e.target.value)}
                      />
                      <button onClick={handleVerifyCode}>Подтвердить</button>
                    </>
                  )}
                </div>
              ) : (
                <div className="email-form">
                  <label htmlFor="email">Введите E-mail</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">Введите пароль</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={handleEmailLogin}>Войти</button>
                </div>
              )}
            </div>
            <button
              className="switch-mode-button"
              onClick={() => {
                setIsRegisterMode(true);
                setError(null);
              }}
            >
              Регистрация
            </button>
          </>
        ) : (
          /* ================= MODO Регистрация ================= */
          <>
            <h2>Регистрация</h2>
            <div className="method-tabs">
              <button
                className={registrationMethod === 'phone' ? 'active' : ''}
                onClick={() => {
                  setRegistrationMethod('phone');
                  setError(null);
                  setRegistrationCodeSent(false);
                }}
              >
                ПО ТЕЛЕФОНУ
              </button>
              <button
                className={registrationMethod === 'email' ? 'active' : ''}
                onClick={() => {
                  setRegistrationMethod('email');
                  setError(null);
                }}
              >
                ЧЕРЕЗ E-MAIL
              </button>
            </div>
            <div className="tab-content">
              {registrationMethod === 'phone' ? (
                <div className="phone-form">
                  {!registrationCodeSent ? (
                    <>
                      <label htmlFor="registrationPhone">Введите номер телефона</label>
                      <input
                        type="text"
                        id="registrationPhone"
                        placeholder="+7 (___) ___-__-__"
                        value={registrationPhone}
                        onChange={(e) => setRegistrationPhone(e.target.value)}
                      />
                      <button onClick={handleSendRegCode}>Получить код</button>
                    </>
                  ) : (
                    <>
                      <label htmlFor="registrationSmsCode">Введите код из SMS (6 цифр)</label>
                      <input
                        type="text"
                        id="registrationSmsCode"
                        placeholder="XXXXXX"
                        value={registrationSmsCode}
                        onChange={(e) => setRegistrationSmsCode(e.target.value)}
                      />
                      <button onClick={handleVerifyRegCode}>Подтвердить</button>
                    </>
                  )}
                </div>
              ) : (
                <div className="email-form">
                  <label htmlFor="regEmail">Введите E-mail</label>
                  <input
                    type="email"
                    id="regEmail"
                    placeholder="example@mail.ru"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                  <label htmlFor="regPassword">Придумайте пароль</label>
                  <input
                    type="password"
                    id="regPassword"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  <button onClick={handleRegisterEmail}>Зарегистрироваться</button>
                </div>
              )}
            </div>
            <button
              className="switch-mode-button"
              onClick={() => {
                setIsRegisterMode(false);
                setError(null);
              }}
            >
              Назад
            </button>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginMenu;
