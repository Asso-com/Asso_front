import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import RightSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";

import FormContent, { type FormContentRef } from "../sidebar/FormContent";
import useFetchStudentDetails from "../../hooks/getStudentById";
import type { RootState } from "@store/index";
import type { StudentDetails } from "../../types";

interface EnrollementProps {
  studentDetails?: StudentDetails;
}

const EditStudent: React.FC<EnrollementProps> = ({ studentDetails }) => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const [studentId, setStudentId] = useState<string>("");
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const formRef = useRef<FormContentRef>(null);

  const { data: studentData, isFetching } = useFetchStudentDetails(
    associationId,
    studentId
  );

  const openEditModal = () => {
    if (!studentDetails?.id) return;
    setStudentId(studentDetails.id);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      const formData = await formRef.current.submitForm();
      if (formData) {
        console.log("Submitting student update:", formData);
        // TODO: Send formData to your API
      }
    }
  };

  return (
    <>
      <GenericIconButtonWithTooltip
        icon={<MdEdit size={22} />}
        label={t("Edit")}
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={openEditModal}
      />

      <RightSidebar
        isOpen={isEditOpen}
        title={t("Edit Student")}
        onClose={closeEditModal}
        size="lg"
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmit}
            onClose={closeEditModal}
          />
        }
      >
        {isFetching ? (
          <Spinner size="lg" />
        ) : (
          <FormContent ref={formRef} editData={studentData} isEditMode />
        )}
      </RightSidebar>
    </>
  );
};

export default EditStudent;
