// En: client/src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  // Verificamos si el token de autenticación existe en localStorage
  const isAuthenticated = !!localStorage.getItem('authToken');

  // Si está autenticado, renderizamos el componente hijo (la página que queremos proteger)
  // Si no, lo redirigimos a la página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
