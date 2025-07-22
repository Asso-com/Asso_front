import { useMutation} from '@tanstack/react-query';
import authServiceApi from '../services/authServiceApi'; 
export const useVerifyOtp = () => {
  return useMutation<string, Error, { email: string; otpCode: string }>({
    mutationFn: ({ email, otpCode }) => authServiceApi.verifyOtp(email, otpCode),

  });
};
