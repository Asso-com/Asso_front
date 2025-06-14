import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle, useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import CoefficientFields from "../../components/constants/CoefficientFields";
import createValidationSchema from "@utils/createValidationSchema";
import { useTranslation } from "react-i18next";


// Define the shape of your form values dynamically from Field[]
type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>(({ initialData }, ref) => {
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);

  useEffect(() => {
    const defaultValues = CoefficientFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = initialData?.[field.name]?.toString() || "";
      return acc;
    }, {});
    setInitialValues(defaultValues);
  }, [initialData]);

  const validationSchema = useMemo(
    () => createValidationSchema(CoefficientFields),
    [CoefficientFields]
  );

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current?.dirty) return null;
      try {
        await formikRef.current.handleSubmit();
        if (formikRef.current.isValid) {
          const values = formikRef.current.values;
          return {
            ...values,
            assiduity_coefficient: parseFloat(values.assiduity_coefficient),
            delay_before_attendance: parseFloat(values.delay_before_attendance),
            participation_coefficient: parseFloat(values.participation_coefficient),
            quiz_coefficient: parseFloat(values.quiz_coefficient),
          };
        }
      } catch (error) {
        console.error("Form submission failed:", error);
      }
      return null;
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm({ values: formikRef.current.values });
      }
    },
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      <Flex direction="column" gap={4}>
        {CoefficientFields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

export default FormContent;