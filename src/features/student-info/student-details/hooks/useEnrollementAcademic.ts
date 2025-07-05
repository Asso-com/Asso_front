import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StudentServiceApi from '../services/StudentServiceApi';
import type { EnrollementAcademic } from '../types';

const useEnrollementAcademic = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (formData: EnrollementAcademic) =>
            StudentServiceApi.createEnrollment(associationId, formData),

        onSuccess: (_, formData) => {
            // Optimistically update cache
            queryClient.setQueryData(['students', associationId], (oldData: any) => {
                if (!oldData) return oldData;

                return oldData.map((student: any) => {
                    if (student.id === formData.studentId) {
                        return {
                            ...student,
                            enrolledInCurrentPeriod: true,
                        };
                    }
                    return student;
                });
            });

            // Optionally invalidate to refetch later for fresh data
            // queryClient.invalidateQueries({ queryKey: ['students', associationId] });

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

export default useEnrollementAcademic;
