// src/services/api.js
import axios from 'axios';

// Definir la URL de la API directamente
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Añadir interceptor para incluir token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
