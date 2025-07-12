//  "id": 1,
//   "studentId": "9bf93c91-e9db-48c1-ba60-86c53d890bb1",
//   "firstName": "Mohamed-Amine",
//   "lastName": "BELHOU",
//   "registrationId": "STU-2025-898M",
//   "attendanceType": "PRESENT",
//   "evaluation": null,
//   "remark": null,
//   "justification": null,
//   "createdAt": "2025-07-12T10:54:06",
//   "updatedAt": null
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