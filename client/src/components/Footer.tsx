import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer-container text-light pt-5 pb-4 mt-auto">
      <Container>
        <Row className="gy-4">
          {/* Columna 1: Marca y Descripción */}
          <Col lg={4} md={6}>
            {/* Reemplazamos el logo de imagen por un texto estilizado */}
            <div className="footer-brand-text">MEDIUM</div>
            <p className="text-muted small mt-3">
              Tu legado digital, brillante y seguro. Un espacio único para tus archivos, 
              recuerdos y voluntades más importantes.
            </p>
          </Col>

          {/* Columna 2: Enlaces Rápidos */}
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

          {/* Columna 3: Contacto */}
          <Col lg={3} md={6}>
             <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
             <p className="small text-muted d-flex align-items-center">
                <i className="fas fa-envelope me-3"></i>
                <span>contacto@medium.com</span>
             </p>
          </Col>

          {/* Columna 4: Redes Sociales */}
          <Col lg={3} md={6} className="text-lg-end">
            <h6 className="text-uppercase fw-bold mb-4">Síguenos</h6>
            <div className="footer-social-icons">
              <a href="#!" className="footer-social-icon me-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" className="footer-social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        {/* --- SECCIÓN DE CRÉDITOS --- */}
        <Row className="text-center text-muted small footer-credits">
          <Col md={6} className="text-md-start mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} MEDIUM. Concepto por Lic. Martinez Vargas Omar.
          </Col>
          <Col md={6} className="text-md-end">
            Diseño y Desarrollo por <a href="https://www.linkedin.com/in/abner-chazaro-a81709143" target="_blank" rel="noopener noreferrer" className="footer-link-special">Abner Cházaro</a>.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

