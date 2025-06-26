import { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { MdDelete, MdEdit, MdPersonAdd, MdPersonRemove } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { ICellRendererParams } from "ag-grid-community";
import type { RootState } from "@store/index";

import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import { confirmAlert } from "@components/shared/confirmAlert";
import useDeleteStudent from "../../hooks/useDeleteStudent";
import Enrollement from "./Enrollement";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const { t } = useTranslation();

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const [modalState, setModalState] = useState({
    edit: false,
    enrollment: false,
  });

  const openEditModal = () =>
    setModalState((prev) => ({ ...prev, edit: true }));
  const closeEditModal = () =>
    setModalState((prev) => ({ ...prev, edit: false }));

  const openEnrollmentModal = () =>
    setModalState((prev) => ({ ...prev, enrollment: true }));
  const closeEnrollmentModal = () =>
    setModalState((prev) => ({ ...prev, enrollment: false }));

  const { mutateAsync: deleteStudent } = useDeleteStudent(associationId);
  const isEnrolled = params.data.enrolledInCurrentPeriod;

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: t("Delete Confirmation"),
      text: t("You won't be able to revert this!"),
    });

    if (isConfirmed) {
      try {
        await deleteStudent(params.data.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEnrollmentToggle = async () => {
    // You can call `openEnrollmentModal()` to show modal instead
    console.log("Toggle enrollment for:", params.data.id);
    openEnrollmentModal();
  };

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <Button
        size="xs"
        variant="solid"
        colorScheme={isEnrolled ? "orange" : "blue"}
        onClick={handleEnrollmentToggle}
        loadingText={isEnrolled ? t("Unenrolling") : t("Enrolling")}
        leftIcon={
          isEnrolled ? <MdPersonRemove size={16} /> : <MdPersonAdd size={16} />
        }
        fontSize="xs"
        px={2}
        py={1}
        minW="auto"
        w="85px"
      >
        {isEnrolled ? t("Unenroll") : t("Enroll")}
      </Button>

      <GenericIconButtonWithTooltip
        icon={<MdEdit size={22} />}
        label={t("Edit")}
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={openEditModal}
      />

      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        label={t("Delete")}
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
      />

      {/* Edit Modal */}
      <GenericModal
        isOpen={modalState.edit}
        onClose={closeEditModal}
        title={"Edit Student"}
        size="md"
      >
        {/* Your edit form goes here */}
        <div>Edit Student Form (TODO)</div>
      </GenericModal>

      {/* Enrollment Modal */}
      <GenericModal
        isOpen={modalState.enrollment}
        onClose={closeEnrollmentModal}
        title={"Enrollment"}
        size="md"
      >
        <Enrollement />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
