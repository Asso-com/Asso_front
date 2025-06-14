import React from "react";
import { Box } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import type { ICellRendererParams } from "ag-grid-community";
import  useActivateCoefficient  from "../../hooks/useActivateCoefficient";
import { showToast } from "@store/toastSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ToggleStatus: React.FC<ICellRendererParams> = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const { mutateAsync: activateCoefficient } = useActivateCoefficient(associationId);
  const isActive = data?.active || false;

  const handleToggle = async () => {
    if (isActive) {
      dispatch(
        showToast({
          title: t("Information"),
          message: t("You cannot deactivate an active coefficient"),
          type: "info",
        })
      );
      return;
    }
    try {
      await activateCoefficient(data?.id);
      dispatch(
        showToast({
          title: t("Success"),
          message: t("Coefficient activated successfully"),
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        showToast({
          title: t("Error"),
          message: t("Failed to activate coefficient"),
          type: "error",
        })
      );
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Switch
        isChecked={isActive}
        onChange={handleToggle}
        size="md"
        colorScheme="green"
      />
    </Box>
  );
};

export default ToggleStatus;