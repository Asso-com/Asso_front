import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SessionScheduleDatesApi from '../services/SessionScheduleDatesApi';
import type { SessionSchuduleDate } from '../types';

const useDeleteSessionDates = (associationId: number, periodWeeksId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<SessionSchuduleDate[], Error, void>({
        mutationFn: () =>
            SessionScheduleDatesApi.deleteSessionDates(associationId, periodWeeksId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['session-dates', associationId, periodWeeksId] });

            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Sessions Dates deleted successfully.',
                    type: 'success',
                })
            )
        },

        onError: (err) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: err.message,
                    type: 'error',
                })
            );
        },
    });
};

export default useDeleteSessionDates;
