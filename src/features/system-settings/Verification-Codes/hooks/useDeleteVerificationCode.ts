import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import VerificationServiceApi from '../services/VerificationServiceApi';

const useDeleteVerificationCode = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, number>({
    mutationFn: (otpId) => VerificationServiceApi.deleteOtp(otpId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['otp-codes'],
      });

      dispatch(
        showToast({
          title: 'Success',
          message: 'OTP code deleted successfully.',
          type: 'success',
        })
      );
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

export default useDeleteVerificationCode;
