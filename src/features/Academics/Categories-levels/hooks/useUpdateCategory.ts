import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import CategoriesLevelServiceApi from '../services/CategoriesLevelServiceApi';

interface UpdateCategoryParams {
    categoryId: number;
    data: any;
}

const useUpdateCategory = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, UpdateCategoryParams>({
        mutationFn: ({ categoryId, data }) =>
            CategoriesLevelServiceApi.update(categoryId, associationId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', associationId],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Category updated successfully.',
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

export default useUpdateCategory;
