import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated, isLoading } = useAuth0()

  // Show loading while Auth0 initializes
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        {/* Public route - Login page */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <ProtectedRoute><><Navbar /><Dashboard /></></ProtectedRoute>}
        />

        {/* Protected route - Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
