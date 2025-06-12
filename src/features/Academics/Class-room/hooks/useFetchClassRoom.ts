import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import ClassRoomServiceApi from '../services/ClassRoomServiceApi';

const useFetchClassRoom = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['classRoom', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await ClassRoomServiceApi.getAll(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching classRoom:", err);
            } finally {
                switchLoadingModal();
            }
        },

    });
};

export default useFetchClassRoom;
