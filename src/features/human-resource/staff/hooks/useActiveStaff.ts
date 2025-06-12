import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StaffServiceApi from '../services/StaffServiceApi';

const useActiveStaff = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (staffId: number) =>
            StaffServiceApi.toggelStatus(associationId, staffId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Staff status updated successfully.',
                    type: 'success',
                })
            );
        },
        onError: (error) => {
            console.error('Failed to update staff status:', error);
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to update staff status. Please try again.',
                    type: 'error',
                })
            );
        },
    });
};

export default useActiveStaff;
