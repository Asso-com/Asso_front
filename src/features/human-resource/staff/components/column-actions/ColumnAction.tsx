
 
import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import type { ICellRendererParams } from "ag-grid-community";
import { confirmAlert } from "@components/shared/confirmAlert";
import GenericModal from "@components/ui/GenericModal";

import useDeleteStaff from "../../hooks/useDeleteStaff";
import EditStaff from "./EditStaff";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { mutate: deleteStaff } = useDeleteStaff();

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete this staff member?",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      try {
        await deleteStaff(params.data.id);
      } catch (error) {
        dispatch(
          showToast({
            title: "Error",
            message: "Failed to delete staff member",
            type: "error",
          })
        );
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
  title="Edit staff"
  size="2xl"
>
  <EditStaff details={params.data} onClose={toggleEditModal} />
</GenericModal>
    </Flex>
  );
};

export default ColumnAction;