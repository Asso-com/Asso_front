import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentServiceApi from '../services/StudentServiceApi';
 
const useFetchStudent = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['Student', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await StudentServiceApi.getAll();
                return response;
            } catch (err) {
                console.error("Error fetching Student:", err);
            } finally {
                switchLoadingModal();
            }
        },

    });
};

export default useFetchStudent;
