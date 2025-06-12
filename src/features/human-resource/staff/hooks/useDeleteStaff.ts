import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StaffServiceApi from '../services/StaffServiceApi';

const useDeleteStaff = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (staffId: number) =>
            StaffServiceApi.delete(staffId, associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['staff', associationId],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Staff member deleted successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error: Error) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: error.message || 'Failed to delete staff member.',
                    type: 'error',
                })
            );
        },
    });
};

export default useDeleteStaff;
