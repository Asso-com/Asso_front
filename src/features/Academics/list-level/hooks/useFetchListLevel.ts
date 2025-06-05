import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading'; 
import LevelServiceApi from '../services/LevelServiceApi';
 


const useFetchLevel = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['Level', associationId],
        queryFn: async () => {
            switchLoadingModal(); // show loading modal
            try {
                const response = await LevelServiceApi.getAll(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching list Level:", err);
                throw err;
            } finally {
                switchLoadingModal(); // hide loading modal
            }
        },
       
    });
};

export default useFetchLevel;
