import { useMutation, useQueryClient } from "@tanstack/react-query";
import TopicServiceApi from "../services/TopicServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import type { TopicRequestDto } from "../types/topic.types";

const useUpdateTopics = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: TopicRequestDto) =>
      TopicServiceApi.updateTopics(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "Topics updated successfully.",
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

export default useUpdateTopics;