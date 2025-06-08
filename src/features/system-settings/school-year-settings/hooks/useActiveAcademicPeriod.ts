import { useMutation, useQueryClient } from '@tanstack/react-query';
import YearSettingsServiceApi from '../services/YearSettingsServiceApi';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';

const useActivateAcademicPeriod = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (periodId: number) =>
            YearSettingsServiceApi.activateOrDeactivateAcademicPeriod(periodId, associationId),

        onSuccess: () => {
            const keysToInvalidate = [
                'academicPeriods',
                'academicPeriodsWeeks',
                'academicPeriodsActive',
            ];

            keysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key, associationId] })
            );

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Academic Period activated successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error: unknown) => {
            console.error('Activation error:', error);
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to activate Academic Period.',
                    type: 'error',
                })
            );
        },
    });
};

export default useActivateAcademicPeriod;
