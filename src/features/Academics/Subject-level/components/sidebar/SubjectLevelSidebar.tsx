import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useCreateSubjectLevel from "../../hooks/useCreateSubjectLevel";
import { FiPlus } from "react-icons/fi";

const SubjectLevelSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  // Remove the onSuccess and onError callbacks - they're handled in the hook
  const { mutateAsync: createSubjectLevel, isPending } = useCreateSubjectLevel(associationId);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        const payload = {
          levelId: values.levelId,
          subjectIds: values.subjectIds,
          associationId
        };
        await createSubjectLevel(payload);
        // Close sidebar only on success
        handleCloseSidebar();
      } catch (error) {
        // Error is already handled by the hook
        console.error("Error creating subject level:", error);
      }
    }
  };

  return (
    <>
      <Button
        px={8}
        py={3}
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        onClick={handleOpenSidebar}
        leftIcon={<FiPlus />}
      >
        {t("Add Subject Level")}
      </Button>
      <RigthSidebar
        isOpen={sidebarOpen}
        title={t("Add Subject Level")}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
            isLoading={isPending}
          />
        }
      >
        <FormContent ref={formRef} associationId={associationId} />
      </RigthSidebar>
    </>
  );
};

export default SubjectLevelSidebar;