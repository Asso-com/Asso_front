import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import DepartmentServiceApi from '../services/DepartmentServiceApi';

interface UpdateDepartmentParams {
    departmentId: number;
    data: any;
}

const useUpdateDepartment = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, UpdateDepartmentParams>({
        mutationFn: ({ departmentId, data }) =>
            DepartmentServiceApi.update(departmentId, associationId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['department', associationId],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Department updated successfully.',
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

export default useUpdateDepartment;
