import { axiosInstance } from "@services/api-services/axiosInstance";


const AcademicPeriodWeekServiceApi= {
    
    getActiveWeeksByAssociationId: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/AcademicPeriodWeeks/association/${associationId}/period/active`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default AcademicPeriodWeekServiceApi