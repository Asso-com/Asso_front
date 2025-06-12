import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading'; 
import ClassRoomServiceApi from '../services/ClassRoomServiceApi';
 

const useFetchClassRoomByAssociation = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['classRoom-by-association', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await ClassRoomServiceApi.getCreateByAssociationId(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching classRoom:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchClassRoomByAssociation;
