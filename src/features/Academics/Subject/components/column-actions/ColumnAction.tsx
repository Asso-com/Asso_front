import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import type { ICellRendererParams } from "ag-grid-community";
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

  const toggleModal = (modal: ModalType) => {
    setModalsState((prevState) => ({
      ...prevState,
      [modal]: !prevState[modal],
    }));
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
    </Flex>
  );
};

export default ColumnAction;
