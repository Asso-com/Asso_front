
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice'; 
import StudentServiceApi from '../services/StudentServiceApi';

const useCreateStudent = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (formData: any) =>
      StudentServiceApi.create({ ...formData, associationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['student', associationId],
      });
      dispatch(
        showToast({
          title: 'Success',
          message: 'Student added successfully.',
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

export default useCreateStudent;