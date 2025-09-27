import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { CourseProvider } from "./CourseContext"
import Navbar from './components/Navbar'
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Calendar from "./pages/Calendar"
import Chatbot from "./pages/Chatbot"
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  // Check if Auth0 is configured
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const auth0Configured = domain && !domain.includes('your-auth0');

  const { isAuthenticated, isLoading } = auth0Configured ? useAuth0() : { isAuthenticated: false, isLoading: false };

  // Show loading while Auth0 initializes
  if (auth0Configured && isLoading) {
    return <div>Loading...</div>
  }

  // If Auth0 not configured, show app without authentication for development
  if (!auth0Configured) {
    return (
      <CourseProvider>
        <Router>
          <Navbar />
          <main className="p-3">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </main>
        </Router>
      </CourseProvider>
    );
  }

  return (
    <CourseProvider>
      <Router>
        <Routes>
          {/* Public route - Login page */}
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <ProtectedRoute><><Navbar /><main className="p-3"><Dashboard /></main></></ProtectedRoute>}
          />

          {/* Protected routes with navigation */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="p-3">
                    <Dashboard />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="p-3">
                    <Courses />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="p-3">
                    <Calendar />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="p-3">
                    <Chatbot />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CourseProvider>
  )
}

export default App
