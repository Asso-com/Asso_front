import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import SubjectLevelServiceApi from '../services/SubjectLevelServiceApi';
import type { SubjectLevelSelectOption } from '../services/SubjectLevelServiceApi';

const useFetchSelectSubjectLevel = (
  associationId: number
): UseQueryResult<SubjectLevelSelectOption[], Error> => {
  return useQuery<SubjectLevelSelectOption[], Error>({
    queryKey: ['subject-levels-select', associationId],
    queryFn: async (): Promise<SubjectLevelSelectOption[]> => {
      switchLoadingModal();
      try {
        const response = await SubjectLevelServiceApi.getSelectOptions(associationId);
        return response;
      } catch (err) {
        console.error('Fetch select error:', err);
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

export default useFetchSelectSubjectLevel;
