// frontend/src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Проверяем токен при загрузке
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setError('');
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      const { access_token } = res.data;

      // Сохраняем токен
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Обновляем состояние → это вызовет перерендер
      setUser({ token: access_token });

      // Можно не вызывать navigate — роутер сам перенаправит
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Неверный логин или пароль');
    }
  };

  const register = async (username, email, password) => {
    setError('');
    try {
      await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      // После регистрации — сразу логинимся
      await login(username, password);
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      setError('Ошибка регистрации');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAuthenticated = !!user;

  return { user, loading, error, login, register, logout, isAuthenticated };
}
