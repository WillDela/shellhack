import type { FC } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import GoogleCalendar from '../components/GoogleCalendar';

// Updated events to match 2024 and be more realistic for demo
const mockEvents = [
  { id: 1, title: "Midterm Exam", date: "2024-10-15", course: "Computer Science" },
  { id: 2, title: "Lab Report Due", date: "2024-10-12", course: "Chemistry II" },
  { id: 3, title: "Assignment 1 Due", date: "2024-10-08", course: "Linear Algebra" },
  { id: 4, title: "Final Project Proposal", date: "2024-10-20", course: "Software Engineering" },
  { id: 5, title: "Quiz 2", date: "2024-10-18", course: "Statistics" },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
}

const Calendar: FC = () => {
  const events = mockEvents;

  return (
    <Container className="py-4">
      <h2 className="mb-4">📅 Calendar</h2>

      <Row>
        {/* Left column - Upcoming events list */}
        <Col lg={4} className="mb-4">
          <h4 className="mb-3">Upcoming Events</h4>
          {events.length === 0 ? (
            <p className="text-muted">No upcoming events. Add some deadlines!</p>
          ) : (
            <ul className="list-group">
              {events.map((event) => {
                const { day, month } = formatDate(event.date);
                return (
                  <li
                    key={event.id}
                    className="list-group-item d-flex"
                  >
                    {/* Left: assignment + course (all left-aligned) */}
                    <div className="flex-grow-1 text-start">
                      <strong>{event.title}</strong>
                      <div className="text-muted small">{event.course}</div>
                    </div>

                    {/* Right: date badge */}
                    <div className="text-center ms-3">
                      <div className="bg-primary text-white rounded-top px-2 py-1 fw-bold small">
                        {month}
                      </div>
                      <div className="border rounded-bottom px-2 py-2 fw-bold fs-6">
                        {day}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Col>

        {/* Right column - Google Calendar iframe */}
        <Col lg={8}>
          <GoogleCalendar height={600} />
        </Col>
      </Row>
    </Container>
  );
};

export default Calendar;
