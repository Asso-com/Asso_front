import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import ClassRoomServiceApi from '@features/Academics/Class-room/services/ClassRoomServiceApi';

interface ClassRoomUpdatePayload {
  classRoomId: number;
  data: any;
}

const useUpdateClassRoom = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ classRoomId, data }: ClassRoomUpdatePayload) => {
      return ClassRoomServiceApi.update(classRoomId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classRoom', associationId],
      });

      dispatch(
        showToast({
          title: 'Success',
          message: 'ClassRoom updated successfully.',
          type: 'success',
        })
      );
    },

    onError: (error: Error) => {
      dispatch(
        showToast({
          title: 'Error',
          message: error.message || 'Failed to update ClassRoom.',
          type: 'error',
        })
      );
    },
  });
};

export default useUpdateClassRoom;
