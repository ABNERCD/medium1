import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Accordion } from 'react-bootstrap';

const FeatureIcon = ({ icon }: { icon: string }) => (
  <div className="bg-secondary p-4 rounded-circle mb-4 d-inline-flex flex-center icon-shadow">
    <i className={`fas ${icon} text-primary fa-2x`}></i>
  </div>
);

export function HomePage() {
  return (
    <div className="gradient-bg">
      {/* ===== Sección Principal (Hero) ===== */}
      <Container className="d-flex flex-column align-items-center justify-content-center text-center text-white hero-section">
        <h1 className="display-2 fw-bolder animate-fade-in-down mb-4">
          Tu Legado Digital, Brillante y Seguro.
        </h1>
        <p className="lead text-muted my-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Un espacio único para tus archivos, recuerdos y voluntades más importantes.<br/>
          Acceso universal, privacidad absoluta y control total.
        </p>
        <Link to="/login">
          <Button 
            variant="primary" 
            size="lg" 
            className="mt-4 px-5 py-3 rounded-pill shadow-lg button-glow animate-fade-in-up" 
            style={{ animationDelay: '0.8s' }}
          >
            Crea tu Espacio
          </Button>
        </Link>
      </Container>

      {/* ===== Separador Visual (Opcional, si quieres algo entre el hero y las features) ===== */}
      {/* <div className="py-5"></div> */}

      {/* ===== Sección de Características (Features) ===== */}
      <div className="py-5 features-section-bg">
        <Container className="text-center">
          <h2 className="display-5 fw-bold text-light mb-5 animate-fade-in-down">Todo en un Solo Lugar</h2>
          <Row className="justify-content-center">
            {/* Aplicamos la nueva clase 'card-glass' y animaciones */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="card-glass h-100 animate-card-fade-in" style={{ animationDelay: '1.0s' }}>
                <Card.Body className="p-4 p-md-5">
                  <FeatureIcon icon="fa-shield-alt" />
                  <Card.Title as="h3" className="fw-bold">Seguridad Total</Card.Title>
                  <Card.Text className="text-muted">
                    Protección de datos con encriptación de extremo a extremo y acceso exclusivo para ti.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <Card className="card-glass h-100 animate-card-fade-in" style={{ animationDelay: '1.2s' }}>
                <Card.Body className="p-4 p-md-5">
                  <FeatureIcon icon="fa-users" />
                  <Card.Title as="h3" className="fw-bold">Colaboración Intuitiva</Card.Title>
                  <Card.Text className="text-muted">
                    Invita a seres queridos o asesores a colaborar de forma segura y controlada.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <Card className="card-glass h-100 animate-card-fade-in" style={{ animationDelay: '1.4s' }}>
                <Card.Body className="p-4 p-md-5">
                  <FeatureIcon icon="fa-cloud-upload-alt" />
                  <Card.Title as="h3" className="fw-bold">Acceso Global</Card.Title>
                  <Card.Text className="text-muted">
                    Gestiona tu información desde cualquier dispositivo, en cualquier rincón del mundo.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ===== Sección de Preguntas Frecuentes (FAQ) ===== */}
      <div className="py-5">
          <Container>
            <h2 className="display-5 fw-bold text-light text-center mb-5 animate-fade-in-down">Preguntas Frecuentes</h2>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0" className="mb-3 animate-card-fade-in" style={{ animationDelay: '1.6s' }}>
                            <Accordion.Header>¿Qué tan seguros están mis datos?</Accordion.Header>
                            <Accordion.Body>
                                Implementamos cifrado de extremo a extremo, monitoreo constante y las más estrictas políticas de privacidad. Tu legado digital es solo tuyo y está custodiado bajo los más altos estándares.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className="mb-3 animate-card-fade-in" style={{ animationDelay: '1.8s' }}>
                            <Accordion.Header>¿Puedo compartir información con mi familia?</Accordion.Header>
                            <Accordion.Body>
                                Sí, nuestra plataforma te permite designar con precisión qué documentos o recuerdos pueden ser accedidos por quién y cuándo. Tú mantienes el control total sobre la divulgación.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" className="mb-3 animate-card-fade-in" style={{ animationDelay: '2.0s' }}>
                            <Accordion.Header>¿Qué tipo de archivos puedo guardar?</Accordion.Header>
                            <Accordion.Body>
                                Nuestra plataforma soporta una amplia gama de formatos: desde documentos importantes (PDF, DOCX), hasta valiosos recuerdos en forma de imágenes, videos y archivos de audio, sin límites significativos.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3" className="mb-3 animate-card-fade-in" style={{ animationDelay: '2.2s' }}>
                            <Accordion.Header>¿Cómo funciona la accesibilidad universal?</Accordion.Header>
                            <Accordion.Body>
                                Puedes acceder a tu espacio desde cualquier navegador web moderno, en cualquier dispositivo (ordenador, tablet o smartphone), sin necesidad de instalaciones adicionales, garantizando tu acceso estés donde estés.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
          </Container>
      </div>
    </div>
  );
}