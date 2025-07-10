export interface Student {
  id: number;
  name: string;
}

export interface Session {
  id: number;
  title: string;
  startdate: string;
  enddate: string;
  teacher: string;
  students: Student[];
  Frequency: string;
  status: "active" | "completed" | "upcoming";
}

export type Periodicity = "WEEKLY" | "MONTHLY";

export interface SessionStudentEnrollmentResponse {
  id: number;
  code: string;
  staff: StaffResponse;
  levelSubject: LevelSubjectResponse;
  periodicity: Periodicity;
  startDate: string;
  endDate: string;
  maxStudentsCapacity: number;
  placesAvailable: number;
  fees: number;
  createdAt: string;
  updatedAt: string;
  students: StudentBasicInfo[];
}

export interface StudentBasicInfo {
  studentId: string; // UUID string
  fullName: string;
  registrationId: string;
}

export interface LevelSubjectResponse {
  id: number;
  level: string;
  subject: string;
}

export interface StaffResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
