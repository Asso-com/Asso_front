import { useMutation, useQueryClient } from "@tanstack/react-query";
import TopicServiceApi from "../services/TopicServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

const useDeleteTopicsByIds = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (topicIds: number[]) =>
      TopicServiceApi.deleteTopicsByIds(topicIds),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });

      dispatch(
        showToast({
          title: "Success",
          message: "Selected topics deleted successfully.",
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

export default useDeleteTopicsByIds;
