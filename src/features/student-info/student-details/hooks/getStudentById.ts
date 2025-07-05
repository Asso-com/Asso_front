import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentServiceApi from '../services/StudentServiceApi';

const useFetchStudentDetails = (associationId: number, studentId: string): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['student-details', associationId, studentId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await StudentServiceApi.getStudentById(studentId, associationId);
                return response;
            } catch (err) {
                console.error("Error fetching Student:", err);
            } finally {
                switchLoadingModal();
            }
        },
        enabled: !!studentId && !!associationId,
    });

};

export default useFetchStudentDetails;
