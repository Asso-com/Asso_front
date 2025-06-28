type Periodicity = 'DAILY' | 'WEEKLY' | 'MONTHLY';

type SessionType = 'LECTURE' | 'LAB' | 'WORKSHOP';

export interface Staff {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface LevelSubject {
    id: number;
    level: string;
    subject: string;
}

export interface Session {
    id: number;
    code: string;
    staff: Staff;
    levelSubject: LevelSubject;
    periodicity: Periodicity;
    sessionType: SessionType;
    startDate: string;
    endDate: string;
    maxStudentsCapacity: number;
    placesAvailable: number;
    fees: number;
    createdAt: string;
    updatedAt: string;
}

const fakeSessions: Session[] = [
    {
        id: 1,
        code: "SES-001",
        staff: {
            id: 10,
            firstName: "Alice",
            lastName: "Smith",
            email: "alice.smith@example.com",
        },
        levelSubject: {
            id: 101,
            level: "Grade 11",
            subject: "Physics",
        },
        periodicity: "WEEKLY",
        sessionType: 'LECTURE',
        startDate: "2025-09-01",
        endDate: "2025-12-15",
        maxStudentsCapacity: 25,
        placesAvailable: 5,
        fees: 300.0,
        createdAt: "2025-06-27T10:00:00",
        updatedAt: "2025-06-27T10:00:00",
    },
    {
        id: 2,
        code: "SES-002",
        staff: {
            id: 11,
            firstName: "Bob",
            lastName: "Johnson",
            email: "bob.johnson@example.com",
        },
        levelSubject: {
            id: 102,
            level: "Grade 12",
            subject: "Chemistry",
        },
        periodicity: "MONTHLY",
        sessionType: "WORKSHOP",
        startDate: "2025-10-01",
        endDate: "2026-01-31",
        maxStudentsCapacity: 20,
        placesAvailable: 2,
        fees: 500.0,
        createdAt: "2025-06-20T08:30:00",
        updatedAt: "2025-06-25T09:45:00",
    },
    {
        id: 3,
        code: "SES-003",
        staff: {
            id: 12,
            firstName: "Charlie",
            lastName: "Lee",
            email: "charlie.lee@example.com",
        },
        levelSubject: {
            id: 103,
            level: "Grade 10",
            subject: "Biology",
        },
        periodicity: "DAILY",
        sessionType: "LAB",
        startDate: "2025-08-15",
        endDate: "2025-11-15",
        maxStudentsCapacity: 15,
        placesAvailable: 0,
        fees: 450.0,
        createdAt: "2025-06-10T11:15:00",
        updatedAt: "2025-06-27T11:45:00",
    },
];
export default fakeSessions;