import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import { showToast } from "@store/toastSlice";
import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import useCreateSubjectLevel from "../../hooks/useCreateSubjectLevel";

const SubjectLevelSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const dispatch = useDispatch();

  const { mutateAsync: createSubjectLevel, isPending } = useCreateSubjectLevel({
    onSuccess: () => {
      dispatch(
        showToast({
          title: "Succès",
          message: "L'association niveau-matières a été créée.",
          type: "success",
        })
      );
    },
    onError: (message) => {
      dispatch(
        showToast({
          title: "Erreur",
          message,
          type: "error",
        })
      );
    },
  });

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        // The form values should contain levelId and subjectIds
        // Add associationId to complete the CreateSubjectLevelDto
        const payload = {
          levelId: values.levelId,
          subjectIds: values.subjectIds,
          associationId
        };
        await createSubjectLevel(payload);
        handleCloseSidebar();
      } catch (error) {
        console.error("Error creating subject level:", error);
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