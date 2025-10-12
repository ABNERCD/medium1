import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';// Importa un CSS específico para el Header

export function Header() {
  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      sticky="top" 
      className="bg-opacity-75 backdrop-blur-md border-bottom border-secondary header-animated"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold fs-4 brand-gradient">MEDIUM</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-lg-center">
            <LinkContainer to="/login">
              <Nav.Link className="mx-lg-2">Iniciar Sesión</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <Button variant="primary" className="ms-lg-3 py-2 px-4 shadow-sm hover-scale-105 transition-all-03s">Registrarse</Button>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}