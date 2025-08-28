import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import AttendanceServiceApi from '../services/AttandanceServiceApi';
import { useTranslation } from 'react-i18next';

interface SessionActionParams {
    sessionDateId: number;
}

const useRegisterAttendance = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return useMutation<any, Error, SessionActionParams>({
        mutationFn: ({ sessionDateId }) =>
            AttendanceServiceApi.registerAttendance(sessionDateId),

        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['session-dates'],
            });

            dispatch(
                showToast({
                    title: t('Success'),
                    message: t('Attendance registered successfully.'),
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            dispatch(
                showToast({
                    title: t('Error'),
                    message: error.message || t('Failed to register attendance.'),
                    type: 'error',
                })
            );
        },
    });
};

export default useRegisterAttendance;
