import type { ComponentWithAs } from "@chakra-ui/react";
import type { IconType } from "react-icons";

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  isAfter?: { field: string; message?: string };
}

export type FieldType = 'text' | 'number' | 'email' | 'date' | 'select' | 'radio' | 'time';

export interface Field {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  validationRules?: ValidationRules;
  options?: { label: string; value: any }[];
}

export interface SessionFormData {
  levelSubjectId: number;
  staffId: string;
  staffEmail: string;
  associationId: number;
  periodicity: 'WEEKLY' | 'MONTHLY';
  sessionType: 'ONLINE' | 'FACE_TO_FACE';
  startDate: string;
  endDate: string;
  maxStudentsCapacity: number;
  placesAvailable: number;
  fees: number;
  sessions: SessionSchedule[];
  students: string[];
}
export interface SessionSchedule {
  classRoomId: number;
  sessionName: string;
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
export interface SessionStep{
  title: string;
  description: string;
  icon: IconType|ComponentWithAs<"svg">;

}