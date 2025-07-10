import { Flex } from "@chakra-ui/react";
import { ViewIcon, CalendarIcon, InfoIcon } from "@chakra-ui/icons";
import type { ICellRendererParams } from "ag-grid-community";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { useState } from "react";
import GenericModal from "@components/ui/GenericModal";
import type { Session } from "../data";
import SessionDetails from "./SessionDetails";
import LessonTopicDetails from "./LessonTopicDetails";
import SessionScheduleDetails from "./SessionSheduleDetails";
import StudentEnrollment from "./StudentEnrollment";
import { FaUsers } from "react-icons/fa";
interface SessionCellRendererParams extends ICellRendererParams {
  associationId: number;
}

const SessionColumnActions: React.FC<SessionCellRendererParams> = (params) => {
  const sessionData: Session = params.data;
  const associationId = params.associationId;

  const [modalState, setModalState] = useState({
    viewSession: false,
    enrollment: false,
    viewSchedule: false,
    viewLessonPlan: false,
  });

  const toggleModal = (modalName: keyof typeof modalState) => {
    setModalState((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const handleViewDetails = () => {
    console.log("View session details:", sessionData.id);
    toggleModal("viewSession");
  };

  const handleViewLessonPlan = () => {
    console.log("View lesson plan for session:", sessionData.id);
    toggleModal("viewLessonPlan");
  };

  const handleViewSchedule = () => {
    console.log("View session schedule:", sessionData.id);
    toggleModal("viewSchedule");
  };

  const handleAddStudents = () => {
    console.log("Add students to session:", sessionData.id);
    toggleModal("enrollment");
  };

  const isSessionFull = sessionData.placesAvailable === 0;

  return (
    <>
      <Flex align="center" justify="center" gap={1} height="100%">
        <GenericIconButtonWithTooltip
          label="View Session Details"
          aria-label="View session details"
          icon={<InfoIcon />}
          size={{ base: "sm", md: "md" }}
          variant="ghost"
          colorScheme="blue"
          onClick={handleViewDetails}
        />

        <GenericIconButtonWithTooltip
          aria-label="View lesson plan"
          icon={<ViewIcon />}
          label="View Lesson Plan"
          size={{ base: "sm", md: "md" }}
          variant="ghost"
          colorScheme="green"
          onClick={handleViewLessonPlan}
        />

        <GenericIconButtonWithTooltip
          aria-label="View session schedule"
          icon={<CalendarIcon />}
          label="View Schedule"
          size={{ base: "sm", md: "md" }}
          variant="ghost"
          colorScheme="purple"
          onClick={handleViewSchedule}
        />

        <GenericIconButtonWithTooltip
          aria-label="Add students to session"
          icon={<FaUsers size={22} />}
          size={{ base: "sm", md: "md" }}
          label={isSessionFull ? "Session Full" : "Add Students"}
          variant="ghost"
          colorScheme={isSessionFull ? "red" : "blue"}
          onClick={handleAddStudents}
        />
      </Flex>

      <GenericModal
        isOpen={modalState.viewSession}
        onClose={() => toggleModal("viewSession")}
        title={`Session Details`}
        size="2xl"
      >
        <SessionDetails sessionData={sessionData} />
      </GenericModal>

     <GenericModal
  isOpen={modalState.viewLessonPlan}
  onClose={() => toggleModal("viewLessonPlan")}
  title={`Lesson Plan`}
  size="4xl"
>
  <div style={{ height: "80vh", overflowY: "auto" }}>
    <LessonTopicDetails sessionId={sessionData.id} />
  </div>
</GenericModal>


      <GenericModal
        isOpen={modalState.viewSchedule}
        onClose={() => toggleModal("viewSchedule")}
        title={`Schedule`}
        size="4xl"
      >
        <SessionScheduleDetails sessionData={sessionData} />
      </GenericModal>

      <GenericModal
        isOpen={modalState.enrollment}
        onClose={() => toggleModal("enrollment")}
        title={`Add Students`}
        size="4xl"
      >
        <StudentEnrollment sessionId={sessionData.id} associationId={associationId} />
      </GenericModal>
    </>
  );
};

export default SessionColumnActions;
