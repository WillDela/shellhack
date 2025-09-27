import './App.css'
import './styles/colors.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { CourseProvider } from "./CourseContext"
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Calendar from "./pages/Calendar"
import Chatbot from "./pages/Chatbot"
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  // Show loading while Auth0 initializes
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Debug logging
  console.log('Auth0 state:', { isAuthenticated, isLoading, user });

  // If not authenticated, show login page regardless of route
  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    );
  }

  // If authenticated, show protected app
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App
