import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { FiTrash, FiEdit } from "react-icons/fi";
import { confirmAlert } from "@components/shared/confirmAlert";
import GenericModal from "@components/ui/GenericModal";
import { useDeleteReunion } from "../../hooks/useDeleteReunion";
import EditReunion from "./EditReunion";

const ColumnAction: React.FC<any> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { mutateAsync: deleteReunion } = useDeleteReunion();

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete this session?",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      try {
        await deleteReunion(params.data.id);
      } catch (error) {}
    }
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  return (
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
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Edit Reunion"
        size="4xl"
      >
        <EditReunion details={params.data} onClose={toggleEditModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
