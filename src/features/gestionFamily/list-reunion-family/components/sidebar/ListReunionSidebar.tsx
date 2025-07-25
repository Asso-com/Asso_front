import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import { useCreateReunion } from "../../hooks/useCreateReunion";
import type { FormContentRef } from "@features/system-settings/school-year-settings/components/sidebar/FormContent";
import { FiPlus } from "react-icons/fi";

const ListReunionSidebar = () => {
  const { t } = useTranslation();
  const { mutateAsync: createReunion, isPending } = useCreateReunion();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        await createReunion(values);
        handleCloseSidebar();
      } catch (error) {
        console.error("Create Reunion error:", error);
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
        {t(" Add Meetings")}
      </Button>

      <RigthSidebar
        isOpen={sidebarOpen}
        title={t("Add Meetings")}
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
      </RigthSidebar>
    </>
  );
};

export default ListReunionSidebar;
