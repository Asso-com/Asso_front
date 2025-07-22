export type Periodicity = "DAILY" | "WEEKLY" | "MONTHLY";
export type SessionType = "LECTURE" | "LAB" | "WORKSHOP";
export type AttendanceType = "ONLINE" | "ONSITE";

export interface Staff {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
}

export interface LevelSubject {
  categoryId: number;
  id: number;
  level: string;
  subject: string;
}

export interface Session {
  id: number;
  code: string;
  staff: Staff;
  levelSubject: LevelSubject;
  periodicity: Periodicity;
  sessionType: AttendanceType;
  startDate: string;
  endDate: string;
  maxStudentsCapacity: number;
  placesAvailable: number;
  fees: number;
  createdAt: string;
  updatedAt: string | null;
  timeZone: string;
  sessionSchedules: SessionSchudule[];
}
export interface SessionSchudule {
  classRoomId: number;
  day: string;
  startTime: string;
  endTime: string;
  sessionType: AttendanceType;
}
export interface TopicDto {
  topicId: number;
  description: string;
  topicOrder: number;
}

export interface LessonWithTopicsDto {
  lessonId: number;
  lessonName: string;
  lessonOrder: number;
  topics: TopicDto[];
}

export interface SessionSchedulesResponse {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  attendanceType: AttendanceType;
  classRoomId: number;
  classRoomName: string;
  timeZone: string;
}

export interface StudentsEnrollmentRequest {
  associationId: number;
  studentIds: string[];
  sessionId: number;
}

export interface StudentEnrollmentResponse {
  id: string;
  studentId: string;
  studentName: string;
  levelName: string;
  registrationId: string;
  enrolled: boolean;
  email?: string;
}
