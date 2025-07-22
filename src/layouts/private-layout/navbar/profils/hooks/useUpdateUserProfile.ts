import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";
import UserServiceApi from "../services/userServiceApi";

interface UpdateUserProfilePayload {
  formData: FormData;
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation<any, Error, UpdateUserProfilePayload>({
    mutationFn: ({ formData }) => {
      return UserServiceApi.updateCurrentUserProfile(formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });

      dispatch(
        showToast({
          title: t("Success"),
          message: t("Your profile has been updated successfully."),
          type: "success",
        })
      );
    },

    onError: (err) => {
      console.error("Update profile error:", err);
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
