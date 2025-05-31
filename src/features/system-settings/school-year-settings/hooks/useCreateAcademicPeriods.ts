import { useMutation, useQueryClient } from '@tanstack/react-query';
import YearSettingsServiceApi from '../services/YearSettingsServiceApi';
import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux';


// export interface CreateAcademicPeriodInput {
//     name: string;
//     startDate: string;
//     endDate: string;
//     associationId: number;

// }

// export interface AcademicPeriodResponse {
//     id: number;
//     name: string;
//     startDate: string;
//     endDate: string;
//     associationId: number;
// }

const useCreateAcademicPeriods = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<any, Error, any>({
        mutationFn: (newPeriod: any) =>
            YearSettingsServiceApi.create(newPeriod),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['academicPeriods', associationId],
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
