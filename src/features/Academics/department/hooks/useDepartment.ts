import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux';
import DepartmentServiceApi from '../services/DepartmentServiceApi';


// export interface CreateAcademicDepartmentInput {
//     name: string;
//     startDate: string;
//     endDate: string;
//     associationId: number;

// }

// export interface AcademicDepartmentResponse {
//     id: number;
//     name: string;
//     startDate: string;
//     endDate: string;
//     associationId: number;
// }

const useCreateDepartment = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<any, Error, any>({
        mutationFn: (newDepartment: any) =>
            DepartmentServiceApi.create(newDepartment ,associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['department', associationId],
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Department created successfully.',
                    type: 'success',
                })
            );
        },

        onError: () => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to create department.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreateDepartment;
