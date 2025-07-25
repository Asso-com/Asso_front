import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentEnrollmentService from '../services/StudentEnrollmentService';

const useFetchEnrollmentsByStudent = (
  associationId: number,
  studentId?: string
): UseQueryResult<any[], Error> => {
  return useQuery<any[], Error>({
    queryKey: ['enrollments-by-student', associationId, studentId],
    queryFn: async () => {
      switchLoadingModal();
      try {
        if (!studentId) throw new Error("Student ID is required.");
        const result = await StudentEnrollmentService.getEnrollmentsByStudent(
          associationId,
          studentId
        );
        return result || []; // Ensure we always return an array
      } catch (err) {
        console.error("Error fetching enrollments by student ID:", err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    enabled: !!associationId && !!studentId,
    retry: false,
    // Add some default data to prevent undefined issues
    initialData: [],
  });
};

export default useFetchEnrollmentsByStudent;