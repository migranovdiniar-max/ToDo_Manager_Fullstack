import PageLayout from '../components/layout/PageLayout';
import NewTaskForm from '../components/tasks/NewTaskForm';
import TaskList from '../components/tasks/TaskList';
import { useTasks } from '../hooks/useTasks';

function TasksPage() {
  const {
    tasks,
    allTasks,
    loading,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const activeCount = allTasks.filter((t) => !t.completed).length;

  return (
    <PageLayout
      filter={filter}
      setFilter={setFilter}
      total={allTasks.length}
      active={activeCount}
    >
      <NewTaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        loading={loading}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </PageLayout>
  );
}

export default TasksPage;
