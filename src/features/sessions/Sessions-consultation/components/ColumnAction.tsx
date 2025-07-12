import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import type { ICellRendererParams } from "node_modules/ag-grid-community/dist/types/core/main";
import { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import AttandanceSessionDate from "./attandance-session-date";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";

const ColumnAction: React.FC<ICellRendererParams<SessionSchuduleDate>> = (
  params
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);
  return (
    <>
      <GenericIconButtonWithTooltip
        icon={<GrFormNextLink size={22} />}
        size={{ base: "sm", md: "md" }}
        variant="ghost"
        colorScheme={"blue"}
        label={""}
        ariaLabel={""}
        onClick={toggleModal}
      />

      <GenericModal
        isOpen={isOpen}
        onClose={toggleModal}
        title={"Attandance Session Date"}
        modalContentProps={{ w: "80vw", maxW: "95%" }}
      >
        {params.data && <AttandanceSessionDate attandanceDate={params.data} />}
      </GenericModal>
    </>
  );
};

export default ColumnAction;
