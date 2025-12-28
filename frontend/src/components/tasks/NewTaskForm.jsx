// frontend/src/components/tasks/NewTaskForm.jsx

import { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ Добавили

const API_CATEGORIES = 'http://localhost:8000/categories';
const API_TEMPLATES = 'http://localhost:8000/task-templates';

function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);

  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get(`${API_CATEGORIES}/`);
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error('loadCategories error', e.response?.data || e.message);
      }
    };

    const loadTemplates = async () => {
      try {
        const res = await axios.get(`${API_TEMPLATES}/`);
        setTemplates(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error('loadTemplates error', e.response?.data || e.message);
      }
    };

    loadCategories();
    loadTemplates();
  }, []);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description, dueDate, categoryId: categoryId || null });
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategoryId(null);
    setCategoryName('');
  };

  const handleSelectCategory = (cat) => {
    if (!cat) {
      setCategoryId(null);
      setCategoryName('');
    } else {
      setCategoryId(cat.id);
      setCategoryName(cat.name);
    }
    setShowCategoryPicker(false);
  };

  const [newCategoryName, setNewCategoryName] = useState('');
  const handleCreateCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;
    try {
      const res = await axios.post(`${API_CATEGORIES}/`, { name });
      const created = res.data;
      setCategories((prev) => [...prev, created]);
      setCategoryId(created.id);
      setCategoryName(created.name);
      setNewCategoryName('');
      setShowCategoryPicker(false);
    } catch (e) {
      console.error('createCategory error', e.response?.data || e.message);
    }
  };

  const handleSelectTemplate = (tpl) => {
    setTitle(tpl.title || '');
    if (tpl.default_category_id) {
      const cat = categories.find((c) => c.id === tpl.default_category_id);
      if (cat) {
        setCategoryId(cat.id);
        setCategoryName(cat.name);
      } else {
        setCategoryId(tpl.default_category_id);
        setCategoryName('');
      }
    }
    if (tpl.default_description) {
      setDescription(tpl.default_description);
    }
    setShowTemplatePicker(false);
  };

  return (
    <>
      <section className="tm-new-task-card">
        <h2>Новая задача</h2>

        <div className="tm-form-row" style={{ display: 'flex', gap: 8 }}>
          <input
            className="tm-input"
            style={{ flex: 1 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок задачи"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button type="button" className="tm-btn tm-btn-sm" onClick={() => setShowTemplatePicker(true)}>
            Шаблоны
          </button>
        </div>

        <div className="tm-form-row">
          <textarea
            className="tm-input"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание (необязательно)"
          />
        </div>

        <div className="tm-form-row">
          <button
            type="button"
            className="tm-btn tm-btn-sm"
            style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
            onClick={() => setShowCategoryPicker(true)}
          >
            <span>
              Категория:{' '}
              {categoryId ? categoryName || `ID ${categoryId}` : 'не выбрана'}
            </span>
            <span>▾</span>
          </button>
        </div>

        <div className="tm-form-row">
          <label className="tm-field-label">Дедлайн</label>
          <input
            type="date"
            className="tm-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="tm-form-row">
          <button
            className="tm-btn tm-btn-primary"
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Добавить задачу
          </button>
        </div>
      </section>

      {/* Модалка выбора категории — осталась без изменений */}
      {showCategoryPicker && (
        <div className="tm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowCategoryPicker(false)}>
          <div className="tm-modal-card">
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Выбор категории</h3>
            <button type="button" className="tm-btn tm-btn-sm" style={{ width: '100%', marginBottom: 8 }} onClick={() => handleSelectCategory(null)}>
              Без категории
            </button>
            <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 8 }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="tm-btn tm-btn-sm"
                  style={{ width: '100%', marginBottom: 4, textAlign: 'left' }}
                  onClick={() => handleSelectCategory(cat)}
                >
                  {cat.name}
                </button>
              ))}
              {categories.length === 0 && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Категорий пока нет. Вы можете создать свою ниже.
                </p>
              )}
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, marginBottom: 4 }}>Добавить свою категорию</div>
              <input
                className="tm-input"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Название категории"
              />
              <button
                type="button"
                className="tm-btn tm-btn-primary tm-btn-sm"
                style={{ marginTop: 8, width: '100%' }}
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim()}
              >
                Создать и выбрать
              </button>
            </div>
            <button type="button" className="tm-btn tm-btn-sm" style={{ marginTop: 8, width: '100%' }} onClick={() => setShowCategoryPicker(false)}>
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Модалка шаблонов — осталась без изменений */}
      {showTemplatePicker && (
        <div className="tm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowTemplatePicker(false)}>
          <div className="tm-modal-card">
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Шаблоны задач</h3>
            <div style={{ maxHeight: 260, overflowY: 'auto' }}>
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  className="tm-btn tm-btn-sm"
                  style={{ width: '100%', marginBottom: 4, textAlign: 'left' }}
                  onClick={() => handleSelectTemplate(tpl)}
                >
                  {tpl.title}
                </button>
              ))}
              {templates.length === 0 && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Шаблонов пока нет. Можно добавить их позже через отдельный интерфейс.
                </p>
              )}
            </div>
            <button type="button" className="tm-btn tm-btn-sm" style={{ marginTop: 8, width: '100%' }} onClick={() => setShowTemplatePicker(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NewTaskForm;
