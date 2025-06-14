import { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import FooterActions from "@components/shared/FooterActions";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useUpdateCategory from "../../hooks/useUpdateCategory";
import LevelCategoriesFields from "../../constants/LevelCategoriesFields";

interface EditCategoryProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditCategory: React.FC<EditCategoryProps> = ({ details, onClose }) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updateCategory, isPending } =
    useUpdateCategory(associationId);

  const initialValues: FormValues = useMemo(() => {
    const values = LevelCategoriesFields.reduce(
      (acc: FormValues, field: Field) => {
        acc[field.name] = details?.[field.name] ?? "";
        return acc;
      },
      {}
    );
    return values;
  }, [details]);

  const validationSchema = useMemo(
    () => createValidationSchema(LevelCategoriesFields),
    []
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateCategory({ categoryId: details?.id, data: values });
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
            <SimpleGrid columns={1} spacing={4} mb={2}>
              {LevelCategoriesFields.filter(
                (field) => field.name !== "active"
              ).map((field: Field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>

            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty || isSubmitting || isPending}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Edit Category"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditCategory;
