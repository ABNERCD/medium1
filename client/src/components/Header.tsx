import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Header.css';
import { NewMediumLogo } from './NewMediumLogo';

interface StoredUser {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Revisar si hay usuario autenticado al cambiar de ruta
  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    if (token && rawUser) {
      try {
        setCurrentUser(JSON.parse(rawUser));
      } catch {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <Navbar 
      variant="dark" 
      expand="lg" 
      fixed="top"
      className={`main-header ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <NewMediumLogo />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-lg-center">
            {currentUser ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link className="nav-link-custom">
                    <i className="fas fa-th-large me-1"></i> Panel ({currentUser.nombre.split(' ')[0]})
                  </Nav.Link>
                </LinkContainer>
                <Nav.Item>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={handleLogout} 
                    className="ms-2"
                  >
                    <i className="fas fa-sign-out-alt me-1"></i> Salir
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link-custom">Iniciar Sesión</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <Button className="register-button-header">Registrarse</Button>
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
