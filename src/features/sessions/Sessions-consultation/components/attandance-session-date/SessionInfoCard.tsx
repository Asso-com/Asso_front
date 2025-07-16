import {
  Badge,
  Text,
  HStack,
  VStack,
  Icon,
  Card,
  CardBody,
} from "@chakra-ui/react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaHome,
  FaVideo,
} from "react-icons/fa";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import { formatDateOnly, formatTime } from "@utils/timeUtils";

// Session Information Card Component
const SessionInfoCard: React.FC<{
  sessionData: SessionSchuduleDate;
  cardBg: string;
}> = ({ sessionData, cardBg }) => (
  <Card bg={cardBg} shadow="md" borderRadius="md" maxW={"fit-content"} px={4}>
    <CardBody>
      <VStack align="start" spacing={3}>
        <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
          Session Information
        </Text>

        <HStack>
          <Icon as={FaCalendarAlt} color="blue.500" />
          <Text fontSize="md" fontWeight="medium">
            {formatDateOnly(sessionData.sessionDate, {
              format: "full",
            })}
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaClock} color="green.500" />
          <Text fontSize="md">
            {formatTime(sessionData.startTime, sessionData.timeZone)} -{" "}
            {formatTime(sessionData.endTime, sessionData.timeZone)}
          </Text>
        </HStack>

        {sessionData.classRoom && (
          <HStack>
            <Icon as={FaMapMarkerAlt} color="red.500" />
            <Text fontSize="md">{sessionData.classRoom}</Text>
          </HStack>
        )}

        <HStack>
          <Icon as={FaChalkboardTeacher} color="purple.500" />
          <Text fontSize="md">
            {sessionData.firstName} {sessionData.lastName}
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaBook} color="orange.500" />
          <Text fontSize="md">
            {sessionData.subject} - {sessionData.level}
          </Text>
        </HStack>

        <HStack>
          <Icon
            as={sessionData.sessionType === "ONSITE" ? FaHome : FaVideo}
            color="teal.500"
          />
          <Badge
            colorScheme={
              sessionData.sessionType === "ONSITE" ? "green" : "blue"
            }
            px={2}
            py={1}
            borderRadius="full"
            fontSize="sm"
          >
            {sessionData.sessionType}
          </Badge>
        </HStack>
      </VStack>
    </CardBody>
  </Card>
);

export default SessionInfoCard;
