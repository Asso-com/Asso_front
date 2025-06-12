import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@store/toastSlice';
import { useDispatch, useSelector } from 'react-redux';
import StaffServiceApi from '../services/StaffServiceApi';
import type { RootState } from '@store/index';

const useDeleteStaff = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const associationId = useSelector(
        (state: RootState) => state.authSlice.associationId
    );

    return useMutation({
        mutationFn: async (staffId: number) => {
            if (!associationId) {
                throw new Error("Association ID is missing");
            }
            await StaffServiceApi.delete(staffId, associationId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['staff', associationId],
                exact: true
            });
            
            dispatch(showToast({
                title: 'Success',
                message: 'Staff member deleted successfully',
                type: 'success'
            }));
        },
        onError: (error: Error) => {
            dispatch(showToast({
                title: 'Error',
                message: error.message || 'Failed to delete staff member',
                type: 'error'
            }));
        }
    });
};

export default useDeleteStaff;