// Contenido para: src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Importa el CSS que crearemos a continuación

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simula una llamada a la API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5 segundos
      if (email === 'test@example.com' && password === 'password') {
        // console.log('Login exitoso!');
        // Aquí iría la lógica para redirigir al usuario
        alert('Login exitoso! (Simulado)');
      } else {
        setError('Credenciales inválidas. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Ocurrió un error. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="login-card p-4 p-md-5 animate__animated animate__fadeInUp">
              <Card.Body>
                <div className="text-center mb-4">
                  <h1 className="login-brand mb-0">MEDIUM</h1>
                  <p className="text-muted mt-2">Accede a tu legado digital</p>
                </div>

                {error && <Alert variant="danger" className="animate__animated animate__shakeX">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 animate__animated animate__fadeInLeft" controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="ejemplo@correo.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      className="login-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4 animate__animated animate__fadeInRight" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Tu contraseña" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      className="login-input"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2 mb-3 animate__animated animate__fadeInUp" style={{animationDelay: '0.4s'}}>
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={loading}
                      className="login-button py-2"
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Iniciando Sesión...
                        </>
                      ) : (
                        'Iniciar Sesión'
                      )}
                    </Button>
                  </div>

                  <div className="text-center mt-3 animate__animated animate__fadeIn" style={{animationDelay: '0.6s'}}>
                    <Link to="/forgot-password" className="text-muted login-link">¿Olvidaste tu contraseña?</Link>
                  </div>
                  <hr className="my-4 login-divider animate__animated animate__fadeIn" style={{animationDelay: '0.8s'}} />
                  <div className="text-center animate__animated animate__fadeInUp" style={{animationDelay: '1s'}}>
                    <p className="text-muted mb-2">¿No tienes una cuenta?</p>
                    <Link to="/register">
                      <Button variant="outline-light" className="register-button py-2 px-4">
                        Regístrate
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}