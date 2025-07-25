import { Button } from "@chakra-ui/react";
import RightSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import { createEventFormData } from "../../types/event.types";
import useCreateEvent from "../../hooks/useCreateEvent";

import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { FiPlus } from "react-icons/fi";

const EventSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);
  const { mutateAsync: createEvent } = useCreateEvent(associationId);

  const handleSubmitForm = async () => {
    try {
      const values = await formRef.current?.submitForm();
      if (values) {
        if (values.startDate && values.endDate) {
          const startDate = new Date(values.startDate);
          const endDate = new Date(values.endDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (endDate < today) {
            throw new Error(t("End date must be today or in the future"));
          }

          if (startDate > endDate) {
            throw new Error(t("Start date must be before end date"));
          }
        }

        const formData = createEventFormData(values);
        formData.append("associationId", associationId.toString());
        await createEvent(formData);

        formRef.current?.resetForm();
      }
    } catch (error: any) {
      console.error("Error creating event:", error);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    handleCloseSidebar();
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
        {t("Add Event")}
      </Button>

      <RightSidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        title={t("Create New Event")}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCancel}
          />
        }
      >
        <FormContent ref={formRef} />
      </RightSidebar>
    </>
  );
};

export default EventSidebar;
