import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SubjectLevelServiceApi from '../services/SubjectLevelServiceApi';
import type { CreateSubjectLevelDto } from '../services/SubjectLevelServiceApi';

const useCreateSubjectLevel = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, CreateSubjectLevelDto>({
        mutationFn: (payload) =>
            SubjectLevelServiceApi.create(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subject-levels', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Subject level association created successfully.',
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

export default useCreateSubjectLevel;