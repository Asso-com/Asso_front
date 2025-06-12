import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StaffServiceApi from '../services/StaffServiceApi';

const useFetchStaff = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['staff', associationId],
        queryFn: async () => {
            switchLoadingModal();  
            try {
                const response = await StaffServiceApi.getAll(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching staff:", err);
                throw err;
            } finally {
                switchLoadingModal();  
            }
        },
        
    });
};

export default useFetchStaff;
