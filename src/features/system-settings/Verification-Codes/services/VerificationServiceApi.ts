import handleAxiosError from "@utils/handleAxiosError";
import { axiosInstance } from "@services/api-services/axiosInstance";

const VerificationServiceApi = {

  getAllOtpCodes: async (associationId:number): Promise<any[]> => {
    try {
      const response = await axiosInstance.get(`/api/v1/auth/otp-codes/association/${associationId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  deleteOtp: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/auth/delete-otp/${id}`);
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

export default VerificationServiceApi;