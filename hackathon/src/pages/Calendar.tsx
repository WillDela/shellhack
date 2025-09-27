import type { FC } from "react";

const mockEvents = [
  { id: 1, title: "CS Exam", date: "2025-10-10", course: "Intro to Computer Science" },
  { id: 2, title: "Chemistry Lab Report Due", date: "2025-10-12", course: "Chemistry II" },
  { id: 3, title: "Math Quiz", date: "2025-10-15", course: "Linear Algebra" },
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
    <div className="p-4">
      <h2 className="mb-3">📅 Calendar</h2>

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
    </div>
  );
};

export default Calendar;
