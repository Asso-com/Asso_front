import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import ExternalPartnerApi from '../services/ExternalPartnerApi';
import type { ExternalPartnersResponse } from '../types/AssociationType';

interface UseExternalPartnersParams {
  page: number;
  limit: number;
}

const useExternalPartners = (
  params: UseExternalPartnersParams
): UseQueryResult<ExternalPartnersResponse, Error> => {
  return useQuery({
    queryKey: ["external-partners", params.page, params.limit],
    queryFn: async () => {
      const result = await ExternalPartnerApi.getPartners({
        page: params.page,
        limit: params.limit,
      });
      return result;
    },
    select: (data: ExternalPartnersResponse) => {
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,  // 30 minutes
    // ✅ SUPPRIMÉ: keepPreviousData (obsolète dans React Query v5)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    notifyOnChangeProps: ['data', 'error'],
  }) as UseQueryResult<ExternalPartnersResponse, Error>;
};

export default useExternalPartners;