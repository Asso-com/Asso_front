import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import LevelServiceApi from '../services/LevelServiceApi';

interface UpdateLevelParams {
    levelId: number;
    data: any;
}

const useUpdateLevel = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, UpdateLevelParams>({
        mutationFn: ({ levelId, data }) =>
            LevelServiceApi.update(levelId, associationId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['levels', associationId],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Level updated successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: error.message || 'Failed to update level.',
                    type: 'error',
                })
            );
        },
    });
};

export default useUpdateLevel;
