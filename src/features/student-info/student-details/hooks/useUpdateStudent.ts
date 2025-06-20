import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StudentServiceApi from '../services/StudentServiceApi';

interface StudentUpdatePayload {
  StudentId: number;
  data: any;
}

const useUpdateStudent = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ StudentId, }: StudentUpdatePayload) => {
      return StudentServiceApi.update(StudentId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Student', associationId],
      });

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
