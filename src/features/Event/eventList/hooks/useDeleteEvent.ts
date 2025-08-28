import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import eventServiceApi from "../service/eventServiceApi";
import { useTranslation } from "react-i18next";

export function useDeleteEvent(associationId: number) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation<void, Error, number>({
    mutationFn: (id) => eventServiceApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", associationId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      dispatch(
        showToast({
          title: t("Success"),
          message: t("The event has been deleted successfully."),
          type: "success",
        })
      );
    },

    onError: (err) => {
      dispatch(
        showToast({
          title: t("Error"),
          message: err.message,
          type: "error",
        })
      );
    },
  });
}
