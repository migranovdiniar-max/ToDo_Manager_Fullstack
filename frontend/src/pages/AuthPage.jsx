// frontend/src/pages/AuthPage.jsx

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const { login, register, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(username, password);
      if (localStorage.getItem('token')) navigate('/');
    } else {
      await register(username, email, password);
      if (localStorage.getItem('token')) navigate('/');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '100px auto',
      padding: '24px',
      background: 'var(--card-bg)',
      borderRadius: '12px',
      boxShadow: 'var(--shadow)',
      fontFamily: 'system-ui',
      color: 'var(--text-color)',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        {isLogin ? 'Вход' : 'Регистрация'}
      </h2>

      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#fee',
          color: '#d00',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px' }}>
            Имя пользователя
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="tm-input"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
            required
          />
        </div>

        {!isLogin && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="tm-input"
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              required
            />
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px' }}>
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="tm-input"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
            required
          />
        </div>

        <button
          type="submit"
          className="tm-btn tm-btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '16px' }}
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
        {isLogin ? (
          <>
            Нет аккаунта?{' '}
            <button
              onClick={() => setIsLogin(false)}
              style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Зарегистрироваться
            </button>
          </>
        ) : (
          <>
            Уже есть аккаунт?{' '}
            <button
              onClick={() => setIsLogin(true)}
              style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Войти
            </button>
          </>
        )}
      </div>

      {/* Кнопка смены темы */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button
          onClick={() => {
            const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            document.documentElement.className = newTheme;
          }}
          style={{
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {localStorage.getItem('theme') === 'dark' ? '☀️ Светлая' : '🌙 Тёмная'} тема
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
