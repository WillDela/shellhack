import type { FC } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <header className="bg-white shadow-sm mb-4">
      <div className="container-fluid py-2 d-flex justify-content-between align-items-center">
        {/* Brand + School */}
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold fs-5">Sylly</span>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              id="schoolDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              School: FIU
            </button>
            <ul className="dropdown-menu" aria-labelledby="schoolDropdown">
              <li><a className="dropdown-item" href="#">FIU</a></li>
              <li><a className="dropdown-item" href="#">Other School</a></li>
            </ul>
          </div>
        </div>

        {/* User Avatar */}
        <PersonCircle size={32} />
      </div>

      {/* Navigation */}
      <div className="container-fluid border-top py-2 d-flex justify-content-start gap-3">
        <Link to="/" className="nav-link text-dark fw-medium small">Dashboard</Link>
        <Link to="/courses" className="nav-link text-dark fw-medium small">Courses</Link>
        <Link to="/calendar" className="nav-link text-dark fw-medium small">Calendar</Link>
        <Link to="/chatbot" className="nav-link text-dark fw-medium small">Chatbot</Link>
      </div>
    </header>
  );
};

export default Navbar;
