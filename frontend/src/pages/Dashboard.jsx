import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import NewTaskForm from '../components/tasks/NewTaskForm';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../hooks/useTasks';

function Dashboard() {
  const {
    allTasks,
    tasks,
    loading,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const [selectedTask, setSelectedTask] = useState(null);

  // Функция открытия модалки
  const openModal = (task) => {
    setSelectedTask(task);
  };

  // Функция закрытия
  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <PageLayout
        filter={filter}
        setFilter={setFilter}
        total={allTasks.length}
        active={allTasks.filter(t => !t.completed).length}
      >
        <NewTaskForm onAdd={addTask} />
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onOpenModal={openModal}
        />
      </PageLayout>

      {/* Модальное окно */}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} />
      )}
    </>
  );
}

export default Dashboard;
