import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';  
import StudentServiceApi from '../services/StudentServiceApi';

const useDeleteStudent = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (StudentId: number) => StudentServiceApi.delete(StudentId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Student', associationId] });

      dispatch(
        showToast({
          title: 'Success',
          message: 'Student deleted successfully.',
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

export default useDeleteStudent;
