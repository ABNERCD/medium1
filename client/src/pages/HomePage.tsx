import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Stack } from 'react-bootstrap';

export function HomePage() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Stack gap={3} className="text-center">
        <h1>MEDIUM</h1>
        <p className="text-muted">No dejes pendientes en esta vida.</p>
        <Link to="/login" className="mx-auto">
          <Button variant="primary" size="lg">Comenzar Ahora</Button>
        </Link>
      </Stack>
    </Container>
  );
}