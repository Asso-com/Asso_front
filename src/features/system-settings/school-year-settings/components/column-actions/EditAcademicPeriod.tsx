import { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import FooterActions from "@components/shared/FooterActions";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useUpdateAcademicPeriod from "../../hooks/useUpdateAcademicPeriod";
import UpdateAcademicPeriodFields from "../../constants/UpdateAcademicPeriodFields";

interface EditDepartementProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditAcademicPeriod: React.FC<EditDepartementProps> = ({
  details,
  onClose,
}) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updatePeriodAcademic, isPending } =
    useUpdateAcademicPeriod(associationId);

  const initialValues: FormValues = useMemo(() => {
    return UpdateAcademicPeriodFields.reduce(
      (acc: FormValues, field: Field) => {
        acc[field.name] = details?.[field.name] ?? "";
        return acc;
      },
      {}
    );
  }, [details]);

  const validationSchema = useMemo(
    () => createValidationSchema(UpdateAcademicPeriodFields),
    []
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await updatePeriodAcademic({
        academicPeriodId: details?.id,
        data: values,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update academic period:", error);
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
              {UpdateAcademicPeriodFields.map((field: Field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>
            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty || isSubmitting || isPending}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Update Academic Period"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default EditAcademicPeriod;
