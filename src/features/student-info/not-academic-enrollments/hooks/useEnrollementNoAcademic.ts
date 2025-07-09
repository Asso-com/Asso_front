import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import type { StudentEnrollmentRequest } from '../types';
import StudentEnrollmentService from '../services/StudentEnrollmentService';


const useEnrollementNoAcademic = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (formData: StudentEnrollmentRequest) =>
            StudentEnrollmentService.createEnrollment(associationId, formData),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['not-academic-enrollments', associationId],
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Student enrolled successfully.',
                    type: 'success',
                })
            );
        },

        onError: (err) => {
            const error = (err as Error).message;
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

export default useEnrollementNoAcademic;
