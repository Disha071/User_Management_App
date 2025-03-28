// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data; // { token: '...' }
  } catch (error) {
    throw error;
  }
};

export const getUsers = (page = 1) => api.get(`/users?page=${page}`);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);