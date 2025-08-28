import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import DepartmentServiceApi from '../services/DepartmentServiceApi';

const useActiveDepartment = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (departmentId: number) =>
            DepartmentServiceApi.toggelStatus(associationId, departmentId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['department', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Department status updated successfully.',
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

export default useActiveDepartment;
