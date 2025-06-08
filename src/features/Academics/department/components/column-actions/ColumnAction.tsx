import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import type { ICellRendererParams } from "ag-grid-community";
import { confirmAlert } from "@components/shared/confirmAlert";
import GenericModal from "@components/ui/GenericModal";
import EditDepartement from "./EditDepartement";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "You won't be able to revert this!",
    });
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
        title="Edit Department"
        size="2xl"
      >
        <EditDepartement details={params.data} onClose={toggleEditModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
