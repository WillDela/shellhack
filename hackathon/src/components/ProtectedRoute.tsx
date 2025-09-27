import { useAuth0 } from '@auth0/auth0-react';
import { type ReactNode } from 'react';
import { Container, Spinner } from 'react-bootstrap';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Component that protects routes by ensuring user is authenticated
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Show loading spinner while Auth0 is checking authentication status
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Only render children if user is authenticated
  // Auth0 will automatically redirect to login if not authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;