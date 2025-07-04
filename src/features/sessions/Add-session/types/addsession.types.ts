export interface SessionFormData {
  categoryId: number;
  levelSubjectId: number;
  staffId: string;
  associationId: number;
  periodicity: "WEEKLY" | "MONTHLY";
  sessionType: "ONLINE" | "ONSITE";
  startDate: string;
  endDate: string;
  maxStudentsCapacity: number;
  fees: number;
  category: "Foundation" | "Linguistic" | "";
  sessionSchedules: SessionSchedule[];
  studentIds: string[];
}

export interface SessionSchedule {
  classRoomId: number;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Student {
  studentId: number;
  studentName: number;
  levelName: string;
}

export interface Field {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  validationRules?: ValidationRules;
  options?: { label: string; value: any }[];
}

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "date"
  | "select"
  | "radio"
  | "time";

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
