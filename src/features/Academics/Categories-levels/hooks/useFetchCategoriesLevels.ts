import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';  
import CategoriesLevelServiceApi from '../services/CategoriesLevelServiceApi';

const useFetchCategoriesLevels = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['categorieLevel', associationId],
        queryFn: async () => {
            switchLoadingModal(); 
            try {
                const response = await CategoriesLevelServiceApi.getAll(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching categorieLevel:", err);
                throw err;
            } finally {
                switchLoadingModal(); // hide loading modal
            }
        },
        gcTime: 1000 * 60 * 10,  // cache garbage collection time
        staleTime: 1000 * 60 * 5, // data considered fresh for 5 min
        enabled: !!associationId, // only run if associationId is valid
        retry: false
    });
};

export default useFetchCategoriesLevels;
