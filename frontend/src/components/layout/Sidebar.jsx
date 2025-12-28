// frontend/src/components/layout/Sidebar.jsx
import ThemeSwitch from '../ThemeSwitch';
import { useAuthContext } from '../../context/AuthContext';

function Sidebar({ filter, setFilter, total, active }) {
  const { logout } = useAuthContext();

  return (
    <aside className="tm-sidebar">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 className="tm-logo">TASK MANAGER</h1>
        <ThemeSwitch />
      </div>

      <div className="tm-filter-group">
        <button
          className={`tm-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={`tm-filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={`tm-filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Выполненные
        </button>
      </div>

      <p className="tm-summary">
        Всего: {total} · Активных: {active}
      </p>

      {/* Кнопка выхода, не трогающая ThemeSwitch */}
      <button
        type="button"
        className="tm-btn tm-btn-danger tm-btn-sm"
        onClick={logout}
        style={{ marginTop: '16px' }}
      >
        Выйти
      </button>
    </aside>
  );
}

export default Sidebar;
