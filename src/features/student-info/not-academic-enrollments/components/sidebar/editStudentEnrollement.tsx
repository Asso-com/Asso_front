import { useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";

import RightSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";

import FormContent, { type FormContentRef } from "./FormContent";
import useUpdateStudentEnrollment from "../../hooks/useUpdateStudentEnrollment";
import useFetchEnrollmentsByStudent from "../../hooks/useFetchEnrollementById";

import type { RootState } from "@store/index";
import type {
  StudentEnrollmentDetails,
  StudentEnrollmentRequest,
} from "../../types";

interface EditStudentEnrollmentProps {
  studentDetails: StudentEnrollmentDetails;
  isOpen: boolean;
  onClose: () => void;
}

const EditStudentEnrollment: React.FC<EditStudentEnrollmentProps> = ({
  studentDetails,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const formRef = useRef<FormContentRef>(null);
  const {
    data: enrollmentList = [],
    isFetching,
    isLoading,
  } = useFetchEnrollmentsByStudent(
    associationId, 
    isOpen ? studentDetails.student.id : undefined
  );

  const updateEnrollmentMutation = useUpdateStudentEnrollment(associationId);
  const editData = useMemo(() => {
    if (!enrollmentList.length) return undefined;

    const firstEnrollment = enrollmentList[0];
    const levelSubjectIds = firstEnrollment?.levelSubjects
      ? firstEnrollment.levelSubjects.map((levelSubject: any) => levelSubject.id)
      : [];

    return {
      studentId: studentDetails.student.id,
      levelSubjectIds,
    };
  }, [enrollmentList, studentDetails.student.id]);

  const handleSubmit = async () => {
    if (!formRef.current) return;
    
    const formData = await formRef.current.submitForm();
    if (!formData) return;

    try {
      const payload: StudentEnrollmentRequest = {
        studentId: formData.studentId,
        levelSubjectIds: formData.levelSubjectIds,
      };

      await updateEnrollmentMutation.mutateAsync({
        studentId: studentDetails.student.id,
        data: payload,
      });
      onClose();
    } catch (error) {
      console.error("Error updating student enrollment:", error);
    }
  };

  const isLoadingData = isOpen && (isFetching || isLoading);

  return (
    <RightSidebar
      isOpen={isOpen}
      title={t("Edit Student Enrollment")}
      onClose={onClose}
      size="lg"
      footer={
        <SidebarButtonsActions
          onSubmitForm={handleSubmit}
          onClose={onClose}
          isLoading={updateEnrollmentMutation.isPending}
        />
      }
    >
      {isLoadingData ? (
        <Spinner size="lg" />
      ) : (
        <FormContent 
          ref={formRef} 
          editData={editData} 
          isEditMode={true}
          currentStudent={{
            id: studentDetails.student.id,
            fullName: `${studentDetails.student.firstName} ${studentDetails.student.lastName}`,
            registrationId: studentDetails.student.registrationId
          }}
          key={`edit-${studentDetails.student.id}-${editData ? 'with-data' : 'no-data'}`}
        />
      )}
    </RightSidebar>
  );
};

export default EditStudentEnrollment;