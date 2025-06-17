import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import type { Field } from "@/types/formTypes";
import type { RootState } from "@store/index";
import useFetchSelectSubjectLevel from "../../../../Academics/Subject-level/hooks/useFetchSelectSubjectLevel";
import LessonFields from "../../constants/LessonFields";

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  // États pour champs dynamiques et valeurs initiales
  const [fields, setFields] = useState<Field[]>([]);
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { 
    data: subjectLevelOptions, 
    isLoading: loadingSubjectLevels, 
    isError: errorSubjectLevels 
  } = useFetchSelectSubjectLevel(associationId);

  useEffect(() => {
    if (!subjectLevelOptions) return;

    const options = subjectLevelOptions.map((item: any) => ({
      value: item.value,
      label: item.label,
    }));

    console.log("Subject level options:", options);

    // Construction dynamique du tableau des champs
    const dynamicFields: Field[] = LessonFields.map((field: Field) => 
      field.name === "levelSubjectId"
        ? { ...field, options }
        : field
    );

    setFields(dynamicFields);

    // Définir les valeurs initiales dynamiques
    const defaultValues = getDefaultFormValues(dynamicFields);
    setInitialValues({
      ...defaultValues,
      active: true,
    });
  }, [subjectLevelOptions]);

  const validationSchema = createValidationSchema(fields);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;
      try {
        await formikRef.current.submitForm();
        if (formikRef.current.isValid) {
          return { ...formikRef.current.values };
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

  if (loadingSubjectLevels) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (errorSubjectLevels) {
    return (
      <Text color="red.500">  
      Error loading levels or subjects. Please try again.
      </Text>
    );
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      <Flex direction="column" gap={4}>
        {fields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

export default FormContent;