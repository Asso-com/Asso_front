type Periodicity = 'DAILY' | 'WEEKLY' | 'MONTHLY';

type SessionType = 'LECTURE' | 'LAB' | 'WORKSHOP';

export interface Staff {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface LevelSubject {
    categoryId: number;
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