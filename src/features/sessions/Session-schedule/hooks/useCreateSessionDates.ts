import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SessionScheduleDatesApi from '../services/SessionScheduleDatesApi';
import type { SessionSchuduleDate } from '../types';

const useCreateSessionDates = (associationId: number, periodWeeksId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<SessionSchuduleDate[], Error, void>({
        mutationFn: () =>
            SessionScheduleDatesApi.createSessionDates(associationId, periodWeeksId),

        onSuccess: (newSessions) => {
            if (Array.isArray(newSessions) && newSessions.length > 0) {
                queryClient.setQueryData<SessionSchuduleDate[]>(
                    ['session-dates', associationId, periodWeeksId],
                    (oldData = []) => [...oldData, ...newSessions]
                );

                dispatch(
                    showToast({
                        title: 'Success',
                        message: `${newSessions.length} session(s) generated successfully.`,
                        type: 'success',
                    })
                );
            } else {
                dispatch(
                    showToast({
                        title: 'Info',
                        message: 'No sessions were generated.',
                        type: 'info',
                    })
                );
            }
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

export default useCreateSessionDates;
