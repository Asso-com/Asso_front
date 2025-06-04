import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux'; 
import CategoriesLevelServiceApi from '../services/CategoriesLevelServiceApi';

const useCreateCategoriesLevels = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<any, Error, any>({
        mutationFn: (newCategoriesLevels: any) =>
            CategoriesLevelServiceApi.create(newCategoriesLevels ,associationId),

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

        onError: () => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to create categorie Level.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreateCategoriesLevels;
