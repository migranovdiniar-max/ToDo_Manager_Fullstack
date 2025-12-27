// frontend/src/components/tasks/TaskModal.jsx

import { useEffect } from 'react';
import { formatDate } from '../../utils/dateUtils';

function TaskModal({ task, onClose }) {
  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Закрытие по клику вне карточки
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const isOverdue =
    task.due_date &&
    !task.completed &&
    !isNaN(new Date(task.due_date)) &&
    new Date(task.due_date) < new Date();

  return (
    <div
      className="tm-modal-overlay"
      onClick={handleClickOutside}
      style={{
        // ✅ Фиксировано, на весь экран
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',

        // ✅ Центрирование
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        // 🔺 Убрали затемнение
        // background: 'rgba(0, 0, 0, 0.5)',

        // ✅ Зато добавим прозрачный overlay, чтобы клик вне работал
        background: 'transparent', // или оставьте очень слабое затемнение: 'rgba(255,255,255,0.8)'
        backdropFilter: 'blur(2px)', // ✅ Опционально: лёгкий blur-фон

        zIndex: 1000,
        padding: '16px',
      }}
    >
      {/* ✅ Карточка — теперь сама по себе с тенью */}
      <div
        className="tm-modal-card"
        style={{
          background: 'var(--card-bg, #fff)',
          padding: '24px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)', // Тень вместо фона
          position: 'relative',
        }}
      >
        {/* Заголовок */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: 'var(--text-color, #1f2937)' }}>
            {task.title}
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

        {/* Описание */}

{task.description && (
  <div
    style={{
      marginBottom: '16px',
      padding: '12px',
      border: '1px solid var(--border-color, #e5e7eb)',
      borderRadius: '8px',
      background: 'var(--card-bg, #f9fafb)',
      fontSize: '14px',
      lineHeight: 1.5,
      maxHeight: '200px',
      overflowY: 'auto', // Скролл, если текст длинный
      color: 'var(--text-color, #374151)',
    }}
    className="tm-modal-description"
  >
    {task.description}
  </div>
)}

        {/* Детали */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--text-muted, #6b7280)',
          }}
        >
          <div>
            <strong>Дата создания:</strong>{' '}
            {new Date(task.created_at).toLocaleDateString('ru-RU')}
          </div>
          {task.due_date && (
            <div style={{ color: isOverdue ? '#f87171' : 'inherit' }}>
              <strong>Дедлайн:</strong>{' '}
              {formatDate(task.due_date)} {isOverdue && '(просрочено)'}
            </div>
          )}
          <div>
            <strong>Статус:</strong>{' '}
            {task.completed ? '✅ Выполнено' : '⏳ В работе'}
          </div>
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '12px',
            background: 'var(--primary, #3b82f6)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default TaskModal;
