// types/addsession.types.ts
export interface SessionFormData {
  levelSubjectId: number;
  staffId: string;
  staffEmail: string;
  associationId: number;
  periodicity: "WEEKLY" | "MONTHLY";
  sessionType: "ONLINE" | "FACE_TO_FACE";
  startDate: string;
  endDate: string;
  maxStudentsCapacity: number;
  placesAvailable: number;
  fees: number;
  generalLevels: "Foundantion" | "Linguistic" | "";
  sessionSchedules: SessionSchedule[];
  studentIds: string[];
}

export interface SessionSchedule {
  sessionName?: string; // Add this field
  classRoomId: number;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Student {
  matricule: string;
  prenom: string;
  nom: string;
  niveau: string;
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
