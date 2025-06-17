import React, { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import CoefficientFields from "../../components/constants/CoefficientFields";
import FooterActions from "@components/shared/FooterActions";
import  useUpdateCoefficient  from "../../hooks/useUpdateCoefficient";
import { useTranslation } from "react-i18next";

interface EditCoefficientProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditCoefficient: React.FC<EditCoefficientProps> = ({ details, onClose }) => {
  const { t } = useTranslation();
  const { mutateAsync: updateCoefficient } = useUpdateCoefficient();

  const initialValues: FormValues = useMemo(() => {
    return CoefficientFields.reduce((acc: FormValues, field: any) => {
      acc[field.name] = details?.[field.name]?.toString() || "";
      return acc;
    }, {});
  }, [details]);

  const validationSchema = useMemo(
    () => createValidationSchema(CoefficientFields),
    []
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      if (details?.id) {
        await updateCoefficient({ id: details.id, values });
      }
      setSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Update error:", error);
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
              {CoefficientFields.map((field: any) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>
            <Box mt={4}> {/* Added Box with margin-top */}
              <FooterActions
                onClose={onClose}
                handleSave={handleSubmit}
                isDisabled={!dirty}
                isSaving={isSubmitting}
                cancelText={t("Cancel")}
                saveText={t("Update Coefficient")}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditCoefficient;