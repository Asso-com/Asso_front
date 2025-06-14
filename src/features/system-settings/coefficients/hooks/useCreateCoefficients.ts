import { useMutation, useQueryClient } from "@tanstack/react-query";
import CoefficientServiceApi from "../services/CoefficientServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";

const useCreateCoefficients = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (values: any) =>
      CoefficientServiceApi.create({ ...values, associationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coefficients", associationId] });
      dispatch(
        showToast({
          title: t("Success"),
          message: t("Coefficient added successfully"),
          type: "success",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        showToast({
          title: t("Error"),
          message: error.message || t("Failed to add coefficient"),
          type: "error",
        })
      );
    },
  });
};

export default useCreateCoefficients;