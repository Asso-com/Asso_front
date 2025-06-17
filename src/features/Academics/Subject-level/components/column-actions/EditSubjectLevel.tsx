import { useEffect, useMemo, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import createValidationSchema from "@utils/createValidationSchema";

import type { Field } from "@/types/formTypes";
import type { RootState } from "@store/index";

import { useEditSubjectLevel } from "../../hooks/useEditSubjectLevel";
import useFetchLevel from "../../../list-level/hooks/useFetchListLevel";
import useFetchSubjects from "../../../Subject/hooks/useFetchSubjects";

interface EditSubjectLevelProps {
  details?: {
    id?: number;
    levelId: number;
    subjectIds: number[];
    levelName?: string;
    subjects?: Array<{ id: number; name: string }>;
    [key: string]: any;
  };
  onClose: () => void;
}

interface FormValues {
  levelId: number;
  subjectIds: number[];
  [key: string]: any;
}

const EditSubjectLevel: React.FC<EditSubjectLevelProps> = ({ details, onClose }) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updateSubjectLevel, isPending } = useEditSubjectLevel(associationId);

  const [formFields, setFormFields] = useState<Field[]>([]);

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

  // Build form fields dynamically when data is loaded
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

    const dynamicFields: Field[] = [
      {
        name: "levelId",
        label: "Niveau",
        type: "select",
        options: levelOptions,
        validationRules: { required: true },
      },
      {
        name: "subjectIds",
        label: "Matières",
        type: "multi-select-checkbox",
        options: subjectOptions,
        validationRules: { required: true },
      },
    ];

    setFormFields(dynamicFields);
  }, [levels, subjects]);

  // Create initial values based on details and form fields
  const initialValues: FormValues = useMemo(() => {
    if (!details || formFields.length === 0) {
      return {
        levelId: 0,
        subjectIds: [],
      };
    }

    return {
      levelId: details.levelId || 0,
      subjectIds: details.subjectIds || [],
    };
  }, [details, formFields]);

  const validationSchema = useMemo(
    () => createValidationSchema(formFields),
    [formFields]
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const payload = {
        levelId: values.levelId,
        subjectIds: values.subjectIds,
        associationId,
      };
      
      await updateSubjectLevel(payload);
      onClose();
    } catch (error) {
      console.error("Update subject level failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading state
  if (loadingLevels || loadingSubjects) {
    return (
      <Box p={2} textAlign="center">
        Loading levels and subjects...
      </Box>
    );
  }

  // Show error state
  if (errorLevels || errorSubjects) {
    return (
      <Box p={2} color="red.500">
        Error loading levels or subjects. Please try again.
      </Box>
    );
  }

  // Don't render form until we have form fields
  if (formFields.length === 0) {
    return (
      <Box p={2} textAlign="center">
        Preparing form...
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit, dirty }) => (
          <Form>
            <SimpleGrid columns={1} spacing={4} mb={2}>
              {formFields.map((field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>

            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty || isSubmitting || isPending}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Update Subject Level"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditSubjectLevel;