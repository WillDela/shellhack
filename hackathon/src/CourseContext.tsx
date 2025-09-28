import { createContext, useContext, useState, type ReactNode } from "react";

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  courseId: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  pdf?: File | null;
  assignments: Assignment[];
}

interface CoursesContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  addAssignment: (assignment: Assignment) => void;
  getAssignments: () => Assignment[];
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      name: "Intro to Computer Science",
      pdf: null,
      assignments: [
        { id: "a1", title: "Homework 1", dueDate: "2025-10-01", courseId: "1" },
      ],
    },
    {
      id: "2",
      code: "CHEM102",
      name: "Chemistry II",
      pdf: null,
      assignments: [
        { id: "a2", title: "Lab Report", dueDate: "2025-10-05", courseId: "2" },
      ],
    },
  ]);
  const addCourse = (course: Course) => setCourses(prev => [...prev, course]);
  const deleteCourse = (id: string) => setCourses(prev => prev.filter(c => c.id !== id));
  const addAssignment = (assignment: Assignment) =>
    setCourses(prev =>
      prev.map(c =>
        c.id === assignment.courseId
          ? { ...c, assignments: [...c.assignments, assignment] }
          : c
      )
    );
  const getAssignments = () => courses.flatMap(c => c.assignments);

  return (
    <CoursesContext.Provider value={{ courses, addCourse, deleteCourse, addAssignment, getAssignments }}>
      {children}
    </CoursesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) throw new Error("useCourses must be used within a CourseProvider");
  return context;
};