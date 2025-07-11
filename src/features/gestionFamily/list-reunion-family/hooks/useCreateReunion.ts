import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import ReunionServiceApi from "../services/ReunionServiceApi";

export const useCreateReunion = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (formData: any) => ReunionServiceApi.create(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reunions"] });

      dispatch(
        showToast({
          title: "Succès",
          message: "Réunion ajoutée avec succès.",
          type: "success",
        })
      );
    },

    onError: (err) => {
      const error = err.message as string;
      dispatch(
        showToast({
          title: "Erreur",
          message: error,
          type: "error",
        })
      );
    },
  });
};
