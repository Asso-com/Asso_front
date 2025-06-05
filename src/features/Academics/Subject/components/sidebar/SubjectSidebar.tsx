import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";

import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useCreateSubject from "../../hooks/useCreateSubject";

const SubjectSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: createSubject, isPending } =
    useCreateSubject(associationId);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();

    if (values) {
      try {
        await createSubject({
          departmentId: values.departmentId,
          name: values.name,
        });
        handleCloseSidebar();
      } catch (error) {
        console.error("Failed to create subject:", error);
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
      >
        {t("Create Subject")}
      </Button>

      <RigthSidebar
        isOpen={sidebarOpen}
        title={"Create Subject"}
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

export default SubjectSidebar;
