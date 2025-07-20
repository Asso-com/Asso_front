import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import AnnonceServiceApi from "../services/AnnonceServiceApi";

interface UpdatePayload {
  annonceId: number;
  data: any;
}

const useUpdateAnnonce = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: ({ annonceId, data }: UpdatePayload) => AnnonceServiceApi.update(annonceId, data),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["annonces", associationId] });
      dispatch(showToast({
        title: "Success",
        message: "Annonce updated successfully",
        type: "success",
      }));
    },
    
    onError: (error: any) => {
      dispatch(showToast({
        title: "Error",
        message: error.message || "Failed to update annonce",
        type: "error",
      }));
    },
  });
};

export default useUpdateAnnonce;