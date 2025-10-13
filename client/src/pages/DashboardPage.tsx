// En: client/src/pages/DashboardPage.tsx

import React, { useState, useEffect } from 'react';
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
    return <Container className="mt-5"><p>Cargando...</p></Container>;
  }

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header as="h2">Panel de Control</Card.Header>
        <Card.Body>
          <Card.Title>¡Bienvenido de nuevo, {user.nombre}!</Card.Title>
          <Card.Text>
            Has iniciado sesión correctamente. Tu rol es: <strong>{user.rol}</strong>.
          </Card.Text>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">ID de Usuario: {user.id}</Card.Footer>
      </Card>
    </Container>
  );
}