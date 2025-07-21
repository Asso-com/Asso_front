import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import type { EventResponse } from "../types/event.types";
import eventServiceApi from "../service/eventServiceApi";
import { useTranslation } from "react-i18next";

interface UpdateEventPayload {
  id: number;
  formData: FormData;
}

export function useUpdateEvent(associationId: number) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation<EventResponse, Error, UpdateEventPayload>({
    mutationFn: ({ id, formData }) => {
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      return eventServiceApi.update(id, formData);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events", associationId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", data.id] });
      
      dispatch(
        showToast({
          title: t("Success"),
          message: t("The event has been updated successfully."),
          type: "success",
        })
      );
    },

    onError: (err) => {
      console.error('Update event error:', err);
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