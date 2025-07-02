import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentServiceApi from '../services/StudentServiceApi';

const useFetchStudentInCurrentPeriod = (
  associationId: number
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: ['StudentInCurrentPeriod', associationId],
    queryFn: async () => {
      switchLoadingModal();
      try {
        const response = await StudentServiceApi.getAllInCurrentAcademicPeriod(associationId);
        return response;
      } catch (err) {
        console.error("Error fetching students in current period:", err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    retry: 1
  });
};

export default useFetchStudentInCurrentPeriod;