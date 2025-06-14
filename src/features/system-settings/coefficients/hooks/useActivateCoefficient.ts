import { useMutation, useQueryClient } from "@tanstack/react-query";
import CoefficientServiceApi from "../services/CoefficientServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";

const useActivateCoefficient = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (coefficientId: number) =>
      CoefficientServiceApi.update(coefficientId, { active: true, associationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coefficients", associationId] });
      dispatch(
        showToast({
          title: t("Success"),
          message: t("Coefficient activated successfully"),
          type: "success",
        })
      );
    },
    onError: (error: any) => {
      console.error("Activation error:", error);
      dispatch(
        showToast({
          title: t("Error"),
          message: t("Failed to activate coefficient"),
          type: "error",
        })
      );
    },
  });
};

export default useActivateCoefficient;