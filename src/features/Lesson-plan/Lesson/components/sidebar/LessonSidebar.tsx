import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import useCreateLessons from "../../hooks/useCreateLessons";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

const LessonSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  // Remove the onSuccess and onError callbacks - they're handled in the hook
  const { mutateAsync: createLesson, isPending } = useCreateLessons(associationId);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        const payload = {
          levelSubjectId: values.levelSubjectId,
          lessonNames: values.lessonNames,
        };
        await createLesson(payload);
        // Close sidebar only on success
        handleCloseSidebar();
      } catch (error) {
        // Error is already handled by the hook
        console.error("Error creating lesson:", error);
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
        {t("Créer une leçon")}
      </Button>
      <RigthSidebar
        isOpen={sidebarOpen}
        title={t("Créer une leçon")}
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

export default LessonSidebar;