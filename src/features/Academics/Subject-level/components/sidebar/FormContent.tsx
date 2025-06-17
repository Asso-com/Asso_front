import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import useFetchLevel from "../../../list-level/hooks/useFetchListLevel";
import useFetchSubjects from "../../../Subject/hooks/useFetchSubjects";

import type { Field } from "@/types/formTypes";

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

type FormContentProps = {
  associationId: number;
};

const FormContent = forwardRef<FormContentRef, FormContentProps>(
  ({ associationId }, ref) => {
    // États pour champs dynamiques et valeurs initiales
    const [fields, setFields] = useState<Field[]>([]);
    const [initialValues, setInitialValues] = useState<FormValues>({});
    const {
      data: levels,
      isLoading: loadingLevels,
      isError: errorLevels,
    } = useFetchLevel(associationId);

    const {
      data: subjects,
      isLoading: loadingSubjects,
      isError: errorSubjects,
    } = useFetchSubjects(associationId);
    useEffect(() => {
      if (!levels || !subjects) return;
      const levelOptions = levels.map((lvl: any) => ({
        label: lvl.name,
        value: lvl.id,
      }));

      const subjectOptions = subjects.map((subj: any) => ({
        label: subj.name,
        value: subj.id,
      }));
      console.log("Subject options:", subjectOptions);

      // Construction dynamique du tableau des champs
      const dynamicFields: Field[] = [
        {
          name: "levelId",
          label: "Level",
          type: "select",
          options: levelOptions,
        },
        {
          name: "subjectIds",
          label: "Subjects",
          type: "multi-select-checkbox",
          options: subjectOptions,
        },
      ];

      setFields(dynamicFields);

      // Définir les valeurs initiales dynamiques
      const defaultValues = getDefaultFormValues(dynamicFields);
      setInitialValues({
        ...defaultValues,
        active: true,
      });
    }, [levels, subjects]);

    const validationSchema = createValidationSchema(fields);

    const formikRef = useRef<FormikProps<FormValues>>(null);

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
    if (loadingLevels || loadingSubjects) {
      return (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="lg" />
        </Flex>
      );
    }
    if (errorLevels || errorSubjects) {
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
  }
);

export default FormContent;
