import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const UserServiceApi = {
    getCurrentUserProfile: async <T = any>(): Promise<T> => {
        try {
            const response = await axiosInstance.get<T>("/api/v1/users/profile");
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },


  updateCurrentUserProfile: async (formData: FormData) => {
    try {
      const response = await axiosInstance.put("/api/v1/users/update-profile", formData);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }
  };
export default UserServiceApi;
