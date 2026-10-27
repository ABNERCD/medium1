import axios from 'axios';

// Creamos una instancia de axios que usaremos en toda la aplicación
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

/**
 * Interceptor de Peticiones:
 * Se ejecuta ANTES de que cada petición sea enviada.
 * Su trabajo es tomar el token de localStorage y añadirlo a las cabeceras.
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Interceptor de Respuestas:
 * Se ejecuta DESPUÉS de recibir una respuesta del servidor.
 * Su trabajo es revisar si hay errores, especialmente el error 401 (No Autorizado).
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el servidor responde con 401 y no estamos en la página de login
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
