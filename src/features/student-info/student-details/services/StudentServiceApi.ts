
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";


const StudentServiceApi = {

  getAll: async (associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/students/association/${associationId}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getAllParents: async (): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/parents`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  getAllInCurrentAcademicPeriod: async (associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/students/enrolledInCurrentPeriod/association/${associationId}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  create: async (data: any): Promise<any> => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/students/inscription`,
        data
      );
      return response.data;
    } catch (err) {


      throw new Error('An unexpected error occurred.');
    }
  },

  update: async (id: number,): Promise<any> => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/student/${id}`,
        {
          /* data */
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  delete: async (StudentId: string | number): Promise<void> => {
    try {
      await axiosInstance.delete(
        `/api/v1/student/${StudentId}`
      );
    } catch (error) {
      handleAxiosError(error);
    }
  },

};

export default StudentServiceApi;