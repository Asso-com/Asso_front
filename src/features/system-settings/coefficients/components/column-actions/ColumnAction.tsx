import  { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { showToast } from "@store/toastSlice";
import type { ICellRendererParams } from '@ag-grid-community/core';
import { MdDelete, MdEdit } from 'react-icons/md'; 
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import EditCoefficient from "./EditCoefficient";
import { confirmAlert } from "@components/shared/confirmAlert";
import CoefficientServiceApi from '../../services/CoefficientServiceApi';

type ModalType = "editModal";

const ColumnAction = (params: ICellRendererParams) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modalsState, setModalsState] = useState<Record<ModalType, boolean>>({
    editModal: false,
  });
  const queryClient = useQueryClient();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const rowData = params.data;

  const toggleModal = (modal: ModalType) => {
    setModalsState((prevState) => ({
      ...prevState,
      [modal]: !prevState[modal],
    }));
  };

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: t("Delete Coefficient"),
      text: t("You won't be able to revert this!"),
    });

    if (isConfirmed && rowData?.id) {
      try {
        await CoefficientServiceApi.delete(rowData.id);
        queryClient.invalidateQueries({ queryKey: ['coefficients', associationId] });
        
        dispatch(
          showToast({
            title: t("Deleted"),
            message: t("Coefficient deleted successfully"),
            type: "success",
          })
        );
      } catch (error: any) {
        dispatch(
          showToast({
            title: t("Error"),
            message: error.message || t("Failed to delete coefficient"),
            type: "error",
          })
        );
      }
    }
  };

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<MdEdit size={22} />}
        label={t("Edit")}
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={() => toggleModal("editModal")}
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
        isOpen={modalsState.editModal}
        onClose={() => toggleModal("editModal")}
        title={t("Edit Coefficient")}
        size="xl"
      >
        <EditCoefficient details={rowData} onClose={() => toggleModal("editModal")} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;