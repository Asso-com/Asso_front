import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StaffServiceApi from '../services/StaffServiceApi';
import type { RootState } from '@store/index';

interface StaffUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  comment?: string;
  basicSalary?: number;
  jobCategory?: string;
  isActive?: boolean;
}

const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  return useMutation({
    mutationFn: async ({
      staffId,
      data,
    }: {
      staffId: number;
      data: StaffUpdateData;
    }) => {
      const payload = {
        ...data,
        associationId,
      };

      return StaffServiceApi.update(staffId, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['staff', associationId],
      });

      dispatch(
        showToast({
          title: 'Success',
          message: 'Staff member updated successfully.',
          type: 'success',
        })
      );
    },

    onError: (error: Error) => {
      dispatch(
        showToast({
          title: 'Error',
          message:
            error.message || 'Failed to update staff member. Please try again.',
          type: 'error',
        })
      );
    },
  });
};

export default useUpdateStaff;
