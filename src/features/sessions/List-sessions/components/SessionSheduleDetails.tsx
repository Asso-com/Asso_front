import React from "react";
import {
  Card,
  CardBody,
  Text,
  VStack,
  Spinner,
  Box,
  Alert,
  AlertIcon,
  Badge,
  Flex,
} from "@chakra-ui/react";

import useFetchSessionSchedules from "../hooks/useFetchSessionSchedules";
import type { Session } from "../data";
import type { SessionSchedulesResponse } from "../types/session.types";

interface SessionScheduleDetailsProps {
  sessionData: Session;
}

const dayLabels: Record<string, string> = {
  MONDAY: "Lundi",
  TUESDAY: "Mardi",
  WEDNESDAY: "Mercredi",
  THURSDAY: "Jeudi",
  FRIDAY: "Vendredi",
  SATURDAY: "Samedi",
  SUNDAY: "Dimanche",
};

const SessionScheduleDetails: React.FC<SessionScheduleDetailsProps> = ({
  sessionData,
}) => {
  const { data, isLoading, error } = useFetchSessionSchedules(sessionData.id);

  if (isLoading) {
    return (
      <Card>
        <CardBody display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <Spinner size="lg" />
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <Alert status="error">
            <AlertIcon />
            Erreur lors du chargement des horaires : {error.message}
          </Alert>
        </CardBody>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardBody>
          <Text>Aucun horaire disponible pour cette session.</Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card maxHeight="500px" overflowY="auto">
      <CardBody>
        <VStack spacing={4} align="start">
          {data.map((schedule: SessionSchedulesResponse) => (
            <Box key={schedule.id} width="100%" p={3} borderWidth="1px" borderRadius="md">
              <Flex justify="space-between" align="center" mb={2}>
                <Badge colorScheme="teal">{dayLabels[schedule.day] || schedule.day}</Badge>
                <Text fontWeight="bold">
                  {schedule.startTime} - {schedule.endTime}
                </Text>
              </Flex>
              <Text>
                Type de présence :{" "}
                <Badge colorScheme={schedule.attendanceType === "PRESENTIEL" ? "green" : "orange"}>
                  {schedule.attendanceType === "PRESENTIEL" ? "Présentiel" : "Distanciel"}
                </Badge>
              </Text>
              <Text>Salle : {schedule.classRoomId}</Text>
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SessionScheduleDetails;
