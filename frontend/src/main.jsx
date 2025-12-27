import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './styles/theme.css';
import './styles/ThemeSwitch.css';
import './styles/layout.css';
import './styles/tasks.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.className = savedTheme;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
  