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

export default useActivateAcademicPeriod;
