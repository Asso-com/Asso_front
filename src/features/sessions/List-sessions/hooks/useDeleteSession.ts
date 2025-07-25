import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import SessionServiceApi from "../services/sessionServiceApi";

const useDeleteSession = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, number>({
    mutationFn: (sessionId) => SessionServiceApi.delete(sessionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sessions', associationId],
      });

      dispatch(
        showToast({
          title: "Success",
          message: "Session deleted successfully.",
          type: "success",
        })
      );
    },

    onError: (err) => {
      const error = err.message || "An error occurred while deleting the session.";
      dispatch(
        showToast({
          title: "Error",
          message: error,
          type: "error",
        })
      );
    },
  });
};

export default useDeleteSession;
