import { axiosInstance } from "@services/api-services/axiosInstance";

const AssociationServiceApi = {
    getAll: async (): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>('/api/v1/associations');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Nouvelle méthode pour créer une association
    createAssociation: async (associationData: {
        associationIdentifier: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        currency: string;
        currencySymbol: string;
    }): Promise<any> => {
        try {
            const response = await axiosInstance.post<any>('/api/v1/associations', associationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default AssociationServiceApi;