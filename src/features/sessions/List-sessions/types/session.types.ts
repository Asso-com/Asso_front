export type Staff = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
};

export type LevelSubject = {
  id: number;
  level: string;
  subject: string;
};

export type SessionResponse = {
  id: number;
  code: string;
  staff: Staff;
  levelSubject: LevelSubject;
  periodicity: string;
  startDate: string;
  endDate: string;
  maxStudentsCapacity: number;
  placesAvailable: number;
  fees: number;
  createdAt: string;
  updatedAt: string | null;
};
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
  attendanceType: string;
  classRoomId: number;
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
}
