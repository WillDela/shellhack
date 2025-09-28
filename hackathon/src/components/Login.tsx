import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

// Login page component that handles user authentication
const Login = () => {
  const { loginWithRedirect } = useAuth0();

  // Trigger Auth0 login flow when user clicks login button
  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="text-center p-4">
              {/* App branding */}
              <h1 className="mb-4 text-primary fw-bold">Sylly</h1>
              <p className="text-muted mb-4">
                Transform your syllabi into organized calendar events with AI-powered parsing
              </p>

              {/* Login button */}
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={handleLogin}
              >
                Login with Auth0
              </Button>

              {/* Additional info */}
              <p className="text-muted mt-3 small">
                Secure login powered by Auth0
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;