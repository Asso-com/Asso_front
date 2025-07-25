import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import BookServiceApi from '../service/BookServiceApi';
import type { Book } from '@features/Library/types';

const useFetchBookById = (id: number): UseQueryResult<Book, Error> => {
    return useQuery<Book, Error>({
        queryKey: ['book', id],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await BookServiceApi.getById(id);
                if (!response) throw new Error("No book found");
                return response;
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 5,  
        staleTime: 1000 * 60 * 2, 
        enabled: !!id,
        retry: false
    });
};

export default useFetchBookById;
