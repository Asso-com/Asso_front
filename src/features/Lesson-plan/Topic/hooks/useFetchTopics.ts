import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";
import TopicServiceApi from "../services/TopicServiceApi";
import type { TopicSummary } from "../types/topic.types";

const useFetchTopicsByAssociation = (
  associationId: number
): UseQueryResult<TopicSummary[], Error> => {
  return useQuery<TopicSummary[], Error>({
    queryKey: ['topics', associationId],
    queryFn: async () => {
      switchLoadingModal(); 
      try {
        const response = await TopicServiceApi.getByAssociationId(associationId);
        return response;
      } catch (err) {
        console.error("Error fetching topics:", err);
        throw err;
      } finally {
        switchLoadingModal(); 
      }
    },
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
    enabled: !!associationId,
    retry: false
  });
};

export default useFetchTopicsByAssociation;
