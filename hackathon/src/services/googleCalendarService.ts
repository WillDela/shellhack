import { useAuth0 } from '@auth0/auth0-react';

// Google Calendar API configuration
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

// Interface for calendar events
export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  location?: string;
}

// Load Google APIs
const loadGoogleAPIs = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).gapi) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      (window as any).gapi.load('client', () => {
        resolve();
      });
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Initialize Google Calendar API
const initializeGoogleCalendar = async (accessToken: string): Promise<void> => {
  await loadGoogleAPIs();

  await (window as any).gapi.client.init({
    discoveryDocs: [DISCOVERY_DOC],
  });

  // Set the access token
  (window as any).gapi.client.setToken({
    access_token: accessToken
  });
};

// Create calendar event
export const createCalendarEvent = async (
  event: CalendarEvent,
  accessToken: string
): Promise<any> => {
  try {
    await initializeGoogleCalendar(accessToken);

    const request = (window as any).gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return await request.execute();
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

// Get upcoming events
export const getUpcomingEvents = async (
  accessToken: string,
  maxResults: number = 10
): Promise<any[]> => {
  try {
    await initializeGoogleCalendar(accessToken);

    const request = (window as any).gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: maxResults,
      orderBy: 'startTime',
    });

    const response = await request.execute();
    return response.result.items || [];
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};

// React hook for Google Calendar operations
export const useGoogleCalendar = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const getAccessToken = async (): Promise<string> => {
    try {
      return await getAccessTokenSilently({
        authorizationParams: {
          scope: SCOPES,
        },
      });
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const addEventToCalendar = async (event: CalendarEvent) => {
    try {
      const accessToken = await getAccessToken();
      return await createCalendarEvent(event, accessToken);
    } catch (error) {
      console.error('Error adding event to calendar:', error);
      throw error;
    }
  };

  const getEvents = async (maxResults: number = 10) => {
    try {
      const accessToken = await getAccessToken();
      return await getUpcomingEvents(accessToken, maxResults);
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  };

  const syncEventsToCalendar = async (events: any[]) => {
    try {
      const accessToken = await getAccessToken();
      const results = [];

      for (const event of events) {
        // Convert syllabus event to Google Calendar format
        const calendarEvent: CalendarEvent = {
          summary: `${event.title} - ${event.course}`,
          description: `Course: ${event.course}\nType: ${event.type || 'Assignment'}\nAdded by Sylly`,
          start: {
            date: event.date, // All-day event
            timeZone: 'America/New_York',
          },
          end: {
            date: event.date,
            timeZone: 'America/New_York',
          },
        };

        const result = await createCalendarEvent(calendarEvent, accessToken);
        results.push(result);
      }

      return results;
    } catch (error) {
      console.error('Error syncing events to calendar:', error);
      throw error;
    }
  };

  return {
    addEventToCalendar,
    getEvents,
    syncEventsToCalendar,
    isGoogleUser: user?.sub?.startsWith('google-oauth2|'),
  };
};