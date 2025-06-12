import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@store/toastSlice'; 
import type { RootState } from '@store/index';
import ClassRoomServiceApi from '@features/Academics/Class-room/services/ClassRoomServiceApi';

const useDeleteClassRoom = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  return useMutation({
    mutationFn: async (classRoomId: number) => {
      if (!associationId || isNaN(associationId)) {
        throw new Error('Association ID is missing or invalid');
      }
      await ClassRoomServiceApi.delete(classRoomId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classRoom'],
      });
      dispatch(
        showToast({
          title: 'Success',
          message: 'ClassRoom deleted successfully.',
          type: 'success',
        })
      );
    },
    onError: (error: Error) => {
      dispatch(
        showToast({
          title: 'Error',
          message: error.message || 'Failed to delete ClassRoom.',
          type: 'error',
        })
      );
    },
  });
};

export default useDeleteClassRoom;