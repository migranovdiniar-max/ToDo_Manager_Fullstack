import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import { useAuthContext } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Загрузка...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/auth" replace />} />
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
    </Routes>
  );
}

export default App;
