import { useMutation, useQueryClient } from '@tanstack/react-query';
import YearSettingsServiceApi from '../services/YearSettingsServiceApi';
import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux';

const useCreateAcademicPeriods = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (newPeriod: any) => YearSettingsServiceApi.create(newPeriod),

        onSuccess: () => {
            const keysToInvalidate = [
                ['academicPeriods', associationId],
                ['academicPeriodsActive', associationId],
            ];

            keysToInvalidate.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: key });
            });
            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Academic Period created successfully.',
                    type: 'success',
                })
            );
        },

        onError: () => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: 'Failed to create Academic Period.',
                    type: 'error',
                })
            );
        },
    });
};

export default useCreateAcademicPeriods;
