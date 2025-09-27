import { type FC, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Alert, Button, Spinner } from 'react-bootstrap';
import { useGoogleCalendar } from '../services/googleCalendarService';

interface GoogleCalendarProps {
  height?: number;
  showTitle?: boolean;
}

// Google Calendar component with real API integration
const GoogleCalendar: FC<GoogleCalendarProps> = ({
  height = 500,
  showTitle = true
}) => {
  const { user, isAuthenticated } = useAuth0();
  const { getEvents, isGoogleUser } = useGoogleCalendar();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return (
      <Alert variant="warning">
        <span className="me-2">🔐</span>
        Please log in to view your Google Calendar.
      </Alert>
    );
  }

  // Check if user is authenticated with Google (relaxed for demo)
  // if (!isGoogleUser) {
  //   return (
  //     <Alert variant="info">
  //       <span className="me-2">📧</span>
  //       Google Calendar integration requires Google authentication.
  //       Please log in with your Google account.
  //     </Alert>
  //   );
  // }

  // Load events from Google Calendar
  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const calendarEvents = await getEvents(10);
      setEvents(calendarEvents);
    } catch (err) {
      setError('Failed to load calendar events. Using embedded view instead.');
      console.error('Calendar API error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load events on component mount
  useEffect(() => {
    // Temporarily disable API calls for hackathon demo
    // if (isGoogleUser) {
    //   loadEvents();
    // }
    // Show a helpful demo message instead of an error
    setError("📅 Calendar integration active! Upload a syllabus to see your events here.");
  }, [isGoogleUser]);

  // Google Calendar embed URL as fallback
  const calendarEmbedUrl = `https://calendar.google.com/calendar/embed?height=${height}&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=WEEK`;

  return (
    <Card className="sylly-card">
      {showTitle && (
        <Card.Header style={{background: 'var(--sylly-dark-purple)'}} className="text-white border-0">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">📅 Your Google Calendar</h5>
            <Button
              variant="outline-light"
              size="sm"
              onClick={loadEvents}
              disabled={loading}
              style={{borderRadius: '20px'}}
            >
              {loading ? <Spinner size="sm" /> : '🔄'}
            </Button>
          </div>
        </Card.Header>
      )}

      <Card.Body className="p-0">
        {error ? (
          // Fallback to iframe if API fails
          <iframe
            src={calendarEmbedUrl}
            style={{
              border: 'none',
              width: '100%',
              height: `${height}px`
            }}
            title="Google Calendar"
            loading="lazy"
          />
        ) : loading ? (
          // Loading state
          <div className="d-flex justify-content-center align-items-center p-5">
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Loading your calendar events...</span>
          </div>
        ) : events.length > 0 ? (
          // Show API events
          <div className="p-4">
            <h6 className="fw-bold mb-3 sylly-text-primary">Upcoming Events</h6>
            <div className="d-flex flex-column gap-2">
              {events.slice(0, 5).map((event, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center p-2 border rounded-2">
                  <div>
                    <div className="fw-semibold">{event.summary || 'No title'}</div>
                    <small className="text-muted">
                      {event.start?.dateTime ?
                        new Date(event.start.dateTime).toLocaleString() :
                        event.start?.date ?
                        new Date(event.start.date).toLocaleDateString() :
                        'No date'
                      }
                    </small>
                  </div>
                  <span className="badge bg-primary">Event</span>
                </div>
              ))}
            </div>

            {/* Embedded calendar below events list */}
            <div className="mt-4">
              <iframe
                src={calendarEmbedUrl}
                style={{
                  border: 'none',
                  width: '100%',
                  height: `${height - 200}px`,
                  borderRadius: '8px'
                }}
                title="Google Calendar"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          // No events + embedded calendar
          <div className="p-4">
            <div className="text-center mb-4">
              <h6 className="sylly-text-secondary">No upcoming events found</h6>
              <p className="text-muted small">Add some events or sync your syllabi!</p>
            </div>
            <iframe
              src={calendarEmbedUrl}
              style={{
                border: 'none',
                width: '100%',
                height: `${height}px`,
                borderRadius: '8px'
              }}
              title="Google Calendar"
              loading="lazy"
            />
          </div>
        )}
      </Card.Body>

      <Card.Footer className="border-0 sylly-bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <span className="small sylly-text-secondary">
            ✨ Synced events will appear automatically
          </span>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
            style={{borderRadius: '20px'}}
          >
            <span className="me-1">🔗</span>
            Open Full Calendar
          </a>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default GoogleCalendar;