import { useMutation, useQueryClient } from "@tanstack/react-query";
import TopicServiceApi from "../services/TopicServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

const useDeleteTopicsByAssociation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (associationId: number) =>
      TopicServiceApi.deleteTopicsByAssociation(associationId),

    onSuccess: (_data, associationId) => {
      queryClient.invalidateQueries({ queryKey: ['topics', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "All topics deleted for this association.",
          type: "success",
        })
      );
    },

    onError: (err: Error) => {
      dispatch(
        showToast({
          title: "Error",
          message: err.message,
          type: "error",
        })
      );
    },
  });
};

export default useDeleteTopicsByAssociation;
