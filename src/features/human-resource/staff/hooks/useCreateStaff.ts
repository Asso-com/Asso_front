import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StaffServiceApi from '../services/StaffServiceApi';

 

const useCreateStaff = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (formData: any) =>
            StaffServiceApi.create({ ...formData, associationId }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['staff', associationId],
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Staff member added successfully.',
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

export default useCreateStaff;
