import { useMemo, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import EventFields from "../../constants/EventFields";
//import useUpdateEvent from "../../hooks/useUpdateEvent";

interface EditEventProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditEvent: React.FC<EditEventProps> = ({ details, onClose }) => {

  //const { mutateAsync: updateEvent, isPending } = useUpdateEvent(associationId);

  const [formFields] = useState<Field[]>(() => EventFields);

  const initialValues: FormValues = useMemo(() => {
    return formFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});
  }, [details, formFields]);

  const validationSchema = useMemo(
    () => createValidationSchema(formFields),
    [formFields]
  );

  const onSubmit = async (
    //values: FormValues,
    //{ setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      //await updateEvent({
      //  eventId: details?.id,
      //  data: values,
      //});
      onClose();
    } catch (error) {
      console.error("Update event failed", error);
    } finally {
      //setSubmitting(false);
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
                .filter((field) => field.name !== "active")
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
