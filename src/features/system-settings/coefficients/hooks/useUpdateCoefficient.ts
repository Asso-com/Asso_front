import { useMutation, useQueryClient } from "@tanstack/react-query";
import CoefficientServiceApi from "../services/CoefficientServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

const useUpdateCoefficient = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);

  return useMutation({
    mutationFn: async ({ id, values }: { id: number; values: any }) => {
      const apiData = {
        assiduityCoefficient: Number(values.assiduity_coefficient),
        delayBeforeAttendance: Number(values.delay_before_attendance),
        participationCoefficient: Number(values.participation_coefficient),
        quizCoefficient: Number(values.quiz_coefficient),
        associationId,
      };
      return CoefficientServiceApi.update(id, apiData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coefficients", associationId] });
      dispatch(
        showToast({
          title: t("Updated"),
          message: t("Coefficient updated successfully"),
          type: "success",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        showToast({
          title: t("Error"),
          message: error.message || t("Failed to update coefficient"),
          type: "error",
        })
      );
    },
  });
};

export default useUpdateCoefficient;