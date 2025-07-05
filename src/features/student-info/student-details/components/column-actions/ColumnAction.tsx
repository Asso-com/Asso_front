import { useState } from "react";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { MdDelete, MdPersonAdd, MdPersonRemove } from "react-icons/md";
import { useTranslation } from "react-i18next";
import type { ICellRendererParams } from "ag-grid-community";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import { confirmAlert } from "@components/shared/confirmAlert";
import Enrollement from "./Enrollement";
import type { StudentDetails } from "../../types";
import EditStudent from "./EditStudent";

const ColumnAction: React.FC<ICellRendererParams<StudentDetails>> = (
  params
) => {
  const { t } = useTranslation();

  const student = params.data;
  const [modalState, setModalState] = useState({
    edit: false,
    enrollment: false,
  });

  const openEnrollmentModal = () =>
    setModalState((prev) => ({ ...prev, enrollment: true }));
  const closeEnrollmentModal = () =>
    setModalState((prev) => ({ ...prev, enrollment: false }));

  const isEnrolled = student?.enrolledInCurrentPeriod;

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: t("Delete Confirmation"),
      text: t("You won't be able to revert this!"),
    });

    if (isConfirmed) {
      try {
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEnrollmentToggle = async () => {
    openEnrollmentModal();
  };

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <Tooltip
        label={
          isEnrolled
            ? t("Click to unenroll the student")
            : t("Click to enroll the student")
        }
      >
        <Button
          size="xs"
          variant="solid"
          colorScheme={isEnrolled ? "orange" : "blue"}
          onClick={handleEnrollmentToggle}
          leftIcon={
            isEnrolled ? (
              <MdPersonRemove size={16} />
            ) : (
              <MdPersonAdd size={16} />
            )
          }
          fontSize="xs"
          px={2}
          py={1}
          minW="auto"
          w="85px"
        >
          {isEnrolled ? t("Unenroll") : t("Enroll")}
        </Button>
      </Tooltip>

      <EditStudent studentDetails={student} />

      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        label={"Delete"}
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
      />
      <GenericModal
        isOpen={modalState.enrollment}
        onClose={closeEnrollmentModal}
        title={"Enrollment"}
        size="lg"
      >
        <Enrollement studentDetails={student} onClose={closeEnrollmentModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
