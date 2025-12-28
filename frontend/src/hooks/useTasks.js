import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/tasks';

export function useTasks() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      console.log('🔍 fetchTasks → GET /tasks/'); // ДИАГНОСТИКА
      const res = await axios.get(`${API_URL}/`, {
        withCredentials: true,
      });
      console.log('✅ fetchTasks response:', res.status, res.data?.length); // ДИАГНОСТИКА
      setAllTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ fetchTasks:', err.response?.status, err.response?.data || err.message);
      setAllTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async ({ title, description, dueDate, categoryId }) => {
    try {
      await axios.post(
        `${API_URL}/`,
        {
          title,
          description: description || null,
          due_date: dueDate ? new Date(dueDate).toISOString() : null,
          category_id: categoryId || null,
        },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err) {
      console.error('❌ addTask:', err.response?.data || err.message);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}`, null, { withCredentials: true });
      fetchTasks();
    } catch (err) {
      console.error('❌ toggleTask:', err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
      fetchTasks();
    } catch (err) {
      console.error('❌ deleteTask:', err.response?.data || err.message);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await axios.patch(
        `${API_URL}/${id}/update`,
        { ...updates },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err) {
      console.error('❌ updateTask:', err.response?.data || err.message);
    }
  };

  return {
    allTasks,      // ← Dashboard использует ЭТО
    loading,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  };
}
