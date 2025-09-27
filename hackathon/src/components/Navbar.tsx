import type { FC } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';

const Navbar: FC = () => {
  const { user, logout } = useAuth0();

  // Handle logout
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <header className="sylly-navbar">
      <div className="container-fluid py-3 d-flex justify-content-between align-items-center">
        {/* Brand + School */}
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <div className="fw-bold fs-4 sylly-login-title">📚 Sylly</div>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-primary dropdown-toggle fw-semibold"
              type="button"
              id="schoolDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{borderRadius: '20px'}}
            >
              🏫 FIU
            </button>
            <ul className="dropdown-menu shadow-sm" aria-labelledby="schoolDropdown" style={{borderRadius: '12px'}}>
              <li><a className="dropdown-item py-2" href="#">🏫 Florida International University</a></li>
              <li><a className="dropdown-item py-2" href="#">🏫 University of Miami</a></li>
              <li><a className="dropdown-item py-2" href="#">➕ Add School</a></li>
            </ul>
          </div>
        </div>

        {/* Theme Toggle + User Profile Dropdown */}
        <div className="d-flex align-items-center gap-3">
          <ThemeToggle />
          <Dropdown align="end">
          <Dropdown.Toggle variant="link" className="border-0 p-1 rounded-circle" id="user-dropdown" style={{background: 'linear-gradient(135deg, var(--sylly-teal), var(--sylly-gold))', padding: '2px'}}>
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="rounded-circle"
                width={38}
                height={38}
                style={{border: '2px solid white'}}
              />
            ) : (
              <PersonCircle size={38} color="white" />
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-sm" style={{borderRadius: '12px', minWidth: '200px'}}>
            <Dropdown.ItemText className="py-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                {user?.picture && (
                  <img src={user.picture} alt={user.name} className="rounded-circle" width={24} height={24} />
                )}
                <strong className="sylly-text-primary">{user?.name}</strong>
              </div>
              <small className="text-muted">{user?.email}</small>
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item className="py-2" href="#">
              <span className="me-2">⚙️</span>Settings
            </Dropdown.Item>
            <Dropdown.Item className="py-2" href="#">
              <span className="me-2">📊</span>Analytics
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="py-2 text-danger">
              <span className="me-2">🚪</span>Logout
            </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Navigation */}
      <div className="container-fluid border-top py-3" style={{borderColor: 'var(--sylly-bg-secondary) !important'}}>
        <div className="d-flex justify-content-start gap-1">
          <Link to="/" className="nav-link sylly-text-secondary fw-semibold px-3 py-2 rounded-pill text-decoration-none hover-bg-light">
            📊 Dashboard
          </Link>
          <Link to="/courses" className="nav-link sylly-text-secondary fw-semibold px-3 py-2 rounded-pill text-decoration-none hover-bg-light">
            📚 Courses
          </Link>
          <Link to="/calendar" className="nav-link sylly-text-secondary fw-semibold px-3 py-2 rounded-pill text-decoration-none hover-bg-light">
            📅 Calendar
          </Link>
          <Link to="/chatbot" className="nav-link sylly-text-secondary fw-semibold px-3 py-2 rounded-pill text-decoration-none hover-bg-light">
            🤖 Chatbot
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
