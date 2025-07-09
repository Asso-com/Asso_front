
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import type { StudentEnrollmentRequest } from "../types";

const StudentEnrollmentService = {

  getUnenrolledStudents: async (associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/associations/${associationId}/student-enrollments-other`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  createEnrollment: async (associationId: number, data: StudentEnrollmentRequest): Promise<any> => {
    try {
      const response = await axiosInstance.post<any>(
        `/api/v1/associations/${associationId}/student-enrollments-other`,
        data
      ); 
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  getAvailableStudentsForEnrollment: async (associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/associations/${associationId}/student-enrollments-other/available-students`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default StudentEnrollmentService;