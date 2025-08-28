import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SubjectServiceApi from '../services/SubjectServiceApi';

interface UpdateSubjectParams {
    subjectId: number;
    data: any;
}

const useUpdateSubject = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, UpdateSubjectParams>({
        mutationFn: ({ subjectId, data }) =>
            SubjectServiceApi.update(subjectId, associationId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['subjects', associationId],
            });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Subject updated successfully.',
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

export default useUpdateSubject;
