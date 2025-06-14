import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading'; 
import LevelServiceApi from '../services/LevelServiceApi';

const useFetchLevel = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['levels', associationId],
        queryFn: async () => {
            switchLoadingModal(); 
            try {
                const response = await LevelServiceApi.getAll(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching list Level:", err);
                throw err;
            } finally {
                switchLoadingModal(); 
            }
        },
       
    });
};

export default useFetchLevel;
