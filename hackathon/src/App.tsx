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
  const { isAuthenticated, isLoading } = useAuth0()

  // Show loading while Auth0 initializes
  if (isLoading) {
    return <div>Loading...</div>
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
}

export default App
