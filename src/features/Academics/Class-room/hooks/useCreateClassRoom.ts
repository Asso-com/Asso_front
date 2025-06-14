import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import ClassRoomServiceApi from '../services/ClassRoomServiceApi';

interface CreateClassRoomPayload {
    associationId: number;
    name: string;
    capacity: number;
    description: string;
    active: boolean;
}

const useCreateClassRoom = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, CreateClassRoomPayload>({
        mutationFn: ({ associationId, ...data }) =>
            ClassRoomServiceApi.create(associationId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classRoom', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'ClassRoom created successfully.',
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

export default useCreateClassRoom;
