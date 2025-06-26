import { Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import RightSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useCreateStudent from "../../hooks/useCreateStudent";

const StudentSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { mutateAsync: createStudent, isPending } = useCreateStudent(associationId);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const formRef = useRef<FormContentRef>(null);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        await createStudent(values);
        formRef.current?.resetForm();
        handleCloseSidebar();
      } catch (error) {}
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
        {t("Add Student")}
      </Button>

      <RightSidebar
        isOpen={sidebarOpen}
        title={t("Add Student")}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
            isLoading={isPending}
          />
        }
      >
        <FormContent ref={formRef} />
      </RightSidebar>
    </>
  );
};

export default StudentSidebar;