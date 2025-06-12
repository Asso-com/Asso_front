export interface CoefficientType {
  id: number;
  assiduity_coefficient: number;
  delay_before_attendance: number;
  participation_coefficient: number;
  quiz_coefficient: number;
  created_at?: string;
  updated_at?: string;
  association_id: number;
}

export interface CoefficientApiType {
  id: number;
  assiduityCoefficient: number;
  delayBeforeAttendance: number;
  participationCoefficient: number;
  quizCoefficient: number;
  createdAt?: string;
  updatedAt?: string;
  associationId: number;
}