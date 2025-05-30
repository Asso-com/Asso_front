import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

type ModalType = "showDetails" | "editModal";

const ColumnAction: React.FC = () => {
  const [modalsState, setModalsState] = useState<Record<ModalType, boolean>>({
    showDetails: false,
    editModal: false,
  });

  const dispatch = useDispatch();

  const toggleModal = (modal: ModalType) => {
    setModalsState((prevState) => ({
      ...prevState,
      [modal]: !prevState[modal],
    }));
  };

  const handleDelete = () => {
    // Success Toast
    // dispatch(
    //   showToast({
    //     title: "Deleted",
    //     message: "Item deleted successfully.",
    //     type: "success",
    //   })
    // );

    // dispatch(
    //   showToast({
    //     title: "Delete Failed",
    //     message: "An error occurred while deleting the item.",
    //     type: "error",
    //   })
    // );

    // // Info Toast
    // dispatch(
    //   showToast({
    //     title: "Information",
    //     message: "Delete operation has been logged.",
    //     type: "info",
    //   })
    // );

    // Warning Toast
    dispatch(
      showToast({
        title: "Warning",
        message: "This action cannot be undone.",
        type: "warning",
      })
    );
  };

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<EditIcon boxSize={5} />}
        label="Edit"
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={() => toggleModal("editModal")}
      />
      <GenericIconButtonWithTooltip
        icon={<ViewIcon boxSize={5} />}
        label="View"
        ariaLabel="view_btn"
        variant="ghost"
        colorScheme="blue"
        size="sm"
        onClick={() => toggleModal("showDetails")}
      />
      <GenericIconButtonWithTooltip
        icon={<DeleteIcon boxSize={5} />}
        label="Delete"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
      />
    </Flex>
  );
};

export default ColumnAction;
