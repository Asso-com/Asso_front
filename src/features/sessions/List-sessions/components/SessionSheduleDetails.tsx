import React from "react";
import {
  Card,
  CardBody,
  Text,
  VStack,
  Spinner,
  Box,
  Badge,
  Flex,
} from "@chakra-ui/react";

import useFetchSessionSchedules from "../hooks/useFetchSessionSchedules";
import type { Session } from "../data";
import type { SessionSchedulesResponse } from "../types/session.types";
import { useTranslation } from "react-i18next";
import { formatTime } from "@utils/timeUtils";
interface SessionScheduleDetailsProps {
  sessionData: Session;
}
const SessionScheduleDetails: React.FC<SessionScheduleDetailsProps> = ({
  sessionData,
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchSessionSchedules(sessionData.id);

  if (isLoading) {
    return (
      <Card>
        <CardBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <Spinner size="lg" />
        </CardBody>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardBody>
          <Text>{t("No schedule available for this session")}</Text>
        </CardBody>
      </Card>
    );
  }
 

  return (
    <Card maxHeight="500px" overflowY="auto">
      <CardBody>
        <VStack spacing={4} align="start">
          {data.map((schedule: SessionSchedulesResponse) => (
            <Box
              key={schedule.id}
              width="100%"
              p={3}
              borderWidth="1px"
              borderRadius="md"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Badge colorScheme="teal">{schedule.day.toLowerCase()}</Badge>

                <Text fontWeight="bold">
                  {formatTime(schedule.startTime, schedule.timeZone)} -{" "}
                  {formatTime(schedule.endTime, schedule.timeZone)}
                </Text>
              </Flex>
              <Text>
                {t("Attendance type")} :{" "}
                <Badge
                  colorScheme={
                    schedule.attendanceType === "ONSITE" ? "green" : "orange"
                  }
                >
                  {schedule.attendanceType.toLowerCase()}
                </Badge>
              </Text>
              {schedule.classRoomName && (
                <Text>
                  {t("Classroom")} : {schedule.classRoomName}
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SessionScheduleDetails;
