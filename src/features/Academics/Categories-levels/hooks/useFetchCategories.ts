import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import CategoriesLevelServiceApi from '../services/CategoriesLevelServiceApi';

const useFetchCategories = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['categories', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                return CategoriesLevelServiceApi.getAll(associationId);
            } catch (err) {
                console.error("Error fetching:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchCategories;
