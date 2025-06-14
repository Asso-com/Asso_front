import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import ClassRoomServiceApi from '@features/Academics/Class-room/services/ClassRoomServiceApi';

const useDeleteClassRoom = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (classRoomId: number) => ClassRoomServiceApi.delete(classRoomId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classRoom', associationId] });

      dispatch(
        showToast({
          title: 'Success',
          message: 'ClassRoom deleted successfully.',
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

export default useDeleteClassRoom;
