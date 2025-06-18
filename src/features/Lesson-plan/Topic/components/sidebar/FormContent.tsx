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
import useFetchSelectLessons from "../../../Lesson/hooks/useFetchLessons"; 
import TopicFields from "../../constants/TopicFields";

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { 
    data: lessonOptions, 
    isLoading: loadingLessons, 
    isError: errorLessons 
  } = useFetchSelectLessons(associationId);

  useEffect(() => {
    if (!lessonOptions) return;

    const options = lessonOptions.flatMap((group: any) => 
      group.lessons.map((lesson: any) => ({
        value: lesson.id,
        label: `${lesson.name} (${group.level} - ${group.subject})`,
      }))
    );

    console.log("Lesson options:", options);

    const dynamicFields: Field[] = TopicFields.map((field: Field) => 
      field.name === "lessonId"
        ? { ...field, options }
        : field
    );

    setFields(dynamicFields);

    const defaultValues = getDefaultFormValues(dynamicFields);
    setInitialValues({
      ...defaultValues,
      active: true,
    });
  }, [lessonOptions]);

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

  if (loadingLessons) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (errorLessons) {
    return (
      <Text color="red.500">  
        Error loading lessons. Please try again.
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