import axios from 'axios';

// Creamos una instancia de axios que usaremos en toda la aplicación
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // URL base de tu API
});

/**
 * Interceptor de Peticiones:
 * Se ejecuta ANTES de que cada petición sea enviada.
 * Su trabajo es tomar el token de localStorage y añadirlo a las cabeceras.
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Si el token existe, lo añadimos a la cabecera 'Authorization'
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
  (response) => response, // Si la respuesta es exitosa (2xx), no hacemos nada.
  (error) => {
    // Si el servidor responde con un error 401 (token inválido o expirado)
    if (error.response && error.response.status === 401) {
      // Limpiamos los datos de sesión del navegador
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Redirigimos al usuario a la página de login
      window.location.href = '/login';
      alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
    }
    // Devolvemos el error para que pueda ser manejado por el componente que hizo la llamada
    return Promise.reject(error);
  }
);

export default apiClient;
