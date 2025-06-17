import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import CoefficientServiceApi from "../services/CoefficientServiceApi";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";
import { useTranslation } from "react-i18next";

const useFetchCoefficients = (associationId: number): UseQueryResult<any[], Error> => {
  const { t } = useTranslation();
  return useQuery<any[], Error>({
    queryKey: ["coefficients", associationId],
    queryFn: async () => {
      if (!associationId) return [];
      switchLoadingModal();
      try {
        const data = await CoefficientServiceApi.getAll(associationId);
        return data.map((item) => ({
          id: item.id,
          assiduity_coefficient: item.assiduityCoefficient,
          participation_coefficient: item.participationCoefficient,
          quiz_coefficient: item.quizCoefficient,
          delay_before_attendance: item.delayBeforeAttendance,
          updated_at: item.updatedAt,
          association_id: associationId,
        }));
      } catch (error) {
        console.error(t("Error fetching coefficients:"), error);
        throw error;
      } finally {
        switchLoadingModal();
      }
    },
    enabled: !!associationId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useFetchCoefficients;