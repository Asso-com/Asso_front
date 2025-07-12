import { useMutation, useQueryClient } from "@tanstack/react-query";
import FamilyServiceApi from "../services/FamilyServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

const useEditFamily = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      FamilyServiceApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
      dispatch(
        showToast({
          title: "Success",
          message: "Family updated successfully.",
          type: "success",
        })
      );
    },

    onError: (err: any) => {
      dispatch(
        showToast({
          title: "Error",
          message: err.message ?? "Something went wrong",
          type: "error",
        })
      );
    },
  });
};

export default useEditFamily;
