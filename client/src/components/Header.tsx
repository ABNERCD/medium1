import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';
// 1. Importamos el componente del logo reutilizable
import { NewMediumLogo } from './NewMediumLogo';

export function Header() {
  // 2. Estado para detectar si el usuario ha hecho scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Si el scroll vertical es mayor a 10px, activamos el estado
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Añadimos el listener cuando el componente se monta
    window.addEventListener('scroll', handleScroll);

    // Limpiamos el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // 3. Añadimos una clase 'scrolled' dinámicamente
    <Navbar 
      variant="dark" 
      expand="lg" 
      fixed="top" // Usamos fixed="top" para un mejor control del efecto
      className={`main-header ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            {/* 4. Usamos el componente del logo SVG */}
            <NewMediumLogo />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-lg-center">
            <LinkContainer to="/login">
              <Nav.Link className="nav-link-custom">Iniciar Sesión</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>
                <Button className="register-button-header">Registrarse</Button>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

