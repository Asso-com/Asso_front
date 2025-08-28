import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";
import ReunionServiceApi from "../services/ReunionServiceApi";

const useFetchReunion = (
  associationId?: number
): UseQueryResult<any[], Error> => {
  return useQuery<any[], Error>({
    queryKey: ["reunions", associationId],
    queryFn: async () => {
      switchLoadingModal();
      try {
        const data = await ReunionServiceApi.getAll(associationId);
        return data;
      } catch (error) {
        console.error("Error fetching reunions:", error);
        throw error;
      } finally {
        switchLoadingModal();
      }
    },
    enabled: !!associationId,
    refetchOnWindowFocus: false
  });
};

export default useFetchReunion;
