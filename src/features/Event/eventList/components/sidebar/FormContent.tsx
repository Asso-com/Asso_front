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
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import LevelFields from "../../constants/EventFields";
type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const [formFields, setFormFields] = useState<Field[]>(LevelFields);
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  useEffect(() => {
    const defaultValues = LevelFields.reduce(
      (acc: FormValues, field: Field) => {
        acc[field.name] = "";
        return acc;
      },
      {}
    );
    setInitialValues({
      ...defaultValues,
      active: true,
    });
  }, []);

  const validationSchema = useMemo(
    () => createValidationSchema(LevelFields),
    []
  );

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;
      await formikRef.current.submitForm();
      if (formikRef.current.isValid && formikRef.current.dirty) {
        return {
          ...formikRef.current.values,
          associationId: associationId,
        };
      }
      return null;
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm();
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
        {formFields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

export default FormContent;
