import React, {
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
import AcademicPeriodFields from "../../constants/AcademicPeriodFields";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";

// Define the shape of your form values dynamically from Field[]
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
    const values = AcademicPeriodFields.reduce(
      (acc: FormValues, field: Field) => {
        acc[field.name] = field.type === "checkbox" ? true : "";
        return acc;
      },
      {}
    );
    setInitialValues(values);
  }, [AcademicPeriodFields]);

  const validationSchema = useMemo(
    () => createValidationSchema(AcademicPeriodFields),
    [AcademicPeriodFields]
  );

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current?.dirty) return null;
      try {
        formikRef.current.handleSubmit();
        if (formikRef.current.isValid) {
          return formikRef.current.values;
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
      // enableReinitialize
      onSubmit={() => {}}
    >
      <Flex direction="column" gap={4}>
        {AcademicPeriodFields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

export default FormContent;
