import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import CategoriesLevelServiceApi from '../services/CategoriesLevelServiceApi';

const useFetchCategoriesByAssociation = (
    associationId: number
): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['categories-by-association', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                return await CategoriesLevelServiceApi.getCreateByAssociationId(associationId);
            } catch (err) {
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        enabled: Boolean(associationId),
        retry: false,
    });
};

export default useFetchCategoriesByAssociation;
