import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import ClassRoomServiceApi from '../services/ClassRoomServiceApi';

const useActiveClassRoom = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (classRoomId: number) =>
      ClassRoomServiceApi.toggleStatus(classRoomId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classRoom', associationId] });

      dispatch(
        showToast({
          title: 'Success',
          message: 'ClassRoom status updated successfully.',
          type: 'success',
        })
      );
    },
    onError: (error) => {
      console.error('Failed to update classRoom status:', error);
      dispatch(
        showToast({
          title: 'Error',
          message: 'Failed to update classRoom status. Please try again.',
          type: 'error',
        })
      );
    },
  });
};

export default useActiveClassRoom;