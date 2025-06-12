import type { AxiosError } from "axios";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";


const ClassRoomServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/class-rooms/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

 

toggleStatus: async (classRoomId: number): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/class-rooms/${classRoomId}/toggle-status`
    );
    return {
      success: true,
      ...response.data
    };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      errors?: Record<string, string>;
    }>;
    
    if (axiosError.response) {
      const serverMessage = axiosError.response.data?.message || 
                             (typeof axiosError.response.data === 'string' ? axiosError.response.data : undefined);
      
      throw new Error(
        serverMessage || 
        `Failed to toggle class room status (HTTP ${axiosError.response.status})`
      );
    }
    
    throw new Error('Network error while toggling class room status');
  }
},

   create: async (associationId: number, data: any): Promise<any> => {
        try {
            const payload = {
                ...data,
                associationId
            };
            
            const response = await axiosInstance.post<unknown>(
                `/api/v1/class-rooms`,
                payload
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                const backendData = error.response.data as any;
                if (backendData.errors && typeof backendData.errors === 'object') {
                    const validationErrors = backendData.errors as Record<string, string>;
                    const message = Object.values(validationErrors).join(', ');
                    throw new Error(message);
                }
                if (typeof backendData === 'object') {
                    const message = Object.values(backendData).join(', ');
                    throw new Error(message);
                }
                throw new Error('Validation failed');
            }
            throw err;  
        }
    },

    update: async (id: number, data: {
        name: string;
        capacity: number;
        description: string;
    }): Promise<any> => {
        try {
            const response = await axiosInstance.put(
                `/api/v1/class-rooms/${id}`,
                {
                    name: data.name,
                    capacity: data.capacity,
                    description: data.description
                }
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                const backendData = error.response.data as any;
                if (backendData.errors && typeof backendData.errors === 'object') {
                    const validationErrors = backendData.errors as Record<string, string>;
                    const message = Object.values(validationErrors).join(', ');
                    throw new Error(message);
                }
                if (typeof backendData === 'object') {
                    const message = Object.values(backendData).join(', ');
                    throw new Error(message);
                }
                throw new Error('Validation failed');
            }
            throw err;
        }
    },
    delete: async (classroomId: string | number): Promise<void> => {
   

    try {
        await axiosInstance.delete(
            `/api/v1/class-rooms/${classroomId}`
        );
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
      throw new Error('Invalid ID format sent to server');
    }
        throw error;
    }
},

};

export default ClassRoomServiceApi;