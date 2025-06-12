import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@store/toastSlice'; 
import type { RootState } from '@store/index';
import ClassRoomServiceApi from '@features/Academics/Class-room/services/ClassRoomServiceApi';

interface ClassRoomUpdateData {
  name: string;
  capacity: number;
  description: string;
  active?: boolean;
}

const useUpdateClassRoom = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  return useMutation({
    mutationFn: async ({ classRoomId, data }: { classRoomId: number; data: ClassRoomUpdateData }) => {
      if (!associationId || isNaN(associationId)) {
        throw new Error('Association ID is missing or invalid');
      }
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Update data is empty');
      }

      const updateData = {
        ...data,
        associationId,
        active: data.active ?? true, // Default to true if not provided
      };

      return ClassRoomServiceApi.update(classRoomId, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classRoom'],
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