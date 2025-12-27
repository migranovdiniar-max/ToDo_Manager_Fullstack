import { useEffect } from 'react';
import { formatDate } from '../../utils/dateUtils';

function TaskModal({ task, onClose }) {
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

  return (
    <div
      className="tm-modal-overlay"
      onClick={handleClickOutside}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
    >
      <div
        className="tm-modal-content"
        style={{
          background: 'var(--card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          color: 'var(--text-color)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '20px' }}>
          {task.title}
        </h3>

        {task.description && (
          <div style={{ marginBottom: '16px', lineHeight: '1.6', fontSize: '14px' }}>
            <strong>Описание:</strong>
            <p style={{ margin: '8px 0 0', whiteSpace: 'pre-wrap' }}>
              {task.description}
            </p>
          </div>
        )}

        <div style={{ fontSize: '13px', color: 'var(--text-color)', opacity: 0.8 }}>
          <div>Дата создания: {new Date(task.created_at || Date.now()).toLocaleDateString('ru-RU')}</div>
          <div>Дедлайн: {task.due_date ? formatDate(task.due_date) : 'Не указано'}</div>
          <div>Статус: {task.completed ? '✅ Выполнено' : '⏳ В работе'}</div>
        </div>

        <button
          onClick={onClose}
          className="tm-btn tm-btn-primary tm-btn-sm"
          style={{ marginTop: '24px' }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default TaskModal;
