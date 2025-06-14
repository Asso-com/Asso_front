import { useEffect, useMemo, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import createValidationSchema from "@utils/createValidationSchema";

import type { Field } from "@/types/formTypes";
import type { RootState } from "@store/index";

import useUpdateSubject from "../../hooks/useUpdateSubject";
import SubjectFields from "../../constants/SubjectFields";
import useFetchDepartementByAssociation from "@features/Academics/department/hooks/useFetchDepartementByAssociation";

interface EditLevelProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditSubject: React.FC<EditLevelProps> = ({ details, onClose }) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updateSubject, isPending } =
    useUpdateSubject(associationId);

  const [formFields, setFormFields] = useState<Field[]>(SubjectFields);

  const { data: departments } = useFetchDepartementByAssociation(associationId);

  const departmentsOptions = useMemo(
    () =>
      departments?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [departments]
  );

  useEffect(() => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.name === "departmentId"
          ? { ...field, options: departmentsOptions }
          : field
      )
    );
  }, [departmentsOptions]);

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
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateSubject({
        subjectId: details?.id,
        data: values,
      });
      onClose();
    } catch (error) {
      console.error("Update level failed", error);
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
              isDisabled={!dirty || isSubmitting || isPending}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Edit Subject"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditSubject;
