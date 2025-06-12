import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useCreateClassRoom from "../../hooks/useCreateClassRoom";

const ClassRoomSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { mutateAsync: createClassRoom } = useCreateClassRoom();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  /**const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values && associationId) {
      
      try {
        await createClassRoom({ 
          associationId, 
          data: values 
        });
        handleCloseSidebar();
      } catch (error) { 
      }
    }
  };**/

 const handleSubmitForm = async () => {
  const formValues = await formRef.current?.submitForm();
  if (formValues && associationId) {
    try {
      // Construire l'objet exact comme l'API l'attend
      const apiPayload = {
        associationId: Number(associationId),
        name: String(formValues.name),
        capacity: Number(formValues.capacity),
        description: formValues.description ? String(formValues.description) : "",
        active: Boolean(formValues.active)
      };

      await createClassRoom(apiPayload);
      handleCloseSidebar();
    } catch (error) {
      console.error("Error creating classroom:", error);
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
        {t("Add Class Room")}
      </Button>

      <RigthSidebar
        isOpen={sidebarOpen}
        title={"Add Class Room"}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
          />
        }
      >
        <FormContent ref={formRef} />
      </RigthSidebar>
    </>
  );
};

export default ClassRoomSidebar;