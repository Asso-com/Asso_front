import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import BookServiceApi from '../service/BookServiceApi';

const useFetchBooks = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['books', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await BookServiceApi.getAll(associationId);
                return response;
            } catch (err) {
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 2,
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchBooks;
