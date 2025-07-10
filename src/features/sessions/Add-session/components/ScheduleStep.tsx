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
import type { SessionFormData, SessionSchedule } from "../types/addsession.types";
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
  const removeButtonHoverBg = useColorModeValue("red.50", "red.900");

  const {
    data: classRooms = [],
  } = useFetchClassRoom(associationId);

  const roomOptions = classRooms.map(
    (room: { id: number | string; name: string }) => ({
      label: room.name,
      value: Number(room.id),
    })
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
            {formik.values.sessionSchedules.map((_, index: number) => (
              <Box
                key={`session-${index}`}
                p={6}
                bg={sessionCardBg}
                border="2px solid"
                borderColor={sessionBorderColor}
                borderRadius="xl"
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
                  {formik.values.sessionSchedules.length > 1 && (
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<DeleteIcon />}
                      onClick={() => {
                        const newSessions = formik.values.sessionSchedules.filter(
                          (_: SessionSchedule, i: number) => i !== index
                        );
                        formik.setFieldValue("sessionSchedules", newSessions);
                      }}
                      _hover={{
                        bg: removeButtonHoverBg,
                      }}
                    >
                      {t("Remove")}
                    </Button>
                  )}
                </Flex>
                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                  {formFields.schedule.map((field) => (
                    <GridItem
                      key={`${field.name}-${index}`}
                      colSpan={field.name === "sessionType" ? 2 : 1}
                    >
                      <RenderFormBuilder
                        field={{
                          ...field,
                          name: `sessionSchedules.${index}.${field.name}`,
                          ...(field.name === "classRoomId" && { options: roomOptions }),
                        }}
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
                  formik.setFieldValue("sessionSchedules", [
                    ...formik.values.sessionSchedules,
                    {
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
