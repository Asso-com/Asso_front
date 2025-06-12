import React, { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import type { RootState } from "@store/index";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import FormContent from "./FormContent";
import CoefficientServiceApi from "../../services/CoefficientServiceApi";
import type { CoefficientType } from "../../types";

interface CoefficientSidebarProps {
  onOpen?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<CoefficientType>;
}

const CoefficientSidebar: React.FC<CoefficientSidebarProps> = ({ 
  onOpen: externalOnOpen, 
  isOpen: externalIsOpen, 
  onClose: externalOnClose, 
  initialData 
}) => {
  const { t } = useTranslation();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const toast = useToast();
  const queryClient = useQueryClient();
  const formRef = useRef<FormContentRef>(null);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const onOpen = () => {
    if (isControlled) {
      externalOnOpen?.();
    } else {
      setInternalIsOpen(true);
    }
  };

  const onClose = () => {
    if (isControlled) {
      externalOnClose?.();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Mutation for saving or updating coefficient settings
  const { mutateAsync: saveMutation, isPending } = useMutation({
    mutationFn: async (data: any) => {
      if (initialData?.id) {
        return CoefficientServiceApi.update(initialData.id, data);
      } else {
        return CoefficientServiceApi.create(data);
      }
    },
    onSuccess: () => {
      // Invalidate queries to refetch the data
      queryClient.invalidateQueries({ queryKey: ['coefficients', associationId] });
      
      // Show success message
      toast({
        title: initialData?.id ? t("Updated") : t("Created"),
        description: initialData?.id 
          ? t("Coefficient settings updated successfully") 
          : t("Coefficient settings created successfully"),
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      
      // Close the sidebar
      onClose();
    },
    onError: (error: any) => {
      // Show error message
      toast({
        title: t("Error"),
        description: error.message || t("An unexpected error occurred"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  // Handle form submission
  const handleSubmitForm = async () => {
    if (!formRef.current) return;
    
    try {
      const values = await formRef.current.submitForm();
      if (values) {
        await saveMutation(values);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* Button to open sidebar when not in edit mode */}
      {!initialData && (
        <Button
          size="md"
          fontSize="sm"
          variant="outline"
          colorScheme="primary"
          onClick={onOpen}
        >
          {t("Add Coefficient")}
        </Button>
      )}

      {/* Sidebar component */}
      <RigthSidebar
        isOpen={isOpen}
        title={initialData ? t("Edit Coefficient") : t("Add Coefficient")}
        onClose={onClose}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={onClose}
            isLoading={isPending}
          />
        }
      >
        <FormContent ref={formRef} initialData={initialData} />
      </RigthSidebar>
    </>
  );
};

export default CoefficientSidebar;