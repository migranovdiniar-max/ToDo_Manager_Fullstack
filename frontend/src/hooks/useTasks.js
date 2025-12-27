import { useState, useEffect } from 'react';
import axios from 'axios';

export function useTasks() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/tasks/');
        
        if (Array.isArray(res.data)) {
          setAllTasks(res.data);
        } else if (res.data && Array.isArray(res.data.results)) {
          setAllTasks(res.data.results);
        } else {
          console.warn('Некорректный формат данных:', res.data);
          setAllTasks([]);
        }
      } catch (err) {
        console.error('Ошибка загрузки задач', err);
        setAllTasks([]); // ✅ На всякий случай
        alert('Не удалось загрузить задачи. Проверьте бэкенд.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTaskData) => {
    try {
      const res = await axios.post('/tasks/', {
        ...newTaskData,
        completed: false,
        created_at: new Date().toISOString(),
      });
      setAllTasks((prev) => Array.isArray(prev) ? [res.data, ...prev] : [res.data]);
    } catch (err) {
      console.error('Ошибка добавления задачи', err);
    }
  };

  const toggleTask = async (id) => {
    const task = allTasks.find(t => t.id === id);
    if (!task) return;

    try {
      const res = await axios.patch(`/tasks/${id}/`, {
        completed: !task.completed,
      });
      setAllTasks(prev => Array.isArray(prev) ? prev.map(t => t.id === id ? res.data : t) : [res.data]);
    } catch (err) {
      console.error('Ошибка при обновлении задачи', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}/`);
      setAllTasks(prev => Array.isArray(prev) ? prev.filter(t => t.id !== id) : []);
    } catch (err) {
      console.error('Ошибка при удалении задачи', err);
    }
  };

  // ✅ Убедимся, что allTasks — массив
  const validTasks = Array.isArray(allTasks) ? allTasks : [];

  const tasks = validTasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return {
    allTasks: validTasks,
    tasks,
    loading,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
  };
}
