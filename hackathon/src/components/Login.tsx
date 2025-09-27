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
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{background: 'linear-gradient(135deg, rgba(46, 154, 150, 0.05) 0%, rgba(49, 0, 47, 0.05) 100%)'}}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <div className="text-center mb-4">
              <h1 className="display-4 fw-bold sylly-login-title mb-3">📚 Sylly</h1>
              <p className="lead sylly-text-secondary">Transform your academic life with AI-powered syllabus management</p>
            </div>

            <Card className="sylly-login-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold sylly-text-primary mb-3">Welcome Back</h3>
                  <p className="sylly-text-secondary mb-4">
                    Organize your calendar events with just a few clicks and your syllabi!
                  </p>
                </div>

                {/* Login button */}
                <Button
                  className="w-100 py-3 fw-semibold btn-academic"
                  onClick={handleLogin}
                  style={{borderRadius: '12px', fontSize: '1.1rem'}}
                >
                  <span className="me-2">🚀</span>
                  Continue with Google
                </Button>

                {/* Features list */}
                <div className="mt-4 pt-4 border-top">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="mb-2" style={{fontSize: '1.5rem'}}>📄</div>
                      <small className="sylly-text-secondary fw-semibold">Upload PDFs</small>
                    </div>
                    <div className="col-4">
                      <div className="mb-2" style={{fontSize: '1.5rem'}}>🤖</div>
                      <small className="sylly-text-secondary fw-semibold">AI Parsing</small>
                    </div>
                    <div className="col-4">
                      <div className="mb-2" style={{fontSize: '1.5rem'}}>📅</div>
                      <small className="sylly-text-secondary fw-semibold">Auto Sync</small>
                    </div>
                  </div>
                </div>

                {/* Additional info */}
                <p className="text-center text-muted mt-4 small mb-0">
                  🔒 Secure authentication powered by Auth0 & Google
                </p>
              </Card.Body>
            </Card>

            {/* Footer text */}
            <div className="text-center mt-4">
              <small className="text-muted">
                Built for students, by students • Made with ❤️ at ShellHacks
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;