import {
  Card,
  CardBody,
  VStack,
  Text,
  SimpleGrid,
  StatLabel,
  Stat,
  StatNumber,
  HStack,
  Icon,
  StatHelpText,
} from "@chakra-ui/react";
import { FaUserCheck, FaUserClock, FaUserTimes } from "react-icons/fa";

const AttendanceStatsCard: React.FC<{
  stats: { total: number; present: number; absent: number; late: number };
  cardBg: string;
}> = ({ stats, cardBg }) => (
  <Card bg={cardBg} shadow="md" borderRadius="md" maxW={"fit-content"}>
    <CardBody>
      <VStack align="start" spacing={3}>
        <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
          Attendance Statistics
        </Text>

        <SimpleGrid columns={2} spacing={3} w="100%">
          <Stat>
            <StatLabel fontSize="sm">
              <HStack>
                <Icon as={FaUserCheck} color="green.500" />
                <Text>Present</Text>
              </HStack>
            </StatLabel>
            <StatNumber fontSize="xl" color="green.600">
              {stats.present}
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel fontSize="sm">
              <HStack>
                <Icon as={FaUserTimes} color="red.500" />
                <Text>Absent</Text>
              </HStack>
            </StatLabel>
            <StatNumber fontSize="xl" color="red.600">
              {stats.absent}
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel fontSize="sm">
              <HStack>
                <Icon as={FaUserClock} color="orange.500" />
                <Text>Late</Text>
              </HStack>
            </StatLabel>
            <StatNumber fontSize="xl" color="orange.600">
              {stats.late}
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel fontSize="sm">Total Students</StatLabel>
            <StatNumber fontSize="xl" color="blue.600">
              {stats.total}
            </StatNumber>
            <StatHelpText fontSize="xs">
              Attendance Rate:{" "}
              {stats.total > 0
                ? Math.round((stats.present / stats.total) * 100)
                : 0}
              %
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </VStack>
    </CardBody>
  </Card>
);

export default AttendanceStatsCard;
