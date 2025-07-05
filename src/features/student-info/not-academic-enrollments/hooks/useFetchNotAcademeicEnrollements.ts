// hooks/useFetchNotAcademicEnrollments.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentEnrollmentService from '../services/StudentEnrollmentService';

const useFetchNotAcademicEnrollments = (
    associationId: number
): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['not-academic-enrollments', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const result = await StudentEnrollmentService.getUnenrolledStudents(associationId);
                return result;
            } catch (err) {
                console.error("Error fetching students:", err);
                throw err; 
            } finally {
                switchLoadingModal();
            }
        },
        enabled: !!associationId,
        retry: false,
    });
};

export default useFetchNotAcademicEnrollments;