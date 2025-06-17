import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import CoefficientFields from "../../components/constants/CoefficientFields";
import createValidationSchema from "@utils/createValidationSchema";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import type { Field } from "@/types/formTypes";

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);

  useEffect(() => {
    const defaults = getDefaultFormValues(CoefficientFields);
    setInitialValues(defaults);
  }, []);

  const validationSchema = useMemo(
    () => createValidationSchema(CoefficientFields),
    [] 
  );

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current?.dirty) return null;
      try {
        await formikRef.current.handleSubmit();
        if (formikRef.current.isValid) {
          const values = formikRef.current.values;
          const parsedValues = { ...values };
          for (const field of CoefficientFields) {
            if (field.type === "number" && values[field.name] !== "") {
              parsedValues[field.name] = parseFloat(values[field.name]);
            }
          }
          return parsedValues;
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
      onSubmit={() => {
      }}
    >
      <Flex direction="column" gap={4}>
        {CoefficientFields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

FormContent.displayName = "FormContent";

export default FormContent;
