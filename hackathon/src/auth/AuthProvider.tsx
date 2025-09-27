import { Auth0Provider } from '@auth0/auth0-react';
import { type ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

// Auth0 wrapper component that provides authentication context to the entire app
const AuthProvider = ({ children }: AuthProviderProps) => {
  // Load Auth0 configuration from environment variables
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

  // Ensure all required Auth0 environment variables are present
  if (!domain || !clientId || !redirectUri) {
    console.error('Auth0 environment variables are missing');
    return <div>Auth0 configuration error</div>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: 'openid profile email' // Request basic user profile information
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;