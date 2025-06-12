import { Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useCreateClassRoom from "../../hooks/useCreateClassRoom";
import RightSidebar from "@components/shared/RigthSidebar";

const ClassRoomSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: createClassRoom, isPending: isSubmitting } =
    useCreateClassRoom(associationId);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const formRef = useRef<FormContentRef>(null);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleSubmitForm = async () => {
    const formValues = await formRef.current?.submitForm();

    if (formValues && associationId) {
      try {
        const apiPayload = {
          associationId: Number(associationId),
          name: String(formValues.name),
          capacity: Number(formValues.capacity),
          description: formValues.description
            ? String(formValues.description)
            : "",
          active: Boolean(formValues.active),
        };

        await createClassRoom(apiPayload);
        formRef.current?.resetForm?.();
        handleCloseSidebar();
      } catch (error: unknown) {
        console.error(
          "Error creating classroom:",
          error instanceof Error ? error.message : error
        );
      }
    }
  };

  return (
    <>
      <Button
        size="md"
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        onClick={handleOpenSidebar}
        leftIcon={<FiPlus />}
      >
        {t("Add Class Room")}
      </Button>

      <RightSidebar
        isOpen={sidebarOpen}
        title={t("Add Class Room")}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
            isLoading={isSubmitting}
          />
        }
      >
        <FormContent ref={formRef} />
      </RightSidebar>
    </>
  );
};

export default ClassRoomSidebar;
