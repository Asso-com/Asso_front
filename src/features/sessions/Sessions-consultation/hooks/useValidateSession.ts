import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import AttendanceServiceApi from '../services/AttandanceServiceApi';

interface SessionActionParams {
    sessionDateId: number;
}

const useValidateSession = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<any, Error, SessionActionParams>({
        mutationFn: ({ sessionDateId }) =>
            AttendanceServiceApi.validateSession(sessionDateId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['session-dates'],
            });


            dispatch(
                showToast({
                    title: 'Success',
                    message: 'Session validated successfully.',
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            dispatch(
                showToast({
                    title: 'Error',
                    message: error.message || 'Failed to validate session.',
                    type: 'error',
                })
            );
        },
    });
};

export default useValidateSession;