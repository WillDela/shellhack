// Shared TypeScript interfaces and types

// Deadline/event structure from parsed syllabus
export interface Deadline {
  id: string;
  title: string;
  date: string;
  course: string;
  description?: string;
  type?: 'assignment' | 'exam' | 'quiz' | 'project';
}

// Action button configuration
export interface Action {
  id: string;
  label: string;
  color: "primary" | "success" | "secondary" | "warning" | "danger";
  icon?: React.ReactNode;
}

// API response types
export interface UploadResponse {
  success: boolean;
  message: string;
  events?: Deadline[];
}

export interface SyncResponse {
  success: boolean;
  message: string;
  calendarUrl?: string;
}