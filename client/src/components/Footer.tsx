// Contenido MEJORADO para: src/components/Footer.tsx

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css'; // Importamos el CSS que crearemos a continuación

export function Footer() {
  return (
    <footer className="footer-container text-light pt-5 pb-4 mt-auto">
      <Container>
        <Row className="gy-4">
          {/* Columna 1: Marca y Descripción */}
          <Col lg={4} md={6}>
            <h5 className="footer-brand">MEDIUM</h5>
            <p className="text-muted small">
              Tu legado digital, brillante y seguro. Un espacio único para tus archivos, 
              recuerdos y voluntades más importantes.
            </p>
          </Col>

          {/* Columna 2: Enlaces Rápidos (Opcional, puedes agregar más) */}
          <Col lg={2} md={6}>
            <h6 className="text-uppercase fw-bold mb-4">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/privacy-policy" className="footer-link">Política de Privacidad</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms-of-service" className="footer-link">Términos de Servicio</Link>
              </li>
            </ul>
          </Col>

          {/* Columna 3: Contacto (Opcional) */}
          <Col lg={3} md={6}>
             <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
             <p className="small text-muted">
                <i className="fas fa-envelope me-3"></i>
                contacto@medium.com
             </p>
             <p className="small text-muted">
                <i className="fas fa-phone me-3"></i>
                +52 55 1234 5678
             </p>
          </Col>

          {/* Columna 4: Redes Sociales */}
          <Col lg={3} md={6} className="text-lg-end">
            <h6 className="text-uppercase fw-bold mb-4">Síguenos</h6>
            <div className="footer-social-icons">
              <a href="#!" className="footer-social-icon me-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" className="footer-social-icon me-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#!" className="footer-social-icon me-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#!" className="footer-social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row>
          <Col className="text-center text-muted small">
            <p>&copy; {new Date().getFullYear()} MEDIUM. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}