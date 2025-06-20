import { Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useCreateStudent from "../../hooks/useCreateStudent";
import RightSidebar from "@components/shared/RigthSidebar";

const StudentSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: createStudent, isPending: isSubmitting } =
    useCreateStudent(associationId);

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
        /* data */
        };

        await createStudent(apiPayload);
        formRef.current?.resetForm?.();
        handleCloseSidebar();
      } catch (error: unknown) {
        console.error(
          "Error creating Student:",
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
        {t("Add student")}
      </Button>

      <RightSidebar
        isOpen={sidebarOpen}
        title={t("Add student")}
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

export default StudentSidebar;
