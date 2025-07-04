import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Divider,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiBookOpen,
  FiTarget,
  FiRepeat,
} from "react-icons/fi";
import type { Session } from "../data";

interface SessionDetailsProps {
  sessionData: Session;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ sessionData }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const InfoItem = ({
    icon,
    label,
    value,
    color = textColor,
  }: {
    icon: any;
    label: string;
    value: string | number;
    color?: string;
  }) => (
    <HStack spacing={3} align="start">
      <Icon as={icon} color={accentColor} mt={1} />
      <Box>
        <Text fontSize="sm" color={textColor} fontWeight="medium">
          {label}
        </Text>
        <Text fontSize="md" color={color} fontWeight="semibold">
          {value}
        </Text>
      </Box>
    </HStack>
  );

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "green.500";
    if (ratio > 0.2) return "orange.500";
    return "red.500";
  };

  return (
    <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" shadow="lg">
      <CardBody>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Box>
            <HStack justify="space-between" align="start" mb={2}>
              <Heading size="lg" color={accentColor}>
                {sessionData.code}
              </Heading>
              <Badge
                colorScheme={"gray"}
                variant="solid"
                px={3}
                py={1}
                borderRadius="full"
              >
                {sessionData.sessionType}
              </Badge>
            </HStack>
            <Text fontSize="lg" fontWeight="medium" color="gray.500">
              Session Information
            </Text>
          </Box>

          <Divider />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <VStack spacing={4} align="stretch">
              <InfoItem
                icon={FiBookOpen}
                label="Subject"
                value={sessionData.levelSubject.subject}
              />
              <InfoItem
                icon={FiTarget}
                label="Level"
                value={sessionData.levelSubject.level}
              />
              <InfoItem
                icon={FiUser}
                label="Instructor"
                value={`${sessionData.staff.firstName} ${sessionData.staff.lastName}`}
              />
              <InfoItem
                icon={FiRepeat}
                label="Periodicity"
                value={sessionData.periodicity}
              />
            </VStack>

            <VStack spacing={4} align="stretch">
              <InfoItem
                icon={FiCalendar}
                label="Duration"
                value={`${sessionData.startDate} to ${sessionData.endDate}`}
              />
              <InfoItem
                icon={FiClock}
                label="Session Type"
                value={sessionData.sessionType}
              />
              <InfoItem
                icon={FiDollarSign}
                label="Fees"
                value={`$${sessionData.fees}`}
                color="green.500"
              />
            </VStack>
          </SimpleGrid>

          <Divider />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Stat>
              <StatLabel>
                <HStack>
                  <Icon as={FiUsers} color={accentColor} />
                  <Text>Total Capacity</Text>
                </HStack>
              </StatLabel>
              <StatNumber>{sessionData.maxStudentsCapacity}</StatNumber>
              <StatHelpText>Maximum students</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>
                <HStack>
                  <Icon as={FiUsers} color={accentColor} />
                  <Text>Available Places</Text>
                </HStack>
              </StatLabel>
              <StatNumber
                color={getAvailabilityColor(
                  sessionData.placesAvailable,
                  sessionData.maxStudentsCapacity
                )}
              >
                {sessionData.placesAvailable}
              </StatNumber>
              <StatHelpText>
                {sessionData.placesAvailable > 0
                  ? "Spots remaining"
                  : "Fully booked"}
              </StatHelpText>
            </Stat>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SessionDetails;
