import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import type { EventResponse } from "../types/event.types";
import eventServiceApi from "../service/eventServiceApi";

interface UpdateEventPayload {
  id: number;
  formData: FormData;
}

export function useUpdateEvent(associationId: number) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation<EventResponse, Error, UpdateEventPayload>({
    mutationFn: ({ id, formData } ) => {
      return eventServiceApi.update(id, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", associationId] });
      
      dispatch(
        showToast({
          title: "Success",
          message: "The event has been updated successfully.",
          type: "success",
        })
      );
    },

    onError: (err) => {
      dispatch(
        showToast({
          title: "Error",
          message: err.message,
          type: "error",
        })
      );
    },
  });
}