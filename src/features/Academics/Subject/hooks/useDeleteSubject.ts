import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import SubjectServiceApi from "../services/SubjectServiceApi";

const useDeleteSubject = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, number>({
        mutationFn: (subjectId) => SubjectServiceApi.delete(subjectId, associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['subjects', associationId],
            });

            dispatch(
                showToast({
                    title: "Success",
                    message: "Subject deleted successfully.",
                    type: "success",
                })
            );
        },

        onError: (err) => {
            const error = err.message as string;
            dispatch(
                showToast({
                    title: 'Error',
                    message: error,
                    type: 'error',
                })
            );
        },
    });
};

export default useDeleteSubject;
