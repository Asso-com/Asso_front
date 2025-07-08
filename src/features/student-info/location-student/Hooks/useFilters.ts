import { useMemo, useState } from 'react';
import type { ProcessedStudentData, StudentResponse } from '../Types/StudentLocationType';

export interface UseLocationStudentsReturn {
    filteredStudents: ProcessedStudentData[];
    enrollmentFilter: string;
    qpvFilter: string;
    setEnrollmentFilter: (value: string) => void;
    setQpvFilter: (value: string) => void;
    resetFilters: () => void;
}

const useFilters = (students: StudentResponse[]): UseLocationStudentsReturn => {
    const [enrollmentFilter, setEnrollmentFilter] = useState<string>('all');
    const [qpvFilter, setQpvFilter] = useState<string>('all');

    const filteredStudents = useMemo(() => {
        const processed: ProcessedStudentData[] = students.map((student) => ({
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            registrationId: student.registrationId,
            establishment: student.establishment,
            address: student.address,
            city: student.city,
            enrolledInCurrentPeriod: student.enrolledInCurrentPeriod,
            searchText: `${student.firstName} ${student.lastName} ${student.email} ${student.address} ${student.city}`.toLowerCase(),
            latitude: student.latitude ?? 0,
            longitude: student.longitude ?? 0,
            isQpv: student.qpv ?? false,
        }));

        return processed.filter((student) => {
            const matchEnrollment =
                enrollmentFilter === 'all' ||
                (enrollmentFilter === 'enrolled' && student.enrolledInCurrentPeriod) ||
                (enrollmentFilter === 'not_enrolled' && !student.enrolledInCurrentPeriod);

            const matchQpv =
                qpvFilter === 'all' ||
                (qpvFilter === 'qpv' && student.isQpv) ||
                (qpvFilter === 'not_qpv' && !student.isQpv);

            return matchEnrollment && matchQpv;
        });
    }, [students, enrollmentFilter, qpvFilter]);

    const resetFilters = () => {
        setEnrollmentFilter('all');
        setQpvFilter('all');
    };

    return {
        filteredStudents,
        enrollmentFilter,
        qpvFilter,
        setEnrollmentFilter,
        setQpvFilter,
        resetFilters,
    };
};

export default useFilters;
