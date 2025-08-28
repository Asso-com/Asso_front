import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import ClassRoomServiceApi from '../services/ClassRoomServiceApi';

interface ToggleStatusResponse {
  success: boolean;
  message?: string;
}

const useActiveClassRoom = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<ToggleStatusResponse, Error, number>({
    mutationFn: (classRoomId: number) =>
      ClassRoomServiceApi.toggleStatus(classRoomId),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['classRoom', associationId] });

      dispatch(
        showToast({
          title: 'Success',
          message: data.message || 'ClassRoom status updated successfully.',
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

export default useActiveClassRoom;
