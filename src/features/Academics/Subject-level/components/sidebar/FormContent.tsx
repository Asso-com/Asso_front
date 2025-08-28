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
import useFetchSubjects from "../../../Subject/hooks/useFetchSubjects";
import useFetchCategories from "@features/Academics/Categories-levels/hooks/useFetchCategories";
import useFetchLevelsByCategory from "@features/Academics/list-level/hooks/useFetchLevelsByCategory";
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
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1); // Default to category 1

    const {
      data: Categories,
      isLoading: loadingCategories,
      isError: errorCategories,
    } = useFetchCategories(associationId);

    const {
      data: levels,
      isLoading: loadingLevels,
    } = useFetchLevelsByCategory(associationId, selectedCategoryId);

    const {
      data: subjects,
      isLoading: loadingSubjects,
      isError: errorSubjects,
    } = useFetchSubjects(associationId);

    const formikRef = useRef<FormikProps<FormValues>>(null);

    useEffect(() => {
      if (!Categories || !subjects) return;

      const CategoriesOptions = Categories
        .filter((cat: { name: string; id: number; active: boolean }) => cat.active)
        .map((cat: any) => ({
          label: cat.name,
          value: cat.id,
        }));

      const subjectOptions = subjects.map((subj: any) => ({
        label: subj.name,
        value: subj.id,
      }));

      const levelOptions = levels ? levels.map((lvl: any) => ({
        label: lvl.name,
        value: lvl.id,
      })) : [];

      const dynamicFields: Field[] = [
        {
          name: "categoryId",
          label: "Category",
          type: "radio",
          options: CategoriesOptions,
        },
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
        categoryId: 1, // Set default category to 1
        active: true,
      });
    }, [levels, subjects, Categories, loadingLevels]);

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

    if (loadingCategories || loadingSubjects) {
      return (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="lg" />
        </Flex>
      );
    }

    if (errorCategories || errorSubjects) {
      return (
        <Text color="red.500">
          Error loading categories or subjects. Please try again.
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
        {({ setFieldValue }) => {
          // Update the onChange handler to use Formik's setFieldValue
          const enhancedFields = fields.map(field => {
            if (field.name === "categoryId") {
              return {
                ...field,
                onChange: (value: any) => {
                  const categoryId = Number(value);
                  setFieldValue("categoryId", categoryId);
                  setSelectedCategoryId(categoryId);
                  setFieldValue("levelId", ""); // Reset level selection
                },
              };
            }
            return field;
          });

          return (
            <Flex direction="column" gap={4}>
              {enhancedFields.map((field: Field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </Flex>
          );
        }}
      </Formik>
    );
  }
);

export default FormContent;