import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TopicFormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import useCreateTopics from "../../hooks/useCreateTopics";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

const TopicSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  
  const { mutateAsync: createTopic, isPending } = useCreateTopics(associationId);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        const payload = {
          lessonId: values.lessonId,
          topicDescriptions: values.topicDescriptions,
        };
        await createTopic(payload);
        handleCloseSidebar();
      } catch (error) {
        console.error("Error creating topic:", error);
      }
    }
  };

  return (
    <>
      <Button
        px={6}
        py={3}
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        onClick={handleOpenSidebar}
      >
        {t("Add Topic")}
      </Button>
      <RigthSidebar
        isOpen={sidebarOpen}
        title={t("Add Topic")}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
            isLoading={isPending}
          />
        }
      >
        <TopicFormContent ref={formRef} />
      </RigthSidebar>
    </>
  );
};

export default TopicSidebar;