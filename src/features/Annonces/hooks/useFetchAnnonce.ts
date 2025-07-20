import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AnnonceServiceApi from "../services/AnnonceServiceApi";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";
import { useTranslation } from "react-i18next";
import type { AnnonceResponse } from "../types/AnnonceTypes";

const useFetchAnnonces = (associationId: number, type?: string): UseQueryResult<AnnonceResponse[], Error> => {
  const { t } = useTranslation();
  
  return useQuery<AnnonceResponse[], Error>({
    queryKey: ["annonces", associationId, type],
    queryFn: async () => {
      if (!associationId) return [];
      switchLoadingModal();
      try {
        const data = await AnnonceServiceApi.getAll(associationId, type);
        return data;
      } catch (error) {
        console.error(t("Error fetching annonces:"), error);
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