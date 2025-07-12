// EventCreation.tsx
import {
  Grid,
  GridItem,
  Box,
  useColorModeValue,
  Card,
  CardBody,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import type { Session } from "../data";
import type { EventRequest } from "@features/Event/eventList/types/event.types";
import { eventFormFields } from "../constants/EventFormFields";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import useCreateEvent from "../../../Event/eventList/hooks/useCreateEvent";
import FooterActions from "@components/shared/FooterActions";

interface EventCreationProps {
  sessionData: Session;
  onClose: () => void;
}

const EventCreationInner = ({ sessionData, onClose }: EventCreationProps) => {
  const { values, handleSubmit } = useFormikContext<any>();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: createEvent, isPending } = useCreateEvent(associationId);

  const submitEvent = () => {
    try {
      const payload: EventRequest = {
        sessionId: sessionData.id,
        associationId,
        startDate: sessionData.startDate,
        endDate: sessionData.endDate,
        eventColor: values.eventColor,
        eventType: "SESSION",
        eventFor: values.eventFor,
        eventPoster: values.eventPoster,
        dateRangeValid: true,
        sessionIdValid: true,
      };
      createEvent(payload);
      onClose();
    } catch (error) {}

    // createEvent.mutateAsync(payload, {
    //   onSuccess: () => onClose?.(),
    // });
  };

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
      <CardBody p={4}>
        <Form onSubmit={handleSubmit}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(, 1fr)" }} gap={4}>
            {eventFormFields.map((field) => (
              <GridItem
                key={field.name}
                colSpan={field.type === "color" ? 2 : 1}
              >
                <Box>
                  <RenderFormBuilder field={field} />
                </Box>
              </GridItem>
            ))}
          </Grid>

          <Flex w="100%" justify="flex-end" mt={4}>
            <FooterActions
              onClose={onClose}
              handleSave={submitEvent}
              isSaving={isPending}
              cancelText="close"
              saveText="Create Event"
            />
          </Flex>

          {/* <VStack align="end" mt={6}>
            <Button colorScheme="pink" type="submit" onClick={submitEvent}>
              Create Event
            </Button>
          </VStack> */}
        </Form>
      </CardBody>
    </Card>
  );
};

const EventCreation = ({ sessionData, onClose }: EventCreationProps) => {
  const initialValues = {
    eventColor: "#3182ce",
    eventFor: "",
  };

  const validationSchema = Yup.object({
    eventColor: Yup.string().required("Event color is required"),
    eventFor: Yup.string().required("Target audience is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      <EventCreationInner sessionData={sessionData} onClose={onClose} />
    </Formik>
  );
};

export default EventCreation;
