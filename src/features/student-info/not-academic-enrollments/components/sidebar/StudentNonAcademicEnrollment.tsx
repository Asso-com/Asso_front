import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import useEnrollementNoAcademic from "../../hooks/useEnrollementNoAcademic";
import type { StudentEnrollmentRequest } from "../../types";

const StudentNonAcademicEnrollment = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { mutateAsync: createEnrollment } =
    useEnrollementNoAcademic(associationId);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        const payload: StudentEnrollmentRequest = {
          studentId: values.studentId,
          levelSubjectIds: values.levelSubjectIds,
        };
        createEnrollment(payload);
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
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        onClick={handleOpenSidebar}
        size="md"
        leftIcon={<FiPlus />}
      >
        {t("Enroll Student")}
      </Button>
      <RigthSidebar
        isOpen={sidebarOpen}
        title={t("Add Enrollement")}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
            // isLoading={isPending}
          />
        }
      >
        <FormContent ref={formRef} />
      </RigthSidebar>
    </>
  );
};

export default StudentNonAcademicEnrollment;
