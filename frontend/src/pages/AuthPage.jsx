import '../styles/ThemeSwitch.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

function AuthPage() {
  const { login, register, error } = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(username, password);
    } else {
      await register(username, email, password);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'dark';

  return (
    <div
      className="tm-root"
      style={{
        backgroundColor: 'var(--body-bg)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div className="tm-new-task-card" style={{ maxWidth: '420px', width: '100%' }}>
        <div style={{ textAlign: 'right', marginBottom: '16px' }}>
          <div className="theme-switch" onClick={toggleTheme} title="Сменить тему">
            <div className={`switch ${currentTheme === 'dark' ? 'dark' : ''}`}>
              <span className="icon sun">☀️</span>
              <span className="icon moon">🌙</span>
              <div className="slider"></div>
            </div>
          </div>
        </div>

        <h2 style={{ margin: 0, fontSize: '20px', textAlign: 'center', marginBottom: '24px' }}>
          {isLogin ? 'Добро пожаловать' : 'Создайте аккаунт'}
        </h2>

        {error && (
          <div
            className="tm-btn tm-btn-danger"
            style={{ width: '100%', textAlign: 'center', marginBottom: '16px', padding: '10px' }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="tm-form-row">
            <input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="tm-input"
              style={{ width: '100%' }}
              required
            />
          </div>

          {!isLogin && (
            <div className="tm-form-row">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tm-input"
                style={{ width: '100%' }}
                required
              />
            </div>
          )}

          <div className="tm-form-row">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="tm-input"
              style={{ width: '100%' }}
              required
            />
          </div>

          <button type="submit" className="tm-btn tm-btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--text-color)',
            opacity: 0.8,
          }}
        >
          {isLogin ? (
            <>
              Нет аккаунта?{' '}
              <button
                onClick={() => setIsLogin(false)}
                style={{
                  color: 'var(--primary-btn-bg)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Зарегистрироваться
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button
                onClick={() => setIsLogin(true)}
                style={{
                  color: 'var(--primary-btn-bg)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
