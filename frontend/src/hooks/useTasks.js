import { useEffect, useState } from 'react';
import { tasksApi } from '../api/tasksApi';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await tasksApi.getAll();
      setTasks(data);
    } catch (e) {
      console.error('Ошибка загрузки:', e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async ({ title, description, dueDate }) => {
    if (!title.trim()) return;

    const payload = { title, description: description || undefined };

    if (dueDate) {
      payload.due_date = new Date(dueDate).toISOString();
    }

    try {
      await tasksApi.create(payload);
      fetchTasks();
    } catch (e) {
      console.error('Ошибка создания:', e.response?.data || e.message);
    }
  };

  const toggleTask = async (id) => {
    try {
      await tasksApi.toggle(id);
      fetchTasks();
    } catch (e) {
      console.error('Ошибка toggle:', e.response?.data || e.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksApi.delete(id);
      fetchTasks();
    } catch (e) {
      console.error('Ошибка удаления:', e.response?.data || e.message);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
  };
}
