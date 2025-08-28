import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import LessonServiceApi from '../services/LessonServiceApi';
import type { LessonSummary } from '../types/lesson.types';

const useFetchLessonsByAssociation = (
  associationId: number
): UseQueryResult<LessonSummary[], Error> => {
  return useQuery<LessonSummary[], Error>({
    queryKey: ['lessons', associationId],
    queryFn: async () => {
      switchLoadingModal(); // show loading modal
      try {
        const response = await LessonServiceApi.getByAssociationId(associationId);
        return response;
      } catch (err) {
        console.error("Error fetching lessons:", err);
        throw err;
      } finally {
        switchLoadingModal(); // hide loading modal
      }
    },
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!associationId,
    retry: false
  });
};

export default useFetchLessonsByAssociation;
