import type { FC } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusCircle } from "lucide-react";
import { useCourses } from "../CourseContext";

type Deadline = { id: string; title: string; date: string; course: string };
type Action = {
  id: string;
  label: string;
  color: "primary" | "success" | "secondary";
  icon?: React.ReactNode;
};

const deadlines: Deadline[] = [
  { id: "1", title: "Quiz 1", date: "Oct 3", course: "CS201" },
  { id: "2", title: "Project Proposal", date: "Oct 8", course: "HCI" },
];

const actions: Action[] = [
  { id: "add", label: "Add Course", color: "primary", icon: <PlusCircle className="me-2" /> },
  { id: "plan", label: "Generate Plan", color: "success" },
  { id: "publish", label: "Publish to Calendar", color: "secondary" },
];

const Dashboard: FC = () => {
  const { addCourse } = useCourses();
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF!");
    addCourse({ id: Date.now().toString(), code, name, pdf: file });
    setCode("");
    setName("");
    setFile(null);
    setShowModal(false);
    alert(`Course "${name}" added successfully!`);
  };

  return (
    <div className="container-fluid min-vh-100 bg-light p-5">
      <div className="row g-4">
        {/* Left Column - Upcoming Deadlines */}
        <div className="col-lg-8">
          <section className="mb-4">
            <h2 className="mb-3">Upcoming</h2>
            <div className="card shadow-sm w-100">
              <div className="card-body">
                {deadlines.map((d) => (
                  <div key={d.id} className="d-flex justify-content-between align-items-center mb-2 p-3 bg-white rounded border">
                    <div><strong>{d.title}</strong> ({d.course})</div>
                    <div className="text-muted">{d.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="col-lg-4">
          <section className="mb-4">
            <h2 className="mb-3">Quick Actions</h2>
            <div className="d-flex flex-column gap-2">
              {actions.map((a) => (
                <button
                  key={a.id}
                  className={`btn btn-${a.color} d-flex align-items-center justify-content-center`}
                  onClick={a.id === "add" ? () => setShowModal(true) : undefined}
                >
                  {a.icon}{a.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Add Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course Code</Form.Label>
              <Form.Control type="text" placeholder="Enter course code" value={code} onChange={e => setCode(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" placeholder="Enter course name" value={name} onChange={e => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload PDF</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={e => {
                  const input = e.target as HTMLInputElement;
                  setFile(input.files?.[0] || null);
                }}
                required
              />
              {file && <small className="text-success">Selected file: {file.name}</small>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Add Course</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
