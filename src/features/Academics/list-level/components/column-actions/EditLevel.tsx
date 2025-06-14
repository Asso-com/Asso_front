import { useEffect, useMemo, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import createValidationSchema from "@utils/createValidationSchema";

import type { Field } from "@/types/formTypes";
import type { RootState } from "@store/index";

import LevelFields from "../../constants/LevelFields";
import useUpdateLevel from "../../hooks/useUpdateLevel";
import useFetchCategoriesByAssociation from "@features/Academics/Categories-levels/hooks/useFetchCategoriesByAssociation";

interface EditLevelProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditLevel: React.FC<EditLevelProps> = ({ details, onClose }) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updateLevel, isPending } = useUpdateLevel(associationId);
  const { data: categories } = useFetchCategoriesByAssociation(associationId);

  const mapOptions = (data: any[], valueKey: string, labelKey: string) =>
    data?.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    })) || [];

  const categoriesOptions = useMemo(
    () => mapOptions(categories, "id", "name"),
    [categories]
  );

  const [formFields, setFormFields] = useState<Field[]>(() => LevelFields);

  useEffect(() => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.name === "categoryId"
          ? { ...field, options: categoriesOptions }
          : field
      )
    );
  }, [categoriesOptions]);

  const initialValues: FormValues = useMemo(() => {
    return formFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});
  }, [details, formFields, categoriesOptions]);

  const validationSchema = useMemo(
    () => createValidationSchema(formFields),
    [formFields]
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateLevel({
        levelId: details?.id,
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
              saveText="Edit Level"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditLevel;
