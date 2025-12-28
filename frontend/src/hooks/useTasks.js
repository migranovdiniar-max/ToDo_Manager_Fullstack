import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/tasks';
const PAGE_SIZE = 8;

export function useTasks() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // фильтр по категории (id или null)
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/`, {
        withCredentials: true,
      });
      setAllTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ fetchTasks:', err.response?.data || err.message);
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
      await fetchTasks();
    } catch (err) {
      console.error('❌ updateTask:', err.response?.data || err.message);
    }
  };

  const filteredTasks = useMemo(() => {
    // сортируем: сначала закреплённые, потом по дате создания
    const sorted = [...allTasks].sort((a, b) => {
      if (a.is_pinned === b.is_pinned) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return a.is_pinned ? -1 : 1;
    });

    return sorted.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(search.toLowerCase()));

      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);

      const matchesCategory =
        !categoryFilter || task.category_id === categoryFilter;

      return matchesSearch && matchesFilter && matchesCategory;
    });
  }, [allTasks, search, filter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));

  const tasks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredTasks.slice(start, start + PAGE_SIZE);
  }, [filteredTasks, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  return {
    allTasks,
    tasks,
    loading,
    filter,
    setFilter,
    search,
    setSearch,
    page,
    totalPages,
    setPage,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    categoryFilter,
    setCategoryFilter,
  };
}
