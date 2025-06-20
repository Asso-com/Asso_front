import React, { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder"; 
import type { Field } from "@/types/formTypes"; 
import FooterActions from "@components/shared/FooterActions";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index"; 
import useUpdateStudent from "../../hooks/useUpdateStudent";
import createValidationSchema from "@utils/createValidationSchema";
import { StudentFields } from "../../constants/StudentFields";

interface EditStudentProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditStudent: React.FC<EditStudentProps> = ({ details, onClose }) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updateStudent, isPending } =
    useUpdateStudent(associationId);

  const initialValues: FormValues = useMemo(() => {
    return StudentFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});
  }, [details]);

  const validationSchema = createValidationSchema(StudentFields);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const StudentId = details?.id;
      await updateStudent({ StudentId, data: values });
      onClose();
    } catch (error) {
    } finally {
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
            <SimpleGrid columns={2} spacing={4} mt={2}>
              {StudentFields.filter((field) => field.name !== "active").map(
                (field: Field) => (
                  <RenderFormBuilder key={field.name} field={field} />
                )
              )}
            </SimpleGrid>

            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Edit Student"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditStudent;
