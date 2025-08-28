import { Flex } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { ICellRendererParams } from "ag-grid-community";

import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import EditFamily from "./EditFamily";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ColumnAction = ({ data }: ICellRendererParams) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleEdit = () => {
    setModalOpen(true);
  };

  return (
    <Flex align="center" justify="center" gap={2}>
      <GenericIconButtonWithTooltip
        icon={<FiEdit size={18} />}
        label={t("Edit")}
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        onClick={handleEdit}
      />

      <GenericModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("Edit Family")}
        size="xl"
      >
        <EditFamily
          details={data}
          onClose={() => {
            setModalOpen(false);

            queryClient.invalidateQueries({ queryKey: ["families"] });
          }}
        />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;
