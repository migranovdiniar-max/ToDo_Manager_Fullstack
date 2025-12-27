import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onToggle, onDelete, onOpenModal }) {
  if (loading) {
    return <p className="tm-empty">Загрузка задач...</p>;
  }

  if (tasks.length === 0) {
    return <p className="tm-empty">Задач не найдено</p>;
  }

  return (
    <ul className="tm-task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}        
          openModal={onOpenModal}
        />
      ))}
    </ul>
  );
}

export default TaskList;
