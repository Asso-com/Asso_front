import {
  Grid,
  GridItem,
  Card,
  CardBody,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import type { Session } from "../types/session.types";
import { eventFormFields } from "../constants/EventFormFields";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import useCreateEvent from "../../../Event/eventList/hooks/useCreateEvent";
import FooterActions from "@components/shared/FooterActions";
import EventFieldValidations from "@utils/createValidationSchema";

interface EventCreationProps {
  sessionData: Session;
  onClose: () => void;
}

const EventCreation = ({ sessionData, onClose }: EventCreationProps) => {
  const initialValues = {
    title: "",
    description: "",
    eventColor: "#3182ce",
    eventFor: "",
    eventPoster: null as File | null,
  };

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: createEvent, isPending } = useCreateEvent(associationId);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const formData = new FormData();
      formData.append("associationId", associationId.toString());
      formData.append("sessionId", sessionData.id.toString());
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("startDate", sessionData.startDate);
      formData.append("endDate", sessionData.endDate);
      formData.append("eventType", "SESSION");
      formData.append("eventColor", values.eventColor);
      if (values.eventFor) formData.append("eventFor", values.eventFor);
      if (values.eventPoster) formData.append("eventPoster", values.eventPoster);

      await createEvent(formData);
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
const validationSchema = EventFieldValidations(eventFormFields);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Card
            bg={cardBg}
            borderRadius="2xl"
            border="2px solid"
            borderColor={borderColor}
            boxShadow="xl"
            overflow="hidden"
            h="100%"
          >
            <CardBody p={4}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                {eventFormFields.map((field) => (
                  <GridItem
                    key={field.name}
                    colSpan={
                      ["color", "textarea", "file"].includes(field.type) ? 2 : 1
                    }
                  >
                    <RenderFormBuilder field={field} />
                  </GridItem>
                ))}
              </Grid>

              <Flex w="100%" justify="flex-end" mt={4}>
                <FooterActions
                  onClose={onClose}
                  handleSave={() => {
                    document.querySelector<HTMLFormElement>('form')?.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true })
                    );
                  }}
                  isSaving={isPending}
                  cancelText="Close"
                  saveText="Create Event"
                />
              </Flex>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default EventCreation;
