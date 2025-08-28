import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import type { ICellRendererParams } from "node_modules/ag-grid-community/dist/types/core/main";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrFormNextLink } from "react-icons/gr";
import AttandanceSessionDate from "./attandance-session-date";
import EditSessionSchedule from "./attandance-session-date/updateSessionSchedule/EditSessionSchedule";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";

const ColumnAction: React.FC<ICellRendererParams<SessionSchuduleDate>> = (
  params
) => {
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const toggleAttendanceModal = () => setIsAttendanceModalOpen((prev) => !prev);
  const toggleUpdateModal = () => setIsUpdateModalOpen((prev) => !prev);

  return (
    <>
      {/* Attendance Modal */}
      <GenericIconButtonWithTooltip
        icon={<GrFormNextLink size={22} />}
        size={{ base: "sm", md: "md" }}
        variant="ghost"
        colorScheme={"blue"}
        label={"View Attendance"}
        ariaLabel={"View Attendance"}
        onClick={toggleAttendanceModal}
      />

      <GenericModal
        isOpen={isAttendanceModalOpen}
        onClose={toggleAttendanceModal}
        title={"Attendance Session Date"}
        modalContentProps={{ w: "80vw", maxW: "95%" }}
      >
        {params.data && <AttandanceSessionDate attandanceDate={params.data} />}
      </GenericModal>

      {/* Update Modal */}
      <GenericIconButtonWithTooltip
        icon={<FiEdit size={18} />}
        size={{ base: "sm", md: "md" }}
        variant="ghost"
        colorScheme={"green"}
        label={"Edit Session"}
        ariaLabel={"Edit Session"}
        onClick={toggleUpdateModal}
      />

      <GenericModal
        isOpen={isUpdateModalOpen}
        onClose={toggleUpdateModal}
        title={"Update Session Schedule Date"}
        modalContentProps={{ w: "80vw", maxW: "95%" }}
      >
        {params.data && (
          <EditSessionSchedule
            sessionData={params.data}
            onClose={toggleUpdateModal}
          />
        )}
      </GenericModal>
    </>
  );
};

export default ColumnAction;
