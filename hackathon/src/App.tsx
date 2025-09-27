import { CourseProvider } from "./CourseContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from "./pages/dashboard";
import Courses from "./pages/Courses";
import Calendar from "./pages/Calendar";
import Chatbot from "./pages/Chatbot";

function App() {
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
    
  )
}

export default App
