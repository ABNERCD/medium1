// En: client/src/pages/DashboardPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';

// Definimos una interfaz para el objeto de usuario que guardamos en localStorage
interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        // Intentamos parsear los datos
        const userData = JSON.parse(userDataString);
        setUser(userData);
      } catch (error) {
        // Si falla (porque no es JSON válido), limpiamos y redirigimos
        console.error("Error al parsear datos del usuario:", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } else {
      // Si no hay datos de usuario, redirigimos al login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiamos el almacenamiento local
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Redirigimos al usuario a la página de login
    navigate('/login');
  };

  // Mientras carga los datos del usuario, podemos mostrar un mensaje
  if (!user) {
    return <Container className="mt-5 text-center"><p>Cargando panel...</p></Container>;
  }

  return (
    <Container className="mt-5 pt-4">
      <Card className="text-center shadow border-0 bg-dark text-white">
        <Card.Header as="h2" className="border-secondary py-3">Panel de Control</Card.Header>
        <Card.Body className="py-4">
          <Card.Title className="fs-3 mb-3">¡Bienvenido de nuevo, {user.nombre}!</Card.Title>
          <Card.Text className="text-muted fs-5 mb-4">
            Has iniciado sesión correctamente. Tu rol es: <span className="badge bg-primary fs-6">{user.rol}</span>
          </Card.Text>
          <div className="mb-4 text-start p-3 bg-secondary bg-opacity-25 rounded mx-auto" style={{ maxWidth: '400px' }}>
            <p className="mb-1"><strong>ID:</strong> {user.id}</p>
            <p className="mb-1"><strong>Nombre:</strong> {user.nombre}</p>
            <p className="mb-0"><strong>Email:</strong> {user.email}</p>
          </div>
          <Button variant="outline-danger" onClick={handleLogout} className="px-4">
            <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted border-secondary">Sesión segura autenticada mediante JWT</Card.Footer>
      </Card>
    </Container>
  );
}
