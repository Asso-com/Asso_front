export interface SessionSchuduleDate {
  sessionCode: string;
  sessionDateId: number;
  date: string;
  attendanceMarked: boolean;
  validated: boolean;
  canceled: boolean;
  startTime: string;
  endTime: string;
  day: string;
  classRoom: string;
  firstName: string;
  timeZone: string;
  lastName: string;
  level: string;
  subject: string;
  linguisticLevel?: string;
  quizNumber: number;
  sessionType: "ONSITE" | "ONLINE";
}