import { formatDate } from '../../utils/dateUtils';

function TaskItem({ task, onToggle, onDelete, openModal }) {
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Удалить задачу?')) {
      onDelete(task.id);
    }
  };

  const handleClick = () => {
    openModal(task); // ✅ Открывает модалку
  };

  return (
    <li
      className="tm-task-item"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="tm-task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="tm-task-text">
          <div className="tm-task-title-row">
            <span className={`tm-task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </span>
            {task.due_date && (
              <span className="tm-badge-light">
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
                margin: 0,
                lineHeight: '1.4',
                maxHeight: '2.8em',
                wordBreak: 'break-word',
                paddingRight: '8px',
                fontSize: '13px',
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
        onClick={handleDelete}
        style={{ marginLeft: '8px' }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TaskItem;
