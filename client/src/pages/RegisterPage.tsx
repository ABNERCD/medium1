import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert, InputGroup } from 'react-bootstrap';
import apiClient from '../api/axiosConfig';
import './LoginPage.css';
import 'animate.css';
import { NewMediumLogo } from '../components/NewMediumLogo';
import brandingLogoImage from '../assets/logo.png';

const BrandingLogo = () => (
  <div className="branding-logo-container">
    <img src={brandingLogoImage} alt="Medium Branding Logo" className="branding-logo-image" />
  </div>
);

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post('/auth/register', {
        nombre_completo: fullName,
        correo_electronico: email,
        contrasena: password,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        navigate('/login');
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
              <BrandingLogo />
              <h1 className="display-4 fw-bolder brand-title">MEDIUM</h1>
              <p className="lead brand-subtitle mt-3">Tu legado digital, brillante y seguro.</p>
            </div>
            <div className="background-overlay"></div>
          </Col>

          {/* Columna Derecha: Formulario de Registro */}
          <Col lg={5} className="d-flex flex-column justify-content-center align-items-center login-form-col py-4">
            <div className="login-form-container animate__animated animate__fadeInRight">
              <div className="text-center mb-4">
                <NewMediumLogo />
              </div>
              <div className="text-center mb-4">
                <h2 className="form-title">Crear Cuenta</h2>
                <p className="text-muted">Regístrate para comenzar a proteger tu legado.</p>
              </div>

              {error && (
                <Alert variant="danger" className="animate__animated animate__shakeX border-0">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="login-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
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

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="login-input"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle-btn"
                      type="button"
                    >
                      <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="login-input"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" disabled={loading} className="login-button">
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Crear Cuenta'}
                  </Button>
                </div>

                <p className="text-center text-muted mt-4 mb-0">
                  ¿Ya tienes una cuenta? <Link to="/login" className="login-link fw-bold">Inicia sesión</Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
