import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert, InputGroup } from 'react-bootstrap';
import apiClient from '../api/axiosConfig';
import './LoginPage.css';
import 'animate.css';
import { NewMediumLogo } from '../components/NewMediumLogo';
// 1. Importamos la imagen del logo para la sección de branding
import brandingLogoImage from '../assets/logo.png';

// 2. Creamos un componente para mostrar el logo de imagen
const BrandingLogo = () => (
  <div className="branding-logo-container">
    <img src={brandingLogoImage} alt="Medium Branding Logo" className="branding-logo-image" />
  </div>
);

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', {
        correo_electronico: email,
        contrasena: password,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError('Respuesta inesperada del servidor.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('No se pudo conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <Container fluid className="h-100 p-0">
        <Row className="g-0 h-100">
          {/* Columna Izquierda: Branding y Diseño */}
          <Col lg={7} className="d-none d-lg-flex flex-column justify-content-center align-items-center login-branding-col position-relative">
            <div className="branding-content text-center text-white animate__animated animate__fadeInLeft">
              
              {/* 3. Colocamos el logo de imagen */}
              <BrandingLogo />
              
              {/* 4. Mantenemos el título de texto */}
              <h1 className="display-4 fw-bolder brand-title">MEDIUM</h1>
              <p className="lead brand-subtitle mt-3">Tu legado digital, brillante y seguro.</p>
            </div>
            <div className="background-overlay"></div>
          </Col>

          {/* Columna Derecha: Formulario de Login (se mantiene igual) */}
          <Col lg={5} className="d-flex flex-column justify-content-center align-items-center login-form-col">
              <div className="login-form-container animate__animated animate__fadeInRight">
                <div className="text-center mb-4">
                  <NewMediumLogo />
                </div>
                <div className="text-center mb-5">
                  <h2 className="form-title">Bienvenido de Nuevo</h2>
                  <p className="text-muted">Inicia sesión para acceder a tu cuenta.</p>
                </div>
                {error && <Alert variant="danger" className="animate__animated animate__shakeX border-0">{error}</Alert>}
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-4">
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
                  <Form.Group className="mb-2">
                      <Form.Label>Contraseña</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                      />
                      <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} className="password-toggle-btn">
                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <div className="d-flex justify-content-end mb-4">
                      <Link to="/forgot-password" className="login-link">¿Olvidaste tu contraseña?</Link>
                  </div>
                  <div className="d-grid gap-2">
                    <Button type="submit" disabled={loading} className="login-button">
                      {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Iniciar Sesión'}
                    </Button>
                  </div>
                  <p className="text-center text-muted mt-5 mb-0">
                    ¿No tienes una cuenta? <Link to="/register" className="login-link fw-bold">Regístrate aquí</Link>
                  </p>
                </Form>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

