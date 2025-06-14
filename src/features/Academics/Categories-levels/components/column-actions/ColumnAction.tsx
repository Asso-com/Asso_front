import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import type { ICellRendererParams } from "ag-grid-community";
import type { RootState } from "@store/index";
import { confirmAlert } from "@components/shared/confirmAlert";
import { useSelector } from "react-redux";
import GenericModal from "@components/ui/GenericModal";
import EditCategory from "./EditCategory";
import useDeleteCategory from "../../hooks/useDeleteCategory";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: deleteCategory } = useDeleteCategory(associationId);

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "You won't be able to revert this!",
    });
    if (isConfirmed) {
      try {
        await deleteCategory(params.data.id);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  const toggleEditModal = () => {
    setEditModalOpen((prev) => !prev);
  };

  const isDisabled = params.data.standard;

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
        disabled={isDisabled}
      />
      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        label="Delete"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
        disabled={isDisabled}
      />
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Edit Category Level"
        size="md"
      >
        <EditCategory details={params.data} onClose={toggleEditModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
