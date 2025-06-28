import React from "react";
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Box,
  useColorModeValue,
  Divider,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import type { FormikProps } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import { formFields } from "../constants/formFields";
import type {
  SessionFormData,
  SessionSchedule,
} from "../types/addsession.types";
import useFetchClassRoom from "@features/Academics/Class-room/hooks/useFetchClassRoom";
import { useTranslation } from "react-i18next";

interface ScheduleStepProps {
  formik: FormikProps<SessionFormData>;
  associationId: number;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  formik,
  associationId,
}) => {
  const { t } = useTranslation();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");
  const sessionCardBg = useColorModeValue("gray.50", "gray.700");
  const sessionBorderColor = useColorModeValue("gray.200", "gray.600");
  //const hoverBorderColor = useColorModeValue("blue.300", "blue.500");
  const removeButtonHoverBg = useColorModeValue("red.50", "red.900");

  const {
    data: classRooms = [],
    isLoading,
    error,
  } = useFetchClassRoom(associationId);

  const roomOptions = classRooms.map(
    (room: { id: number | string; name: string }) => ({
      label: room.name,
      value: Number(room.id),
    })
  );

  const enhancedScheduleFields = formFields.schedule.map((field) =>
    field.name === "classRoomId"
      ? { ...field, options: roomOptions, isLoading, error: error?.message }
      : field
  );

  return (
    <Card
      bg={cardBg}
      borderRadius="2xl"
      border="2px solid"
      borderColor={borderColor}
      boxShadow="xl"
      overflow="hidden"
      h="100%"
    >
      <Divider borderColor={borderColor} />
      <CardBody p={2} h="100%">
        <Box h="100%" overflowY="auto">
          <VStack spacing={4} align="stretch" px={2}>
            {formik.values.sessions.map((session, index: number) => (
              <Box
                key={session.sessionName || `session-${index}`}
                p={6}
                bg={sessionCardBg}
                border="2px solid"
                borderColor={sessionBorderColor}
                borderRadius="xl"
                // _hover={{
                //   borderColor: hoverBorderColor,
                //   transform: "translateY(-2px)",
                //   boxShadow: "lg",
                // }}
                transition="all 0.2s ease-in-out"
              >
                <Flex justify="space-between" align="center" mb={6}>
                  <HStack spacing={3}>
                    <Badge
                      colorScheme="blue"
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {t("Session")} {index + 1}
                    </Badge>
                  </HStack>
                  {formik.values.sessions.length > 1 && (
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<DeleteIcon />}
                      onClick={() => {
                        const newSessions = formik.values.sessions.filter(
                          (_: SessionSchedule, i: number) => i !== index
                        );
                        formik.setFieldValue("sessions", newSessions);
                      }}
                      _hover={{
                        bg: removeButtonHoverBg,
                      }}
                    >
                      {t("Remove")}
                    </Button>
                  )}
                </Flex>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
                  {enhancedScheduleFields.map((field) => (
                    <GridItem key={`${field.name}-${index}`}>
                      <RenderFormBuilder
                        field={field}
                        arrayName={`sessions[${index}]`}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            ))}
            <Box textAlign="center">
              <Button
                size="medium"
                colorScheme="blue"
                variant="outline"
                borderRadius="full"
                px={4}
                py={4}
                leftIcon={<AddIcon />}
                onClick={() => {
                  formik.setFieldValue("sessions", [
                    ...formik.values.sessions,
                    {
                      sessionName: `Session${
                        formik.values.sessions.length + 1
                      }`,
                      classRoomId: 0,
                      day: "",
                      startTime: "",
                      endTime: "",
                    },
                  ]);
                }}
              >
                {t("Add New Session")}
              </Button>
            </Box>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ScheduleStep;
