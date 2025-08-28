import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import AssociationServiceApi from '../services/AssociationServiceApi';

interface UpdatePatnerParams {
    associationId: number;
    data: any;
}

const useUpdatePatner = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, UpdatePatnerParams>({
        mutationFn: ({ associationId, data }) =>
            AssociationServiceApi.updateAssocationSettings(associationId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['associations'],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Partner updated successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: error.message || 'Failed to update department.',
                    type: 'error',
                })
            );
        },
    });
};

export default useUpdatePatner;
