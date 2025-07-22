import { useMutation } from '@tanstack/react-query';
import authServiceApi from '../services/authServiceApi';

export const useResetPassword = () => {

  return useMutation<void, Error, { email: string; newPassword: string, confirmPassword:string }>({
    mutationFn: ({ email, newPassword,confirmPassword }) => authServiceApi.resetPassword(email, newPassword, confirmPassword),
    onError: (error) => {
      console.error('Reset password error:', error);
    },
  });
};
