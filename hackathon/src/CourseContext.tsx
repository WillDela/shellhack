import { createContext, useContext, useState, type FC, type ReactNode } from "react";

export type Course = {
  id: string;
  code: string;
  name: string;
  pdf?: File;
};

type CourseContextType = {
  courses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void; // new
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourses must be used within CourseProvider");
  return context;
};

export const CourseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = (course: Course) => setCourses(prev => [...prev, course]);
  const deleteCourse = (id: string) => setCourses(prev => prev.filter(c => c.id !== id));

  return (
    <CourseContext.Provider value={{ courses, addCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
