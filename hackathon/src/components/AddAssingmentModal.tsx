import type { FC } from "react";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// If Assignment is not exported from CourseContext, define it here or import from the correct module.
// Example definition (adjust fields as needed):
export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  courseId: string;
}

// Define Course interface here if not exported from CourseContext
export interface Course {
  id: string;
  code: string;
  name: string;
}

interface AddAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  courses: Course[];
  onAddAssignment: (assignment: Assignment) => void;
  initialCourse?: Course | null;
}

const AddAssignmentModal: FC<AddAssignmentModalProps> = ({
  show,
  onClose,
  courses,
  onAddAssignment,
  initialCourse = null,
}) => {
  const [title, setTitle] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [courseId, setCourseId] = useState(initialCourse?.id || "");

  useEffect(() => {
    if (show) {
      setTitle("");
      setDueDateTime("");
      setCourseId(initialCourse?.id || "");
    }
  }, [show, initialCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDateTime || !courseId) return alert("Fill all fields!");

    onAddAssignment({
      id: Date.now().toString(),
      title,
      dueDate: dueDateTime,
      courseId,
    });

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton style={{ backgroundColor: "#198754", color: "#fff" }}>
          <Modal.Title>Add Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Title</Form.Label>
            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date & Time</Form.Label>
            <Form.Control type="datetime-local" value={dueDateTime} onChange={e => setDueDateTime(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Select value={courseId} onChange={e => setCourseId(e.target.value)} required>
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.code}: {c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#F8F9FA" }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="success" type="submit">Add Assignment</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddAssignmentModal;
