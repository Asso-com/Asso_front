import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import LevelServiceApi from '../services/LevelServiceApi';
 

const useActiveLevel = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (LevelId: number) =>
            LevelServiceApi.toggelStatus(associationId, LevelId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Level', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'List Level status updated successfully.',
                    type: 'success',
                })
            );
        },
        onError: (error) => {
            console.error('Failed to update Level status:', error);
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to update list Level status. Please try again.',
                    type: 'error',
                })
            );
        },
    });
};

export default useActiveLevel;
