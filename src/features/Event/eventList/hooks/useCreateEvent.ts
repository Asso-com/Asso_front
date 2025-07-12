import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import sessionServiceApi from "../../../sessions/List-sessions/services/sessionServiceApi";
import type { EventRequest } from "../types/event.types";

const useCreateEvent = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, EventRequest>({
    mutationFn: (eventPayload) => sessionServiceApi.create(eventPayload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", associationId],
      });

      dispatch(
        showToast({
          title: "Succès",
          message: "L'événement a été créé avec succès.",
          type: "success",
        })
      );
    },

    onError: (error) => {
      dispatch(
        showToast({
          title: "Erreur",
          message:
            error.message ||
            "Une erreur est survenue lors de la création de l'événement.",
          type: "error",
        })
      );
    },
  });
};

export default useCreateEvent;
