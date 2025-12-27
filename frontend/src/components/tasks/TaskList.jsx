import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onToggle, onDelete, openModal }) {
  if (loading) {
    return (
      <section className="tm-task-list-card">
        <p className="tm-empty">Загрузка задач...</p>
      </section>
    );
  }

  return (
    <section className="tm-task-list-card">
      <div className="tm-task-list-header">
        <h2>Мои задачи</h2>
        <span className="tm-badge">{tasks.length}</span>
      </div>

      {tasks.length === 0 ? (
        <p className="tm-empty">Задач не найдено</p>
      ) : (
        <ul className="tm-task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
