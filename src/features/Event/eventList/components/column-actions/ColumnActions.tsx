import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import type { ICellRendererParams } from "ag-grid-community";
import GenericModal from "@components/ui/GenericModal";
import EditEvent from "./EditEvent";
import PosterDetails from "./PosterDetails";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const toggleEditModal = () => setEditModalOpen((prev) => !prev);
  const toggleViewModal = () => setViewModalOpen((prev) => !prev);

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
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Edit Event"
        size="md"
      >
        <EditEvent details={params.data} onClose={toggleEditModal} />
      </GenericModal>

      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        label="Delete"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        disabled={params.data.standard}
      />

      <GenericIconButtonWithTooltip
        icon={<FiEye size={22} />}
        label="View"
        ariaLabel="view_btn"
        variant="ghost"
        colorScheme="blue"
        size="sm"
        onClick={toggleViewModal}
        disabled={params.data.standard}
      />
      <GenericModal
        isOpen={viewModalOpen}
        onClose={toggleViewModal}
        title="View Poster"
        size="md"
      >
        <PosterDetails details={params.data} onClose={toggleViewModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
