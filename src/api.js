import axios from 'axios';

const api = axios.create({
  baseURL: 'https://misogi-be.onrender.com/',
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
