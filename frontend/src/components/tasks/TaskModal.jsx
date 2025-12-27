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

  const isOverdue = task.due_date && 
    !task.completed && 
    new Date(task.due_date) < new Date();

  return (
    <div
      className="tm-modal-overlay"
      onClick={handleClickOutside}
    >
      <div className="tm-modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '24px', color: 'var(--text-color)' }}>
            {task.title}
          </h3>
          <button
            onClick={onClose}
            className="tm-btn tm-btn-sm"
            style={{ background: 'transparent', color: 'var(--text-color)', border: '1px solid var(--border-color)' }}
          >
            ×
          </button>
        </div>

        {task.description && (
          <div style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--text-color)', fontSize: '14px' }}>Описание:</strong>
            <p style={{ 
              margin: '8px 0 0', 
              whiteSpace: 'pre-wrap', 
              color: 'var(--text-color)',
              fontSize: '14px'
            }}>
              {task.description}
            </p>
          </div>
        )}

        <div style={{ 
          fontSize: '14px', 
          color: 'var(--text-muted)', 
          lineHeight: '1.6',
          background: 'rgba(148, 163, 184, 0.1)',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <div><strong>Дата создания:</strong> {new Date(task.created_at || Date.now()).toLocaleDateString('ru-RU')}</div>
          {task.due_date && (
            <div style={{ color: isOverdue ? '#f87171' : 'var(--text-color)' }}>
              <strong>Дедлайн:</strong> {formatDate(task.due_date)} {isOverdue && '(просрочено)'}
            </div>
          )}
          <div>
            <strong>Статус:</strong> {task.completed ? '✅ Выполнено' : '⏳ В работе'}
          </div>
        </div>

        <button
          onClick={onClose}
          className="tm-btn tm-btn-primary tm-btn-sm"
          style={{ marginTop: '20px', width: '100%' }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default TaskModal;
