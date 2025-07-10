import {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import { studentFields, levelFields } from "../../constants/StudentFields";
import type { RootState } from "@store/index";
import type { Field } from "@/types/formTypes";
import useFetchLevelsByCategory from "@features/Academics/list-level/hooks/useFetchLevelsByCategory";
import separateFormData, {
  FIELD_PREFIXES,
  GUARDIAN_COLORS,
} from "../../utils/separateFormData";
import FormSection from "../ui/FormSection";
import GuardianSelection from "../ui/GuardianSelection";
import type { GuardianType } from "../../types";
import mergeEditDataWithFormValues, {
  determineGuardianType,
} from "../../utils/mergeEditDataWithFormValues";
import useFieldConfigurations from "./hooks/useFieldConfigurations";

// Types
type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

interface EditData {
  studentId?: string;
  fatherId?: string;
  motherId?: string;
  tutorId?: string;
  studentData?: any;
  fatherData?: any;
  motherData?: any;
  tutorData?: any;
  levelId?: string | number;
}

interface FormContentProps {
  editData?: EditData;
  isEditMode?: boolean;
}

const createInitialFormValues = (
  allFields: Field[],
  guardianSelection: GuardianType,
  isEditMode: boolean,
  editData?: EditData
): FormValues => {
  // Get default values for all fields
  const defaultValues = {
    ...getDefaultFormValues(allFields),
    guardianType: guardianSelection,
  };
  // If in edit mode and edit data exists, merge with defaults
  if (isEditMode && editData) {
    return mergeEditDataWithFormValues(editData, defaultValues);
  }
  return defaultValues;
};

// Custom hook for guardian states
const useGuardianStates = (guardianSelection: GuardianType) => {
  return useMemo(
    () => ({
      isFatherGuardian: guardianSelection === "father",
      isMotherGuardian: guardianSelection === "mother",
      isOtherGuardian: guardianSelection === "other",
      showTutorFields: guardianSelection === "other",
    }),
    [guardianSelection]
  );
};

// Custom hook for managing initial guardian selection
const useInitialGuardianSelection = (
  isEditMode: boolean,
  editData?: EditData
) => {
  return useMemo(() => {
    if (isEditMode && editData) {
      return determineGuardianType(editData);
    }
    return "father";
  }, [isEditMode, editData]);
};

// Main Component
const FormContent = forwardRef<FormContentRef, FormContentProps>(
  ({ editData, isEditMode = false }, ref) => {
    const associationId = useSelector(
      (state: RootState) => state.authSlice.associationId
    );

    const { data: levels } = useFetchLevelsByCategory(associationId, 1);

    // Initialize guardian selection based on edit data or default
    const initialGuardianType = useInitialGuardianSelection(
      isEditMode,
      editData
    );
    const [guardianSelection, setGuardianSelection] =
      useState<GuardianType>(initialGuardianType);
    const formikRef = useRef<FormikProps<FormValues>>(null);

    const guardianStates = useGuardianStates(guardianSelection);
    const fieldConfigurations = useFieldConfigurations(
      guardianStates.showTutorFields,
      isEditMode
    );

    const levelOptions = useMemo(
      () =>
        levels?.map((lvl: any) => ({
          label: `${lvl.name} (${lvl.code})`,
          value: lvl.id,
        })) || [],
      [levels]
    );

    const initialValues = useMemo(() => {
      return createInitialFormValues(
        fieldConfigurations.allFields,
        guardianSelection,
        isEditMode,
        editData
      );
    }, [
      fieldConfigurations.allFields,
      guardianSelection,
      isEditMode,
      editData,
    ]);

    const validationSchema = useMemo(
      () => createValidationSchema(fieldConfigurations.allFields),
      [fieldConfigurations.allFields]
    );

    useEffect(() => {
      if (isEditMode && editData) {
        const newGuardianType = determineGuardianType(editData);
        setGuardianSelection(newGuardianType);
      }
    }, [isEditMode, editData]);

    const handleGuardianSelectionChange = useCallback(
      (selectedValue: string) => {
        const newSelection = selectedValue as GuardianType;
        setGuardianSelection(newSelection);

        if (formikRef.current) {
          const currentValues = { ...formikRef.current.values };

          if (newSelection !== "other") {
            Object.keys(currentValues).forEach((key) => {
              if (key.startsWith(FIELD_PREFIXES.TUTOR)) {
                delete currentValues[key];
              }
            });
          }

          currentValues.guardianType = newSelection;
          formikRef.current.setValues(currentValues);
        }
      },
      []
    );
    // Imperative handle
    useImperativeHandle(
      ref,
      () => ({
        submitForm: async () => {
          if (!formikRef.current) return null;

          await formikRef.current.submitForm();

          if (!formikRef.current.isValid) {
            console.error("Form validation errors:", formikRef.current.errors);
            return null;
          }

          const values = formikRef.current.values;
          const { studentData, fatherData, motherData, tutorData } =
            separateFormData(values);

          // Prepare IDs for edit mode
          let studentId = null,
            fatherId = null,
            motherId = null,
            tutorId = null;
          if (isEditMode && editData) {
            studentId = editData.studentId ?? null;
            fatherId = editData.fatherId ?? null;
            motherId = editData.motherId ?? null;
            tutorId = editData.tutorId ?? null;
          }

          const result = {
            associationId,
            // Use levelId from editData in edit mode, otherwise from form values
            levelId:
              isEditMode && editData?.levelId
                ? editData.levelId
                : values.levelId,
            studentData,
            fatherData: {
              ...fatherData,
              isGuardian: guardianStates.isFatherGuardian,
              gender: "MALE",
            },
            motherData: {
              ...motherData,
              isGuardian: guardianStates.isMotherGuardian,
              gender: "FEMALE",
            },
            tutorData: guardianStates.isOtherGuardian
              ? { ...tutorData, isGuardian: true, gender: "MALE" }
              : null,
          };

          // Only in edit mode, add the IDs
          if (isEditMode) {
            return {
              ...result,
              studentId,
              fatherId,
              motherId,
              tutorId,
            };
          }
          return result;
        },

        resetForm: () => {
          formikRef.current?.resetForm();
          setGuardianSelection("father");
        },
      }),
      [associationId, guardianStates, isEditMode, editData]
    );

    return (
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={false}
        onSubmit={() => {}}
      >
        {() => (
          <Flex direction="column" gap={8}>
            {!isEditMode && (
              <Flex direction="column" gap={4}>
                {levelFields.map((field) => (
                  <RenderFormBuilder
                    key={field.name}
                    field={{ ...field, options: levelOptions }}
                  />
                ))}
              </Flex>
            )}

            <FormSection
              title="Student Information"
              color="blue"
              fields={studentFields}
            />

            <FormSection
              title="Father's Information"
              color={GUARDIAN_COLORS.father}
              fields={fieldConfigurations.prefixedFatherFields}
              isGuardian={guardianStates.isFatherGuardian}
            />

            <FormSection
              title="Mother's Information"
              color={GUARDIAN_COLORS.mother}
              fields={fieldConfigurations.prefixedMotherFields}
              isGuardian={guardianStates.isMotherGuardian}
            />

            <GuardianSelection
              guardianSelection={guardianSelection}
              onGuardianChange={handleGuardianSelectionChange}
            />

            {guardianStates.showTutorFields && (
              <FormSection
                title="Tutor Information"
                color={GUARDIAN_COLORS.tutor}
                fields={fieldConfigurations.prefixedTutorFields}
              />
            )}
          </Flex>
        )}
      </Formik>
    );
  }
);

export default FormContent;
