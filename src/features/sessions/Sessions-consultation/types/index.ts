export interface Attendance {
    id: number;
    studentId: string;
    firstName: string;
    attendanceType: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
    evaluation: number | null;
    remark: string | null;
    justification: string | null;
    createdAt: string;
    updatedAt: string | null;
    registrationId: string;
    lastName: string;
    studentLevel: string;
}