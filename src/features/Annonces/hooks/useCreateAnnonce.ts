import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import AnnonceServiceApi from "../services/AnnonceServiceApi";

const useCreateAnnonce = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: any) => AnnonceServiceApi.create(data),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["annonces", associationId] });
      dispatch(showToast({
        title: "Success",
        message: "Annonce created successfully.",
        type: "success",
      }));
    },
    
    onError: (error: any) => {
      dispatch(showToast({
        title: "Error",
        message: error?.message || "Failed to create annonce.",
        type: "error",
      }));
    },
  });
};

export default useCreateAnnonce;