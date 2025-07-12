import { Card, CardBody, VStack, Text } from "@chakra-ui/react";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import StatusIndicator from "./StatusIndicator";

const SessionStatusCard: React.FC<{
  sessionData: SessionSchuduleDate;
  cardBg: string;
  onToggleAttendanceMarked: () => void;
  onToggleValidated: () => void;
  onToggleCanceled: () => void;
}> = ({
  sessionData,
  cardBg,
  onToggleAttendanceMarked,
  onToggleValidated,
  onToggleCanceled,
}) => (
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
        />

        <StatusIndicator
          isActive={sessionData.validated}
          label="Session Validated"
          colorScheme="blue"
          onToggle={onToggleValidated}
        />

        <StatusIndicator
          isActive={sessionData.canceled}
          label="Session Canceled"
          colorScheme="red"
          onToggle={onToggleCanceled}
        />
      </VStack>
    </CardBody>
  </Card>
);
export default SessionStatusCard;
