import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import CategoriesLevelServiceApi from '../services/CategoriesLevelServiceApi';

const useToggleActive = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, number>({
        mutationFn: (categoryId: number) =>
            CategoriesLevelServiceApi.toggelStatus(associationId, categoryId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Category level status updated successfully.',
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

export default useToggleActive;
