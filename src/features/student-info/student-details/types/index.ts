
export type GuardianType = "father" | "mother" | "other" | "";

export interface EnrollementAcademic {
    studentId: string;
    levelId: string;
}

export interface StudentDetails {
    id: string;
    registrationId: string;
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    establishment: string;
    admissionDate: string | null;
    dateOfBirth: string;
    address: string;
    city: string;
    levelName: string | null;
    gender: 'MALE' | 'FEMALE';
    enrolledInCurrentPeriod: boolean;
    latitude: number | null;
    longitude: number | null;
}