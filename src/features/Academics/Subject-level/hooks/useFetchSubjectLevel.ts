import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import SubjectLevelServiceApi from '../services/SubjectLevelServiceApi';
import type { SubjectLevelItem } from '../types/subject.types.ts';

const useFetchSubjectLevel = (
  associationId: number
): UseQueryResult<SubjectLevelItem[], Error> => {
  return useQuery<SubjectLevelItem[], Error>({
    queryKey: ['subject-levels', associationId],
    queryFn: async (): Promise<SubjectLevelItem[]> => {
      switchLoadingModal();
      try {
        const response = await SubjectLevelServiceApi.getAll(associationId);
        return response;
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    staleTime: 0,
    gcTime: 0,
    enabled: !!associationId,
    retry: false,
  });
};

export default useFetchSubjectLevel;