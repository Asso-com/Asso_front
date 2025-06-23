import { useMutation, useQueryClient } from "@tanstack/react-query";
import TopicServiceApi from "../services/TopicServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import type { TopicUpdateDto } from "../types/topic.types";

const useReorderAndUpdateTopics = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: TopicUpdateDto[]) =>
      TopicServiceApi.reorderAndUpdateTopics(associationId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "Topics reordered and updated successfully.",
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

export default useReorderAndUpdateTopics;
