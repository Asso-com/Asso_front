import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StaffServiceApi from '../services/StaffServiceApi';

const useFetchStafftByAssociation = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['department-by-association', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await StaffServiceApi.getCreateByAssociationId(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching staff:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchStafftByAssociation;
