import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import type { ICellRendererParams } from "ag-grid-community";
import { FiTrash, FiEdit } from "react-icons/fi";
import EditAcademicPeriod from "./EditAcademicPeriod"; // Adjust import path as needed

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleEditModal = () => setEditModalOpen((prev) => !prev);

  const handleDelete = () => {
    console.log("Delete clicked for", params.data);
    // Implement delete logic here
  };

  return (
    <>
      <Flex align="center" justify="center" gap={2} height="100%">
        <GenericIconButtonWithTooltip
          icon={<FiEdit size={18} />}
          label="Edit"
          ariaLabel="edit_btn"
          variant="ghost"
          colorScheme="green"
          size="sm"
          onClick={toggleEditModal}
        />
        <GenericIconButtonWithTooltip
          icon={<FiTrash size={18} />}
          label="Delete"
          ariaLabel="delete_btn"
          variant="ghost"
          colorScheme="red"
          size="sm"
          onClick={handleDelete}
        />
      </Flex>
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Edit Academic Period"
        size="xl"
      >
        <EditAcademicPeriod details={params.data} onClose={toggleEditModal} />
      </GenericModal>
    </>
  );
};

export default ColumnAction;
