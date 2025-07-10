import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import sessionServiceApi from '../services/sessionServiceApi';
import type { SessionStudentEnrollmentResponse } from '../types/sessions.types';

const useFetchSessionsWithEnrollments = (
  associationId: number
): UseQueryResult<SessionStudentEnrollmentResponse[], Error> => {
  return useQuery<SessionStudentEnrollmentResponse[], Error>({
    queryKey: ['sessions-enrollments', associationId],
    queryFn: async (): Promise<SessionStudentEnrollmentResponse[]> => {
      switchLoadingModal();
      try {
        const response = await sessionServiceApi.getSessionsWithEnrollmentsByAssociationId(associationId);
        return response;
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    enabled: !!associationId,
    retry: false,
  });
};

export default useFetchSessionsWithEnrollments;
