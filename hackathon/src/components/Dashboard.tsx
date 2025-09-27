import type { FC } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusCircle } from "lucide-react";
import { type Deadline, type Action } from "../types";

const deadlines: Deadline[] = [
  { id: "1", title: "Quiz 1", date: "Oct 3", course: "CS201" },
  { id: "2", title: "Project Proposal", date: "Oct 8", course: "HCI" },
];

const actions: Action[] = [
  { id: "add", label: "Add Syllabus", color: "primary", icon: <PlusCircle className="me-2" /> },
  { id: "plan", label: "Generate Plan", color: "success" },
  { id: "publish", label: "Publish to Calendar", color: "secondary" },
];

const Dashboard: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file!");
      return;
    }
    // Handle file upload logic here
    alert(`Syllabus "${file.name}" uploaded successfully!`);
    setFile(null);
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      {/* Upcoming Deadlines */}
      <section className="mb-5">
        <h2 className="mb-3">Upcoming</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            {deadlines.map(d => (
              <div key={d.id} className="d-flex justify-content-between mb-2 p-2 bg-light rounded">
                <div><strong>{d.title}</strong> ({d.course})</div>
                <div className="text-muted">{d.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-5">
        <h2 className="mb-3">Quick Actions</h2>
        <div className="d-flex gap-2 flex-wrap">
          {actions.map(a => (
            <button
              key={a.id}
              className={`btn btn-${a.color} d-flex align-items-center`}
              onClick={a.id === "add" ? handleOpen : undefined}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      </section>

      {/* Add Syllabus Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Syllabus</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" placeholder="Enter course name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Syllabus Title</Form.Label>
              <Form.Control type="text" placeholder="Enter syllabus title" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload PDF</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
              {file && <small className="text-success">Selected file: {file.name}</small>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Add Syllabus</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
