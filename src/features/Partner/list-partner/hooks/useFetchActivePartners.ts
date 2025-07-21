
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import AssociationServiceApi from '../services/AssociationServiceApi';
import type { ActiveAssociation } from '../types/AssociationType';

const useFetchActivePartners = (): UseQueryResult<ActiveAssociation[], Error> => {

    return useQuery<ActiveAssociation[], Error>({
        queryKey: ["associations-actives"],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const data = await AssociationServiceApi.getOnlyActives();
                return data;
            } catch (error) {
                console.error("Error fetching associations:", error);
                throw error;
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
    });

};
export default useFetchActivePartners;