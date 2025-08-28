import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import StaffFields from "../../constants/StaffFields";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);

  useEffect(() => {
    const defaultValues = getDefaultFormValues(StaffFields);
    setInitialValues({
      ...defaultValues,
      associationId: associationId,
    });
  }, []);

  const validationSchema = createValidationSchema(StaffFields);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;

      try {
        await formikRef.current.submitForm();

        if (formikRef.current.isValid) {
          return {
            ...formikRef.current.values,
          };
        }
      } catch (error) {
        console.error("Form submission failed:", error);
      }
      return null;
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm({
          values: initialValues,
        });
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
        {StaffFields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

export default FormContent;
