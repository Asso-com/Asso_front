import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import LevelServiceApi from '../services/LevelServiceApi';
import type { NewLevel } from '../types';


const useCreateLevel = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, NewLevel>({
        mutationFn: (newLevel: NewLevel) =>
            LevelServiceApi.create(newLevel),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['levels', associationId],
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Level created successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: error.message || 'Failed to create Level.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreateLevel;
