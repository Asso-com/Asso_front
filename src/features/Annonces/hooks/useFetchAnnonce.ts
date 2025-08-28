import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AnnonceServiceApi from "../services/AnnonceServiceApi";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";

import type { AnnonceResponse } from "../types/AnnonceTypes";

const useFetchAnnonces = (associationId: number): UseQueryResult<AnnonceResponse[], Error> => {


  return useQuery<AnnonceResponse[], Error>({
    queryKey: ["annonces", associationId],
    queryFn: async () => {
      if (!associationId) return [];
      switchLoadingModal();
      try {
        const data = await AnnonceServiceApi.getAll(associationId);
        return data;
      } catch (error) {
        throw error;
      } finally {
        switchLoadingModal();
      }
    },
    enabled: !!associationId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export default useFetchAnnonces;