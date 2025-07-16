import { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import EventFields from "../../constants/EventFields";
import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import type { EventResponse } from "../../types/event.types";

interface EditEventProps {
  details?: EventResponse;
  onClose: () => void;
}

type FormValues = Record<string, any>;

const EditEvent: React.FC<EditEventProps> = ({ details, onClose }) => {
  const associationId = details?.associationId || 0;
  const eventId = details?.id;

  const { mutateAsync: updateEvent, isPending } = useUpdateEvent(associationId);

  const initialValues: FormValues = useMemo(() => {
    return EventFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name as keyof EventResponse] ?? "";
      return acc;
    }, {});
  }, [details]);

  const validationSchema = useMemo(() => createValidationSchema(EventFields), []);

  const shouldDisable = (field: Field, values: FormValues): boolean => {
    const shouldDisableField = values.eventType === "SESSION" && 
      (field.name === "startDate" || field.name === "endDate");
    return shouldDisableField;
  };

  const onSubmit = async (values: FormValues) => {
    if (!eventId) {
      console.error("Missing event ID for update");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("associationId", associationId.toString());

      for (const [key, value] of Object.entries(values)) {
        if (value === null || value === undefined || value === "") continue;

        if (key === "eventPoster") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      }

      await updateEvent({ id: eventId, formData });
      onClose();
    } catch (error) {
      console.error("Échec de la mise à jour de l'événement", error);
    }
  };

  if (!details) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit, dirty, values }) => (
        <Form onSubmit={handleSubmit}>
          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {EventFields.filter(f => f.name !== "active").map((field) => {
                const isDisabled = shouldDisable(field, values);
                const modifiedField = isDisabled
                  ? {
                      ...field,
                      inputProps: {
                        ...field.inputProps,
                        isDisabled: true,
                      },
                    }
                  : field;
                return (
                  <RenderFormBuilder key={field.name} field={modifiedField} />
                );
              })}
            </SimpleGrid>
          </Box>

          <FooterActions
            onClose={onClose}
            handleSave={handleSubmit}
            isSaving={isPending || isSubmitting}
            isDisabled={!dirty || isPending || isSubmitting}
            cancelText="Cancel"
            saveText="Update Event"
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditEvent;