import { useMutation, useQueryClient } from "@tanstack/react-query";
import TopicServiceApi from "../services/TopicServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

const useDeleteTopicById = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (topicId: number) => TopicServiceApi.deleteTopicById(topicId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });

      dispatch(
        showToast({
          title: "Success",
          message: "Topic deleted successfully.",
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

export default useDeleteTopicById;
