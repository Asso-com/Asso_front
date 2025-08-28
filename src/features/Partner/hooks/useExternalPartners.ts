import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import ExternalPartnerApi from '../services/ExternalPartnerApi';
import type { ExternalPartnersResponse } from '../list-partner/types/AssociationType';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';

const useExternalPartners = (): UseQueryResult<ExternalPartnersResponse, Error> => {
  return useQuery({
    queryKey: ["external-partners-villeneuve-all"],
    queryFn: async () => {
      switchLoadingModal();
      try {
        const result = await ExternalPartnerApi.getPartners();
        return result;
      } catch (err) {
        console.error("Error fetching department:", err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    retry: 2,
    gcTime: 1000 * 60 * 10,  // cache garbage collection time
    staleTime: 1000 * 60 * 5, // data considered fresh for 5 min
  });
};

export default useExternalPartners;