import { useMutation, useQueryClient } from "@tanstack/react-query";
import CoefficientServiceApi from "../services/CoefficientServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

const useDeleteCoefficient = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);

  return useMutation({
    mutationFn: async (coefficientId: number) => {
      await CoefficientServiceApi.delete(coefficientId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coefficients", associationId] });
      dispatch(
        showToast({
          title: t("Deleted"),
          message: t("Coefficient deleted successfully"),
          type: "success",
        })
      );
    },
    onError: (error: any) => {
      console.error("Delete error:", error);
      dispatch(
        showToast({
          title: t("Error"),
          message: error.message || t("Failed to delete coefficient"),
          type: "error",
        })
      );
    },
  });
};

export default useDeleteCoefficient;