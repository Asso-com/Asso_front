import { useMemo, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import EventFields from "../../constants/EventFields";
// import useUpdateEvent from "../../hooks/useUpdateEvent";

interface EditEventProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditEvent: React.FC<EditEventProps> = ({ details, onClose }) => {
  // const { mutateAsync: updateEvent, isPending } = useUpdateEvent(details?.associationId);

  const [formFields] = useState<Field[]>(() => EventFields);

  const initialValues: FormValues = useMemo(() => {
    return formFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});
  }, [details, formFields]);

  const validationSchema = useMemo(() => {
    return createValidationSchema(formFields);
  }, [formFields]);

  const onSubmit = async (values: FormValues) => {
    try {
      // await updateEvent({
      //   eventId: details?.id,
      //   data: values,
      // });
      console.log("Form values submitted:", values);
      onClose();
    } catch (error) {
      console.error("Échec de la mise à jour de l'événement", error);
    }
  };

  return (
    <Box p={2}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <SimpleGrid columns={1} spacing={4} mb={2}>
              {formFields
                .filter((field) => field.name !== "active") // exclude "active"
                .map((field) => (
                  <RenderFormBuilder key={field.name} field={field} />
                ))}
            </SimpleGrid>

            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isSaving={isSubmitting}
              cancelText="Cancel"
              saveText="Edit Event"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditEvent;
