export interface StudentResponse {
  id: string;
  registrationId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  establishment: string;
  admissionDate: string | null;
  dateOfBirth: string | null;
  address: string;
  city: string;
  levelName: string | null;
  gender: 'MALE' | 'FEMALE';
  enrolledInCurrentPeriod: boolean;
  latitude: number | null;
  longitude: number | null;
  qpv: boolean
}

export interface ProcessedStudentData {
  id: string;
  name: string;
  email: string;
  registrationId: string;
  establishment: string;
  address: string;
  city: string;
  enrolledInCurrentPeriod: boolean;
  searchText: string;
  latitude: number
  longitude: number
  isQpv: boolean
}