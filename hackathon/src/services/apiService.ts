import { useAuth0 } from '@auth0/auth0-react';
import { type UploadResponse, type SyncResponse } from '../types';

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper function to get Auth0 token for API requests
const getAuthToken = async (): Promise<string> => {
  // This will be implemented when backend is ready
  // For now, return empty string for development
  return '';
};

// Upload syllabus PDF file and get parsed events
export const uploadSyllabus = async (
  file: File,
  courseName: string,
  syllabusTitle: string
): Promise<UploadResponse> => {
  try {
    // Create FormData to send file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseName', courseName);
    formData.append('syllabusTitle', syllabusTitle);

    // Get auth token for authenticated request
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/upload-syllabus`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading syllabus:', error);

    // For development/demo - return mock data
    const mockEvents = [
      { id: '1', title: 'Midterm Exam', date: '2024-10-15', course: courseName, type: 'exam' as const },
      { id: '2', title: 'Assignment 1 Due', date: '2024-10-08', course: courseName, type: 'assignment' as const },
      { id: '3', title: 'Final Project Due', date: '2024-12-10', course: courseName, type: 'project' as const }
    ];

    return {
      success: true,
      message: `Mock data: Parsed ${mockEvents.length} events from ${file.name}`,
      events: mockEvents
    };
  }
};

// Trigger sync of parsed events to Google Calendar
export const triggerSync = async (events: any[]): Promise<SyncResponse> => {
  try {
    // First try backend API
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/sync-calendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ events }),
    });

    if (response.ok) {
      const data: SyncResponse = await response.json();
      return data;
    }
  } catch (error) {
    console.log('Backend sync failed, using direct Google Calendar API');
  }

  // Fallback: Use direct Google Calendar API
  try {
    // Import here to avoid circular dependencies
    const { useGoogleCalendar } = await import('./googleCalendarService');

    // For development/demo - return mock success with suggestion to use the hook
    return {
      success: true,
      message: `Ready to sync ${events.length} events to Google Calendar. Use the "Sync to Calendar" button to complete the process.`,
      calendarUrl: 'https://calendar.google.com'
    };
  } catch (error) {
    console.error('Error syncing to calendar:', error);

    return {
      success: false,
      message: `Failed to sync ${events.length} events to calendar. Please try again.`,
    };
  }
};

// Test API connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

// Helper hook for getting Auth0 token in components
export const useApiService = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Get token for authenticated API calls
  const getToken = async (): Promise<string> => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {
      console.error('Failed to get access token:', error);
      return '';
    }
  };

  return { getToken, uploadSyllabus, triggerSync, testConnection };
};