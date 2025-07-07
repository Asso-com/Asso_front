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
}

export interface ProcessedStudentData {
  id: string;
  lat: number;
  lon: number;
  name: string;
  email: string;
  registrationId: string;
  establishment: string;
  address: string;
  city: string;
  enrolledInCurrentPeriod: boolean;
  searchText: string;
  hasLocation: boolean;
}