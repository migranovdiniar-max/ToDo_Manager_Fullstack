import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const tasksApi = {
  getAll: () => axios.get(`${API_URL}/tasks/`),
  create: (data) => axios.post(`${API_URL}/tasks/`, data),
  toggle: (id) => axios.patch(`${API_URL}/tasks/${id}`),
  delete: (id) => axios.delete(`${API_URL}/tasks/${id}`),
};
