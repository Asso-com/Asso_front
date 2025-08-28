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

export default useUpdateClassRoom;
