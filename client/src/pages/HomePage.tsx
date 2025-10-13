import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Accordion } from 'react-bootstrap';
import './HomePage.css';
import 'animate.css';

// Importamos la imagen del logo directamente
import logoImage from '../assets/logo.png';

// Creamos un componente específico para el logo de la página de inicio
const HomePageLogo = () => (
  <div className="homepage-logo-container animate__animated animate__fadeInDown">
    <img src={logoImage} alt="Medium Logo" className="homepage-logo-image" />
  </div>
);

// Componente de Ícono de Característica rediseñado
const FeatureIcon = ({ icon }: { icon: string }) => (
  <div className="feature-icon mb-4">
    <i className={`fas ${icon} fa-2x`}></i>
  </div>
);

export function HomePage() {
  return (
    <div className="homepage-wrapper">
      {/* ===== Sección Principal (Hero) ===== */}
      <Container as="section" className="hero-section text-center text-white">
        
        {/* Usamos el nuevo componente del logo de imagen */}
        <HomePageLogo />

        <h1 className="display-4 fw-bolder mb-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
          Tu Legado Digital, Brillante y Seguro.
        </h1>
        <p className="lead text-secondary my-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
          Un espacio único para tus archivos, recuerdos y voluntades más importantes.
          <br />
          Acceso universal, privacidad absoluta y control total.
        </p>
        <Link to="/login">
          <Button
            size="lg"
            className="hero-button mt-4 animate__animated animate__fadeInUp"
            style={{ animationDelay: '0.6s' }}
          >
            Crea tu Espacio
          </Button>
        </Link>
      </Container>

      {/* ===== Sección de Características (Features) ===== */}
      <Container as="section" className="features-section text-center">
        <h2 className="section-title fw-bold text-white mb-5">Todo en un Solo Lugar</h2>
        <Row className="justify-content-center">
          <Col lg={4} md={6} className="mb-4">
            {/* 1. Añadimos la clase 'feature-card--security' */}
            <Card className="feature-card feature-card--security h-100 animate__animated animate__fadeInUp" style={{ animationDelay: '0.8s' }}>
              <Card.Body>
                <FeatureIcon icon="fa-shield-alt" />
                <Card.Title as="h3" className="fw-bold mb-3">Seguridad Total</Card.Title>
                <Card.Text className="text-secondary">
                  Protección con encriptación de extremo a extremo y acceso exclusivo para ti.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4} md={6} className="mb-4">
            {/* 2. Añadimos la clase 'feature-card--collaboration' */}
            <Card className="feature-card feature-card--collaboration h-100 animate__animated animate__fadeInUp" style={{ animationDelay: '1.0s' }}>
              <Card.Body>
                <FeatureIcon icon="fa-users" />
                <Card.Title as="h3" className="fw-bold mb-3">Colaboración Intuitiva</Card.Title>
                <Card.Text className="text-secondary">
                  Invita a seres queridos o asesores a colaborar de forma segura y controlada.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            {/* 3. Añadimos la clase 'feature-card--global' */}
            <Card className="feature-card feature-card--global h-100 animate__animated animate__fadeInUp" style={{ animationDelay: '1.2s' }}>
              <Card.Body>
                <FeatureIcon icon="fa-cloud-upload-alt" />
                <Card.Title as="h3" className="fw-bold mb-3">Acceso Global</Card.Title>
                <Card.Text className="text-secondary">
                  Gestiona tu información desde cualquier dispositivo, en cualquier parte del mundo.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ===== Sección de Preguntas Frecuentes (FAQ) ===== */}
      <Container as="section" className="faq-section">
        <h2 className="section-title fw-bold text-white text-center mb-5">Preguntas Frecuentes</h2>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Accordion defaultActiveKey="0" className="faq-accordion">
              <Accordion.Item eventKey="0" className="animate__animated animate__fadeInUp" style={{ animationDelay: '1.4s' }}>
                <Accordion.Header>¿Qué tan seguros están mis datos?</Accordion.Header>
                <Accordion.Body>
                  Implementamos cifrado de extremo a extremo, monitoreo constante y las más estrictas políticas de privacidad. Tu legado digital es solo tuyo y está custodiado bajo los más altos estándares.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="animate__animated animate__fadeInUp" style={{ animationDelay: '1.5s' }}>
                <Accordion.Header>¿Puedo compartir información con mi familia?</Accordion.Header>
                <Accordion.Body>
                  Sí, nuestra plataforma te permite designar con precisión qué documentos o recuerdos pueden ser accedidos por quién y cuándo. Tú mantienes el control total sobre la divulgación.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="animate__animated animate__fadeInUp" style={{ animationDelay: '1.6s' }}>
                <Accordion.Header>¿Qué tipo de archivos puedo guardar?</Accordion.Header>
                <Accordion.Body>
                  Nuestra plataforma soporta una amplia gama de formatos: desde documentos importantes (PDF, DOCX), hasta valiosos recuerdos en forma de imágenes, videos y archivos de audio.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

