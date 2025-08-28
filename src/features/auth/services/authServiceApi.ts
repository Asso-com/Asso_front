import handleAxiosError from "@utils/handleAxiosError";
import { axiosInstance } from "@services/api-services/axiosInstance";

const authServiceApi = {
      getPhoneByEmail: async (email: string): Promise<string> => {
    try {
      const response = await axiosInstance.get<string>(`/api/v1/auth/phone-by-email`, {
        params: { email },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
  sendOtp: async (email: string): Promise<{ success: boolean; message: string; data: string }> => {
    try {
      const response = await axiosInstance.post<{ data: string }>('/api/v1/auth/send-otp', { email });
      return {
        success: true,
        message: "OTP sent successfully",
        data: response.data.data,
      };
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  verifyOtp: async (email: string, otpCode: string): Promise<string> => {
    try {
      const response = await axiosInstance.post<{ data: string }>('/api/v1/auth/verify-otp', { email, otpCode });
      return response.data.data; // reset token
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  resetPassword: async (email: string, newPassword: string, confirmPassword:string): Promise<void> => {
    try {
      await axiosInstance.post('/api/v1/auth/reset-password', { email, newPassword,confirmPassword});
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

export default authServiceApi;
