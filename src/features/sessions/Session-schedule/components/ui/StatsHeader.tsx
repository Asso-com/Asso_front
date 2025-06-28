import {
  Card,
  CardBody,
  Flex,
  useColorModeValue,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import type { SessionTracking } from "../../types";
import { useTranslation } from "react-i18next";

interface StatsHeaderProps {
  filteredSessions: SessionTracking[];
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ filteredSessions }) => {
  const {t} = useTranslation();
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Card
      bg={cardBgColor}
      shadow="md"
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      mb={4}
    >
      <CardBody py={4}>
        <Flex justify="space-between" align="center" flexWrap="wrap">
          <Text color="gray.600" fontSize="lg">
            <Text as="span" color={accentColor} fontWeight="bold" fontSize="xl">
              {filteredSessions.length}
            </Text>{" "}
            {t("session")}{filteredSessions.length !== 1 ? "s" : ""} {t("found")}{" "}
          </Text>
          <HStack spacing={6}>
            <HStack>
              <Icon as={FiCheckCircle} color="green.500" />
              <Text fontSize="sm" color="gray.600">
                {filteredSessions.filter((s) => s.isValidated).length}{" "}
                {t("validated")}
              </Text>
            </HStack>
            <HStack>
              <Icon as={FiClock} color="orange.500" />
              <Text fontSize="sm" color="gray.600">
                {
                  filteredSessions.filter(
                    (s) => !s.isAttendanceMarked && !s.isCanceled
                  ).length
                }{" "}
                {t("pending")}
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default StatsHeader;
