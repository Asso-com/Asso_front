import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux'; 
import LevelServiceApi from '../services/LevelServiceApi';

const useCreateLevel = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<any, Error, any>({
        mutationFn: (newLevel: any) =>
            LevelServiceApi.create(newLevel ,associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Level', associationId],
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Level created successfully.',
                    type: 'success',
                })
            );
        },

        onError: () => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to create Level.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreateLevel;
