import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import LevelSubjectServiceApi from '../services/SubjectLevelServiceApi';
import type { SubjectLevelItem } from '../types/subject.types.ts'; 

interface WrappedSubjectLevelResponse {
  status: 'success' | 'error';
  data?: SubjectLevelItem[];
  message?: string;
}

const useFetchSubjectLevel = (
  associationId: number
): UseQueryResult<WrappedSubjectLevelResponse, Error> => {
  return useQuery<WrappedSubjectLevelResponse, Error>({
    queryKey: ['subject-levels', associationId],
    queryFn: async (): Promise<WrappedSubjectLevelResponse> => {
      switchLoadingModal();
      try {
        const response = await LevelSubjectServiceApi.getAll(associationId);
        
        const wrappedResponse: WrappedSubjectLevelResponse = {
          status: 'success',
          data: response.data,
          message: 'Data fetched successfully'
        };
        
        return wrappedResponse;
      } catch (err) {
        console.error('Erreur hook fetch:', err);
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