import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux';
import ClassRoomServiceApi from '../services/ClassRoomServiceApi';

const useCreateClassRoom = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    
       return useMutation<any, Error, any>({
        mutationFn: (payload: {
          associationId: number;
          name: string;
          capacity: number;
          description: string;
          active: boolean
        }) => ClassRoomServiceApi.create(payload.associationId, {
          name: payload.name,
          capacity: payload.capacity,
          description: payload.description,
          active: payload.active
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['classRoom'],
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'ClassRoom created successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error: Error) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: error.message || 'Failed to create classRoom.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreateClassRoom;
