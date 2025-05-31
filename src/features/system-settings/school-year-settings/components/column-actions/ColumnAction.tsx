import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@store/toastSlice";
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import type { ICellRendererParams } from "ag-grid-community";
import useActiveAcademicPeriod from "../../hooks/useActiveAcademicPeriod";
import type { RootState } from "@store/index";

type ModalType = "showDetails" | "editModal";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [modalsState, setModalsState] = useState<Record<ModalType, boolean>>({
    showDetails: false,
    editModal: false,
  });
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { mutateAsync: activateAcademicPeriod } =
    useActiveAcademicPeriod(associationId);

  const dispatch = useDispatch();

  const toggleModal = (modal: ModalType) => {
    setModalsState((prevState) => ({
      ...prevState,
      [modal]: !prevState[modal],
    }));
  };

  const handleActivatePeriod = () => {
    if (params?.data?.active) {
      dispatch(
        showToast({
          title: "Information",
          message: "You cannot deactivate an active Academic Period",
          type: "info",
        })
      );
    } else {
      activateAcademicPeriod(params?.data?.id);
    }
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
      <Box>
        <GenericIconButtonWithTooltip
          icon={
            params?.data?.active ? (
              <MdOutlineToggleOn size={36} />
            ) : (
              <MdOutlineToggleOff size={36} />
            )
          }
          label={params?.data?.active ? "Activate" : "Deactivate"}
          ariaLabel={"activate_btn"}
          variant="none"
          color={params?.data?.active ? "green" : "gray"}
          size="sm"
          onClick={handleActivatePeriod}
        />
      </Box>

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
