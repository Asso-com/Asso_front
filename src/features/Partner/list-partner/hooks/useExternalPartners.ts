import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import ExternalPartnerApi from '../services/ExternalPartnerApi';
import type { Association } from '../types/AssociationType';

interface ExternalPartnersResponse {
  data: Association[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UseExternalPartnersParams {
  page: number;
  limit: number;
}

const useExternalPartners = (
  params: UseExternalPartnersParams
): UseQueryResult<ExternalPartnersResponse, Error> => {
  return useQuery<ExternalPartnersResponse, Error>({
    queryKey: ["external-partners", params.page, params.limit],
    queryFn: async () => {
      console.log(`⚡ API ULTRA-RAPIDE - Page ${params.page}, Limit ${params.limit}`);
      
      const startTime = performance.now();
      
      try {
        const result = await ExternalPartnerApi.getPartners({
          page: params.page,
          limit: params.limit
        });
        
        const endTime = performance.now();
        console.log(`🚀 API en ${(endTime - startTime).toFixed(2)}ms`);
        
        return result;
      } catch (error) {
        console.error("❌ API Error:", error);
        throw error;
      }
    },
    
    // ✅ CACHE ULTRA-AGRESSIF
    staleTime: 1000 * 60 * 15, // ✅ 15 MIN FRESH
    gcTime: 1000 * 60 * 120,   // ✅ 2 HEURES CACHE
    
    // ✅ OPTIMISATIONS MAXIMALES
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0, // ✅ PAS DE RETRY POUR RAPIDITÉ
    retryOnMount: false,
    
    // ✅ PERFORMANCE MAXIMALE
    structuralSharing: true,
    notifyOnChangeProps: ['data', 'error'], // ✅ NOTIFICATION MINIMALE
  });
};

export default useExternalPartners;