import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux';
import CategoriesLevelServiceApi from '../services/CategoriesLevelServiceApi';

const useCreateCategoriesLevels = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<any, Error, any>({
        mutationFn: (newCategoriesLevels: any) =>
            CategoriesLevelServiceApi.create(newCategoriesLevels, associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', associationId],
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Categories Levels created successfully.',
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

export default useCreateCategoriesLevels;
