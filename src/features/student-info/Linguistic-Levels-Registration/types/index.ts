export interface Level {
  id: number;
  code: string;
  name: string;
  order: number;
}

interface Subject {
  id: number;
  name: string;
  code: string;
}

export interface EnrolledSubject {
  id: string;
  levelSubjectId: number;
  level: Level;
  subject: Subject;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicPeriod {
  id: number;
  code: string;
  description: string;
  active: boolean;
}

export interface Student {
  id: string;
  registrationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StudentData {
  student: Student;
  academicPeriod: AcademicPeriod;
  enrolledSubjects: EnrolledSubject[];
}