import { useState } from 'react';

function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <section className="tm-new-task-card">
      <h2>Новая задача</h2>

      <div className="tm-form-row">
        <input
          className="tm-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок задачи"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
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
  );
}

export default NewTaskForm;
