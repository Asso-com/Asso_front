import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { FiEdit } from "react-icons/fi";

import type { ICellRendererParams } from "ag-grid-community";
import EditAssociation from "./EditAssociation";
import GenericModal from "@components/ui/GenericModal";
import type { Partner } from "../types";

const ColumnAction: React.FC<ICellRendererParams<Partner>> = (params) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<FiEdit size={18} />}
        label={"Edit"}
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={toggleEditModal}
      />
      <GenericModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        title={"Edit Partner"}
        size="2xl"
      >
        <EditAssociation details={params.data} onClose={toggleEditModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
