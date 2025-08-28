import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import AttendanceServiceApi from '../services/AttandanceServiceApi';
import { useTranslation } from 'react-i18next';

const useUpdateSessionSchedule = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return useMutation<any, Error, { sessionDateId: number; request: any }>({
        mutationFn: ({ sessionDateId, request }) =>
            AttendanceServiceApi.updateSessionScheduleDate(sessionDateId, request),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['session-dates'],
            });
            dispatch(
                showToast({
                    title: t('Success'),
                    message: t('Session schedule date updated successfully.'),
                    type: 'success',
                })
            );
        },

        onError: (error) => {
            dispatch(
                showToast({
                    title: t('Error'),
                    message: error.message || t('Failed to update session schedule date.'),
                    type: 'error',
                })
            );
        },
    });
}
export default useUpdateSessionSchedule;