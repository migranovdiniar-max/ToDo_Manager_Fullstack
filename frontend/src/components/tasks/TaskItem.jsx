import { formatDate } from '../../utils/dateUtils';

function TaskItem({ task, onToggle, onDelete, openModal, onPinToggle }) {
  const isOverdue =
    task.due_date &&
    !task.completed &&
    !isNaN(new Date(task.due_date)) &&
    new Date(task.due_date) < new Date();

  return (
    <li
      className="tm-task-item"
      onClick={() => openModal(task)}
      style={{ cursor: 'pointer' }}
    >
      <div className="tm-task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
        />

        <div className="tm-task-text">
          <div
            className="tm-task-title-row"
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span
              className={`tm-task-title ${
                task.completed ? 'completed' : ''
              }`}
            >
              {task.title}
            </span>

            {/* Иконка закрепления */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPinToggle(task);
              }}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              title={task.is_pinned ? 'Открепить' : 'Закрепить'}
            >
              {task.is_pinned ? '📌' : '📍'}
            </button>

            {task.due_date && (
              <span
                className={`tm-badge ${
                  isOverdue ? 'tm-badge-overdue' : 'tm-badge-light'
                }`}
              >
                до {formatDate(task.due_date)}
              </span>
            )}
          </div>

          {task.description && (
            <p
              className="tm-task-desc"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                margin: '4px 0 0',
                fontSize: '13px',
                lineHeight: '1.4',
                maxHeight: '2.8em',
                wordBreak: 'break-word',
                color: 'var(--text-muted)',
              }}
              title={task.description}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      <button
        className="tm-btn tm-btn-danger tm-btn-sm"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm('Удалить задачу?')) {
            onDelete(task.id);
          }
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TaskItem;
