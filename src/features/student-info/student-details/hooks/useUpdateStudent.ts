import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StudentServiceApi from '../services/StudentServiceApi';

interface StudentUpdatePayload {
  data: any;
}

const useUpdateStudent = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ data }: StudentUpdatePayload) => {
      return StudentServiceApi.update(data);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['students', associationId],
      });

      if (variables.data.studentId) {
        queryClient.invalidateQueries({
          queryKey: ['student-details', associationId, variables.data.studentId],
        });
      }

      dispatch(
        showToast({
          title: 'Success',
          message: 'Student updated successfully.',
          type: 'success',
        })
      );
    },

    onError: (err) => {
      const error = err.message as string;
      dispatch(
        showToast({
          title: 'Error',
          message: error,
          type: 'error',
        })
      );
    },
  });
};

export default useUpdateStudent;
