function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="tm-task-item">
      <div className="tm-task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <div className="tm-task-text">
          <div className="tm-task-title-row">
            <span className={`tm-task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </span>
            {task.due_date && (
              <span className="tm-badge tm-badge-light">
                до {new Date(task.due_date).toLocaleDateString('ru-RU')}
              </span>
            )}
          </div>
          {task.description && (
            <p className="tm-task-desc">{task.description}</p>
          )}
        </div>
      </div>
      <button
        className="tm-btn tm-btn-danger tm-btn-sm"
        onClick={() => onDelete(task.id)}
      >
        Удалить
      </button>
    </li>
  );
}

export default TaskItem;
