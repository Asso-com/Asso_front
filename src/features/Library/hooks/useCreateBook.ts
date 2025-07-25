import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import BookServiceApi from "../service/BookServiceApi";
import type { BookRequest } from "../types";
import { useTranslation } from "react-i18next";

export const useCreateBook = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data: BookRequest) => BookServiceApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books", associationId] });

      dispatch(
        showToast({
          title: t("Success"),
          message: t("The book has been created successfully."),
          type: "success",
        })
      );
    },

    onError: (err: any) => {
      const message =
        err?.response?.data?.message || err?.message || t("An error occurred.");
      dispatch(
        showToast({
          title: t("Error"),
          message,
          type: "error",
        })
      );
    },
  });
};
