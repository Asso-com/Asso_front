import { useEffect, useState, forwardRef, useRef, useImperativeHandle, useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import { Formik } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import AnnonceFields from "../constants/AnnonceFields";
import createValidationSchema from "@utils/createValidationSchema";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";

export interface FormContentRef {
  submitForm: () => Promise<any | null>;
  resetForm: () => void;
}

interface FormValues {
  [key: string]: any;
}

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<any>(null);

  useEffect(() => {
    const defaults = getDefaultFormValues(AnnonceFields as any);
    setInitialValues(defaults);
  }, []);

  const validationSchema = useMemo(
    () => createValidationSchema(AnnonceFields as any),
    [] 
  );

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current?.dirty) return null;
      try {
        await formikRef.current.handleSubmit();
        if (formikRef.current.isValid) {
          const values = formikRef.current.values;
          return values;
        }
      } catch (error) {
        console.error("Form submission failed:", error);
      }
      return null;
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm({ values: initialValues });
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
        {AnnonceFields.map((field: any) => (
          <RenderFormBuilder key={field.name} field={field as any} />
        ))}
      </Flex>
    </Formik>
  );
});

FormContent.displayName = "FormContent";

export default FormContent;