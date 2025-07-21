import { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import FooterActions from "@components/shared/FooterActions";
import PartnersFields from "../constants/PartnersFields";

interface EditAssociationProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditAssociation: React.FC<EditAssociationProps> = ({
  details,
  onClose,
}) => {
  const initialValues: FormValues = useMemo(() => {
    const values = PartnersFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});
    return values;
  }, [details]);

  const validationSchema = useMemo(
    () => createValidationSchema(PartnersFields),
    []
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      console.log(values);
      onClose();
    } catch (error) {
    } finally {
      setSubmitting(false);
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
        {({ isSubmitting, handleSubmit, dirty }) => (
          <Form>
            <SimpleGrid columns={2} spacing={4} mb={2}>
              {PartnersFields.filter((field) => field.name !== "active").map(
                (field: Field) => (
                  <RenderFormBuilder key={field.name} field={field} />
                )
              )}
            </SimpleGrid>
            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty || isSubmitting}
              isSaving={isSubmitting}
              cancelText="Cancel"
              saveText="Edit Association"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditAssociation;
