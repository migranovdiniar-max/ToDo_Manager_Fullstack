// frontend/src/components/layout/Sidebar.jsx

import { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ Добавили
import ThemeSwitch from '../ThemeSwitch';
import { useAuthContext } from '../../context/AuthContext';

const API_CATEGORIES = 'http://localhost:8000/categories';

function Sidebar({
  filter,
  setFilter,
  total,
  active,
  categoryFilter,
  setCategoryFilter,
}) {
  const { logout } = useAuthContext();

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [newCatName, setNewCatName] = useState('');

  // Загрузка категорий
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCats(true);
      try {
        const res = await axios.get(`${API_CATEGORIES}/`);
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error('loadCategories error', e.response?.data || e.message);
        setCategories([]);
      } finally {
        setLoadingCats(false);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    const name = newCatName.trim();
    if (!name) return;
    try {
      const res = await axios.post(`${API_CATEGORIES}/`, { name });
      const created = res.data;
      setCategories((prev) => [...prev, created]);
      setCategoryFilter(created.id);
      setNewCatName('');
    } catch (e) {
      console.error('addCategory error', e.response?.data || e.message);
    }
  };

  return (
    <aside className="tm-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="tm-logo">TASK MANAGER</h1>
        <ThemeSwitch />
      </div>

      <div className="tm-filter-group">
        <button className={`tm-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          Все
        </button>
        <button className={`tm-filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
          Активные
        </button>
        <button className={`tm-filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>
          Выполненные
        </button>
      </div>

      <div className="tm-filter-group" style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>
          Категории
        </div>

        <button className={`tm-filter-btn ${!categoryFilter ? 'active' : ''}`} onClick={() => setCategoryFilter(null)}>
          Все категории
        </button>

        {loadingCats ? (
          <p className="tm-summary" style={{ fontSize: '13px' }}>
            Загрузка категорий...
          </p>
        ) : categories.length === 0 ? (
          <p className="tm-summary" style={{ fontSize: '13px' }}>
            Категорий пока нет.
          </p>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              className={`tm-filter-btn ${categoryFilter === cat.id ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat.id)}
            >
              {cat.name}
            </button>
          ))
        )}

        <div style={{ marginTop: '12px' }}>
          <input
            className="tm-input"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Новая категория"
          />
          <button
            type="button"
            className="tm-btn tm-btn-primary tm-btn-sm"
            style={{ marginTop: '6px', width: '100%' }}
            onClick={handleAddCategory}
            disabled={!newCatName.trim()}
          >
            Добавить категорию
          </button>
        </div>
      </div>

      <p className="tm-summary">
        Всего: {total} · Активных: {active}
      </p>

      <button type="button" className="tm-btn tm-btn-danger tm-btn-sm" onClick={logout} style={{ marginTop: '16px' }}>
        Выйти
      </button>
    </aside>
  );
}

export default Sidebar;
