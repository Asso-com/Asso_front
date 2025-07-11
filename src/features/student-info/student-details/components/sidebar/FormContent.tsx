import {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import { Flex, Box, Heading, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import {
  guardianFields,
  fatherFields,
  motherFields,
  studentFields,
  levelFields,
} from "../../constants/StudentFields";
import type { RootState } from "@store/index";
import type { Field } from "@/types/formTypes";
import { useTranslation } from "react-i18next";
import useFetchLevelsByCategory from "@features/Academics/list-level/hooks/useFetchLevelsByCategory";

// Types
type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

type GuardianType = "father" | "mother" | "other" | "";

// Constants
const FIELD_PREFIXES = {
  FATHER: "father_",
  MOTHER: "mother_",
  TUTOR: "tutor_",
} as const;

const GUARDIAN_COLORS = {
  father: "green",
  mother: "pink",
  other: "purple",
  tutor: "teal",
} as const;

// Helper functions
const prefixFields = (fields: Field[], prefix: string): Field[] =>
  fields.map((field) => ({
    ...field,
    name: `${prefix}${field.name}`,
  }));

const separateFormData = (values: FormValues) => {
  const studentData: any = {};
  const fatherData: any = {};
  const motherData: any = {};
  const tutorData: any = {};

  Object.entries(values).forEach(([key, value]) => {
    if (key.startsWith(FIELD_PREFIXES.FATHER)) {
      const fieldName = key.replace(FIELD_PREFIXES.FATHER, "");
      fatherData[fieldName] = value;
    } else if (key.startsWith(FIELD_PREFIXES.MOTHER)) {
      const fieldName = key.replace(FIELD_PREFIXES.MOTHER, "");
      motherData[fieldName] = value;
    } else if (key.startsWith(FIELD_PREFIXES.TUTOR)) {
      const fieldName = key.replace(FIELD_PREFIXES.TUTOR, "");
      tutorData[fieldName] = value;
    } else if (!["levelId", "guardianType"].includes(key)) {
      studentData[key] = value;
    }
  });

  return { studentData, fatherData, motherData, tutorData };
};

// Form Section Component
interface FormSectionProps {
  title: string;
  color: string;
  fields: Field[];
  isGuardian?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  color, 
  fields, 
  isGuardian = false 
}) => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Heading
        size="md"
        mb={4}
        color={`${color}.600`}
        display="flex"
        alignItems="center"
        gap={2}
      >
        {t(title)}
        {isGuardian && (
          <Box
            as="span"
            fontSize="sm"
            bg={`${color}.100`}
            color={`${color}.800`}
            px={2}
            py={1}
            borderRadius="md"
          >
            {t("Guardian")}
          </Box>
        )}
      </Heading>
      <Flex direction="column" gap={4}>
        {fields.map((field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Box>
  );
};

// Guardian Selection Component
interface GuardianSelectionProps {
  guardianSelection: GuardianType;
  onGuardianChange: (value: string) => void;
}

const GuardianSelection: React.FC<GuardianSelectionProps> = ({
  guardianSelection,
  onGuardianChange,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading size="md" mb={4} color="orange.600">
        {t("Guardian Selection")}
      </Heading>
      <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
        <RadioGroup value={guardianSelection} onChange={onGuardianChange}>
          <Stack direction="column" spacing={3}>
            <Radio value="father" colorScheme={GUARDIAN_COLORS.father}>
              {t("Father is the Guardian")}
            </Radio>
            <Radio value="mother" colorScheme={GUARDIAN_COLORS.mother}>
              {t("Mother is the Guardian")}
            </Radio>
            <Radio value="other" colorScheme={GUARDIAN_COLORS.other}>
              {t("Other person is the Guardian")}
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  );
};

// Custom hook for field configurations
const useFieldConfigurations = (showTutorFields: boolean) => {
  return useMemo(() => {
    const prefixedFatherFields = prefixFields(fatherFields, FIELD_PREFIXES.FATHER);
    const prefixedMotherFields = prefixFields(motherFields, FIELD_PREFIXES.MOTHER);
    const prefixedTutorFields = prefixFields(guardianFields, FIELD_PREFIXES.TUTOR);

    const allFields = [
      ...studentFields,
      ...prefixedFatherFields,
      ...prefixedMotherFields,
      ...(showTutorFields ? prefixedTutorFields : []),
      ...levelFields,
    ];

    return {
      allFields,
      prefixedFatherFields,
      prefixedMotherFields,
      prefixedTutorFields,
    };
  }, [showTutorFields]);
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

// Main Component
const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { data: levels } = useFetchLevelsByCategory(associationId, 1);
  const [guardianSelection, setGuardianSelection] = useState<GuardianType>("father");
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const guardianStates = useGuardianStates(guardianSelection);
  const fieldConfigurations = useFieldConfigurations(guardianStates.showTutorFields);


  const levelOptions = useMemo(
    () =>
      levels?.map((lvl: any) => ({
        label: `${lvl.name} (${lvl.code})`,
        value: lvl.id,
      })) || [],
    [levels]
  );

  const initialValues = useMemo(
    () => ({
      ...getDefaultFormValues(fieldConfigurations.allFields),
      guardianType: guardianSelection,
    }),
    [fieldConfigurations.allFields, guardianSelection]
  );
// a voir *******************************************************************************************
  const validationSchema = useMemo(
    () => createValidationSchema(fieldConfigurations.allFields),
    [fieldConfigurations.allFields]
  );

  // Event handlers
  const handleGuardianSelectionChange = useCallback((selectedValue: string) => {
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
  }, []);

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
        const { studentData, fatherData, motherData, tutorData } = separateFormData(values);

        return {
          associationId,
          levelId: values.levelId,
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
            ? { ...tutorData, isGuardian: true }
            : null,
        };
      },

      resetForm: () => {
        formikRef.current?.resetForm();
        setGuardianSelection("father");
      },
    }),
    [associationId, guardianStates]
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
 
          <Flex direction="column" gap={4}>
            {levelFields.map((field) => (
              <RenderFormBuilder
                key={field.name}
                field={{ ...field, options: levelOptions }}
              />
            ))}
          </Flex>

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
});

export default FormContent;