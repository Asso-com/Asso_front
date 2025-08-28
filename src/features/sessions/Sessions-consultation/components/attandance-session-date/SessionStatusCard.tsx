import { Card, CardBody, VStack, Text } from "@chakra-ui/react";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import StatusIndicator from "./StatusIndicator";
interface SessionStatusCardProps {
  sessionData: SessionSchuduleDate;
  cardBg: string;
  onToggleAttendanceMarked: () => void;
  onToggleValidated: () => void;
  onToggleCanceled: () => void;
}

const SessionStatusCard: React.FC<SessionStatusCardProps> = ({
  sessionData,
  cardBg,
  onToggleAttendanceMarked,
  onToggleValidated,
  onToggleCanceled,
}) => {
  return (
    <Card bg={cardBg} shadow="md" borderRadius="md" maxW={"fit-content"}>
      <CardBody>
        <VStack align="start" spacing={3}>
          <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
            Session Status
          </Text>

          <StatusIndicator
            isActive={sessionData.attendanceMarked}
            label="Attendance Marked"
            colorScheme="green"
            onToggle={onToggleAttendanceMarked}
           isDisabled={sessionData.canceled} // Attendance toggle is not affected
          />

          <StatusIndicator
            isActive={sessionData.validated}
            label="Session Validated"
            colorScheme="blue"
            onToggle={onToggleValidated}
            isDisabled={sessionData.canceled} 
          />

          <StatusIndicator
            isActive={sessionData.canceled}
            label="Session Canceled"
            colorScheme="red"
            onToggle={onToggleCanceled}
            isDisabled={sessionData.validated || sessionData.attendanceMarked} 
          />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SessionStatusCard;