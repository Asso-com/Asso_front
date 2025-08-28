import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { useSelector } from "react-redux";
import { FiTrash, FiEdit } from "react-icons/fi";
import type { ICellRendererParams } from "ag-grid-community";
import { confirmAlert } from "@components/shared/confirmAlert";
import GenericModal from "@components/ui/GenericModal";

import useDeleteStaff from "../../hooks/useDeleteStaff";
import EditStaff from "./EditStaff";
import type { RootState } from "@store/index";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { mutateAsync: deleteStaff } = useDeleteStaff(associationId);

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete this staff member?",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      try {
        await deleteStaff(params.data.id);
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
        disabled={params.data.standard}
      />
      <GenericIconButtonWithTooltip
        icon={<FiTrash size={18} />}
        label="Delete"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
        disabled={params.data.standard}
      />
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Edit staff"
        size="4xl"
      >
        <EditStaff details={params.data} onClose={toggleEditModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
