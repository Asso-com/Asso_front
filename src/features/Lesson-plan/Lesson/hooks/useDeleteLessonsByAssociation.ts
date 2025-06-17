import { useMutation, useQueryClient } from "@tanstack/react-query";
import LessonServiceApi from "../services/LessonServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

const useDeleteLessonsByAssociation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (associationId: number) => LessonServiceApi.deleteLessonsByAssociation(associationId),

    onSuccess: (_data, associationId) => {
      queryClient.invalidateQueries({ queryKey: ['lessons', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "All lessons deleted for this association.",
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

export default useDeleteLessonsByAssociation;
