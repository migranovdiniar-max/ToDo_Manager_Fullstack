import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateUtils';

function TaskModal({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(
    task.due_date ? new Date(task.due_date).toISOString().slice(0, 10) : ''
  );

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setDueDate(
      task.due_date ? new Date(task.due_date).toISOString().slice(0, 10) : ''
    );
  }, [task]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const isOverdue =
    task.due_date &&
    !task.completed &&
    !isNaN(new Date(task.due_date)) &&
    new Date(task.due_date) < new Date();

  const handleSave = async () => {
    const originalDate = task.due_date
      ? new Date(task.due_date).toISOString().slice(0, 10)
      : '';

    const hasChanges =
      title !== task.title ||
      description !== (task.description || '') ||
      dueDate !== originalDate;

    if (!hasChanges) {
      onClose();
      return;
    }

    await onUpdate(task.id, {
      title,
      description: description || null,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
    });

    onClose();
  };

  return (
    <div
      className="tm-modal-overlay"
      onClick={handleClickOutside}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        backdropFilter: 'blur(2px)',
        zIndex: 1000,
        padding: '16px',
      }}
    >
      <div
        className="tm-modal-card"
        style={{
          background: 'var(--card-bg, #fff)',
          padding: '24px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '20px',
              color: 'var(--text-color, #1f2937)',
            }}
          >
            Редактирование задачи
          </h2>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '24px',
              color: 'var(--text-color, #6b7280)',
              cursor: 'pointer',
              lineHeight: 1,
            }}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="tm-form-row">
          <label className="tm-field-label">Заголовок</label>
          <input
            className="tm-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="tm-form-row">
          <label className="tm-field-label">Описание</label>
          <textarea
            className="tm-input"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          {task.due_date && (
            <div
              style={{
                marginTop: '4px',
                fontSize: '13px',
                color: isOverdue ? '#f87171' : 'var(--text-muted, #6b7280)',
              }}
            >
              Текущая дата: {formatDate(task.due_date)}{' '}
              {isOverdue && '(просрочено)'}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '8px',
            fontSize: '14px',
            color: 'var(--text-muted, #6b7280)',
          }}
        >
          <strong>Статус:</strong>{' '}
          {task.completed ? '✅ Выполнено' : '⏳ В работе'}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '24px',
          }}
        >
          <button
            onClick={handleSave}
            className="tm-btn tm-btn-primary"
            style={{ flex: 1 }}
            disabled={!title.trim()}
          >
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="tm-btn tm-btn-sm"
            style={{ flex: 1 }}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
