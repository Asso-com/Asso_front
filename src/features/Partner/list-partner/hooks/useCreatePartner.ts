import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import type { PaternRequestDto } from '../types/AssociationType';
import AssociationServiceApi from '../services/AssociationServiceApi';

const useCreatePartner = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, PaternRequestDto>({
        mutationFn: (payload) => AssociationServiceApi.createAssociation(payload),

        onSuccess: () => {
    
            ['external-partners-villeneuve-all', 'associations'].forEach((key) => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Partner created successfully.',
                    type: 'success',
                })
            );
        },

        onError: (err) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: err.message || 'An unexpected error occurred.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreatePartner;
