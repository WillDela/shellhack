import type { FC } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Put your logo in src/assets

const AppNavbar: FC = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        {/* Logo + Brand */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Sylly Logo"
            width="40"
            height="50"
            className="d-inline-block align-top me-2"
          />
          Sylly
        </Navbar.Brand>

        {/* School Dropdown */}
        <NavDropdown title="School: FIU" id="schoolDropdown" className="ms-3">
          <NavDropdown.Item href="#">FIU</NavDropdown.Item>
          <NavDropdown.Item href="#">Other School</NavDropdown.Item>
        </NavDropdown>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Links */}
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            <Nav.Link as={Link} to="/chatbot">Chatbot</Nav.Link>
            <Nav.Link as={Link} to="/shared_syllabus">Shared Syllabus</Nav.Link>

            {/* User Avatar */}
            <PersonCircle size={32} className="ms-3" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;