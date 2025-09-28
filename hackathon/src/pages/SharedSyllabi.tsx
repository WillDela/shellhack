import type { FC } from "react";
import { useState } from "react";
import { useCourses } from "../CourseContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const SharedSyllabi: FC = () => {
  const { courses } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter syllabi by search (matches name or code)
  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <h2 className="mb-4" style={{ color: "#0D6EFD" }}>📚 Shared Syllabi</h2>

      {/* Search Bar */}
      <Form.Group className="mb-4" style={{ maxWidth: "400px" }}>
        <Form.Control
          type="text"
          placeholder="Search by course code or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      {filteredCourses.length === 0 ? (
        <p className="text-muted">No syllabi found. Try a different search.</p>
      ) : (
        <ul className="list-group">
          {filteredCourses.map((course) => (
            <li
              key={course.id}
              className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              {/* Course Info */}
              <div>
                <strong>{course.code}: {course.name}</strong>
              </div>

              {/* Syllabus Download */}
              {course.pdf ? (
                <a
                  href={URL.createObjectURL(course.pdf)}
                  download={`${course.code}-syllabus.pdf`}
                  className="btn btn-sm btn-primary"
                >
                  📄 Download
                </a>
              ) : (
                <span className="text-muted small">No syllabus uploaded</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SharedSyllabi;