import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onToggle, onDelete }) {
  return (
    <section className="tm-task-list-card">
      <div className="tm-task-list-header">
        <h2>Мои задачи</h2>
        {loading && <span className="tm-badge">Загрузка...</span>}
      </div>

      {tasks.length === 0 && !loading && (
        <p className="tm-empty">Задач пока нет</p>
      )}

      <ul className="tm-task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
