import axios from 'axios';

const StudentLocationApi = {
  getStudentsByAssociation: async (associationId: number): Promise<any[]> => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/students/association/${associationId}/listing`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
};

export default StudentLocationApi;