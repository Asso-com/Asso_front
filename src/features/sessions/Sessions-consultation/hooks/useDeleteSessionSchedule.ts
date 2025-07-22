import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import AttendanceServiceApi from '../services/AttandanceServiceApi';
import { useTranslation } from 'react-i18next';

const useDeleteSessionSchedule = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation<void, Error, { associationId: number; periodWeeksId: number }>({
    mutationFn: async ({ associationId, periodWeeksId }) => {
      return AttendanceServiceApi.deleteSessionScheduleDatesByPeriodWeeks(associationId, periodWeeksId);
    },

    onSuccess: (_data, variables) => {
      const { associationId, periodWeeksId } = variables;

      queryClient.invalidateQueries({
        queryKey: ['sessionScheduleDates', periodWeeksId, associationId],
      });

      dispatch(
        showToast({
          title: t('Success'),
          message: t('Session schedule dates deleted successfully.'),
          type: 'success',
        })
      );
    },

    onError: (error) => {
      dispatch(
        showToast({
          title: t('Error'),
          message: error.message || t('Failed to delete session schedule dates.'),
          type: 'error',
        })
      );
    },
  });
};

export default useDeleteSessionSchedule;
