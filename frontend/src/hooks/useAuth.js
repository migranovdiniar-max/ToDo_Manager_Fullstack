import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token, username: savedUsername || 'Пользователь' });
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

      localStorage.setItem('token', access_token);
      localStorage.setItem('username', username);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      setUser({ token: access_token, username });
    } catch (err) {
      setError(err.response?.data?.detail || 'Неверный логин или пароль');
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
      await login(username, password);
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка регистрации');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAuthenticated = !!user;

  return { user, loading, error, login, register, logout, isAuthenticated };
}
