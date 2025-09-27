import { type FC, useState } from "react";
import { useCourses, type Course } from "../CourseContext";
import { Modal, Button } from "react-bootstrap";
import { Trash2 } from "lucide-react";

const Courses: FC = () => {
  const { courses, deleteCourse } = useCourses();
  const [pdfCourse, setPdfCourse] = useState<Course | null>(null); // for PDF modal
  const [deleteCourseModal, setDeleteCourseModal] = useState<Course | null>(null); // for delete modal

  const confirmDelete = () => {
    if (deleteCourseModal) {
      deleteCourse(deleteCourseModal.id);
      setDeleteCourseModal(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-3">📘 My Courses</h2>

      {courses.length === 0 ? (
        <p className="text-muted">No courses found. Add one to see it here!</p>
      ) : (
        <div className="row g-3">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4">
              <div
                className="card shadow-sm h-100 d-flex flex-column justify-content-between"
                style={{ cursor: "pointer" }}
              >
                <div className="card-body" onClick={() => setPdfCourse(course)}>
                  <h5 className="card-title">
                    {course.code}: {course.name}
                  </h5>
                  {course.pdf ? (
                    <p className="text-success">PDF uploaded</p>
                  ) : (
                    <p className="text-muted">No syllabus uploaded</p>
                  )}
                </div>

                {/* Trash icon */}
                <div className="card-footer bg-white d-flex justify-content-end">
                  <Trash2
                    size={20}
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening PDF modal
                      setDeleteCourseModal(course);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PDF Modal */}
      <Modal
        show={!!pdfCourse}
        onHide={() => setPdfCourse(null)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {pdfCourse?.code}: {pdfCourse?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pdfCourse?.pdf ? (
            <iframe
              src={URL.createObjectURL(pdfCourse.pdf)}
              title={pdfCourse.name}
              width="100%"
              height="500px"
            />
          ) : (
            <p>No syllabus uploaded for this course.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPdfCourse(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={!!deleteCourseModal}
        onHide={() => setDeleteCourseModal(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{deleteCourseModal?.name}</strong>? <br />
          <span className="text-danger">
            This action is permanent and cannot be undone.
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteCourseModal(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Courses;
