import { Box, Button, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import type { ReactElement } from "react";

interface FooterActionsProps {
  onClose: () => void;
  handleSave: () => void;
  isSaving: boolean;
  cancelText?: string;
  saveText?: string;
  isDisabled?: boolean;
}

function FooterActions({
  onClose,
  handleSave,
  isSaving,
  cancelText = "Cancel",
  saveText = "",
  isDisabled = false,
}: FooterActionsProps) {
  const { t } = useTranslation();

  const rightIcon: ReactElement | undefined = isSaving ? (
    <Spinner size="sm" color="white" />
  ) : undefined;

  return (
    <Box display="flex" gap={2} alignItems="center" justifyContent="flex-end">
      <Button
        colorScheme={"secondary"}
        onClick={handleSave}
        isDisabled={isSaving || isDisabled}
        rightIcon={rightIcon}
        size={"md"}
        type="submit"
      >
        {isSaving ? t("Saving...") : t(saveText)}
      </Button>
      <Button
        colorScheme="gray"
        onClick={onClose}
        isDisabled={isSaving}
        size={"md"}
      >
        {t(cancelText)}
      </Button>
    </Box>
  );
}

export default FooterActions;
