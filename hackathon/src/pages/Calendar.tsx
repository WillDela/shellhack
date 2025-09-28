import type { FC } from "react";
import { useState } from "react";
import { useCourses } from "../CourseContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
}

const Calendar: FC = () => {
  const { courses, getAssignments } = useCourses();
  const [filterCourse, setFilterCourse] = useState<string>("");

  const assignments = getAssignments()
    .filter((a) => !filterCourse || a.courseId === filterCourse)
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  // Placeholder: backend will provide the export link
  const exportAllToGoogleCalendar = () => {
    alert("This will export all assignments to Google Calendar (backend link needed).");
  };

  // --- Suggested Study Sessions Logic ---
  const suggestedSessions = assignments.slice(0, 3).map((a) => {
    const course = courses.find((c) => c.id === a.courseId);
    const dueDate = new Date(a.dueDate);

    // Schedule study session 2 days before due date (basic logic)
    const studyDate = new Date(dueDate);
    studyDate.setDate(dueDate.getDate() - 2);

    return {
      id: a.id,
      course: course ? `${course.code}: ${course.name}` : "Unknown Course",
      assignment: a.title,
      date: studyDate.toDateString(),
    };
  });

  return (
    <div className="p-4" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <h2 className="mb-4" style={{ color: "#0D6EFD" }}>📅 Calendar</h2>

      {/* Filters + Export button */}
      <div className="d-flex gap-3 mb-3 flex-wrap align-items-end">
        <Form.Group style={{ minWidth: "200px" }}>
          <Form.Label>Filter by Course</Form.Label>
          <Form.Select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}: {c.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button
          variant="primary"
          onClick={exportAllToGoogleCalendar}
          disabled={assignments.length === 0}
        >
          Export All to Google Calendar
        </Button>
      </div>

      {/* Assignment Planner */}
      <h4 className="mt-4 mb-3">📌 Assignment Planner</h4>
      {assignments.length === 0 ? (
        <p className="text-muted">
          No upcoming assignments. Add some assignments!
        </p>
      ) : (
        <ul className="list-group">
          {assignments.map((a) => {
            const course = courses.find((c) => c.id === a.courseId);
            const { day, month } = formatDate(a.dueDate);
            return (
              <li
                key={a.id}
                className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded"
                style={{ backgroundColor: "#FFFFFF", cursor: "default" }}
              >
                {/* Left: assignment title + course */}
                <div className="flex-grow-1 text-start">
                  <strong style={{ color: "#212529" }}>{a.title}</strong>
                  <div className="text-muted small">
                    {course ? `${course.code}: ${course.name}` : "Unknown Course"}
                  </div>
                </div>

                {/* Right: date badge */}
                <div className="text-center ms-3">
                  <div
                    className="rounded-top px-2 py-1 fw-bold small"
                    style={{ backgroundColor: "#0D6EFD", color: "#FFFFFF" }}
                  >
                    {month}
                  </div>
                  <div
                    className="border rounded-bottom px-2 py-2 fw-bold fs-6"
                    style={{ borderColor: "#0D6EFD" }}
                  >
                    {day}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Suggested Study Sessions */}
      <h4 className="mt-5 mb-3">📖 Suggested Study Sessions</h4>
      {suggestedSessions.length === 0 ? (
        <p className="text-muted">No sessions suggested yet.</p>
      ) : (
        <ul className="list-group">
          {suggestedSessions.map((s) => (
            <li
              key={s.id}
              className="list-group-item mb-2 shadow-sm rounded"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="fw-bold">{s.assignment}</div>
              <div className="text-muted small">{s.course}</div>
              <div className="mt-1">📅 {s.date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;