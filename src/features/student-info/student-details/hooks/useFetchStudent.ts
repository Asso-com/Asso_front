import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentServiceApi from '../services/StudentServiceApi';

const useFetchStudent = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['students', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await StudentServiceApi.getAll(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching Student:", err);
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchStudent;
