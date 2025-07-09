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
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import type { Field } from "@/types/formTypes";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchNotAcademicLevelSubjects from "@features/Academics/Subject-level/hooks/useFetchNotAcademicLevelSubjects";
import useFetchAvailableStudentsForEnrollment from "../../hooks/useFetchAvailableStudentsForEnrollment";

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
  const [fields, setFields] = useState<Field[]>([]);
  const [initialValues, setInitialValues] = useState<FormValues>({});

  const { data: levelSubjects = [], isLoading: isLoadingSubjects } =
    useFetchNotAcademicLevelSubjects(associationId);

  const { data: students = [], isLoading: isLoadingStudents } = 
    useFetchAvailableStudentsForEnrollment(associationId);

  const studentOptions = useMemo(() => {
    return students.map((student: any) => ({
      label: `${student?.fullName} (${student?.registrationId})`,
      value: student?.studentId,
    }));
  }, [students]);

  const isLoading = isLoadingSubjects || isLoadingStudents;

  useEffect(() => {
    // Wait for data to load
    if (isLoading) {
      return;
    }

    const dynamicFields: Field[] = [
      {
        name: "studentId",
        label: "Student",
        type: "select",
        options: studentOptions,
        validationRules: {
          required: true,
        },
        ...(studentOptions.length === 0 && {
          placeholder: "No students available",
          disabled: true,
        }),
      },
      {
        name: "levelSubjectIds",
        label: "Subjects",
        type: "multi-select-checkbox",
        options: levelSubjects,
        validationRules: {
          required: true,
        },
        ...(levelSubjects.length === 0 && {
          emptyMessage: "No subjects available for this level",
        }),
      },
    ];

    setFields(dynamicFields);

    // Définir les valeurs initiales dynamiques
    const defaultValues = getDefaultFormValues(dynamicFields);
    setInitialValues({
      ...defaultValues,
    });
  }, [studentOptions, levelSubjects, isLoading]);

  const validationSchema = useMemo(() => {
    return createValidationSchema(fields);
  }, [fields]);

  const formikRef = useRef<FormikProps<FormValues>>(null);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;
      try {
        await formikRef.current.submitForm();
        if (
          formikRef.current.isValid &&
          Object.keys(formikRef.current.errors).length === 0
        ) {
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