import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import DepartmentServiceApi from '../services/DepartmentServiceApi';

const useDeleteDepartment = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, number>({
        mutationFn: (departmentId: number) =>
            DepartmentServiceApi.delete(departmentId, associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['department', associationId],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Department deleted successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: error.message || 'Failed to delete department.',
                    type: 'error',
                })
            );
        },
    });
};

export default useDeleteDepartment;
