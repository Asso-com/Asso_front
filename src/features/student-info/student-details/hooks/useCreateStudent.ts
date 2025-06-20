import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice'; 
import StudentServiceApi from '../services/StudentServiceApi';

interface CreateStudentPayload {
    associationId: number;
    
}

const useCreateStudent = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, CreateStudentPayload>({
        mutationFn: ({ associationId, ...data }) =>
            StudentServiceApi.create(associationId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Student', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Student created successfully.',
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

export default useCreateStudent;
