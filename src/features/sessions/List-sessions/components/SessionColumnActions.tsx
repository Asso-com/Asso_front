import { Flex } from "@chakra-ui/react";
import { ViewIcon, InfoIcon, BellIcon, EditIcon } from "@chakra-ui/icons";
import type { ICellRendererParams } from "ag-grid-community";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { useState } from "react";
import GenericModal from "@components/ui/GenericModal";
import type { Session } from "../types/session.types";
import UnifiedSessionModal from "./SessionModal";
import LessonTopicDetails from "./LessonTopicDetails";
import StudentEnrollment from "./StudentEnrollment";
import EventCreation from "./EventCreation";
import EditSessionModal from "./EditSessionModal";
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
    viewLessonPlan: false,
    createEvent: false,
    editSession: false,
  });

  const toggleModal = (modalName: keyof typeof modalState) => {
    setModalState((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const handleViewDetails = () => {
    toggleModal("viewSession");
  };

  const handleViewLessonPlan = () => {
    toggleModal("viewLessonPlan");
  };

  const handleAddStudents = () => {
    toggleModal("enrollment");
  };

  const handleCreateEvent = () => {
    toggleModal("createEvent");
  };

  const handleEditSession = () => {
    toggleModal("editSession");
  };

  const isSessionFull = sessionData.placesAvailable === 0;

  return (
    <>
      <Flex align="center" justify="center" gap={1} height="100%">
        <GenericIconButtonWithTooltip
          label="View Session Details & Schedule"
          aria-label="View session details and schedule"
          icon={<InfoIcon />}
          size={{ base: "sm", md: "md" }}
          variant="ghost"
          colorScheme="blue"
          onClick={handleViewDetails}
        />

        <GenericIconButtonWithTooltip
          label="Edit Session"
          aria-label="Edit session"
          icon={<EditIcon />}
          size={{ base: "sm", md: "md" }}
          variant="ghost"
          colorScheme="orange"
          onClick={handleEditSession}
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
          aria-label="Add students to session"
          icon={<FaUsers size={22} />}
          size={{ base: "sm", md: "md" }}
          label={isSessionFull ? "Session Full" : "Add Students"}
          variant="ghost"
          colorScheme={isSessionFull ? "red" : "blue"}
          onClick={handleAddStudents}
        />

        <GenericIconButtonWithTooltip
          aria-label="Create Event"
          icon={<BellIcon />}
          label="Create Event"
          size={{ base: "sm", md: "lg" }}
          variant="ghost"
          colorScheme="pink"
          onClick={handleCreateEvent}
        />
      </Flex>

      {/* Unified Modal for Session Details and Schedule */}
      <GenericModal
        isOpen={modalState.viewSession}
        onClose={() => toggleModal("viewSession")}
        title={`Session Information - ${sessionData.code}`}
        size="4xl"
        modalContentProps={{
          height: "700px",
        }}
      >
        <UnifiedSessionModal sessionData={sessionData} />
      </GenericModal>

      <GenericModal
        isOpen={modalState.editSession}
        onClose={() => toggleModal("editSession")}
        title={`Edit Session`}
        size="6xl"
        modalContentProps={{
          height: "700px",
        }}
      >
        <EditSessionModal
          sessionData={sessionData}
          associationId={associationId}
          onClose={() => toggleModal("editSession")}
        />
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
        isOpen={modalState.enrollment}
        onClose={() => toggleModal("enrollment")}
        title={`Add Students`}
        size="5xl"
      >
        <StudentEnrollment
          sessionId={sessionData.id}
          associationId={associationId}
          onClose={() => toggleModal("enrollment")}
          maxStudentsCapacity={sessionData.maxStudentsCapacity}
          levelName={sessionData.levelSubject.level}
          categoryId={sessionData.levelSubject.categoryId}
        />
      </GenericModal>

      <GenericModal
        isOpen={modalState.createEvent}
        onClose={() => toggleModal("createEvent")}
        title={`Create Event`}
        size="2xl"
      >
        <EventCreation
          sessionData={sessionData}
          onClose={() => toggleModal("createEvent")}
        />
      </GenericModal>
    </>
  );
};

export default SessionColumnActions;
