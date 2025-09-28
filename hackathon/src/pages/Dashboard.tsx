import type { FC } from "react";
import { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { PlusCircle } from "lucide-react";
import { useCourses } from "../CourseContext";
import AddAssignmentModal from "../components/AddAssingmentModal";

const Dashboard: FC = () => {
  const { courses, addCourse, getAssignments, addAssignment } = useCourses();
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseFile, setCourseFile] = useState<File | null>(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const assignments = getAssignments()
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFile) return alert("Please select a PDF!");

    addCourse({
      id: Date.now().toString(),
      code: courseCode,
      name: courseName,
      pdf: courseFile,
      assignments: []
    });

    setCourseCode("");
    setCourseName("");
    setCourseFile(null);
    setShowCourseModal(false);

    setSuccessMessage(`✅ Course "${courseCode}" uploaded successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#F8F9FA" }}>
      <h2 className="mb-4" style={{ color: "#0D6EFD" }}>📋 Upcoming Assignments</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          {assignments.length === 0
            ? <p className="text-muted">No assignments linked to courses yet.</p>
            : assignments.map(a => {
                const course = courses.find(c => c.id === a.courseId)!;
                return (
                  <div key={a.id} className="d-flex justify-content-between align-items-center mb-2 p-3 bg-white rounded border">
                    <div><strong>{a.title}</strong> ({course.code})</div>
                    <div className="text-muted">{a.dueDate}</div>
                  </div>
                );
              })}
        </div>
      </div>

      <div className="d-flex gap-2 flex-wrap mb-4">
        <Button variant="primary" onClick={() => setShowCourseModal(true)}>
          <PlusCircle className="me-2" /> Add Course
        </Button>
        <Button variant="success" onClick={() => setShowAssignmentModal(true)}>
          <PlusCircle className="me-2" /> Add Assignment
        </Button>
      </div>

      <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)} centered>
        <Form onSubmit={handleAddCourse}>
          <Modal.Header closeButton style={{ backgroundColor: "#0D6EFD", color: "#fff" }}>
            <Modal.Title>Add Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course Code</Form.Label>
              <Form.Control type="text" value={courseCode} onChange={e => setCourseCode(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" value={courseName} onChange={e => setCourseName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload PDF</Form.Label>
              <Form.Control type="file" accept="application/pdf" onChange={e => setCourseFile((e.target as HTMLInputElement).files?.[0] || null)} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#F8F9FA" }}>
            <Button variant="secondary" onClick={() => setShowCourseModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Add Course</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <AddAssignmentModal
        show={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        courses={courses}
        onAddAssignment={addAssignment}
      />
    </div>
  );
};

export default Dashboard;
