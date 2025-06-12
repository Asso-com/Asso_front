import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import type { ICellRendererParams } from "ag-grid-community";
import { confirmAlert } from "@components/shared/confirmAlert";
import GenericModal from "@components/ui/GenericModal";
import EditClassRoom from "./EditClassRoom";
import useDeleteClassRoom from "@features/Academics/Categories-levels/hooks/useDeleteClassRoom";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { mutateAsync: deleteClassRoom } = useDeleteClassRoom();

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "You won't be able to revert this!",
    });

    if (isConfirmed) {
      try {
        await deleteClassRoom(params.data.id);
      } catch (error) {
        // Error toast is handled by useDeleteClassRoom
      }
    }
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<MdEdit size={22} />}
        label="Edit"
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={toggleEditModal}
        disabled={params.data.standard}
      />
      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
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
        title="Edit ClassRoom"
        size="2xl"
      >
        <EditClassRoom
          details={params.data}
          onClose={toggleEditModal}
          classRoomId={params.data.id}
        />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
