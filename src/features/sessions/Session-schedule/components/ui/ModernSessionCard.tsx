import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  FiAlertCircle,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiVideo,
  FiXCircle,
} from "react-icons/fi";
import React from "react";
import type { SessionSchuduleDate } from "../../types";
import { useTranslation } from "react-i18next";
import { dayNames } from "../../utils/sessionUtils";

const getStatusInfo = (session: SessionSchuduleDate, t: any) => {
  if (session.canceled) {
    return {
      badge: (
        <Badge colorScheme="red" variant="solid">
          {t("Canceled")}
        </Badge>
      ),
      icon: <Icon as={FiXCircle} color="red.500" />,
      color: "red",
    };
  }
  if (session.validated) {
    return {
      badge: (
        <Badge colorScheme="green" variant="solid">
          {t("Validated")}
        </Badge>
      ),
      icon: <Icon as={FiCheckCircle} color="green.500" />,
      color: "green",
    };
  }
  if (session.attendanceMarked) {
    return {
      badge: (
        <Badge colorScheme="blue" variant="solid">
          {t("Attendance Taken")}
        </Badge>
      ),
      icon: <Icon as={FiAlertCircle} color="blue.500" />,
      color: "blue",
    };
  }
  return {
    badge: (
      <Badge colorScheme="orange" variant="outline">
        {t("Pending")}
      </Badge>
    ),
    icon: <Icon as={FiClock} color="orange.500" />,
    color: "orange",
  };
};

const formatTime = (time: string): string => time.slice(0, 5);

const ModernSessionCard: React.FC<{
  session: SessionSchuduleDate;
  subjectColors: Record<string, string>;
}> = ({ session, subjectColors }) => {

  const { t } = useTranslation();
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const subjectColor = subjectColors[session.subject] || "gray";
  const statusInfo = getStatusInfo(session, t);
  const isOnlineSession = !session.classRoom;

  return (
    <Card
      bg={cardBgColor}
      shadow="lg"
      borderRadius="xl"
      overflow="hidden"
      _hover={{
        shadow: "xl",
        transform: "translateY(-4px)",
        borderColor: `${subjectColor}.300`,
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      border="1px"
      borderColor={session.canceled ? "red.200" : borderColor}
      opacity={session.canceled ? 0.7 : 1}
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="4px"
        bg={`${statusInfo.color}.400`}
      />

      <CardBody p={6}>
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="start">
            <VStack align="start" spacing={2} flex={1}>
              <Flex align="center" gap={2}>
                <Heading size="md" color="gray.800" noOfLines={1}>
                  {session.level}
                </Heading>
              </Flex>
              <HStack wrap="wrap" spacing={2}>
                <Badge
                  colorScheme={subjectColor}
                  variant="solid"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                >
                  {session.subject}
                </Badge>
                {session.linguisticLevel && (
                  <Badge
                    variant="outline"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                  >
                    {session.linguisticLevel}
                  </Badge>
                )}
              </HStack>
            </VStack>
            <VStack align="end" spacing={2}>
              {statusInfo.icon}
              {statusInfo.badge}
            </VStack>
          </Flex>

          <Divider />

          <SimpleGrid columns={2} spacing={4}>
            <VStack align="start" spacing={3}>
              <HStack color="gray.600">
                <Icon as={FiCalendar} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium">
                    {dayNames[session.day]}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {session.date}
                  </Text>
                </VStack>
              </HStack>

              <HStack color="gray.600">
                <Icon as={FiClock} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium">
                    {formatTime(session.startTime)} -{" "}
                    {formatTime(session.endTime)}
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            <VStack align="start" spacing={3}>
              {isOnlineSession ? (
                <Box
                  bg="teal.50"
                  p={2}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="teal.200"
                  width="full"
                >
                  <HStack color="teal.600" spacing={2}>
                    <Box
                      bg="teal.100"
                      p={2}
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiVideo} boxSize={4} />
                    </Box>
                    <Text fontSize="xs" color="teal.500">
                      {t("Virtual Classroom")}
                    </Text>
                  </HStack>
                </Box>
              ) : (
                <HStack color="gray.600">
                  <Icon as={FiMapPin} />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                      {session.classRoom.split(" - ")[0]}
                    </Text>
                    <Text fontSize="xs" color="gray.500" noOfLines={1}>
                      {session.classRoom.split(" - ")[1]}
                    </Text>
                  </VStack>
                </HStack>
              )}

              <HStack color="gray.600">
                <Avatar
                  size="sm"
                  name={`${session.lastName} ${session.firstName}`}
                  bg={`${subjectColor}.500`}
                />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium">
                    {session.lastName}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {session.firstName}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </SimpleGrid>

          {session.quizNumber !== 0 && (
            <>
              <Divider />
              <HStack color="blue.600" bg="blue.50" p={3} borderRadius="md">
                <Icon as={FiBookOpen} />
                <Text fontSize="sm" fontWeight="medium">
                  {session.quizNumber} quiz scheduled
                  {session.quizNumber > 1 ? "s" : ""}
                </Text>
              </HStack>
            </>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ModernSessionCard;
