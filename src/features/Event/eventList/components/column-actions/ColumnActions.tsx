import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import type { ICellRendererParams } from "ag-grid-community";
import GenericModal from "@components/ui/GenericModal";
import EditEvent from "./EditEvent";
import PosterDetails from "./PosterDetails";
import { useDeleteEvent } from "../../hooks/useDeleteEvent";
import { confirmAlert } from "@components/shared/confirmAlert";
import { useTranslation } from "react-i18next";

const ColumnAction: React.FC<ICellRendererParams> = ({ data }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const { t } = useTranslation();

  const { mutateAsync: deleteEvent } = useDeleteEvent(data?.id);

  const toggleEditModal = () => setEditModalOpen((prev) => !prev);
  const toggleViewModal = () => setViewModalOpen((prev) => !prev);

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: t("Delete Confirmation"),
      text: t("You won't be able to revert this!"),
    });

    if (!isConfirmed) return;
    await deleteEvent(data.id);
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
      />
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Edit Event"
        size="2xl"
      >
        <EditEvent details={data} onClose={toggleEditModal} />
      </GenericModal>
      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        onClick={handleDelete}
        label="Delete"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
      />

      {/* View Button */}
      <GenericIconButtonWithTooltip
        icon={<FiEye size={22} />}
        label="View"
        ariaLabel="view_btn"
        variant="ghost"
        colorScheme="blue"
        size="sm"
        onClick={toggleViewModal}
      />
      <GenericModal
        isOpen={viewModalOpen}
        onClose={toggleViewModal}
        title="View Poster"
        size="2xl"
        modalContentProps={{
          height: "500px",
        }}
      >
        <PosterDetails details={data} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
