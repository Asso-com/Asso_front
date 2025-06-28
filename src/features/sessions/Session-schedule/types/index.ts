export interface SessionTracking {
  sessionDateId: string;
  date: string;
  isAttendanceMarked: boolean;
  isValidated: boolean;
  isCanceled: boolean;
  start_time: string;
  end_time: string;
  day: string;
  classRoom: string;
  firstName: string;
  lastName: string;
  level: string;
  subject: string;
  linguisticLevel?: string;
  quizNumber: number;
}
