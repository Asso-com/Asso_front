import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";
import { confirmAlert } from "@components/shared/confirmAlert";
import type { ICellRendererParams } from "ag-grid-community";
import useDeleteAnnonce from "../../hooks/useDeleteAnnonce";
import GenericModal from "@components/ui/GenericModal";
import EditAnnonce from "./EditAnnonce";

const ColumnAction: React.FC<ICellRendererParams> = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const associationId = useSelector((state: any) => state.authSlice.associationId);
  const { mutateAsync: deleteAnnonce } = useDeleteAnnonce(associationId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: t("Delete Annonce"),
      text: t("You won't be able to revert this!"),
    });

    if (isConfirmed && data?.id) {
      try {
        await deleteAnnonce(data.id);
      } catch (error: any) {
        dispatch(
          showToast({
            title: t("Error"),
            message: error.message || t("Failed to delete annonce"),
            type: "error",
          })
        );
      }
    }
  };

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<MdEdit size={22} />}
        label={t("Edit")}
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={toggleEditModal}
      />
      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        label={t("Delete")}
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
      />
      <GenericModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        title={t("Edit Annonce")}
        size="xl"
      >
        <EditAnnonce details={data} onClose={toggleEditModal} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;