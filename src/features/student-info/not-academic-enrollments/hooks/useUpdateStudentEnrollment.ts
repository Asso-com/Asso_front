import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StudentEnrollmentService from '../services/StudentEnrollmentService';
import type { StudentEnrollmentRequest } from '../types';

interface UpdateEnrollmentParams {
  studentId: string;
  data: StudentEnrollmentRequest;
}

const useUpdateStudentEnrollment = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, UpdateEnrollmentParams>({
    mutationFn: ({ studentId, data }) =>
      StudentEnrollmentService.updateEnrollment(associationId, studentId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['not-academic-enrollments', associationId],
      });

      dispatch(
        showToast({
          title: 'Success',
          message: 'Enrollment updated successfully.',
          type: 'success',
        })
      );
    },

    onError: (err) => {
      dispatch(
        showToast({
          title: 'Error',
          message: err.message || 'An error occurred while updating the enrollment.',
          type: 'error',
        })
      );
    },
  });
};

export default useUpdateStudentEnrollment;
