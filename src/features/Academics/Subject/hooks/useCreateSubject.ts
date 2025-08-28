import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SubjectServiceApi from '../services/SubjectServiceApi';
import type { SubjectRequest } from '../types';

const useCreateSubject = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (subject: SubjectRequest) => SubjectServiceApi.create(subject),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['subjects', associationId],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Subject created successfully.',
                    type: 'success',
                })
            );
        },

        onError: () => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to create subject.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreateSubject;
