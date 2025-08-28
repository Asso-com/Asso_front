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
            } catch (error) {
                console.error('Error fetching staff:', error);
            } finally {
                switchLoadingModal();
            }
        },
    });
};

export default useFetchStaff;
