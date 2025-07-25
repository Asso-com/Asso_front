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
import useFetchNotAcademicLevelSubjects from "@features/Academics/Subject-level/hooks/useFetchNotAcademicLevelSubjects";
import useFetchAvailableStudentsForEnrollment from "../../hooks/useFetchAvailableStudentsForEnrollment";

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

interface FormContentProps {
  editData?: {
    studentId: string;
    levelSubjectIds: number[];
  };
  isEditMode?: boolean;
  currentStudent?: {
    id: string;
    fullName: string;
    registrationId: string;
  };
}

const FormContent = forwardRef<FormContentRef, FormContentProps>(
  ({ editData, isEditMode = false, currentStudent }, ref) => {
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
      let options = students.map((student: any) => ({
        label: `${student?.fullName} (${student?.registrationId})`,
        value: student?.studentId,
      }));

      if (isEditMode && editData?.studentId && currentStudent) {
const currentStudentExists = options.some((option: { label: string; value: string | number }) => option.value === editData.studentId);
        
        if (!currentStudentExists) {
          options.unshift({
            label: `${currentStudent.fullName} (${currentStudent.registrationId})`,
            value: currentStudent.id,
          });
        }
      }

      return options;
    }, [students, isEditMode, editData?.studentId, currentStudent]);

    const subjectOptions = useMemo(() => {
      return levelSubjects.map((subject: any) => ({
        ...subject,
        ...(isEditMode && editData?.levelSubjectIds?.includes(subject.value) && {
          inputProps: {
            isDisabled: true,
          }
        }),
      }));
    }, [levelSubjects, isEditMode, editData?.levelSubjectIds]);

    const isLoading = isLoadingSubjects || isLoadingStudents;
    
    const computedInitialValues = useMemo(() => {
      if (isEditMode && editData) {
        return {
          studentId: editData.studentId,
          levelSubjectIds: editData.levelSubjectIds || [],
        };
      }
      
      return {
        studentId: "",
        levelSubjectIds: [],
      };
    }, [isEditMode, editData]);

    useEffect(() => {
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
          ...(isEditMode && {
            inputProps: {
              isDisabled: true,
            }
          }),
          ...(studentOptions.length === 0 && {
            placeholder: "No students available",
            disabled: true,
          }),
        },
        {
          name: "levelSubjectIds",
          label: "Subjects",
          type: "multi-select-checkbox",
          options: subjectOptions,
          validationRules: {
            required: true,
          },
          ...(subjectOptions.length === 0 && {
            emptyMessage: "No subjects available for this level",
          }),
        },
      ];

      setFields(dynamicFields);
      setInitialValues(computedInitialValues);
    }, [
      studentOptions, 
      subjectOptions,
      isLoading, 
      computedInitialValues,
      isEditMode
    ]);

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
            values: computedInitialValues,
          });
        }
      },
    }));

    if (isLoading || !fields.length) {
      return null;
    }

    return (
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={() => {}}
      >
        {() => (
          <Flex direction="column" gap={4}>
            {fields.map((field: Field) => (
              <RenderFormBuilder key={field.name} field={field} />
            ))}
          </Flex>
        )}
      </Formik>
    );
  }
);

export default FormContent;