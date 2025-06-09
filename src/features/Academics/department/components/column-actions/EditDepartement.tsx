import React, { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import DepartmentFields from "../../constants/DepartmentFields";
import FooterActions from "@components/shared/FooterActions";

interface EditDepartementProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditDepartement: React.FC<EditDepartementProps> = ({
  details,
  onClose,
}) => {
  const initialValues: FormValues = useMemo(() => {
    const values = DepartmentFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});

    return {
      ...values,
      // selectedCodes: [2, 7],
      // managers: ["test", "test2"],
    };
  }, [details]);

  const validationSchema = useMemo(
    () => createValidationSchema(DepartmentFields),
    []
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      console.log(values);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit, dirty }) => (
          <Form>
            <SimpleGrid columns={1} spacing={2} mt={1}>
              {DepartmentFields.map((field: Field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>
            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty}
              isSaving={isSubmitting}
              cancelText="Cancel"
              saveText="Edit Department"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditDepartement;
