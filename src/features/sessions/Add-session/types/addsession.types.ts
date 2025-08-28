export interface SessionFormData {
  categoryId: number;
  levelName: string;
  levelSubjectId: number;
  staffId: string;
  associationId: number;
  periodicity: "WEEKLY" | "MONTHLY";
  sessionType: "ONLINE" | "ONSITE";
  startDate: string;
  endDate: string;
  timeZone: string;
  maxStudentsCapacity: number;
  fees: number;
  sessionSchedules: SessionSchedule[];
  studentIds: string[];
}

export interface SessionSchedule {
  classRoomId: number;
  day: string;
  sessionType: "ONLINE" | "ONSITE";
  startTime: string;
  endTime: string;
}

export interface Student {
  studentId: number;
  studentName: string;
  levelName: string;
}

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  isAfter?: { field: string; message?: string };
}

export interface SessionStep {
  title: string;
  description: string;
  icon: any;
}
