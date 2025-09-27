import type { FC } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusCircle } from "lucide-react";
import { useCourses } from "../CourseContext";
import { uploadSyllabus } from "../services/apiService";

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
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF!");

    setIsUploading(true);
    try {
      // Use your API service to upload the syllabus
      const result = await uploadSyllabus(file, name, code);

      if (result.success) {
        // Add course to context
        addCourse({ id: Date.now().toString(), code, name, pdf: file });

        // Reset form
        setCode("");
        setName("");
        setFile(null);
        setShowModal(false);

        // Show success with parsed events count
        alert(`🎉 Course "${name}" added successfully!\n\n${result.message}\n\nFound ${result.events?.length || 0} events that will be synced to your calendar.`);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 sylly-bg-light p-4">
      {/* Welcome Header */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="sylly-card p-4 sylly-gradient-bg text-white">
            <h1 className="mb-2 fw-bold">Welcome back! 📚</h1>
            <p className="mb-0 opacity-90">Organize your academic life with Sylly. Upload syllabi, track deadlines, and sync with your calendar.</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column - Upcoming Deadlines */}
        <div className="col-lg-8">
          <section className="mb-4">
            <h2 className="mb-4 sylly-text-primary fw-bold">📅 Upcoming Deadlines</h2>
            <div className="sylly-card">
              <div className="card-body p-4">
                {deadlines.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="mb-3" style={{fontSize: '3rem'}}>📝</div>
                    <h5 className="sylly-text-secondary">No upcoming deadlines</h5>
                    <p className="text-muted">Add a course to get started with tracking your assignments and exams.</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {deadlines.map((d) => (
                      <div key={d.id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 border-start border-4 border-primary">
                        <div>
                          <div className="fw-bold sylly-text-primary">{d.title}</div>
                          <small className="sylly-text-secondary">{d.course}</small>
                        </div>
                        <div className="text-end">
                          <div className="badge bg-primary text-white px-3 py-2">{d.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="col-lg-4">
          <section className="mb-4">
            <h2 className="mb-4 sylly-text-primary fw-bold">⚡ Quick Actions</h2>
            <div className="d-flex flex-column gap-3">
              {actions.map((a) => (
                <button
                  key={a.id}
                  className={`btn ${a.id === 'add' ? 'btn-academic' : a.id === 'plan' ? 'btn-success' : 'btn-outline-primary'} d-flex align-items-center justify-content-center py-3 fw-semibold`}
                  onClick={a.id === "add" ? () => setShowModal(true) : undefined}
                  style={{borderRadius: '12px'}}
                >
                  <span className="me-2">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>

            {/* Stats Card */}
            <div className="sylly-card mt-4">
              <div className="card-body p-4 text-center">
                <h5 className="sylly-text-primary fw-bold mb-3">📊 Your Progress</h5>
                <div className="row">
                  <div className="col-6">
                    <div className="h4 fw-bold" style={{color: 'var(--sylly-teal)'}}>2</div>
                    <small className="text-muted">Courses</small>
                  </div>
                  <div className="col-6">
                    <div className="h4 fw-bold" style={{color: 'var(--sylly-gold)'}}>5</div>
                    <small className="text-muted">Deadlines</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Add Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div className="modal-content" style={{border: 'none', borderRadius: '16px'}}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="fw-bold sylly-text-primary">
                📚 Add New Course
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-3">
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold sylly-text-secondary">Course Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., CS101, MATH205"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                  className="py-2"
                  style={{borderRadius: '8px'}}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold sylly-text-secondary">Course Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Introduction to Computer Science"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="py-2"
                  style={{borderRadius: '8px'}}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold sylly-text-secondary">Upload Syllabus (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  accept="application/pdf"
                  onChange={e => {
                    const input = e.target as HTMLInputElement;
                    setFile(input.files?.[0] || null);
                  }}
                  required
                  className="py-2"
                  style={{borderRadius: '8px'}}
                />
                {file && (
                  <div className="mt-2 p-2 bg-light rounded-2 d-flex align-items-center">
                    <span className="me-2">📄</span>
                    <small className="text-success fw-semibold">{file.name}</small>
                  </div>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button
                variant="outline-secondary"
                onClick={() => setShowModal(false)}
                className="px-4"
                style={{borderRadius: '8px'}}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-academic px-4"
                style={{borderRadius: '8px'}}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="sylly-spinner me-2" style={{width: '16px', height: '16px', borderWidth: '2px'}}></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="me-2">📚</span>
                    Add Course
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
