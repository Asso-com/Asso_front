export interface SessionSchuduleDate {
  sessionCode: string;
  sessionDateId: number;
  sessionDate: string;  
  attendanceMarked: boolean;
  attendanceRegistrationDateTime: string;
  validated: boolean;
  canceled: boolean;
  startTime: string;
  endTime: string;
  day: string;
  classRoom: string;
  firstName: string;
  lastName: string;
  level: string;
  subject: string;
  quizNumber: number;
  sessionType: "ONSITE" | "ONLINE";
  timeZone: string;
  administrationSummary: string;
  teacherSummary: string;
}
