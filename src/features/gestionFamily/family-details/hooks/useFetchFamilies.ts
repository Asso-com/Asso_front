import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";
import FamilyServiceApi from "../services/FamilyServiceApi";

const useFetchFamilies = (
  associationId: number
): UseQueryResult<any[], Error> => {
  return useQuery<any[], Error>({
    queryKey: ["families", associationId],
    queryFn: async () => {
      switchLoadingModal();
      try {
        const data = await FamilyServiceApi.getAllFamilies(associationId);
        return data;
      } catch (err) {
        console.error("Error fetching families:", err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    enabled: !!associationId,
    refetchOnWindowFocus: false
  });
};

export default useFetchFamilies;
