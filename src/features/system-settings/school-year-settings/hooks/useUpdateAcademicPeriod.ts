import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import YearSettingsServiceApi from '../services/YearSettingsServiceApi';

interface UpdateAcademicPeriodParams {
    academicPeriodId: number;
    data: any;
}

const useUpdateAcademicPeriod = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, UpdateAcademicPeriodParams>({
        mutationFn: ({ academicPeriodId, data }) =>
            YearSettingsServiceApi.updateDescriptionAndExtendEndDate(academicPeriodId, data),

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
                    message: 'Academic period updated successfully.',
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

export default useUpdateAcademicPeriod;
