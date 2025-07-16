import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import eventServiceApi from "../service/eventServiceApi";
import { useTranslation } from "react-i18next";

const useCreateEvent = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (formData: FormData) => eventServiceApi.create(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["events", associationId],
      });
            queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      dispatch(
        showToast({
          title: t("Success"),
          message: t("The event has been created successfully."),
          type: "success",
        })
      );
      
      return data;
    },
    
    onError: (error: any) => {
      let errorMessage = t("An error occurred while creating the event.");
            if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      dispatch(
        showToast({
          title: t("Error"),
          message: errorMessage,
          type: "error",
        })
      );
    },
  });
};

export default useCreateEvent;