import React, { useState } from 'react';
import './LoginMenu.css';

interface LoginMenuProps {
  onLoginSuccess: () => void;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ onLoginSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMethod, setRegistrationMethod] = useState<'phone' | 'email'>('phone');
  const [registrationPhone, setRegistrationPhone] = useState('');
  const [registrationCodeSent, setRegistrationCodeSent] = useState(false);
  const [registrationSmsCode, setRegistrationSmsCode] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [error, setError] = useState<string | null>(null);


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
    onLoginSuccess(); // Llamada al callback de éxito
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      setError('Заполните все поля.');
      return;
    }
    setError(null);
    console.log('Логин по E-mail успешен');
    onLoginSuccess(); // Llamada al callback de éxito
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
    setIsRegisterMode(false); // Cambia al modo de login después del registro
    setLoginMethod('phone'); // Establece el método de login por teléfono
    setPhone(registrationPhone); // Autocompleta el teléfono para login
  };

  const handleRegisterEmail = () => {
    if (!regEmail || !regPassword) {
      setError('Заполните все поля для регистрации.');
      return;
    }
    setError(null);
    console.log('Регистрация по E-mail успешна');
    setIsRegisterMode(false); // Cambia al modo de login después del registro
    setLoginMethod('email'); // Establece el método de login por email
    setEmail(regEmail); // Autocompleta el email para login
  };

  return (
    <div className="login-menu">
      <div className="login-menu-content">
        {!isRegisterMode ? (
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