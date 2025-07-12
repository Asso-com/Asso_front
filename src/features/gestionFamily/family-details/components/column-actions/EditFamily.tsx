
import React, { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import * as Yup from "yup";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import useEditFamily from "../../hooks/useEditFamily";

import type { Field } from "@/types/formTypes";
import { familyEditableFields } from "../../constants/familyFields";
import { Form, Formik, type FormikHelpers } from "formik";

interface EditFamilyProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const createValidationSchema = (fields: Field[]) => {
  const shape: Record<string, any> = {};
  fields.forEach((field) => {
    if (field.validationRules?.required) {
      shape[field.name] = field.type === "checkbox"
        ? Yup.boolean()
        : Yup.string().required("Required");
    }
  });
  return Yup.object().shape(shape);
};

const EditFamily: React.FC<EditFamilyProps> = ({ details, onClose }) => {
  const editFamilyMutation = useEditFamily();

  const initialValues: FormValues = useMemo(() => ({
    observation: details?.observation ?? "",
    blacklist: details?.blacklist ?? false,
  }), [details]);

  const validationSchema = createValidationSchema(familyEditableFields);

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      if (!details?.id) throw new Error("Missing family ID");

      const payload = {
        observation: values.observation,
        blacklist: values.blacklist,
        fatherId: details?.father?.id ?? null,
        motherId: details?.mother?.id ?? null,
        childrenIds: details?.children?.map((c: any) => c.id) ?? [],
      };

      await editFamilyMutation.mutateAsync({ id: details.id, data: payload });
      onClose();
    } catch (error) {
      console.error("Failed to update family:", error);
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
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isSubmitting, dirty }) => (
          <Form>
            <SimpleGrid columns={2} spacing={4}>
              {familyEditableFields.map((field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>
            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isSaving={isSubmitting}
              isDisabled={!dirty}
              cancelText="Cancel"
              saveText="Save"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditFamily;