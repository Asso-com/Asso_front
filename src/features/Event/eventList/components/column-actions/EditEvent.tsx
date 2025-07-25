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
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

interface EditEventProps {
  details?: EventResponse;
  onClose: () => void;
}

type FormValues = Record<string, any>;

const EditEvent: React.FC<EditEventProps> = ({ details, onClose }) => {

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updateEvent, isPending } = useUpdateEvent(associationId);

  const initialValues: FormValues = useMemo(
    () =>
      EventFields.reduce((acc: FormValues, field: Field) => {
        acc[field.name] = details?.[field.name as keyof EventResponse] ?? "";
        return acc;
      }, {}),
    [details]
  );

  const validationSchema = useMemo(
    () => createValidationSchema(EventFields),
    []
  );

  const shouldDisableField = (field: Field, values: FormValues): boolean => {
    const isSessionType = values.eventType === "SESSION";
    const isDateOrTypeField = ["startDate", "endDate", "eventType"].includes(
      field.name
    );
    return isSessionType && isDateOrTypeField;
  };

  const handleSubmit = async (values: FormValues) => {
    if (!details?.id) {
      console.error("Event ID is required for update");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("associationId", associationId.toString());
      
      Object.entries(values).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") return;

        if (key === "eventPoster" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      await updateEvent({ id: details.id, formData });
      onClose();
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  const renderFormFields = (values: FormValues) =>
    EventFields.filter((field) => field.name !== "active").map((field) => {
      const isDisabled = shouldDisableField(field, values);
      const modifiedField = isDisabled
        ? {
            ...field,
            inputProps: {
              ...field.inputProps,
              isDisabled: true,
            },
          }
        : field;

      return <RenderFormBuilder key={field.name} field={modifiedField} />;
    });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, dirty, values }) => (
        <Form>
          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {renderFormFields(values)}
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