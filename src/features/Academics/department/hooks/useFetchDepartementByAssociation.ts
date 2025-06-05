import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import DepartmentServiceApi from '../services/DepartmentServiceApi';

const useFetchDepartementByAssociation = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['department-by-association', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await DepartmentServiceApi.getCreateByAssociationId(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching department:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchDepartementByAssociation;
