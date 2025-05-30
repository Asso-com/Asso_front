import React from "react";
import { useTranslation } from "react-i18next";
import { Button, type ButtonProps, Flex } from "@chakra-ui/react";

// Define props for the custom button
interface CustomButtonProps extends ButtonProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
}

// Reusable CustomButton component
const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  isLoading = false,
  disabled = false,
  colorScheme = "secondary",
  type = "button",
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Button
      type={type}
      colorScheme={colorScheme}
      isLoading={isLoading}
      isDisabled={disabled || isLoading}
      size="md"
      onClick={onClick}
      cursor="pointer"
      flexGrow={1}
      p={2}
      {...props}
    >
      {isLoading ? t("Loading...") : t(label)}
    </Button>
  );
};

// Define props for the sidebar action buttons
interface SidebarButtonsActionsProps {
  onSubmitForm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

// SidebarButtonsActions component
const SidebarButtonsActions: React.FC<SidebarButtonsActionsProps> = ({
  onSubmitForm,
  onClose,
  isLoading = false,
}) => {
  return (
    <Flex gap={2} width="100%" justifyContent="space-between">
      <CustomButton
        label="Cancel"
        onClick={onClose}
        variant="outline"
        borderColor="gray.400"
        _hover={{ borderColor: "gray.600", bg: "gray.50" }}
        borderRadius="md"
      />
      <CustomButton
        label="Submit"
        onClick={onSubmitForm}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export default SidebarButtonsActions;
