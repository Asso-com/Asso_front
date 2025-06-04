/* import { useMutation, useQueryClient } from '@tanstack/react-query';
import YearSettingsServiceApi from '../services/DepartmentServiceApi';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';

const useActiveAcademicPeriod = (associationId: number) => {
    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (periodId: number) =>
            YearSettingsServiceApi.activateOrDeactivateAcademicPeriod(periodId, associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['academicPeriods', associationId] });
            queryClient.invalidateQueries({ queryKey: ['academicPeriodsWeeks', associationId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Academic Period activated successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            console.error('Failed to deactivate contract:', error);
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

export default useActiveAcademicPeriod;
 */