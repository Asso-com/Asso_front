import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";
import UserServiceApi from "../services/userServiceApi";

interface UpdateAssociationProfilePayload {
  id: number;
  formData: FormData;
}

export function useUpdateAssociationProfile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation<void, Error, UpdateAssociationProfilePayload>({
    mutationFn: ({ id, formData }) => {
      return UserServiceApi.updateAssociationProfile(id, formData);
    },

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["association-profile", id] });

      dispatch(
        showToast({
          title: t("Success"),
          message: t("Association profile updated successfully."),
          type: "success",
        })
      );
    },

    onError: (err) => {
      console.error("Association update error:", err);
      dispatch(
        showToast({
          title: t("Error"),
          message: err.message,
          type: "error",
        })
      );
    },
  });
}
