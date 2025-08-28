// hooks/useFetchNotAcademicEnrollments.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentEnrollmentService from '../services/StudentEnrollmentService';

const useFetchAvailableStudentsForEnrollment = (
    associationId: number
): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['available-students', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const result = await StudentEnrollmentService.getAvailableStudentsForEnrollment(associationId);
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

export default useFetchAvailableStudentsForEnrollment;