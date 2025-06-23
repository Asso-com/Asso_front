import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import ExternalPartnerApi from '../services/ExternalPartnerApi';
import type { ExternalPartnersResponse } from '../types/AssociationType';

const useExternalPartners = (): UseQueryResult<ExternalPartnersResponse, Error> => {
  return useQuery({
    queryKey: ["external-partners-villeneuve-all"],
    queryFn: async () => {

      const result = await ExternalPartnerApi.getPartners();
      return result;
    },
    
    // ✅ OPTIMISATIONS POUR PERFORMANCE
    staleTime: 1000 * 60 * 15, // 15 minutes - données restent fraîches plus longtemps
    gcTime: 1000 * 60 * 60 * 2, // 2 heures - garde en cache plus longtemps
    
    // ✅ RÉDUIRE LES RE-FETCH AUTOMATIQUES
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    
    // ✅ RETRY CONFIGURATION
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
    
    // ✅ OPTIMISATION DES NOTIFICATIONS
    notifyOnChangeProps: ['data', 'error', 'isLoading', 'isFetching'],
    
    // ✅ SÉLECTEUR OPTIMISÉ
    select: (data: ExternalPartnersResponse) => {
      return {
        ...data,
        data: data.data.slice(), // Créer une copie pour éviter les mutations
      };
    },
  });
};

export default useExternalPartners;