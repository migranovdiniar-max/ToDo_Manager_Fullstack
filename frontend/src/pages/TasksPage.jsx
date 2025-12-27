import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import NewTaskForm from '../components/tasks/NewTaskForm';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../hooks/useTasks';

function TasksPage() {
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

  const openModal = (task) => setSelectedTask(task);
  const closeModal = () => setSelectedTask(null);

  const activeCount = allTasks.filter((t) => !t.completed).length;

  return (
    <>
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
          onOpenModal={openModal}
        />
      </PageLayout>

      {selectedTask && <TaskModal task={selectedTask} onClose={closeModal} />}
    </>
  );
}

export default TasksPage;
