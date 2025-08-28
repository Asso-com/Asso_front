import { useMutation } from '@tanstack/react-query';
import authServiceApi from '../services/authServiceApi';


export const useSendOtp = () => {
  return useMutation<{ success: boolean; message: string; data: string }, Error, { email: string }>({
    mutationFn: ({ email }) => authServiceApi.sendOtp(email),
  });
};