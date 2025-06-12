import { useQuery } from '@tanstack/react-query';
import CoefficientServiceApi from '../services/CoefficientServiceApi';
import type { CoefficientType } from '../types';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';

const useFetchCoefficients = (associationId: number) => {
  return useQuery<CoefficientType[], Error>({
    queryKey: ['coefficients', associationId],
    queryFn: async () => {
      if (!associationId) return [];
      
      switchLoadingModal(true);
      try {
        const data = await CoefficientServiceApi.getAll(associationId);
        console.log("Fetched coefficients:", data);
        
        return data.map(item => ({
          id: item.id,
          assiduity_coefficient: item.assiduityCoefficient,
          participation_coefficient: item.participationCoefficient,
          quiz_coefficient: item.quizCoefficient,
          delay_before_attendance: item.delayBeforeAttendance,
          created_at: item.createdAt,
          updated_at: item.updatedAt,
          association_id: associationId
        }));
      } catch (error) {
        console.error("Error in useFetchCoefficients:", error);
        throw error;
      } finally {
        switchLoadingModal(false);
      }
    },
    enabled: !!associationId,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });
};

export default useFetchCoefficients;