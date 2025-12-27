// frontend/src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px', color: 'var(--text-color)' }}>
        Загрузка...
      </div>
    );
  }

  return (
    <div className={localStorage.getItem('theme') || 'light'}>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />}
        />

        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/auth"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
