
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import AssociationServiceApi from '../services/AssociationServiceApi';
import type { Association } from '../types/AssociationType';
const useFetchAssociations = (): UseQueryResult<Association[], Error> => {
  return useQuery<Association[], Error>({
    queryKey: ["associations"],
    queryFn: async () => {
      switchLoadingModal(); // If this is a global loading toggle (optional)
      try {
        // Assuming AssociationServiceApi.getAll returns Promise<Association[]>
        const data = await AssociationServiceApi.getAll();
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
export default useFetchAssociations;