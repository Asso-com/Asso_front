import { Box, Button, Spinner, type ButtonProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import type { ReactElement } from "react";

interface FooterActionsProps {
  onClose: () => void;
  handleSave: () => void;
  isSaving: boolean;
  cancelText?: string;
  saveText?: string;
  isDisabled?: boolean;
  cancelButtonProps?: Omit<ButtonProps, "onClick" | "isDisabled">;
  saveButtonProps?: Omit<
    ButtonProps,
    "onClick" | "isDisabled" | "rightIcon" | "type"
  >;
}

function FooterActions({
  onClose,
  handleSave,
  isSaving,
  cancelText = "Cancel",
  saveText = "",
  isDisabled = false,
  cancelButtonProps = {},
  saveButtonProps = {},
}: FooterActionsProps) {
  const { t } = useTranslation();

  const rightIcon: ReactElement | undefined = isSaving ? (
    <Spinner size="sm" color="white" />
  ) : undefined;

  return (
    <Box display="flex" gap={2} alignItems="center" justifyContent="flex-end">
      <Button
        colorScheme="gray"
        onClick={onClose}
        isDisabled={isSaving}
        size="sm"
        {...cancelButtonProps}
      >
        {t(cancelText)}
      </Button>
      <Button
        colorScheme="secondary"
        onClick={handleSave}
        isDisabled={isSaving || isDisabled}
        rightIcon={rightIcon}
        size="sm"
        type="submit"
        {...saveButtonProps}
      >
        {isSaving ? t("Saving...") : t(saveText)}
      </Button>
    </Box>
  );
}

export default FooterActions;
